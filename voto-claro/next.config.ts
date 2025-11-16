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
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'api.votoclaro.com', // ajustar según tu dominio de API en producción
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
