"use client";

import { Provider } from "react-redux";
import store from "@/store";
import Header from "@/components/common-components/header";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import PageTransition from "@/components/common-components/PageTransition";
import { usePathname } from "next/navigation";
import { Loader } from "lucide-react";
import ChatbotWidget from "@/components/common-components/ChatbotWidget";
import ChatbotWidgetOld from "@/components/common-components/ChatbotWidgetOld";
import TourComponent from "@/components/common-components/TourComponent";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLoginPath = pathname.startsWith("/login");
  const isSigninPath = pathname.startsWith("/signin");
  const isForgetPassword = pathname.startsWith("/forgot-password");

  return (
    <Provider store={store}>
      <div className="flex flex-col w-full min-h-screen">
        {!isLoginPath && !isSigninPath && !isForgetPassword && <Header />}
        <main className="w-full overflow-x-hidden">
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </main>
      </div>
      <Toaster position="top-center" />
      <Suspense fallback={null}>
        <TourComponent />
      </Suspense>
      <ChatbotWidget />
    </Provider>
  );
}
