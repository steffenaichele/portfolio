import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
	allowedDevOrigins: ["192.168.178.107"],
	webpack(config) {
		const excludeSvgFromRules = (
			rules: (RuleSetRule | false | "" | 0 | null | undefined)[],
		) => {
			for (const rule of rules) {
				if (!rule) {
					continue;
				}

				if (Array.isArray(rule.oneOf)) {
					excludeSvgFromRules(rule.oneOf);
				}

				if (rule.test instanceof RegExp && rule.test.test(".svg")) {
					if (Array.isArray(rule.exclude)) {
						rule.exclude.push(/\.svg$/i);
					} else if (rule.exclude) {
						rule.exclude = [rule.exclude, /\.svg$/i];
					} else {
						rule.exclude = /\.svg$/i;
					}
				}
			}
		};

		if (config.module?.rules) {
			excludeSvgFromRules(config.module.rules);

			config.module.rules.push(
				{
					test: /\.svg$/i,
					resourceQuery: /url/,
					type: "asset/resource",
				},
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					resourceQuery: { not: [/url/] },
					use: ["@svgr/webpack"],
				},
			);
		}
		return config;
	},
	reactCompiler: true,
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "https://app.paper.design",
					},
					{ key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
					{ key: "Vary", value: "Origin" },
				],
			},
		];
	},
};

export default withNextIntl(nextConfig);
