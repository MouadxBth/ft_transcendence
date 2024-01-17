/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "github.com",
			},
			{
				protocol: "https",
				hostname: "robohash.org",
			},
			{
				protocol: "http",
				hostname: "localhost",
			},
		],
	},
};

module.exports = nextConfig;
