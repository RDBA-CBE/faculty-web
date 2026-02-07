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
      console.log("hello");
      console.log(state.first_name);

      setState({ btnLoading: true });

      const validateBody = {
        first_name: state.first_name,
        last_name: state.last_name,

        email: state.email.trim(),
        password: state.password,
        password_confirm: state.confirmPassword,
      };

      await Validation.register.validate(validateBody, { abortEarly: false });

      const body = {
        username: state.first_name + " " + state.last_name,
        role: "applicant",
        ...validateBody,
      };

      console.log("body", body);

      const res = await Models.auth.create(body);
      console.log("✌️res --->", res);
      setState({
        isOpenReg: false,
        // isOpenEmailVerify: true,
        errors: {},
        isOpenLogin: false,
      });
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
          isHomePage ? "bg-white" : "bg-white"
        }`}
      >
        <div className="section-wid">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#F2B31D] rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📚</span>
                </div>
                <span
                  className={`font-semibold text-lg ${
                    isHomePage ? "text-gray-900" : "text-gray-900"
                  }`}
                >
                  Faculty Plus
                </span>
              </Link>
            </div>

            {/* Navigation Menu (Desktop) */}
            <nav className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                {navigationMenu.map((menu) => {
                  const isActive =
                    pathname === menu.url ||
                    (menu.url === "/" && pathname === "/");
                  return (
                    <Link
                      key={menu.title}
                      href={menu.url}
                      className={`font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-[#F2B31D]"
                          : isHomePage
                            ? "text-gray-700 hover:text-[#F2B31D]"
                            : "text-gray-700 hover:text-[#F2B31D]"
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
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
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
                      isHomePage ? "text-gray-700" : "text-gray-700"
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
                    className={`lg:hidden ${
                      isHomePage ? "text-gray-700" : "text-gray-700"
                    }`}
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
                      const isActive =
                        pathname === menu.url ||
                        (menu.url === "/" && pathname === "/");
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

      <Modal
        isOpen={state.isOpenLogin}
        setIsOpen={() => {
          setState({ errors: {}, isOpenLogin: false });
        }}
        // closeIcon={false}
        hideHeader={true}
        title="Sign In"
        width="500px"
        renderComponent={() => (
          <div className="space-y-6 bg-[#FFFCF3] py-6 px-10 max-h-[85vh] overflow-y-auto scrollbar-hide rounded rounded-lg">
            <div className="flex items-center justify-center w-full mb-6">
              <img
                src="/assets/images/login.png"
                height={200}
                width={150}
                alt="Login Illustration"
                className="object-contain"
              />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
              <p className="text-gray-600">
                Don't have account{" "}
                <button
                  onClick={() => {
                    setState({ isOpenLogin: false, isOpenReg: true });
                  }}
                  className="text-amber-500 hover:text-amber-600 font-medium"
                >
                  Create Account
                </button>
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={state.email || ""}
                onChange={(e) => handleFormChange("email", e.target.value)}
                required
                bg="ffffff"
                error={state.errors?.email}
              />

              <Input
                type="password"
                placeholder="Password"
                value={state.password || ""}
                onChange={(e) => handleFormChange("password", e.target.value)}
                required
                bg="ffffff"
                error={state.errors?.password}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">Remember Me</span>
              </label>
              <button className="text-amber-500 hover:text-amber-600 text-sm">
                Forget password?
              </button>
            </div>

            <Button
              type="button"
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-lg flex items-center justify-center gap-2"
              onClick={handleLogin}
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center text-gray-500 my-4">or</div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 py-3"
              >
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Sign in with Facebook
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 py-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>

            <div className="text-center mt-6">
              <button className="text-gray-500 text-sm hover:text-gray-700">
                Terms and condition
              </button>
            </div>
          </div>
        )}
      />

      <Modal
        isOpen={state.isOpenReg}
        setIsOpen={() => {
          setState({ errors: {}, isOpenReg: false });
        }}
        hideHeader={true}
        title="Create Account"
        width="500px"
        renderComponent={() => (
          <div className="space-y-6 bg-[#FFFCF3] py-6 px-10 max-h-[98vh] overflow-y-auto scrollbar-hide rounded rounded-lg">
            <div className="flex items-center justify-center w-full mb-6">
              <img
                src="/assets/images/login.png"
                height={200}
                width={150}
                alt="Registration Illustration"
                className="object-contain"
              />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create account.
              </h2>
              <p className="text-gray-600">
                Already have account?{" "}
                <button
                  onClick={() => {
                    setState({ isOpenReg: false, isOpenLogin: true });
                  }}
                  className="text-amber-500 hover:text-amber-600 font-medium"
                >
                  Log In
                </button>
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="First Name"
                  value={state.first_name || ""}
                  onChange={(e) =>
                    handleFormChange("first_name", e.target.value)
                  }
                  required
                  bg="ffffff"
                  error={state.errors?.first_name}
                />
                <Input
                  placeholder="Last Name"
                  value={state.last_name || ""}
                  onChange={(e) =>
                    handleFormChange("last_name", e.target.value)
                  }
                  required
                  bg="ffffff"
                  error={state.errors?.last_name}
                />
              </div>

              <Input
                type="email"
                placeholder="Email address"
                value={state.email || ""}
                onChange={(e) => handleFormChange("email", e.target.value)}
                required
                bg="ffffff"
                error={state.errors?.email}
              />

              <Input
                type="password"
                placeholder="Password"
                value={state.password || ""}
                onChange={(e) => handleFormChange("password", e.target.value)}
                required
                bg="ffffff"
                error={state.errors?.password}
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                value={state.confirmPassword || ""}
                onChange={(e) =>
                  handleFormChange("confirmPassword", e.target.value)
                }
                required
                bg="ffffff"
                error={state.errors?.confirmPassword}
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600 text-sm">
                I've read and agree with your{" "}
                <button className="text-amber-500 hover:text-amber-600">
                  Terms of Services
                </button>
              </span>
            </div>

            <Button
              onClick={() => {
                handleRegister();
              }}
              type="button"
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-lg flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center text-gray-500 my-4">or</div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 py-3"
              >
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Sign up with Facebook
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 py-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>
            </div>

            <div className="text-center mt-6">
              <button className="text-gray-500 text-sm hover:text-gray-700">
                Terms and condition
              </button>
            </div>
          </div>
        )}
      />

      <Modal
        isOpen={state.isOpenEmailVerify}
        setIsOpen={() => {
          setState({ errors: {}, isOpenEmailVerify: false });
        }}
        hideHeader={true}
        title="Email Verification"
        width="500px"
        renderComponent={() => (
          <div className="space-y-6 bg-[#FFFCF3] py-6 px-10 max-h-[85vh] overflow-y-auto scrollbar-hide rounded rounded-lg">
            <div className="flex items-center justify-center w-full mb-6">
              <img
                src="/assets/images/login.png"
                height={200}
                width={150}
                alt="Email Verification Illustration"
                className="object-contain"
              />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Email Verification
              </h2>
              <p className="text-gray-600 mb-2">
                We've sent an verification to{" "}
                <span className="font-semibold text-gray-900">
                  emailaddress@gmail.com
                </span>{" "}
                to verify your
              </p>
              <p className="text-gray-600">
                email address and activate your account.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Verification Code"
                value={state.verificationCode || ""}
                onChange={(e) =>
                  handleFormChange("verificationCode", e.target.value)
                }
                required
                bg="ffffff"
                error={state.errors?.verificationCode}
              />
            </div>

            <Button
              onClick={() =>
                setState({
                  isOpenForget: true,
                  isOpenEmailVerify: false,
                  isOpenLogin: false,
                  isOpenReg: false,
                })
              }
              type="button"
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-lg flex items-center justify-center gap-2"
            >
              Verify My Account
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Didn't recieve any code!{" "}
                <button className="text-amber-500 hover:text-amber-600 font-medium">
                  Resends
                </button>
              </p>
            </div>

            <div className="text-center mt-6">
              <button className="text-gray-500 text-sm hover:text-gray-700">
                Terms and condition
              </button>
            </div>
          </div>
        )}
      />

      <Modal
        isOpen={state.isOpenForget}
        setIsOpen={() => {
          setState({ errors: {}, isOpenForget: false });
        }}
        hideHeader={true}
        title="Forget Password"
        width="500px"
        renderComponent={() => (
          <div className="space-y-6 bg-[#FFFCF3] py-6 px-10 max-h-[85vh] overflow-y-auto scrollbar-hide rounded rounded-lg">
            <div className="flex items-center justify-center w-full mb-6">
              <img
                src="/assets/images/login.png"
                height={200}
                width={150}
                alt="Forget Password Illustration"
                className="object-contain"
              />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Forget Password
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">
                  Go back to{" "}
                  <button
                    onClick={() =>
                      setState({ isOpenForget: false, isOpenLogin: true })
                    }
                    className="text-amber-500 hover:text-amber-600 font-medium"
                  >
                    Sign In
                  </button>
                </p>
                <p className="text-gray-600 text-sm">
                  Don't have account{" "}
                  <button
                    onClick={() =>
                      setState({ isOpenForget: false, isOpenReg: true })
                    }
                    className="text-amber-500 hover:text-amber-600 font-medium"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={state.email || ""}
                onChange={(e) => handleFormChange("email", e.target.value)}
                required
                bg="ffffff"
                error={state.errors?.email}
              />
            </div>

            <Button
              onClick={() =>
                setState({
                  isOpenForget: false,
                  isOpenEmailVerify: false,
                  isOpenLogin: false,
                  isOpenReg: false,
                  isOpenReset: true,
                })
              }
              type="button"
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-lg flex items-center justify-center gap-2"
            >
              Reset Password
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center text-gray-500 my-4">or</div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 py-3"
              >
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Sign in with Facebook
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 py-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>

            <div className="text-center mt-6">
              <button className="text-gray-500 text-sm hover:text-gray-700">
                Terms and condition
              </button>
            </div>
          </div>
        )}
      />

      <Modal
        isOpen={state.isOpenReset}
        setIsOpen={() => {
          setState({ errors: {}, isOpenReset: false });
        }}
        hideHeader={true}
        title="Reset Password"
        width="500px"
        renderComponent={() => (
          <div className="space-y-6 bg-[#FFFCF3] py-6 px-10 max-h-[85vh] overflow-y-auto scrollbar-hide rounded rounded-lg">
            <div className="flex items-center justify-center w-full mb-6">
              <img
                src="/assets/images/login.png"
                height={200}
                width={150}
                alt="Reset Password Illustration"
                className="object-contain"
              />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Reset Password
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Duis luctus interdum metus, ut consectetur ante consectetur sed.
              </p>
              <p className="text-gray-600 text-sm">
                Suspendisse euismod viverra massa sit amet mollis.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="password"
                placeholder="New Password"
                value={state.newPassword || ""}
                onChange={(e) =>
                  handleFormChange("newPassword", e.target.value)
                }
                required
                bg="ffffff"
                error={state.errors?.newPassword}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={state.confirmPassword || ""}
                onChange={(e) =>
                  handleFormChange("confirmPassword", e.target.value)
                }
                required
                bg="ffffff"
                error={state.errors?.confirmPassword}
              />
            </div>

            <Button
              onClick={() =>
                setState({
                  isOpenForget: false,
                  isOpenEmailVerify: false,
                  isOpenLogin: false,
                  isOpenReg: false,
                  isOpenReset: false,
                })
              }
              type="button"
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-lg flex items-center justify-center gap-2"
            >
              Reset Password
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center mt-6">
              <button className="text-gray-500 text-sm hover:text-gray-700">
                Terms and condition
              </button>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default Header;
