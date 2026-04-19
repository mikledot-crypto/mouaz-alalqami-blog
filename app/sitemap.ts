import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true },
  });

  const postUrls = posts.map((post) => ({
    url: \`\${siteConfig.url}/posts/\${post.slug}\`,
    lastModified: post.updatedAt,
  }));

  const routes = ["", "/about", "/contact", "/search"].map((route) => ({
    url: \`\${siteConfig.url}\${route}\`,
    lastModified: new Date(),
  }));

  return [...routes, ...postUrls];
}
