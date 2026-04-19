import Link from "next/link";

export function DashboardGrid() {
  const items = [
    { label: "المقالات", href: "/dashboard/posts" },
    { label: "التصنيفات", href: "/dashboard/categories" },
    { label: "الوسوم", href: "/dashboard/tags" },
    { label: "التعليقات", href: "/dashboard/comments" },
    { label: "الصفحات", href: "/dashboard/pages" },
    { label: "الوسائط", href: "/dashboard/media" },
    { label: "النشرة", href: "/dashboard/newsletter" },
    { label: "الرسائل", href: "/dashboard/messages" },
    { label: "المستخدمون", href: "/dashboard/users" },
    { label: "الإعدادات", href: "/dashboard/settings" },
    { label: "القوائم", href: "/dashboard/menus" }
  ];

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href as any}
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
