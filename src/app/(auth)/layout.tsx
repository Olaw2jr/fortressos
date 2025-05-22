import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen min-h-full flex-1">
      {/* Left side with background image/gradient */}
      <div className="relative hidden w-1/2 flex-1 lg:block">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold mb-6">FortressOS</h1>
            <p className="text-xl">Secure authentication for your applications.</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-sm">
          <p>© {new Date().getFullYear()} FortressOS. All rights reserved.</p>
        </div>
      </div>

      {/* Right side with auth forms */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center lg:hidden">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">FortressOS</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}