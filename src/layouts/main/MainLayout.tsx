import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Sidebar />
      <main className="lg:pl-72">
        <div className="px-6 py-6 sm:px-6 md:px-6 lg:px-6 xl:px-6 2xl:px-52">
          {children}
        </div>
      </main>
    </>
  );
}
