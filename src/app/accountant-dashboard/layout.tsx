import { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import "../globals.css";
import NotificationToast from "@/components/common/notifications/NotificationToast";
import AccountingSidebar from "./_components/AccountingSidebar";

export const metadata: Metadata = {
  title: "پنل حسابداری - کلینیک ابراز",
  description: "پنل حسابداری - کلینیک ابراز",
};

export default function AccountantDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AccountingSidebar />
      <div className="">
        <main className="">{children}</main>
      </div>
    </div>
  );
}
