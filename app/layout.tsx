import "@/styles/globals.css";
import { Cairo, Noto_Kufi_Arabic } from "next/font/google";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { siteConfig } from "@/lib/seo";

const cairo = Cairo({ 
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi",
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: \`%s | \${siteConfig.name}\`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={\`\${cairo.variable} \${notoKufi.variable} scroll-smooth\`}>
      <body className="min-h-screen bg-zinc-50/50 font-cairo text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
