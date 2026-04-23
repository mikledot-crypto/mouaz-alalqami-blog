"use client";

import { FormEvent, useState, useTransition } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "تعذر إنشاء الحساب.");
        return;
      }

      setMessage("تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.");
      setName("");
      setEmail("");
      setPassword("");
    });
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-bold">إنشاء حساب</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          أنشئ حسابًا جديدًا لاستعراض المدونة أو للمساهمة فيها إذا منحك الأدمن الصلاحية.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              الاسم
            </label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
              required
            />
          </div>

          {message ? (
            <p className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-zinc-900 px-5 py-3 text-center text-white transition hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-zinc-900"
          >
            {isPending ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
          لديك حساب بالفعل؟{" "}
          <Link href="/auth/login" className="font-medium text-zinc-900 underline dark:text-white">
            سجّل الدخول
          </Link>
        </div>
      </div>
    </main>
  );
}
