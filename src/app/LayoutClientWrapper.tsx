"use client";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { Toaster } from "sonner";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Navbar />
      </header>

      {children}

      <Footer />
      <Toaster position="top-center" richColors />
    </ClerkProvider>
  );
}
