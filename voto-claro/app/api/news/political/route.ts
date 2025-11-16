import { NextRequest, NextResponse } from 'next/server';
import { RSSNewsItem, NewsResponse } from '@/services/newsService';
import fs from 'fs/promises';
import path from 'path';

const RSS_URL = 'https://elcomercio.pe/arc/outboundfeeds/rss/category/politica/?outputType=xml';

function parseRSSXML(xmlString: string): RSSNewsItem[] {
	try {
		const items: RSSNewsItem[] = [];
    
		const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
		let match;
    
		while ((match = itemRegex.exec(xmlString)) !== null) {
			try {
				const itemXML = match[1];
        
				const title = extractField(itemXML, 'title');
				const description = extractField(itemXML, 'description');
				const link = extractField(itemXML, 'link');
				const pubDate = extractField(itemXML, 'pubDate');
				const creator = extractField(itemXML, 'dc:creator');
				const contentEncoded = extractField(itemXML, 'content:encoded');
        
				let category = 'Política';
				if (link) {
					const categoryMatch = link.match(/\/politica\/([^\/]+)\//i);
					if (categoryMatch && categoryMatch[1]) {
						category = categoryMatch[1]
							.replace(/-/g, ' ')
							.replace(/\b\w/g, l => l.toUpperCase());
					}
				}
        
				let image = null;

				const hasCreator = itemXML.includes('dc:creator');
				const hasContentEncoded = itemXML.includes('content:encoded');
				if (hasCreator) {
					const _creatorMatch = itemXML.match(/<dc:creator[^>]*>(.*?)<\/dc:creator>/si);
				}
        
				if (hasContentEncoded) {
					const _contentMatch = itemXML.match(/<content:encoded[^>]*>(.*?)<\/content:encoded>/si);
				}
        
				// Buscar directamente la URL en el XML raw
				const mediaMatch = itemXML.match(/url=["']([^"']+)["']/i);
        
				if (mediaMatch && mediaMatch[1]) {
					// AQUÍ ESTÁ EL FIX: Decodificar entidades HTML en la URL
					const rawUrl = mediaMatch[1];
					image = rawUrl
						.replace(/&amp;/g, '&')
						.replace(/&lt;/g, '<')
						.replace(/&gt;/g, '>')
						.replace(/&quot;/g, '"')
						.replace(/&#039;/g, "'")
						.replace(/&apos;/g, "'");
				}
				// Clean description from HTML tags and entities
				let cleanDescription = '';
				if (description) {
					cleanDescription = description
						.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') // Remove CDATA
						.replace(/<[^>]*>/g, '') // Remove HTML tags
						.replace(/&lt;/g, '<')
						.replace(/&gt;/g, '>')
						.replace(/&amp;/g, '&')
						.replace(/&quot;/g, '"')
						.replace(/&#039;/g, "'")
						.replace(/&apos;/g, "'")
						.replace(/&nbsp;/g, ' ')
						.trim();
            
					// Truncate if too long
					if (cleanDescription.length > 200) {
						cleanDescription = cleanDescription.substring(0, 197) + '...';
					}
				}

				if (title && link && title.length > 10) {
					const newsItem = {
						title: cleanText(title),
						description: cleanDescription || 'Sin descripción disponible',
						link: cleanText(link),
						pubDate: pubDate ? cleanText(pubDate) : new Date().toISOString(),
						source: 'El Comercio',
						category: category, // Usar la categoría extraída dinámicamente
						image: image || undefined,
						creator: creator ? cleanText(creator) : undefined,
						contentEncoded: contentEncoded ? cleanText(contentEncoded) : undefined,
					};
          
					items.push(newsItem);
				}
			} catch (error) {
				console.warn('Error parsing RSS item:', error);
			}
		}
    
	// Log de resumen CON URLS COMPLETAS
	const _itemsWithImages = items.filter(item => item.image).length;

		const categories = [...new Set(items.map(item => item.category))];
		categories.forEach(cat => {
			const _count = items.filter(item => item.category === cat).length;
		});

		return items;
	} catch (error) {
		console.error('Error parsing RSS XML:', error);
		return [];
	}
}

/**
 * Extract field content from XML using regex
 */
function extractField(xml: string, fieldName: string): string {
	// Escape special characters in field name for regex
	const escapedFieldName = fieldName.replace(/:/g, '\\:');
  
	// Handle both regular fields and CDATA
	const patterns = [
		new RegExp(`<${escapedFieldName}[^>]*><!\\[CDATA\\[(.*?)\\]\\]><\\/${escapedFieldName}>`, 'si'),
		new RegExp(`<${escapedFieldName}[^>]*>(.*?)<\\/${escapedFieldName}>`, 'si')
	];
  
	for (const pattern of patterns) {
		const match = xml.match(pattern);
		if (match) {
			return match[1].trim();
		}
	}
  
	return '';
}

/**
 * Clean text content
 */
function cleanText(text: string): string {
	return text
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&apos;/g, "'")
		.trim();
}

/**
 * GET handler for political news
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Content-Type': 'application/json',
		'Cache-Control': 'public, max-age=300',
	};

	try {

		const rssResponse = await fetch(RSS_URL, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
				'Accept': 'application/rss+xml, application/xml, text/xml',
			},

			signal: AbortSignal.timeout(15000),
		});

		if (!rssResponse.ok) {
			throw new Error(`RSS fetch failed: ${rssResponse.status} ${rssResponse.statusText}`);
		}

		const xmlContent = await rssResponse.text();
    
		if (!xmlContent || xmlContent.trim().length === 0) {
			throw new Error('Empty RSS content received');
		}

		console.log('RSS content length:', xmlContent.length);

		// Parse RSS content
		const newsItems = parseRSSXML(xmlContent);
    
		console.log('Parsed news items:', newsItems.length);

		if (newsItems.length === 0) {
			console.warn('No news items parsed from RSS feed');
		}

		const response: NewsResponse = {
			success: true,
			data: newsItems,
			lastUpdated: new Date().toISOString(),
		};

		// Save a server-side cache file so we can return cached data if the RSS source fails later
		try {
			const cacheDir = path.join(process.cwd(), '.cache');
			await fs.mkdir(cacheDir, { recursive: true });
			const cacheFile = path.join(cacheDir, 'political-news.json');
			await fs.writeFile(cacheFile, JSON.stringify(response), 'utf8');
		} catch (cacheErr) {
			console.warn('Could not write news cache file:', cacheErr);
		}

		return NextResponse.json(response, { headers });

	} catch (error) {
		console.error('Error in political news API:', error);
		// On error, try to return cached data from the server-side cache if available.
		try {
			const cacheFile = path.join(process.cwd(), '.cache', 'political-news.json');
			const raw = await fs.readFile(cacheFile, 'utf8');
			const cached: NewsResponse = JSON.parse(raw);
			// Mark offline so clients can show the appropriate UI
			const offlineResponse: NewsResponse & { offline?: boolean } = {
				...cached,
				success: cached.success ?? false,
				offline: true,
			};

			return NextResponse.json(offlineResponse, { headers });
		} catch (readErr) {
			console.warn('No server-side cache available or failed to read it:', readErr);

			const errorResponse: NewsResponse & { offline?: boolean } = {
				success: false,
				data: [],
				error: error instanceof Error ? error.message : 'Failed to fetch political news',
				lastUpdated: new Date().toISOString(),
				offline: true,
			};

			return NextResponse.json(errorResponse, {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}
			});
		}
	}
}

export async function OPTIONS(): Promise<NextResponse> {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	});
}