import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gonances.vercel.app";
  return [
    {
      url: new URL("/", baseUrl).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/login", baseUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: new URL("/register", baseUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: new URL("/terms", baseUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: new URL("/privacy", baseUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: new URL("/docs", baseUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: new URL("/redoc", baseUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
