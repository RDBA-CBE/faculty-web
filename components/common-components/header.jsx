"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  GitCompareArrowsIcon,
  Heart,
  Loader,
  LogIn,
  LogOut,
  MenuIcon,
  Settings,
  User,
  User2,
  User2Icon,
  UserPlus,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSetState } from "@/utils/function.utils";
import Models from "@/imports/models.import";

const Header = () => {
  const username = useSelector((state) => state.auth.username);
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine if we're on the home page
  const isHomePage = pathname === '/';

  const [activeMenu, setActiveMenu] = useState(null);
  const [clickedMenu, setClickedMenu] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [state, setState] = useSetState({
    token: null,
    group: null,
    username: null,
    logoutLoading: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setState({ token });
  }, []);

  const handleLogout = async () => {
    try {
      setState({ logoutLoading: true });
      const refresh = localStorage.getItem("refresh");
      const res = await Models.auth.logout({ refresh });
      setState({ logoutLoading: true });
      setDialogOpen(false);
      localStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      localStorage.clear();
      window.location.href = "/login";
      setState({ logoutLoading: false });
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const navigationMenu = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Jobs",
      url: "/jobs",
    },
    {
      title: "About Us",
      url: "/about",
    },
    {
      title: "Contact Us",
      url: "/contact",
    },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`shadow-sm sticky top-0 z-[50] ${
          isHomePage ? 'bg-white' : 'bg-black'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#F2B31D] rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📚</span>
                </div>
                <span className={`font-semibold text-lg ${
                  isHomePage ? 'text-gray-900' : 'text-white'
                }`}>Faculty Plus</span>
              </Link>
            </div>

            {/* Navigation Menu (Desktop) */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationMenu.map((menu) => {
                const isActive = pathname === menu.url || (menu.url === '/' && pathname === '/');
                return (
                  <Link
                    key={menu.title}
                    href={menu.url}
                    className={`font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-[#F2B31D]' 
                        : isHomePage 
                          ? 'text-gray-700 hover:text-[#F2B31D]'
                          : 'text-white hover:text-[#F2B31D]'
                    }`}
                  >
                    {menu.title}
                  </Link>
                );
              })}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {state.token ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 focus:outline-none">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#F2B31D] text-white">
                          <User2 className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 focus:text-red-700"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Button
                    onClick={() => router.push("/login")}
                    variant="ghost"
                    className={`hover:text-[#F2B31D] hover:bg-transparent ${
                      isHomePage ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => router.push("/register")}
                    className="bg-[#F2B31D] hover:bg-[#E5A519] text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
                  >
                    Register
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <MenuIcon className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="text-left">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-[#F2B31D] rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-sm">📚</span>
                          </div>
                          <span className={`font-semibold ${
                            isHomePage ? 'text-gray-900' : 'text-white'
                          }`}>Faculty Plus</span>
                        </div>
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="mt-8 space-y-6">
                      {/* Mobile Navigation */}
                      <nav className="space-y-4">
                        {navigationMenu.map((menu) => {
                          const isActive = pathname === menu.url || (menu.url === '/' && pathname === '/');
                          return (
                            <Link
                              key={menu.title}
                              href={menu.url}
                              onClick={() => setOpen(false)}
                              className={`block font-medium py-2 transition-colors duration-200 ${
                                isActive 
                                  ? 'text-[#F2B31D] bg-[#F2B31D]/10 px-3 rounded-md' 
                                  : isHomePage
                                    ? 'text-gray-700 hover:text-[#F2B31D]'
                                    : 'text-white hover:text-[#F2B31D]'
                              }`}
                            >
                              {menu.title}
                            </Link>
                          );
                        })}
                      </nav>
                      
                      {/* Mobile Auth Buttons */}
                      {!state.token && (
                        <div className="space-y-3 pt-6 border-t">
                          <Button
                            onClick={() => {
                              router.push("/login");
                              setOpen(false);
                            }}
                            variant="outline"
                            className="w-full"
                          >
                            Login
                          </Button>
                          <Button
                            onClick={() => {
                              router.push("/register");
                              setOpen(false);
                            }}
                            className="w-full bg-[#F2B31D] hover:bg-[#E5A519] text-white"
                          >
                            Register
                          </Button>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Logout Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white p-6 rounded-lg md:w-96 w-full">
          <DialogTitle className="text-[20px] font-semibold">
            Confirm Logout
          </DialogTitle>
          <div className="mb-4">Are you sure you want to log out?</div>
          <div className="flex justify-end gap-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="px-4 py-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#F2B31D] hover:bg-[#E5A519] text-white rounded text-sm"
            >
              {state.logoutLoading ? <Loader /> : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;