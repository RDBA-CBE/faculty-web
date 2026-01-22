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
  ArrowRight,
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
import { Failure, useSetState } from "@/utils/function.utils";
import Models from "@/imports/models.import";
import Modal from "./modal";
import { Input } from "../ui/input";
import CustomPhoneInput from "./phoneInput";
import * as Validation from "@/utils/validation.utils";
import * as Yup from "yup";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine if we're on the home page
  const isHomePage = pathname === "/";

  const [activeMenu, setActiveMenu] = useState(null);
  const [clickedMenu, setClickedMenu] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [state, setState] = useSetState({
    token: null,
    group: null,
    username: null,
    logoutLoading: false,
    isOpenLogin: false,
    isOpenEmailVerify: false,
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
      window.location.href = "/";
    } catch (error) {
      localStorage.clear();
      window.location.href = "/";
      setState({ logoutLoading: false });
    }
  };

  const handleRegister = async () => {
    try {
      setState({ btnLoading: true });
      const body = {
        username: state.first_name.trim() + " " + state.last_name.trim(),
        email: state.email.trim(),
        password: state.password,
        password_confirm: state.confirmPassword,
        role: "applicant",
      };
      const res = await Models.auth.singup(body);
      console.log("✌️res --->", res);
      setState({ isOpenReg: false, isOpenEmailVerify: true });

      setState({ errors: {}, isOpenLogin: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err?.message;
        });
        console.log("✌️validationErrors --->", validationErrors);

        setState({ errors: validationErrors, btnLoading: false });
      } else {
        Failure(error?.error);
        setState({ btnLoading: false });
      }
    }
  };

  const handleLogin = async () => {
    try {
      setState({ btnLoading: true });
      const body = {
        email: state.email.trim(),
        password: state.password,
      };
      await Validation.login.validate(body, { abortEarly: false });
      const res = await Models.auth.login(body);
      console.log("✌️res --->", res);
      localStorage.setItem("token", res.access);
      localStorage.setItem("refresh", res.refresh);
      localStorage.setItem("user", JSON.stringify(res.user));

      setState({ errors: {}, isOpenLogin: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err?.message;
        });
        console.log("✌️validationErrors --->", validationErrors);

        setState({ errors: validationErrors, btnLoading: false });
      } else {
        Failure(error?.error);
        setState({ btnLoading: false });
      }
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

  const handleFormChange = (field, value) => {
    setState({
      [field]: value,
      errors: {
        ...state.errors,
        [field]: "",
      },
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`shadow-sm sticky top-0 z-[50] ${
          isHomePage ? "bg-white" : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#F2B31D] rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📚</span>
                </div>
                <span
                  className={`font-semibold text-lg ${isHomePage ? "text-gray-900" : "text-white"}`}
                >
                  Faculty Plus
                </span>
              </Link>
            </div>

            {/* Navigation Menu (Desktop) */}
            <nav className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                {navigationMenu.map((menu) => {
                  const isActive = pathname === menu.url || (menu.url === "/" && pathname === "/");
                  return (
                    <Link
                      key={menu.title}
                      href={menu.url}
                      className={`font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-[#F2B31D]"
                          : isHomePage
                            ? "text-gray-700 hover:text-[#F2B31D]"
                            : "text-white hover:text-[#F2B31D]"
                      }`}
                    >
                      {menu.title}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Right Side - Auth & Mobile Menu */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Auth Buttons (Desktop) */}
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
                <div className="hidden lg:flex items-center space-x-3">
                  <Button
                    onClick={() => setState({ isOpenLogin: true })}
                    variant="ghost"
                    className={`hover:text-[#F2B31D] hover:bg-transparent ${
                      isHomePage ? "text-gray-700" : "text-white"
                    }`}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setState({ isOpenReg: true })}
                    className="bg-[#F2B31D] hover:bg-[#E5A01A] text-white"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`lg:hidden ${isHomePage ? "text-gray-700" : "text-white"}`}
                  >
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 mt-6">
                    {/* Mobile Navigation */}
                    {navigationMenu.map((menu) => {
                      const isActive = pathname === menu.url || (menu.url === "/" && pathname === "/");
                      return (
                        <Link
                          key={menu.title}
                          href={menu.url}
                          onClick={() => setOpen(false)}
                          className={`font-medium py-2 px-4 rounded-lg transition-colors ${
                            isActive
                              ? "text-[#F2B31D] bg-[#F2B31D]/10"
                              : "text-gray-700 hover:text-[#F2B31D] hover:bg-gray-100"
                          }`}
                        >
                          {menu.title}
                        </Link>
                      );
                    })}
                    
                    {/* Mobile Auth Buttons */}
                    {!state.token && (
                      <div className="flex flex-col space-y-3 pt-4 border-t">
                        <Button
                          onClick={() => {
                            setState({ isOpenLogin: true });
                            setOpen(false);
                          }}
                          variant="outline"
                          className="w-full"
                        >
                          Login
                        </Button>
                        <Button
                          onClick={() => {
                            setState({ isOpenReg: true });
                            setOpen(false);
                          }}
                          className="w-full bg-[#F2B31D] hover:bg-[#E5A01A] text-white"
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;