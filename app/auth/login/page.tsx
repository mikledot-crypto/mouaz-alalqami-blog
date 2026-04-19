"use client";

import { FormEvent, useState, useTransition } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export const metadata = {
  title: "تسجيل الدخول"
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard"
      });

      if (!result || result.error) {
        setError("تعذر تسجيل الدخول. تأكد من البريد وكلمة المرور.");
        return;
      }

      window.location.href = result.url ?? "/dashboard";
    });
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-bold">تسجيل الدخول</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          استخدم البريد الإلكتروني وكلمة المرور للدخول إلى لوحة الإدارة أو إلى حسابك.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="mtzallqmy@gmail.com"
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
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="••••••••"
              required
            />
          </div>

          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-zinc-900 px-5 py-3 text-center text-white transition hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-zinc-900"
          >
            {isPending ? "جارٍ تسجيل الدخول..." : "الدخول"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-300">
          ليس لديك حساب؟{" "}
          <Link href="/auth/register" className="font-medium text-zinc-900 underline dark:text-white">
            أنشئ حسابًا جديدًا
          </Link>
        </div>
      </div>
    </main>
  );
}
