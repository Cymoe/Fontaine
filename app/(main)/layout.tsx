'use client';

import HeaderWrapper from "@/components/layout/HeaderWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderWrapper />
      {children}
    </>
  );
}
