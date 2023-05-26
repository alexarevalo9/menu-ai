import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="dark-gradient flex h-screen items-center justify-center">
      {children}
    </div>
  );
}
