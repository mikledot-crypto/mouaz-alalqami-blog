import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session.user.role !== "admin") {
    return (
      <main>
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          هذه الصفحة متاحة للأدمن فقط.
        </p>
      </main>
    );
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  return (
    <main>
      <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        يمكن إضافة المستخدمين مؤقتًا عبر واجهة التسجيل، ثم تعديل الدور من قاعدة البيانات أو تطوير CRUD لاحقًا.
      </p>

      <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="min-w-full text-right text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-800/60">
            <tr>
              <th className="px-4 py-3">الاسم</th>
              <th className="px-4 py-3">البريد</th>
              <th className="px-4 py-3">الدور</th>
              <th className="px-4 py-3">تاريخ الإنشاء</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-3">{user.name ?? "-"}</td>
                <td className="px-4 py-3">{user.email ?? "-"}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  {new Intl.DateTimeFormat("ar-SA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                  }).format(user.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
