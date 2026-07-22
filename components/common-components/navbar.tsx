"use client";

// import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router =useRouter()
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md  flex items-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center">
          {/* <SidebarTrigger /> */}
          {/* <Separator className="h-6 w-px bg-black mx-2" /> */}
          {/* <h1 className="text-lg font-semibold pl-2">Zen Wellness Lounge</h1> */}
        </div>
      
      </div>
    </header>
  );
}
