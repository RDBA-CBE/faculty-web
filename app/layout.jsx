"use client";

import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/common-components/header";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import store from "@/store";
import { Suspense } from "react";
import PageTransition from "@/components/common-components/PageTransition";
import { usePathname } from "next/navigation";



// Poppins as the main sans font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pick the weights you need
  variable: "--font-poppins",
});

// Roboto as secondary font (for mono / UI text)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
    const pathname = usePathname(); // ✅ correct hook
  const isLoginPath = pathname?.startsWith("/login");
  const isSigninPath = pathname?.startsWith("/signin");
  const isForgetPassword = pathname?.startsWith("/forgot-password");


  return (
    <Provider store={store}>
      <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
        <body className="font-sans antialiased bg-[#fff]">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading</h3>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          }>
            <>
              <div className="flex flex-col w-full min-h-screen">
                {!isLoginPath && !isSigninPath && !isForgetPassword && <Header />}
                <main className="w-full">{children}</main>
              </div>
              <Toaster position="top-center" />
            </>
          </Suspense>
        </body>
      </html>
    </Provider>
  );
}
