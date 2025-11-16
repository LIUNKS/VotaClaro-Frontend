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
			{
				protocol: 'https',
				hostname: 'fvrp2459-8080.brs.devtunnels.ms',
				pathname: '/uploads/**',
			},
		],
	},
	allowedDevOrigins: ['https://web.francopm.dev'],
};

export default nextConfig;
