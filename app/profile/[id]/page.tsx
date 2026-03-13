"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Edit3,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Download,
  CheckCircle,
  Briefcase,
  FileText,
  GraduationCap,
  FolderOpen,
  Code,
  Award,
  ChevronDown,
  ChevronUp,
  User,
  File,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DateFormat,
  useSetState,
  getFileNameFromUrl,
} from "@/utils/function.utils";
import { Models } from "@/imports/models.import";
import { Failure } from "@/components/common-components/toast";
import Footer from "@/components/common-components/new_components/Footer";
import SkeletonLoader from "@/app/jobs/SkeletonLoader";

export default function NaukriProfilePage() {
  const [activeTab, setActiveTab] = useState("resume");
  const [isManualScroll, setIsManualScroll] = useState(false);
  const params = useParams();

  const [expandedDesc, setExpandedDesc] = useState({});
  const [expandedProjectDesc, setExpandedProjectDesc] = useState({});
  const [expandedPublicationDesc, setExpandedPublicationDesc] = useState({});
  const [expandedAchievementDesc, setExpandedAchievementDesc] = useState({});
  const [expandedAbout, setExpandedAbout] = useState(false);

  const sidebarRef = useRef(null);
  const sidebarWrapperRef = useRef(null);
  const footerRef = useRef(null);
  const wrapperRef = useRef(null);

  const [state, setState] = useSetState({
    // Accordion States
    expandedSections: {
      resume: true,
      headline: true,
      skills: true,
      employment: true,
      education: true,
      projects: true,
      publications: true,
      achievements: true,
    },
    loading: true,
  });

  useEffect(() => {
    if (params?.id) {
      setState({ userId: params.id });
      userDetail(params.id);
    }
  }, [params]);

  // Intersection Observer for active tab tracking
  const sections = [
     "resume-section",
     "headline-section",
     "skills-section",
     "employment-section",
     "education-section",
     "projects-section",
     "publications-section",
     "achievements-section",
   ];
 
   useEffect(() => {
     const observer = new IntersectionObserver(
       (entries) => {
         if (isManualScroll) return;
 
         entries.forEach((entry) => {
           if (entry.isIntersecting) {
             const id = entry.target.id.replace("-section", "");
             setActiveTab(id);
           }
         });
       },
       {
         rootMargin: "-30% 0px -60% 0px",
         threshold: 0.3,
       },
     );
 
     sections.forEach((id) => {
       const element = document.getElementById(id);
       if (element) observer.observe(element);
     });
 
     return () => observer.disconnect();
   }, [isManualScroll]);
 
   useEffect(() => {
     const handleScroll = () => {
       if (isManualScroll) return;
 
       const scrollPosition = window.scrollY + 120;
 
       links.forEach((link) => {
         const section = document.getElementById(link.section);
 
         if (section) {
           const offsetTop = section.offsetTop;
           const offsetHeight = section.offsetHeight;
 
           if (
             scrollPosition >= offsetTop &&
             scrollPosition < offsetTop + offsetHeight
           ) {
             setActiveTab(link.id);
           }
         }
       });
     };
 
     window.addEventListener("scroll", handleScroll);
 
     return () => window.removeEventListener("scroll", handleScroll);
   }, [isManualScroll]);

     useEffect(() => {
       const handleScroll = () => {
         const sidebar = sidebarRef.current;
         const wrapper = wrapperRef.current;
         const footer = footerRef.current;
   
         if (!sidebar || !wrapper || !footer) return;
   
         const offset = 100;
   
         const wrapperRect = wrapper.getBoundingClientRect();
         const footerRect = footer.getBoundingClientRect();
   
         const sidebarHeight = sidebar.offsetHeight;
   
         const startSticky = wrapperRect.top <= offset;
         const reachFooter = footerRect.top <= sidebarHeight + offset;
   
         if (startSticky && !reachFooter) {
           // sticky
           sidebar.style.position = "fixed";
           sidebar.style.top = offset + "px";
           sidebar.style.width = wrapper.offsetWidth + "px";
         } else if (reachFooter) {
           // stop before footer
           sidebar.style.position = "absolute";
           sidebar.style.top = wrapper.offsetHeight - sidebarHeight + "px";
         } else {
           // normal
           sidebar.style.position = "relative";
           sidebar.style.top = "0px";
           sidebar.style.width = "auto";
         }
       };
   
       window.addEventListener("scroll", handleScroll);
   
       return () => window.removeEventListener("scroll", handleScroll);
     }, []);

  const userDetail = async (userId) => {
    try {
      const res: any = await Models.profile.details(userId);

      setState({
        loading: false,
        userDetail: res,
      });
    } catch (error) {
      setState({ loading: false });
      // Failure("Failed to fetch jobs");
    }
  };

  console.log("userDetail", state.userDetail);

  // const downloadResume = () => {
  //   if (state.userDetail?.resume_url) {
  //     const link = document.createElement("a");
  //     link.href = state.userDetail.resume_url;
  //     const filename = getFileNameFromUrl(state.userDetail.resume_url);
  //     link.setAttribute("download", filename);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //     Failure("No resume available to download.");
  //   }
  // };

  const downloadResume = (e) => {
    e.preventDefault(); // prevent same tab navigation
    e.stopPropagation();

    if (state.userDetail?.resume_url) {
      window.open(state.userDetail.resume_url, "_blank", "noopener,noreferrer");
    } else {
      Failure("No resume available to download.");
    }
  };

   const scrollToSection = (sectionId: string) => {
    const tabId = sectionId.replace("-section", "");
    setActiveTab(tabId);
    setIsManualScroll(true);

    const element = document.getElementById(sectionId);

    if (element) {
      const headerOffset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      setIsManualScroll(false);
    }, 1200);
  };

  const links = [
    { id: "resume", label: "Resume/login", section: "resume-section" },
    { id: "headline", label: "Profile Summary", section: "headline-section" },
    { id: "skills", label: "Skills", section: "skills-section" },
    { id: "employment", label: "Experience", section: "employment-section" },
    { id: "education", label: "Education", section: "education-section" },
    { id: "projects", label: "Projects", section: "projects-section" },
    {
      id: "publications",
      label: "Publications",
      section: "publications-section",
    },
    {
      id: "achievements",
      label: "Achievements",
      section: "achievements-section",
    },
  ];

  const tabItems = [
    { id: "resume", label: "Resume", icon: FileText },
    { id: "headline", label: "Summary", icon: Edit3 },
    { id: "skills", label: "Skills", icon: Code },
    { id: "employment", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "publications", label: "Publications", icon: Book },
    { id: "achievements", label: "Awards", icon: Award },
  ];

  console.log("resume", state?.resume);

  const toggleSection = (section: string) => {
    setState({
      expandedSections: {
        ...state.expandedSections,
        [section]:
          !state.expandedSections[
            section as keyof typeof state.expandedSections
          ],
      },
    });
  };



  return (
    <>
      <div className="min-h-screen bg-clr1 py-4">
        <div className="max-w-7xl mx-auto p-4">
          {state.loading ? (
            <>
              <Card className="bg-clr2 border-0 mb-8 overflow-hidden">
                <CardContent className="relative p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                    <SkeletonLoader
                      type="rect"
                      width={128}
                      height={128}
                      className="rounded-3xl flex-shrink-0"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex flex-col gap-2 mb-4">
                        <SkeletonLoader type="text" width="40%" height={32} />
                        <SkeletonLoader type="text" width="60%" height={20} />
                        <SkeletonLoader type="text" width="30%" height={16} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        <SkeletonLoader
                          type="rect"
                          height={40}
                          count={5}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/4 quick-links-sidebar">
                  <Card className="!rounded-none bg-clr2 border-0">
                    <CardContent className="p-4">
                      <SkeletonLoader
                        type="text"
                        width="60%"
                        height={24}
                        className="mb-6"
                      />
                      <div className="space-y-4">
                        <SkeletonLoader
                          type="rect"
                          height={48}
                          count={8}
                          className="rounded-xl"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="quick-links-content flex-1 space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="border-0">
                      <CardContent className="p-6">
                        <div className="flex justify-between mb-6">
                          <div className="flex gap-4 w-full">
                            <SkeletonLoader
                              type="rect"
                              width={40}
                              height={40}
                              className="rounded-xl"
                            />
                            <div className="flex-1">
                              <SkeletonLoader
                                type="text"
                                width={150}
                                height={24}
                                className="mb-2"
                              />
                              <SkeletonLoader
                                type="text"
                                width={100}
                                height={16}
                              />
                            </div>
                          </div>
                        </div>
                        <SkeletonLoader
                          type="rect"
                          height={100}
                          className="rounded-3xl"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Profile Header - Will hide on scroll */}
              <Card className="!rounded-none bg-clr2 border-0 mb-8 overflow-hidden">
                <div className="absolute"></div>
                <CardContent className="relative p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                    {/* Profile Image - Enhanced */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl border-4 border-white overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                        <img
                          src={
                            state.userDetail?.profile_logo_url ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                          }
                          alt="Profile"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold whitespace-nowrap">
                  {state.profileCompletion}%
                </div> */}
                    </div>

                    {/* Profile Info - Enhanced */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="text-center sm:text-left">
                          <div className="flex items-center gap-2 justify-center sm:justify-start">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                              {state.userDetail?.username}
                            </h1>
                          </div>
                          {state?.userDetail?.short_desc && (
                            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium mt-1">
                              {state?.userDetail?.short_desc}
                            </p>
                          )}
                          {(state?.userDetail?.current_company ||
                            state?.userDetail?.current_location) && (
                            <div className="text-gray-600 flex items-center gap-2 justify-center sm:justify-start mt-2">
                              <div className="w-2 h-2 bg-[#f2b31d] rounded-full"></div>

                              <span className="text-sm">
                                {state?.userDetail?.current_company} -{" "}
                                {state?.userDetail?.current_location}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <div className="bg-white/100 rounded-lg px-3 py-2 shadow-sm border">
                            <p className="text-xs text-gray-500 whitespace-nowrap">
                              Last Updated:{" "}
                              <span className="font-semibold text-gray-700">
                                {DateFormat(
                                  state.userDetail?.updated_at,
                                  "date",
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Profile Details Grid - Enhanced */}
                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mt-4"
                        style={{ gap: "5px" }}
                      >
                        {[
                          {
                            icon: MapPin,
                            label:
                              state?.userDetail?.current_location ||
                              "Not specified",
                            color: "text-[#f2b31d]",
                          },
                          {
                            icon: Phone,
                            label: state?.userDetail?.phone || "Not specified",
                            color: "text-[#f2b31d]",
                            verified: true,
                          },
                          {
                            icon: Calendar,
                            label:
                              state?.userDetail?.experience || "Not specified",
                            color: "text-[#f2b31d]",
                          },
                          {
                            icon: Mail,
                            label: state?.userDetail?.email || "Not specified",
                            color: "text-[#f2b31d]",
                            verified: true,
                          },
                          {
                            icon: User,
                            label: state?.userDetail?.gender || "Not specified",
                            color: "text-[#f2b31d]",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 sm:p-3 bg-white/100 rounded-xl border border-gray-100 hover:bg-white/70 transition-all duration-200"
                          >
                            <item.icon
                              className={`w-4 h-4 ${item.color} flex-shrink-0`}
                            />
                            <span className="text-xs sm:text-sm text-gray-700 font-medium truncate flex-1">
                              {item.label}
                            </span>
                            {item.verified && (
                              <CheckCircle className="w-3 h-3 text-[#f2b31d] flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Main Content Container */}

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Sidebar - Quick Links */}
                <div className="lg:w-1/4 relative hidden lg:block " ref={wrapperRef}>
                  <div ref={sidebarRef}>
                    <Card className="!rounded-none bg-clr2  border-0 overflow-hidden">
                      <div className=""></div>
                      <CardContent className="relative p-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#1E3786] "></div>
                          Quick Links
                        </h3>

                        <div className="space-y-4">
                          {links.map((item, index) => (
                            <div
                               key={item.id}
                                onClick={() => scrollToSection(item.section)}
                                className={`flex items-center justify-between px-2 py-3 rounded-xl cursor-pointer transition-all
        ${
          activeTab === item.id
            ? "bg-[#1E3786] text-white"
            : "bg-gradient-to-r from-[#3b82f6]/5 to-blue-500/5 hover:bg-white/80"
        }`}
                            >
                             <span
                                  className={`font-medium ${
                                    activeTab === item.id
                                      ? "text-white"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {item.label}
                                </span>
                              
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Right Content Area - Scrollable */}
                <div className="quick-links-content flex-1">
                  <div className="space-y-4">
                    {/* Naukri Pro Banner */}

                    {/* Resume Section */}
                    <Card
                      id="resume-section"
                      className="!rounded-none bg-gradient-to-br from-white via-[#3b82f6]/10 to-[#3b82f6]/5 border-0 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/20  blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/20 to-[#3b82f6]/20  blur-2xl"></div>

                      <CardContent className="relative p-4 md:p-6">
                        <div
                          className="flex items-center justify-between mb-3 cursor-pointer"
                          onClick={() => toggleSection("resume")}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1E3786]  rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                              <FileText className="w-4 h-4 text-white transform -rotate-3" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-[#1E3786] bg-clip-text text-transparent">
                                Resume Manager
                              </h3>
                              <p className="text-sm text-gray-500">
                                Manage your professional documents
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {state.expandedSections.resume ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {state.expandedSections.resume && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Current Resume Card */}
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/5 to-blue-500/5 rounded-3xl blur-sm group-hover:from-[#3b82f6]/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
                                <div className="relative bg-white/70 rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02]">
                                  <div className="flex items-start gap-6">
                                    {/* Resume Icon */}
                                    <div className="flex-shrink-0">
                                      <div className="w-14 h-14 bg-[#1E3786]  shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 relative">
                                        <div className="text-white">
                                          <div className="text-xs font-bold mb-1 text-white">
                                            PDF
                                          </div>
                                          <div className="w-8 h-0.5 bg-white/100 mb-1"></div>
                                          <div className="w-6 h-0.5 bg-white/40 mb-1"></div>
                                          <div className="w-7 h-0.5 bg-white/100"></div>
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#1E3786] rounded-full flex items-center justify-center shadow-lg">
                                          <span className="text-white text-sm font-bold">
                                            ✓
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Resume Details */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between md:mb-3">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-1">
                                            <span className="flex items-center gap-1">
                                              <div className="w-2 h-2 bg-[#1E3786] rounded-full"></div>
                                              {state?.userDetail?.resume_url
                                                ? "Uploaded"
                                                : "No Resume Uploaded"}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Desktop Action Buttons - Top Right */}
                                        <div className="hidden md:flex gap-2">
                                          {state?.userDetail?.resume_url ? (
                                            <>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                className="hover:bg-[#1E3786]/10 border-[#3b82f6]/30 group/btn"
                                                onClick={downloadResume}
                                                title="Download Resume"
                                              >
                                                <Download className="w-4 h-4 text-[#1E3786]   group-hover/btn:scale-110 transition-transform" />
                                              </Button>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </div>

                                      {state?.userDetail?.resume_url && (
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                          <div className="bg-gradient-to-r from-[#3b82f6]/20 to-blue-100 px-3 py-1 rounded-full">
                                            <span className="text-[#1E3786] font-semibold text-sm">
                                              Latest Version
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>

                    {/* Resume Headline Section */}
                    <Card
                      id="headline-section"
                      className="!rounded-none bg-gradient-to-br from-white via-[#3b82f6]/10 to-[#3b82f6]/5 border-0 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-2xl"></div>

                      <CardContent className="relative p-4 md:p-6">
                        <div
                          className="flex items-center justify-between mb-6 cursor-pointer"
                          onClick={() => toggleSection("headline")}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                              <Edit3 className="w-4 h-4 text-white transform -rotate-3" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-[#1E3786] bg-clip-text text-transparent">
                                Profile Summary
                              </h3>
                              <p className="text-sm text-gray-500">
                                Your professional summary
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {state.expandedSections.headline ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {state.expandedSections.headline && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Headline Display */}
                              <div className="relative">
                                <div className="flex-1 px-3">
                                  <div className="text-md text-gray-500 leading-relaxed ">
                                    <p>
                                      {expandedAbout
                                        ? state?.userDetail?.about
                                        : state?.userDetail?.about?.slice(
                                            0,
                                            280,
                                          )}
                                      {!expandedAbout &&
                                        state?.userDetail?.about?.length >
                                          280 &&
                                        "..."}
                                      {state?.userDetail?.about?.length >
                                        280 && (
                                        <button
                                          onClick={() =>
                                            setExpandedAbout((prev) => !prev)
                                          }
                                          className="text-blue-600 text-sm font-medium hover:underline cursor-pointer ml-1"
                                        >
                                          {expandedAbout
                                            ? "Read Less"
                                            : "Read More"}
                                        </button>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>

                    {/* Skills Section */}
                    <Card
                      id="skills-section"
                      className="!rounded-none bg-gradient-to-br from-white via-[#3b82f6]/10 to-[#3b82f6]/5 border-0 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-2xl"></div>

                      <CardContent className="relative p-4 md:p-6">
                        <div
                          className="flex items-center justify-between mb-8 cursor-pointer"
                          onClick={() => toggleSection("skills")}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                              <Code className="w-4 h-4 text-white transform -rotate-3" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-[#1E3786] bg-clip-text text-transparent">
                                Skills
                              </h3>
                              <p className="text-sm text-gray-500">
                                Your technical expertise
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {state.expandedSections.skills ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {state.expandedSections.skills && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Skills List - Chip Format */}
                              <div className="flex flex-wrap gap-3">
                                {state?.userDetail?.skills?.map(
                                  (skill, index) => (
                                    <motion.div
                                      key={skill.id}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: index * 0.05 }}
                                      className="group relative"
                                    >
                                      <div className="bg-gradient-to-r from-[#3b82f6]/10 to-blue-100 hover:from-[#3b82f6]/20 hover:to-blue-200 border border-[#3b82f6]/30 rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300 hover:shadow-lg group-hover:scale-105">
                                        <span className="text-[#1E3786] font-medium text-sm">
                                          {skill.name}
                                        </span>
                                        {/* <span className="text-purple-600 text-xs bg-white/100 px-2 py-0.5 rounded-full">
                                  {skill.experience}
                                </span> */}
                                      </div>
                                    </motion.div>
                                  ),
                                )}
                              </div>

                              {/* Empty State */}
                              {(state.userDetail?.skills?.length === 0 ||
                                !state.userDetail?.skills?.length) && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-center py-8"
                                >
                                  <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6]/20 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Code className="w-8 h-8 text-[#1E3786]/60" />
                                  </div>
                                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    No Skills Added
                                  </h4>
                                  <p className="text-gray-500 mb-4">
                                    Add your technical skills as chips
                                  </p>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>

                    {/* Employment Section */}
                    <Card
                      id="employment-section"
                      className="!rounded-none bg-gradient-to-br from-white via-[#3b82f6]/10 to-[#3b82f6]/5 border-0 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-2xl"></div>

                      <CardContent className="relative p-4 md:p-6">
                        <div
                          className="flex items-center justify-between mb-3 cursor-pointer"
                          onClick={() => toggleSection("employment")}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                              <Briefcase className="w-4 h-4 text-white transform -rotate-3" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-[#1E3786] bg-clip-text text-transparent">
                                Experience
                              </h3>
                              <p className="text-sm text-gray-500">
                                Your professional journey
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {state.expandedSections.employment ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {state.expandedSections.employment && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Employment List */}
                              <div className="space-y-4">
                                {state.userDetail?.experiences?.map(
                                  (emp, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="relative group"
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/5 to-blue-500/5 rounded-3xl blur-sm group-hover:from-[#3b82f6]/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
                                      <div className="relative bg-white/70  rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                                        <div className="flex items-start gap-3">
                                          {/* Company Logo Placeholder */}
                                          <div className="flex-shrink-0 pt-1">
                                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                              <span className="text-white font-bold text-md">
                                                {emp.company
                                                  .charAt(0)
                                                  .toUpperCase()}
                                              </span>
                                            </div>
                                            {/* {emp.current && (
                                      <div className="mt-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold text-center">
                                        Current
                                      </div>
                                    )} */}
                                          </div>

                                          {/* Job Details */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between md:mb-1">
                                              <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">
                                                    {emp.designation}
                                                  </h4>
                                                </div>
                                                <p className="text-md font-semibold text-[#1E3786] mb-1">
                                                  {emp.company}
                                                </p>
                                                <div className="text-sm text-gray-600 mb-2">
                                                  {/* <span className="font-medium">
                                            {emp.jobType || "Full-time"}
                                          </span>{" "}
                                          | */}
                                                  <span className="ml-1">
                                                    {DateFormat(
                                                      emp.start_date,
                                                      "date",
                                                    )}{" "}
                                                    to{" "}
                                                    {DateFormat(
                                                      emp.end_date,
                                                      "date",
                                                    )}
                                                  </span>
                                                  {/* <span className="ml-1">
                                            (
                                            {emp.duration || "2 years 3 months"}
                                            )
                                          </span> */}
                                                </div>
                                              </div>
                                            </div>

                                            {/* Job Description */}
                                            <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-2">
                                              <p className="text-gray-700 leading-relaxed text-sm ">
                                                {expandedDesc[emp.id]
                                                  ? emp.job_description
                                                  : emp.job_description?.slice(
                                                      0,
                                                      280,
                                                    )}
                                                {!expandedDesc[emp.id] &&
                                                  emp.job_description?.length >
                                                    280 &&
                                                  "..."}
                                                {emp.job_description &&
                                                  emp.job_description.length >
                                                    280 && (
                                                    <button
                                                      onClick={() =>
                                                        setExpandedDesc(
                                                          (prev) => ({
                                                            ...prev,
                                                            [emp.id]:
                                                              !prev[emp.id],
                                                          }),
                                                        )
                                                      }
                                                      className="text-blue-600 text-sm font-medium hover:underline ml-1"
                                                    >
                                                      {expandedDesc[emp.id]
                                                        ? "Read Less"
                                                        : "Read More"}
                                                    </button>
                                                  )}
                                              </p>
                                            </div>

                                            {/* Key Skills */}
                                            {/* {emp.keySkills &&
                                      emp.keySkills.length > 0 && (
                                        <div className="mb-4">
                                          <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                            Top 5 key skills:
                                          </h5>
                                          <div className="flex flex-wrap gap-2">
                                            {emp.keySkills.map(
                                              (skill, skillIndex) => (
                                                <span
                                                  key={skillIndex}
                                                  className="text-purple-600 text-sm hover:underline cursor-pointer"
                                                >
                                                  {skill}
                                                  {skillIndex <
                                                  emp.keySkills.length - 1
                                                    ? ","
                                                    : ""}
                                                </span>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      )} */}

                                            {/* Salary Badge */}
                                            <div className="flex items-center justify-between">
                                              {/* Mobile Action Buttons - Bottom Right */}
                                            </div>
                                          </div>
                                        </div>

                                        {/* Timeline Connector */}
                                        {index <
                                          state?.userDetail?.experiences
                                            .length -
                                            1 && (
                                          <div className="absolute -bottom-3 left-8 w-0.5 h-6 bg-gradient-to-b from-[#3b82f6]/50 to-transparent"></div>
                                        )}
                                      </div>
                                    </motion.div>
                                  ),
                                )}
                              </div>

                              {/* Empty State */}
                              {(state.userDetail?.experiences?.length === 0 ||
                                !state.userDetail?.experiences?.length) && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-center py-12"
                                >
                                  <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6]/20 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Briefcase className="w-8 h-8 text-[#1E3786]/60" />
                                  </div>
                                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    No Employment History
                                  </h4>
                                  <p className="text-gray-500 mb-6">
                                    Add your work experience to showcase your
                                    professional journey
                                  </p>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>

                    {/* Education Section */}
                    <Card
                      id="education-section"
                      className="!rounded-none bg-gradient-to-br from-white via-[#3b82f6]/10 to-[#3b82f6]/5 border-0 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/20  blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/20 to-[#3b82f6]/20  blur-2xl"></div>

                      <CardContent className="relative p-4 md:p-6">
                        <div
                          className="flex items-center justify-between mb-3 cursor-pointer"
                          onClick={() => toggleSection("education")}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                              <GraduationCap className="w-4 h-4 text-white transform -rotate-3" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-[#1E3786] bg-clip-text text-transparent">
                                Education
                              </h3>
                              <p className="text-sm text-gray-500">
                                Your academic background
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {state.expandedSections.education ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {state.expandedSections.education && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Education List */}
                              <div className="space-y-4">
                                {state?.userDetail?.educations?.map(
                                  (edu, index) => (
                                    <motion.div
                                      key={edu.id}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="relative group"
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#f2b31d]/5 to-orange-500/5 rounded-3xl blur-sm group-hover:from-[#f2b31d]/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
                                      <div className="relative bg-white/70  rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                                        <div className="flex items-start gap-3">
                                          {/* Institution Logo Placeholder */}
                                          <div className="flex-shrink-0 pt-1">
                                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                              <span className="text-white font-bold text-md">
                                                {edu.institution
                                                  .charAt(0)
                                                  .toUpperCase()}
                                              </span>
                                            </div>
                                          </div>

                                          {/* Education Details */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between md:mb-1">
                                              <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors">
                                                    {edu.degree}
                                                  </h4>
                                                </div>
                                                <p className="text-md font-semibold text-[#1E3786]">
                                                  {edu.institution}
                                                </p>
                                                <div className="text-sm text-gray-600">
                                                  <span className="font-medium">
                                                    {edu.field}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="text-sm text-gray-600 mb-2">
                                              <span className="font-medium">
                                                {edu.start_year} -{" "}
                                                {edu.end_year}
                                              </span>{" "}
                                              |
                                              <span className="ml-1">
                                                {edu.cgpa}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Timeline Connector */}
                                        {index <
                                          state?.userDetail?.educations
                                            ?.length -
                                            1 && (
                                          <div className="absolute -bottom-3 left-8 w-0.5 h-6 bg-gradient-to-b from-[#3b82f6]/50 to-transparent"></div>
                                        )}
                                      </div>
                                    </motion.div>
                                  ),
                                )}
                              </div>

                              {/* Empty State */}
                              {(state?.userDetail?.educations?.length === 0 ||
                                !state?.userDetail?.educations) && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-center py-12"
                                >
                                  <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6]/20 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <GraduationCap className="w-8 h-8 text-[#1E3786]/60" />
                                  </div>
                                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    No Education History
                                  </h4>
                                  <p className="text-gray-500 mb-6">
                                    Add your educational background to showcase
                                    your qualifications
                                  </p>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>

                    {/* Projects Section */}
                    <Card
                      id="projects-section"
                      className="!rounded-none bg-gradient-to-br from-white via-[#3b82f6]/10 to-[#3b82f6]/5 border-0 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-2xl"></div>

                      <CardContent className="relative p-4 md:p-6">
                        <div
                          className="flex items-center justify-between mb-3 cursor-pointer"
                          onClick={() => toggleSection("projects")}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                              <FolderOpen className="w-4 h-4 text-white transform -rotate-3" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-[#1E3786] bg-clip-text text-transparent">
                                Projects
                              </h3>
                              <p className="text-sm text-gray-500">
                                Your portfolio showcase
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {state.expandedSections.projects ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {state.expandedSections.projects && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Projects List */}
                              <div className="space-y-4">
                                {state.userDetail?.projects?.map(
                                  (project, index) => (
                                    <motion.div
                                      key={project.id}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="relative group"
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#f2b31d]/5 to-orange-500/5 rounded-3xl blur-sm group-hover:from-[#f2b31d]/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
                                      <div className="relative bg-white/70 rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                                        <div className="flex items-start gap-3">
                                          {/* Project Icon */}
                                          <div className="flex-shrink-0 pt-1">
                                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                              <span className="text-white font-bold text-md">
                                                {project.project_title
                                                  .charAt(0)
                                                  .toUpperCase()}
                                              </span>
                                            </div>
                                          </div>

                                          {/* Project Details */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between md:mb-1">
                                              <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">
                                                    {project.project_title}
                                                  </h4>
                                                </div>
                                                <div className="text-sm text-gray-600 mb-2">
                                                  <span className="font-medium">
                                                    Duration: {project.duration}
                                                  </span>
                                                  {project.Project_link && (
                                                    <span className="ml-2">
                                                      |{" "}
                                                      <a
                                                        href={
                                                          project.project_link
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#1E3786] hover:underline"
                                                      >
                                                        View Project
                                                      </a>
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                            </div>

                                            {/* Project Description */}
                                            <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
                                              <p className="text-gray-700 leading-relaxed text-sm ">
                                                {expandedProjectDesc[project.id]
                                                  ? project.project_description
                                                  : project.project_description?.slice(
                                                      0,
                                                      280,
                                                    )}
                                                {!expandedProjectDesc[
                                                  project.id
                                                ] &&
                                                  project.project_description
                                                    ?.length > 280 &&
                                                  "..."}
                                                {project.project_description &&
                                                  project.project_description
                                                    .length > 280 && (
                                                    <button
                                                      onClick={() =>
                                                        setExpandedProjectDesc(
                                                          (prev) => ({
                                                            ...prev,
                                                            [project.id]:
                                                              !prev[project.id],
                                                          }),
                                                        )
                                                      }
                                                      className="text-blue-600 text-sm font-medium hover:underline ml-1"
                                                    >
                                                      {expandedProjectDesc[
                                                        project.id
                                                      ]
                                                        ? "Read Less"
                                                        : "Read More"}
                                                    </button>
                                                  )}
                                              </p>
                                              {project.funding_details && (
                                                <div className="mt-4">
                                                  <h5 className="text-sm font-semibold text-gray-700 mb-1">
                                                    Funding Details
                                                  </h5>
                                                  <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                                                    {project.funding_details}
                                                  </p>
                                                </div>
                                              )}
                                            </div>

                                            {/* Technologies */}
                                            {project.technologies &&
                                              project.technologies.length >
                                                0 && (
                                                <div className="mb-4">
                                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                                    Technologies Used:
                                                  </h5>
                                                  <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map(
                                                      (tech, techIndex) => (
                                                        <span
                                                          key={techIndex}
                                                          className="bg-gradient-to-r from-[#3b82f6]/20 to-blue-100 text-[#1E3786] px-3 py-1 rounded-full text-sm font-medium"
                                                        >
                                                          {tech}
                                                        </span>
                                                      ),
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                          </div>
                                        </div>

                                        {/* Timeline Connector */}
                                        {index <
                                          state.userDetail?.projects?.length -
                                            1 && (
                                          <div className="absolute -bottom-3 left-8 w-0.5 h-6 bg-gradient-to-b from-[#3b82f6]/50 to-transparent"></div>
                                        )}
                                      </div>
                                    </motion.div>
                                  ),
                                )}
                              </div>

                              {/* Empty State */}
                              {(state.userDetail?.projects?.length === 0 ||
                                !state.userDetail?.projects) && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-center py-12"
                                >
                                  <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6]/20 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FolderOpen className="w-8 h-8 text-[#1E3786]/60" />
                                  </div>
                                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    No Projects Added
                                  </h4>
                                  <p className="text-gray-500 mb-6">
                                    Showcase your work by adding your projects
                                    and achievements
                                  </p>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>

                    {/* Publications Section */}
                    <Card
                      id="publications-section"
                      className="!rounded-none bg-gradient-to-br from-white via-[#3b82f6]/10 to-[#3b82f6]/5 border-0 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-2xl"></div>

                      <CardContent className="relative p-4 md:p-6">
                        <div
                          className="flex items-center justify-between mb-3 cursor-pointer"
                          onClick={() => toggleSection("publications")}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                              <Book className="w-4 h-4 text-white transform -rotate-3" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-[#1E3786] bg-clip-text text-transparent">
                                Publications
                              </h3>
                              <p className="text-sm text-gray-500">
                                Your research and publications
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {state.expandedSections.publications ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {state.expandedSections.publications && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Publications List */}
                              <div className="space-y-4">
                                {state.userDetail?.publications?.map(
                                  (pub, index) => (
                                    <motion.div
                                      key={pub.id}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="relative group"
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#f2b31d]/5 to-orange-500/5 rounded-3xl blur-sm group-hover:from-[#f2b31d]/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
                                      <div className="relative bg-white/70 rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                                        <div className="flex items-start gap-3">
                                          {/* Publication Icon */}
                                          <div className="flex-shrink-0 pt-1">
                                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                              <span className="text-white font-bold text-md">
                                                {pub.publication_title
                                                  .charAt(0)
                                                  .toUpperCase()}
                                              </span>
                                            </div>
                                          </div>

                                          {/* Publication Details */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between md:mb-1">
                                              <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">
                                                    {pub.publication_title}
                                                  </h4>
                                                </div>
                                                <div className="text-sm text-gray-600 mb-2">
                                                  <span className="font-medium">
                                                    {pub.publication_journal}
                                                  </span>
                                                  <span className="ml-2">
                                                    | Year:{" "}
                                                    {pub.publication_year}
                                                  </span>
                                                </div>
                                                <div className="text-sm text-gray-600 mb-2">
                                                  Vol: {pub.publication_volume}
                                                </div>
                                                <div className="text-sm text-gray-600 mb-2">
                                                  Issue: {pub.publication_issue}
                                                </div>
                                              </div>
                                            </div>

                                            {/* Publication Description */}
                                            <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
                                              <p className="text-gray-700 leading-relaxed text-sm ">
                                                {expandedPublicationDesc[pub.id]
                                                  ? pub.publication_description
                                                  : pub.publication_description?.slice(
                                                      0,
                                                      280,
                                                    )}
                                                {!expandedPublicationDesc[
                                                  pub.id
                                                ] &&
                                                  pub.publication_description
                                                    ?.length > 280 &&
                                                  "..."}
                                                {pub.publication_description &&
                                                  pub.publication_description
                                                    .length > 280 && (
                                                    <button
                                                      onClick={() =>
                                                        setExpandedPublicationDesc(
                                                          (prev) => ({
                                                            ...prev,
                                                            [pub.id]:
                                                              !prev[pub.id],
                                                          }),
                                                        )
                                                      }
                                                      className="text-blue-600 text-sm font-medium hover:underline ml-1"
                                                    >
                                                      {expandedPublicationDesc[
                                                        pub.id
                                                      ]
                                                        ? "Read Less"
                                                        : "Read More"}
                                                    </button>
                                                  )}
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Timeline Connector */}
                                        {index <
                                          state.userDetail?.publications
                                            ?.length -
                                            1 && (
                                          <div className="absolute -bottom-3 left-8 w-0.5 h-6 bg-gradient-to-b from-[#3b82f6]/50 to-transparent"></div>
                                        )}
                                      </div>
                                    </motion.div>
                                  ),
                                )}
                              </div>

                              {/* Empty State */}
                              {(state.userDetail?.publications?.length === 0 ||
                                !state.userDetail?.publications) && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-center py-12"
                                >
                                  <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6]/20 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Book className="w-8 h-8 text-[#1E3786]/60" />
                                  </div>
                                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    No Publications Added
                                  </h4>
                                  <p className="text-gray-500 mb-6">
                                    Showcase your research work by adding your
                                    publications
                                  </p>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>

                    {/* Achievements Section */}
                    <Card
                      id="achievements-section"
                      className="!rounded-none bg-gradient-to-br from-white via-[#3b82f6]/10 to-[#3b82f6]/5 border-0 overflow-hidden relative"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/20 to-[#3b82f6]/20 rounded-full blur-2xl"></div>

                      <CardContent className="relative p-4 md:p-6">
                        <div
                          className="flex items-center justify-between mb-3 cursor-pointer"
                          onClick={() => toggleSection("achievements")}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                              <Award className="w-4 h-4 text-white transform -rotate-3" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold bg-[#1E3786] bg-clip-text text-transparent">
                                Achievements & Awards
                              </h3>
                              <p className="text-sm text-gray-500">
                                Your recognitions and honors
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {state.expandedSections.achievements ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {state.expandedSections.achievements && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Achievements List */}
                              <div className="space-y-4">
                                {state.userDetail?.achievements?.map(
                                  (achievement, index) => (
                                    <motion.div
                                      key={achievement.id}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="relative group"
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#f2b31d]/5 to-orange-500/5 rounded-3xl blur-sm group-hover:from-[#f2b31d]/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
                                      <div className="relative bg-white/70 rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] ">
                                        <div className="flex items-start gap-6">
                                          {/* Achievement Icon */}
                                          <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-[#1E3786] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                              <Award className="w-4 h-4 text-white" />
                                            </div>
                                          </div>

                                          {/* Achievement Details */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between md:mb-1">
                                              <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">
                                                    {
                                                      achievement.achievement_title
                                                    }
                                                  </h4>
                                                </div>
                                                <p className="text-md font-semibold text-[#1E3786] mb-1">
                                                  {achievement.organization}
                                                </p>
                                              </div>
                                            </div>

                                            {/* Achievement Description */}
                                            <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
                                              <p className="text-gray-700 leading-relaxed text-sm ">
                                                {expandedAchievementDesc[
                                                  achievement.id
                                                ]
                                                  ? achievement.achievement_description
                                                  : achievement.achievement_description?.slice(
                                                      0,
                                                      280,
                                                    )}
                                                {!expandedAchievementDesc[
                                                  achievement.id
                                                ] &&
                                                  achievement
                                                    .achievement_description
                                                    ?.length > 280 &&
                                                  "..."}
                                                {achievement.achievement_description &&
                                                  achievement
                                                    .achievement_description
                                                    .length > 280 && (
                                                    <button
                                                      onClick={() =>
                                                        setExpandedAchievementDesc(
                                                          (prev) => ({
                                                            ...prev,
                                                            [achievement.id]:
                                                              !prev[
                                                                achievement.id
                                                              ],
                                                          }),
                                                        )
                                                      }
                                                      className="text-blue-600 text-sm font-medium hover:underline ml-1"
                                                    >
                                                      {expandedAchievementDesc[
                                                        achievement.id
                                                      ]
                                                        ? "Read Less"
                                                        : "Read More"}
                                                    </button>
                                                  )}
                                              </p>

                                              {achievement.achievement_file_url && (
                                                <a
                                                  className="flex items-center text-gray-700 leading-relaxed text-sm"
                                                  href={
                                                    achievement.achievement_file_url
                                                  }
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  {" "}
                                                  View file
                                                  <File className="w-3 h-3 ml-2" />
                                                </a>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ),
                                )}
                              </div>

                              {/* Empty State */}
                              {(state.userDetail?.achievements?.length === 0 ||
                                !state.userDetail?.achievements) && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-center py-12"
                                >
                                  <div className="w-16 h-16 bg-gradient-to-br from-[#3b82f6]/20 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Award className="w-8 h-8 text-[#1E3786]/60" />
                                  </div>
                                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    No Achievements Added
                                  </h4>
                                  <p className="text-gray-500 mb-6">
                                    Showcase your awards and recognitions
                                  </p>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
