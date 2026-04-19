import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DashboardGrid } from "@/components/site/dashboard-grid";

export default async function DashboardPage() {
  const session = await auth();
  
  const stats = {
    posts: await prisma.post.count(),
    users: await prisma.user.count(),
    messages: await prisma.contactMessage.count({ where: { status: "new" } }),
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-noto-kufi text-3xl font-bold">لوحة التحكم</h1>
        <p className="mt-2 text-zinc-500">أهلاً بك يا {session?.user?.name}، إليك ملخص سريع للمدونة.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">إجمالي المقالات</p>
          <p className="text-3xl font-bold">{stats.posts}</p>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">المستخدمين</p>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">رسائل جديدة</p>
          <p className="text-3xl font-bold">{stats.messages}</p>
        </div>
      </div>

      <DashboardGrid />
    </div>
  );
}
