export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "معتز العلقمي",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    "مدونة عربية شخصية تهتم بالتقنية والبرمجة وتجربة المستخدم.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.moatazalalqami.online",
  ogImage:
    process.env.NEXT_PUBLIC_OG_IMAGE ??
    "https://www.moatazalalqami.online/og.png",
  links: {
    whatsapp: process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP ?? "",
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "",
    telegram: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM ?? "",
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER ?? "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? ""
  },
  author: "معتز العلقمي"
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}) {
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description,
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      images: [{ url: image }],
      type: "website",
      siteName: siteConfig.name
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      images: [image]
    },
    icons: {
      icon: "/favicon.ico"
    },
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  };
}
