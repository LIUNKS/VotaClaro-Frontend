import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	typedRoutes: false,
	typescript: {
		ignoreBuildErrors: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'elcomercio.pe',
			},
		],
	},
	allowedDevOrigins: ['https://web.francopm.dev'],
};

export default nextConfig;
