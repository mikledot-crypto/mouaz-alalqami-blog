import Link from "next/link";
import {
  MessageCircle,
  Facebook,
  Send,
  Twitter,
  Instagram
} from "lucide-react";
import { siteConfig } from "@/lib/seo";

const socialLinks = [
  {
    key: "whatsapp",
    href: siteConfig.links.whatsapp,
    label: "واتساب",
    icon: MessageCircle
  },
  {
    key: "facebook",
    href: siteConfig.links.facebook,
    label: "فيسبوك",
    icon: Facebook
  },
  {
    key: "telegram",
    href: siteConfig.links.telegram,
    label: "تيليجرام",
    icon: Send
  },
  {
    key: "twitter",
    href: siteConfig.links.twitter,
    label: "تويتر",
    icon: Twitter
  },
  {
    key: "instagram",
    href: siteConfig.links.instagram,
    label: "إنستغرام",
    icon: Instagram
  }
].filter((item) => Boolean(item.href));

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            مدونة عربية حديثة مهيأة للنشر على Vercel وقاعدة بيانات Neon، مع دعم تسجيل دخول داخلي ولوحة تحكم قابلة للتطوير.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">روابط مهمة</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <Link href="/privacy">الخصوصية</Link>
            <Link href="/terms">الشروط</Link>
            <Link href="/rss">RSS</Link>
            <Link href="/auth/login">تسجيل الدخول</Link>
            <Link href="/auth/register">إنشاء حساب</Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">تواصل معنا</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.length ? (
              socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    aria-label={item.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                يمكنك إضافة روابط الشبكات الاجتماعية من متغيرات البيئة في Vercel لاحقًا.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200 px-4 py-4 text-center text-sm text-zinc-500 dark:border-zinc-800">
        © جميع الحقوق محفوظة لدى معتز العلقمي 2026
      </div>
    </footer>
  );
}
