import RegisterForm from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إنشاء حساب"
};

export default function RegisterPage() {
  return <RegisterForm />;
}
