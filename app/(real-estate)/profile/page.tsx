"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  MapPin,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  Clock,
  Download,
  Trash2,
  Plus,
  CheckCircle,
  Upload,
  Crown,
  Briefcase,
  FileText,
  GraduationCap,
  FolderOpen,
  Code,
  Edit,
  X,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSetState } from "@/utils/function.utils";

export default function NaukriProfilePage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('resume');
  const [isManualScroll, setIsManualScroll] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '-10px 0px 0px 0px'
      }
    );
    
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for active tab tracking
  useEffect(() => {
    const sections = tabItems.map(item => document.getElementById(`${item.id}-section`)).filter(Boolean);
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isManualScroll) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id.replace('-section', '');
              setActiveTab(sectionId);
            }
          });
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -70% 0px'
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isManualScroll]);

  const [state, setState] = useSetState({
    // Profile Data
    name: "JOHN DOE",
    title: "Software Engineer",
    company: "at Tech Solutions Inc",
    location: "Bangalore, INDIA",
    experience: "5 Years",
    salary: "₹ 8,00,000",
    phone: "9876543210",
    email: "john.doe@example.com",
    noticePeriod: "2 Month notice period",
    profileCompletion: 85,
    lastUpdated: "22 Jan, 2026",
    resumeFile: "John_Doe_Resume.pdf",
    resumeUploadDate: "Jan 20, 2026",
    resumeHeadline: "Experienced Software Engineer with 5+ years in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading development teams.",

    // Edit States
    isEditingProfile: false,
    isEditingEmployment: false,
    isEditingEducation: false,
    isEditingSkills: false,
    isEditingProjects: false,
    isEditingHeadline: false,
    isEditingAchievements: false,

    // Accordion States
    expandedSections: {
      resume: true,
      headline: true,
      skills: true,
      employment: true,
      education: true,
      projects: true,
      achievements: true,
    },

    // Employment Data
    employments: [
      {
        id: "1",
        company: "Tech Solutions Inc",
        designation: "Senior Software Engineer",
        startDate: "Jan 2023",
        endDate: "Present",
        current: true,
        jobType: "Full-time",
        duration: "1 year 2 months",
        noticePeriod: "2 Months Notice Period",
        salary: "₹ 8,00,000",
        description:
          "Leading development of scalable web applications using modern technologies. Responsible for architecting solutions, mentoring junior developers, and ensuring code quality. Successfully delivered 5+ projects with improved performance and user experience.",
        keySkills: ["React.js", "Node.js", "TypeScript", "AWS", "MongoDB", "Docker", "Git", "Agile"]
      },
      {
        id: "2",
        company: "Digital Innovations Ltd",
        designation: "Software Developer",
        startDate: "Jun 2021",
        endDate: "Dec 2022",
        current: false,
        jobType: "Full-time",
        duration: "1 year 6 months",
        noticePeriod: "",
        salary: "₹ 5,50,000",
        description:
          "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions. Implemented responsive designs and optimized application performance for better user experience.",
        keySkills: ["React.js", "JavaScript", "HTML", "CSS", "Node.js", "MySQL"]
      },
      {
        id: "3",
        company: "StartUp Ventures",
        designation: "Junior Developer",
        startDate: "Aug 2020",
        endDate: "May 2021",
        current: false,
        jobType: "Full-time",
        duration: "9 months",
        noticePeriod: "",
        salary: "₹ 3,50,000",
        description:
          "Started career as a junior developer working on frontend development. Gained hands-on experience in modern web technologies and agile development practices. Contributed to multiple projects and learned best practices in software development.",
        keySkills: ["JavaScript", "HTML", "CSS", "Bootstrap", "jQuery", "Git"]
      },
    ],

    // Education Data
    educations: [
      {
        id: "1",
        institution: "XYZ University",
        degree: "Bachelor of Technology",
        field: "Computer Science Engineering",
        startYear: "2016",
        endYear: "2020",
        grade: "8.2 CGPA",
        project: "HYBRID MOBILE APPLICATION AND INTEGRATION",
      },
    ],

    // Skills Data
    skills: [
      { id: "1", name: "JavaScript", experience: "5 years" },
      { id: "2", name: "React.js", experience: "4 years" },
      { id: "3", name: "Node.js", experience: "3 years" },
      { id: "4", name: "TypeScript", experience: "2 years" },
      { id: "5", name: "AWS", experience: "2 years" },
    ],

    // Projects Data
    projects: [
      {
        id: "1",
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
        technologies: ["React.js", "Node.js", "MongoDB", "Stripe", "JWT"],
        duration: "3 months",
        status: "Completed",
        link: "https://github.com/johndoe/ecommerce-platform"
      },
      {
        id: "2",
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        technologies: ["React.js", "Socket.io", "Express.js", "PostgreSQL"],
        duration: "2 months",
        status: "In Progress",
        link: "https://github.com/johndoe/task-manager"
      }
    ],

    // Achievements Data
    achievements: [
      {
        id: "1",
        title: "Employee of the Year 2023",
        organization: "Tech Solutions Inc",
        date: "Dec 2023",
        description: "Recognized for outstanding performance and leadership in delivering critical projects.",
        image: null
      },
      {
        id: "2",
        title: "Best Innovation Award",
        organization: "Digital Innovations Ltd",
        date: "Jun 2022",
        description: "Awarded for developing an innovative solution that improved system efficiency by 40%.",
        image: null
      }
    ],

    // Form States
    employmentForm: {
      company: "",
      designation: "",
      startDate: "",
      endDate: "",
      current: false,
      jobType: "",
      duration: "",
      noticePeriod: "",
      salary: "",
      description: "",
      keySkills: [],
    },

    educationForm: {
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      grade: "",
      project: "",
    },

    skillForm: {
      name: "",
      experience: "",
    },

    projectForm: {
      title: "",
      description: "",
      technologies: [],
      duration: "",
      status: "",
      link: "",
    },

    achievementForm: {
      title: "",
      organization: "",
      date: "",
      description: "",
      image: null,
    },
  });

  const addEmployment = () => {
    const newEmployment = {
      id: Date.now().toString(),
      ...state.employmentForm,
    };
    setState({
      employments: [...state.employments, newEmployment],
      employmentForm: {
        company: "",
        designation: "",
        startDate: "",
        endDate: "",
        current: false,
        jobType: "",
        duration: "",
        noticePeriod: "",
        salary: "",
        description: "",
        keySkills: [],
      },
      isEditingEmployment: false,
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      ...state.educationForm,
    };
    setState({
      educations: [...state.educations, newEducation],
      educationForm: {
        institution: "",
        degree: "",
        field: "",
        startYear: "",
        endYear: "",
        grade: "",
        project: "",
      },
      isEditingEducation: false,
    });
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      ...state.skillForm,
    };
    setState({
      skills: [...state.skills, newSkill],
      skillForm: { name: "", experience: "" },
      isEditingSkills: false,
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      ...state.projectForm,
    };
    setState({
      projects: [...state.projects, newProject],
      projectForm: {
        title: "",
        description: "",
        technologies: [],
        duration: "",
        status: "",
        link: "",
      },
      isEditingProjects: false,
    });
  };

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now().toString(),
      ...state.achievementForm,
    };
    setState({
      achievements: [...state.achievements, newAchievement],
      achievementForm: {
        title: "",
        organization: "",
        date: "",
        description: "",
        image: null,
      },
      isEditingAchievements: false,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const tabId = sectionId.replace('-section', '');
    setActiveTab(tabId);
    setIsManualScroll(true);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
      
      setTimeout(() => {
        setIsManualScroll(false);
      }, 1500);
    }, 100);
  };

  const tabItems = [
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'headline', label: 'Summary', icon: Edit3 },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'employment', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'achievements', label: 'Awards', icon: Award },
  ];

  const deleteEmployment = (id: string) => {
    setState({
      employments: state.employments.filter((emp) => emp.id !== id),
    });
  };

  const deleteEducation = (id: string) => {
    setState({
      educations: state.educations.filter((edu) => edu.id !== id),
    });
  };

  const deleteSkill = (id: string) => {
    setState({
      skills: state.skills.filter((skill) => skill.id !== id),
    });
  };

  const deleteProject = (id: string) => {
    setState({
      projects: state.projects.filter((project) => project.id !== id),
    });
  };

  const deleteAchievement = (id: string) => {
    setState({
      achievements: state.achievements.filter((achievement) => achievement.id !== id),
    });
  };

  const toggleSection = (section: string) => {
    setState({
      expandedSections: {
        ...state.expandedSections,
        [section]: !state.expandedSections[section as keyof typeof state.expandedSections],
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Profile Header - Will hide on scroll */}
        <Card ref={headerRef} className="bg-white/80 border-0 mb-8 overflow-hidden">
          <div className="absolute"></div>
          <CardContent className="relative p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
              {/* Profile Image - Enhanced */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl border-4 border-white overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Profile"
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold whitespace-nowrap">
                  {state.profileCompletion}%
                </div>
              </div>

              {/* Profile Info - Enhanced */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {state.name}
                      </h1>
                      <Button variant="ghost" size="sm" className="p-1.5 hover:bg-blue-50 rounded-full">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium mt-1">{state.title}</p>
                    <div className="text-gray-600 flex items-center gap-2 justify-center sm:justify-start mt-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{state.company}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="bg-white/60 rounded-lg px-3 py-2 shadow-sm border">
                      <p className="text-xs text-gray-500 whitespace-nowrap">Last Updated: <span className="font-semibold text-gray-700">{state.lastUpdated}</span></p>
                    </div>
                  </div>
                </div>

                {/* Profile Details Grid - Enhanced */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mt-4" style={{gap:"5px"}}>
                  {[
                    { icon: MapPin, label: state.location, color: "text-red-500" },
                    { icon: Phone, label: state.phone, color: "text-green-500", verified: true },
                    { icon: Calendar, label: state.experience, color: "text-blue-500" },
                    { icon: Mail, label: state.email, color: "text-purple-500", verified: true },
                    { icon: IndianRupee, label: state.salary, color: "text-emerald-500" },
                    { icon: Clock, label: state.noticePeriod, color: "text-orange-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 sm:p-3 bg-white/50 rounded-xl border border-gray-100 hover:bg-white/70 transition-all duration-200">
                      <item.icon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                      <span className="text-xs sm:text-sm text-gray-700 font-medium truncate flex-1">{item.label}</span>
                      {item.verified && <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />}
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
          <div className="lg:w-1/3 quick-links-sidebar">
            <div className={!isHeaderVisible ? "sticky top-4" : ""}>
            <Card className="bg-white/80  border-0 overflow-hidden">
                <div className=""></div>
                <CardContent className="relative p-4">

                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Quick Links
                  </h3>

                  <div className="space-y-4">
                    {[
                      { label: "Resume", action: "Update", onClick: () => scrollToSection('resume-section') },
                      { label: "Profile Summary", action: null, onClick: () => scrollToSection('headline-section') },
                      { label: "Skills", action: null, onClick: () => scrollToSection('skills-section') },
                      { label: "Experience", action: "Add", onClick: () => scrollToSection('employment-section') },
                      { label: "Education", action: "Add", onClick: () => scrollToSection('education-section') },
                      { label: "Projects", action: null, onClick: () => scrollToSection('projects-section') },
                      { label: "Achievements", action: null, onClick: () => scrollToSection('achievements-section') },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between px-2 py-3 bg-white/60 rounded-xl  hover:bg-white/80 transition-all duration-200 group cursor-pointer" onClick={item.onClick}>
                        <span className="text-gray-700 font-medium group-hover:text-gray-900">{item.label}</span>
                        {item.action && (
                          <Button
                            variant="link"
                            className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.label === 'Experience') setState({ isEditingEmployment: true });
                              if (item.label === 'Education') setState({ isEditingEducation: true });
                            }}
                          >
                            {item.action}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Content Area - Scrollable */}
          <div className={`quick-links-content ${!isHeaderVisible ? 'max-h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hide' : ''}`}>
            <div className="space-y-4 pr-2">
              {/* Naukri Pro Banner */}
             

              {/* Resume Section */}
              <Card id="resume-section" className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-400/20 to-emerald-400/20 rounded-full blur-2xl"></div>
                
                <CardContent className="relative p-4 md:p-6">

                  <div 
                    className="flex items-center justify-between mb-3 cursor-pointer"
                    onClick={() => toggleSection('resume')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <FileText className="w-4 h-4 text-white transform -rotate-3" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                          Resume Manager
                        </h3>
                        <p className="text-sm text-gray-500">Manage your professional documents</p>
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
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-sm group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                          <div className="relative bg-white/70 rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02]">
                            <div className="flex items-start gap-6">
                              {/* Resume Icon */}
                              <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 relative">
                                  <div className="text-white">
                                    <div className="text-xs font-bold mb-1">PDF</div>
                                    <div className="w-8 h-0.5 bg-white/60 mb-1"></div>
                                    <div className="w-6 h-0.5 bg-white/40 mb-1"></div>
                                    <div className="w-7 h-0.5 bg-white/60"></div>
                                  </div>
                                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white text-sm font-bold">✓</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Resume Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between md:mb-3">
                                  <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                                      {state.resumeFile}
                                    </h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-1">
                                      <span className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        Uploaded {state.resumeUploadDate}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        2.4 MB
                                      </span>
                                    </div>
                                  </div>
                                  
                                  {/* Desktop Action Buttons - Top Right */}
                                  <div className="hidden md:flex gap-2">
                                    <Button variant="outline" size="sm" className="hover:bg-blue-50 border-blue-200 group/btn" title="Download Resume">
                                      <Download className="w-4 h-4 text-blue-600 group-hover/btn:scale-110 transition-transform" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="hover:bg-orange-50 border-orange-200 group/btn" title="Upload New Resume">
                                      <Upload className="w-4 h-4 text-orange-600 group-hover/btn:scale-110 transition-transform" />
                                    </Button>
                                  </div>
                                </div>
                                
                                {/* Status Badges */}
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 rounded-full">
                                    <span className="text-blue-700 font-semibold text-sm">Latest Version</span>
                                  </div>
                                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full">
                                    <span className="text-green-700 font-semibold text-sm">ATS Optimized</span>
                                  </div>
                                </div>
                                
                                {/* Mobile Action Buttons - Bottom Right */}
                                <div className="flex md:hidden justify-end gap-2">
                                  <Button variant="outline" size="sm" className="hover:bg-blue-50 border-blue-200 group/btn" title="Download Resume">
                                    <Download className="w-4 h-4 text-blue-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="hover:bg-orange-50 border-orange-200 group/btn" title="Upload New Resume">
                                    <Upload className="w-4 h-4 text-orange-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                </div>
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
              <Card id="headline-section" className="bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-400/20 to-cyan-400/20 rounded-full blur-2xl"></div>
                
                <CardContent className="relative p-4 md:p-6">

                  <div 
                    className="flex items-center justify-between mb-6 cursor-pointer"
                    onClick={() => toggleSection('headline')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <Edit3 className="w-4 h-4 text-white transform -rotate-3" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-cyan-800 to-blue-800 bg-clip-text text-transparent">
                          Profile Summary
                        </h3>
                        <p className="text-sm text-gray-500">Your professional summary</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setState({ isEditingHeadline: true });
                        }}
                        className="w-8 h-8 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
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
                        {/* Edit Headline Form */}
                        <AnimatePresence>
                          {state.isEditingHeadline && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: -20 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -20 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="mb-6 relative"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-sm"></div>
                              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <Edit3 className="w-4 h-4 text-white" />
                                  </div>
                                  <h4 className="text-lg font-bold text-gray-900">Edit Resume Headline</h4>
                                </div>
                                
                                <Textarea
                                  placeholder="Write a compelling headline that summarizes your professional experience and key skills..."
                                  value={state.resumeHeadline}
                                  onChange={(e) => setState({ resumeHeadline: e.target.value })}
                                  className="border-gray-200 focus:border-cyan-500 focus:ring-cyan-500 min-h-[100px] mb-4"
                                />
                                
                                <div className="flex gap-3">
                                  <Button 
                                    onClick={() => setState({ isEditingHeadline: false })}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Save Headline
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => setState({ isEditingHeadline: false })}
                                    className="border-gray-300 hover:bg-gray-50"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Headline Display */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-3xl blur-sm"></div>
                          <div className="flex-1 px-3">
                            <p className="text-md text-gray-500">Professional headline optimized for recruiters</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
              
                {/* Skills Section */}
                <Card id="skills-section" className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-400/20 to-green-400/20 rounded-full blur-2xl"></div>
                
                <CardContent className="relative p-4 md:p-6">

                  <div 
                    className="flex items-center justify-between mb-8 cursor-pointer"
                    onClick={() => toggleSection('skills')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <Code className="w-4 h-4 text-white transform -rotate-3" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
                          Skills
                        </h3>
                        <p className="text-sm text-gray-500">Your technical expertise</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setState({ isEditingSkills: true });
                        }}
                        className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
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

                  {/* Add Skill Form */}
                  <AnimatePresence>
                    {state.isEditingSkills && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-8 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl"></div>
                        <div className="relative bg-white/80  rounded-3xl p-8 border border-white/50 shadow-xl">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                              <Plus className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Add New Skill</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Skill Name</label>
                              <Input
                                placeholder="e.g., JavaScript"
                                value={state.skillForm.name}
                                onChange={(e) => setState({ 
                                  skillForm: { ...state.skillForm, name: e.target.value }
                                })}
                                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Experience</label>
                              <Input
                                placeholder="e.g., 3 years"
                                value={state.skillForm.experience}
                                onChange={(e) => setState({ 
                                  skillForm: { ...state.skillForm, experience: e.target.value }
                                })}
                                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              onClick={addSkill} 
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Save Skill
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setState({ isEditingSkills: false })}
                              className="border-gray-300 hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Skills List - Chip Format */}
                  <div className="flex flex-wrap gap-3">
                    {state.skills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative"
                      >
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 border border-green-200 rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300 hover:shadow-lg group-hover:scale-105">
                          <span className="text-green-700 font-medium text-sm">{skill.name}</span>
                          <span className="text-green-600 text-xs bg-white/60 px-2 py-0.5 rounded-full">{skill.experience}</span>
                          <div className="flex gap-1  group-hover:opacity-100 transition-opacity duration-200">
                           
                            <button 
                              onClick={() => deleteSkill(skill.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-white/50"
                            >
                              <X className="w-3 h-3  font-semibold" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Empty State */}
                  {state.skills.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Code className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">No Skills Added</h4>
                      <p className="text-gray-500 mb-4">Add your technical skills as chips</p>
                      <Button
                        onClick={() => setState({ isEditingSkills: true })}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skills
                      </Button>
                    </motion.div>
                  )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Employment Section */}
              <Card id="employment-section" className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl"></div>
                
                <CardContent className="relative p-4 md:p-6">
                  <div 
                    className="flex items-center justify-between mb-3 cursor-pointer"
                    onClick={() => toggleSection('employment')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <Briefcase className="w-4 h-4 text-white transform -rotate-3" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                          Experience
                        </h3>
                        <p className="text-sm text-gray-500">Your professional journey</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setState({ isEditingEmployment: true });
                        }}
                        className="w-8 h-8 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
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

                  {/* Add Employment Form */}
                  <AnimatePresence>
                    {state.isEditingEmployment && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-8 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-sm"></div>
                        <div className="relative bg-white/80  rounded-3xl p-8 border border-white/50 shadow-xl">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                              <Plus className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Add New Experience</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Company Name</label>
                              <Input
                                placeholder="e.g., Google Inc."
                                value={state.employmentForm.company}
                                onChange={(e) => setState({ 
                                  employmentForm: { ...state.employmentForm, company: e.target.value }
                                })}
                                className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Job Title</label>
                              <Input
                                placeholder="e.g., Senior Software Engineer"
                                value={state.employmentForm.designation}
                                onChange={(e) => setState({ 
                                  employmentForm: { ...state.employmentForm, designation: e.target.value }
                                })}
                                className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Start Date</label>
                              <Input
                                placeholder="e.g., Jan 2021"
                                value={state.employmentForm.startDate}
                                onChange={(e) => setState({ 
                                  employmentForm: { ...state.employmentForm, startDate: e.target.value }
                                })}
                                className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">End Date</label>
                              <Input
                                placeholder="e.g., Present"
                                value={state.employmentForm.endDate}
                                onChange={(e) => setState({ 
                                  employmentForm: { ...state.employmentForm, endDate: e.target.value }
                                })}
                                className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-sm font-semibold text-gray-700">Salary</label>
                              <Input
                                placeholder="e.g., ₹ 12,00,000"
                                value={state.employmentForm.salary}
                                onChange={(e) => setState({ 
                                  employmentForm: { ...state.employmentForm, salary: e.target.value }
                                })}
                                className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-6">
                            <label className="text-sm font-semibold text-gray-700">Job Description</label>
                            <Textarea
                              placeholder="Describe your key responsibilities and achievements..."
                              value={state.employmentForm.description}
                              onChange={(e) => setState({ 
                                employmentForm: { ...state.employmentForm, description: e.target.value }
                              })}
                              className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                            />
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              onClick={addEmployment} 
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Save Experience
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setState({ isEditingEmployment: false })}
                              className="border-gray-300 hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Employment List */}
                  <div className="space-y-4">
                    {state.employments.map((emp, index) => (
                      <motion.div
                        key={emp.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-sm group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                        <div className="relative bg-white/70  rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                          <div className="flex items-start gap-3">
                            {/* Company Logo Placeholder */}
                            <div className="flex-shrink-0 pt-1">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-md">
                                  {emp.company.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              {emp.current && (
                                <div className="mt-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold text-center">
                                  Current
                                </div>
                              )}
                            </div>
                            
                            {/* Job Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between md:mb-1">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                                      {emp.designation}
                                    </h4>
                                  </div>
                                  <p className="text-md font-semibold text-indigo-600 mb-1">{emp.company}</p>
                                  <div className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">{emp.jobType || "Full-time"}</span> | 
                                    <span className="ml-1">{emp.startDate} to {emp.endDate}</span>
                                    <span className="ml-1">({emp.duration || "2 years 3 months"})</span>
                                  </div>
                                </div>
                                
                                {/* Desktop Action Buttons - Top Right */}
                                <div className="hidden md:flex gap-2">
                                  <Button variant="outline" size="sm" className="hover:bg-blue-50 border-blue-200 group/btn">
                                    <Edit className="w-4 h-4 text-blue-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteEmployment(emp.id)}
                                    className="hover:bg-red-50 border-red-200 group/btn"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Job Description */}
                              <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl  border border-gray-100 mb-2">
                                <p className="text-gray-700 leading-relaxed text-sm">{emp.description}</p>
                                {emp.description && emp.description.length > 200 && (
                                  <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">
                                    Read More
                                  </button>
                                )}
                              </div>
                              
                              {/* Key Skills */}
                              {emp.keySkills && emp.keySkills.length > 0 && (
                                <div className="mb-4">
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Top 5 key skills:</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {emp.keySkills.map((skill, skillIndex) => (
                                      <span 
                                        key={skillIndex}
                                        className="text-blue-600 text-sm hover:underline cursor-pointer"
                                      >
                                        {skill}{skillIndex < emp.keySkills.length - 1 ? ',' : ''}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Salary Badge */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full">
                                  <span className="text-green-700 text-sm">{emp.salary}</span>
                                </div>
                                
                                {/* Mobile Action Buttons - Bottom Right */}
                                <div className="flex md:hidden gap-2">
                                  <Button variant="outline" size="sm" className="hover:bg-blue-50 border-blue-200 group/btn">
                                    <Edit className="w-4 h-4 text-blue-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteEmployment(emp.id)}
                                    className="hover:bg-red-50 border-red-200 group/btn"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Timeline Connector */}
                          {index < state.employments.length - 1 && (
                            <div className="absolute -bottom-3 left-8 w-0.5 h-6 bg-gradient-to-b from-indigo-300 to-transparent"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Empty State */}
                  {state.employments.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">💼</span>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">No Employment History</h4>
                      <p className="text-gray-500 mb-6">Add your work experience to showcase your professional journey</p>
                      <Button
                        onClick={() => setState({ isEditingEmployment: true })}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Job
                      </Button>
                    </motion.div>
                  )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Education Section */}
              <Card id="education-section" className="bg-gradient-to-br from-white via-orange-50/30 to-amber-50/30 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
                
                <CardContent className="relative p-4 md:p-6">

                  <div 
                    className="flex items-center justify-between mb-3 cursor-pointer"
                    onClick={() => toggleSection('education')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <GraduationCap className="w-4 h-4 text-white transform -rotate-3" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-orange-800 to-amber-800 bg-clip-text text-transparent">
                          Education
                        </h3>
                        <p className="text-sm text-gray-500">Your academic background</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setState({ isEditingEducation: true });
                        }}
                        className="w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
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

                  {/* Add Education Form */}
                  <AnimatePresence>
                    {state.isEditingEducation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-8 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl blur-sm"></div>
                        <div className="relative bg-white/80  rounded-3xl p-8 border border-white/50 shadow-xl">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                              <Plus className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Add Education Details</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Institution Name</label>
                              <Input
                                placeholder="e.g., Harvard University"
                                value={state.educationForm.institution}
                                onChange={(e) => setState({ 
                                  educationForm: { ...state.educationForm, institution: e.target.value }
                                })}
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Degree</label>
                              <Input
                                placeholder="e.g., Bachelor of Technology"
                                value={state.educationForm.degree}
                                onChange={(e) => setState({ 
                                  educationForm: { ...state.educationForm, degree: e.target.value }
                                })}
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Field of Study</label>
                              <Input
                                placeholder="e.g., Computer Science"
                                value={state.educationForm.field}
                                onChange={(e) => setState({ 
                                  educationForm: { ...state.educationForm, field: e.target.value }
                                })}
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Grade/CGPA</label>
                              <Input
                                placeholder="e.g., 8.5 CGPA"
                                value={state.educationForm.grade}
                                onChange={(e) => setState({ 
                                  educationForm: { ...state.educationForm, grade: e.target.value }
                                })}
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Start Year</label>
                              <Input
                                placeholder="e.g., 2016"
                                value={state.educationForm.startYear}
                                onChange={(e) => setState({ 
                                  educationForm: { ...state.educationForm, startYear: e.target.value }
                                })}
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">End Year</label>
                              <Input
                                placeholder="e.g., 2020"
                                value={state.educationForm.endYear}
                                onChange={(e) => setState({ 
                                  educationForm: { ...state.educationForm, endYear: e.target.value }
                                })}
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              onClick={addEducation} 
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Save Education
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setState({ isEditingEducation: false })}
                              className="border-gray-300 hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Education List */}
                  <div className="space-y-4">
                    {state.educations.map((edu, index) => (
                      <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-3xl blur-sm group-hover:from-orange-500/10 group-hover:to-amber-500/10 transition-all duration-300"></div>
                        <div className="relative bg-white/70  rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                          <div className="flex items-start gap-3">
                            {/* Institution Logo Placeholder */}
                            <div className="flex-shrink-0 pt-1">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-md">
                                  {edu.institution.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            
                            {/* Education Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between md:mb-1">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                                      {edu.degree}
                                    </h4>
                                  </div>
                                  <p className="text-md font-semibold text-orange-600">{edu.institution}</p>
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">{edu.field}</span>
                                  </div>
                                </div>
                                
                                {/* Desktop Action Buttons - Top Right */}
                                <div className="hidden md:flex gap-2">
                                  <Button variant="outline" size="sm" className="hover:bg-orange-50 border-orange-200 group/btn">
                                    <Edit className="w-4 h-4 text-orange-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteEducation(edu.id)}
                                    className="hover:bg-red-50 border-red-200 group/btn"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">{edu.startYear} - {edu.endYear}</span> | 
                                <span className="ml-1">{edu.grade}</span>
                              </div>
                              
                             
                              
                              {/* Project */}
                              {edu.project && (
                                <div className="mb-4">
                                  <h5 className="text-md font-semibold text-gray-700 mb-2">Projects</h5>
                                  <div className="bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full inline-block">
                                    <span className="text-orange-700 font-semibold text-sm">{edu.project}</span>
                                  </div>
                                </div>
                              )}
                              
                              {/* Mobile Action Buttons - Bottom Right */}
                              <div className="flex md:hidden justify-end gap-2 mt-4">
                                <Button variant="outline" size="sm" className="hover:bg-orange-50 border-orange-200 group/btn">
                                  <Edit className="w-4 h-4 text-orange-600 group-hover/btn:scale-110 transition-transform" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteEducation(edu.id)}
                                  className="hover:bg-red-50 border-red-200 group/btn"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:scale-110 transition-transform" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Timeline Connector */}
                          {index < state.educations.length - 1 && (
                            <div className="absolute -bottom-3 left-8 w-0.5 h-6 bg-gradient-to-b from-orange-300 to-transparent"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Empty State */}
                  {state.educations.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-12 h-12 text-gray-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">No Education History</h4>
                      <p className="text-gray-500 mb-6">Add your educational background to showcase your qualifications</p>
                      <Button
                        onClick={() => setState({ isEditingEducation: true })}
                        className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Education
                      </Button>
                    </motion.div>
                  )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Projects Section */}
                 <Card id="projects-section" className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                
                <CardContent className="relative p-4 md:p-6">


                  <div 
                    className="flex items-center justify-between mb-3 cursor-pointer"
                    onClick={() => toggleSection('projects')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <FolderOpen className="w-4 h-4 text-white transform -rotate-3" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                          Projects
                        </h3>
                        <p className="text-sm text-gray-500">Your portfolio showcase</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setState({ isEditingProjects: true });
                        }}
                        className="w-8 h-8 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
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

                  {/* Add Project Form */}
                  <AnimatePresence>
                    {state.isEditingProjects && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-8 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-sm"></div>
                        <div className="relative bg-white/80 rounded-3xl p-8 border border-white/50 shadow-xl">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                              <Plus className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Add New Project</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Project Title</label>
                              <Input
                                placeholder="e.g., E-Commerce Platform"
                                value={state.projectForm.title}
                                onChange={(e) => setState({ 
                                  projectForm: { ...state.projectForm, title: e.target.value }
                                })}
                                className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Duration</label>
                              <Input
                                placeholder="e.g., 3 months"
                                value={state.projectForm.duration}
                                onChange={(e) => setState({ 
                                  projectForm: { ...state.projectForm, duration: e.target.value }
                                })}
                                className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Status</label>
                              <Input
                                placeholder="e.g., Completed"
                                value={state.projectForm.status}
                                onChange={(e) => setState({ 
                                  projectForm: { ...state.projectForm, status: e.target.value }
                                })}
                                className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Project Link</label>
                              <Input
                                placeholder="e.g., https://github.com/username/project"
                                value={state.projectForm.link}
                                onChange={(e) => setState({ 
                                  projectForm: { ...state.projectForm, link: e.target.value }
                                })}
                                className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-6">
                            <label className="text-sm font-semibold text-gray-700">Project Description</label>
                            <Textarea
                              placeholder="Describe your project, its features, and your role..."
                              value={state.projectForm.description}
                              onChange={(e) => setState({ 
                                projectForm: { ...state.projectForm, description: e.target.value }
                              })}
                              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
                            />
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              onClick={addProject} 
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Save Project
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setState({ isEditingProjects: false })}
                              className="border-gray-300 hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Projects List */}
                  <div className="space-y-4">
                    {state.projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-sm group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
                        <div className="relative bg-white/70 rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                          <div className="flex items-start gap-3">
                            {/* Project Icon */}
                            <div className="flex-shrink-0 pt-1">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-md">
                                  {project.title.charAt(0).toUpperCase()}
                                </span>
                              </div>
                             
                            </div>
                            
                            {/* Project Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between md:mb-1">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                                      {project.title}
                                    </h4>
                                  </div>
                                  <div className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Duration: {project.duration}</span>
                                    {project.link && (
                                      <span className="ml-2">
                                        | <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">View Project</a>
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Desktop Action Buttons - Top Right */}
                                <div className="hidden md:flex gap-2">
                                  <Button variant="outline" size="sm" className="hover:bg-purple-50 border-purple-200 group/btn">
                                    <Edit className="w-4 h-4 text-purple-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteProject(project.id)}
                                    className="hover:bg-red-50 border-red-200 group/btn"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Project Description */}
                              <div className="bg-gradient-to-r from-gray-50 to-purple-50/50 rounded-2xl p-4 border border-gray-100 mb-4">
                                <p className="text-gray-700 leading-relaxed text-sm">{project.description}</p>
                              </div>
                              
                              {/* Technologies */}
                              {project.technologies && project.technologies.length > 0 && (
                                <div className="mb-4">
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Technologies Used:</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                      <span 
                                        key={techIndex}
                                        className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Mobile Action Buttons - Bottom Right */}
                              <div className="flex md:hidden justify-end gap-2 mt-4">
                                <Button variant="outline" size="sm" className="hover:bg-purple-50 border-purple-200 group/btn">
                                  <Edit className="w-4 h-4 text-purple-600 group-hover/btn:scale-110 transition-transform" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteProject(project.id)}
                                  className="hover:bg-red-50 border-red-200 group/btn"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:scale-110 transition-transform" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Timeline Connector */}
                          {index < state.projects.length - 1 && (
                            <div className="absolute -bottom-3 left-8 w-0.5 h-6 bg-gradient-to-b from-purple-300 to-transparent"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Empty State */}
                  {state.projects.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FolderOpen className="w-12 h-12 text-gray-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">No Projects Added</h4>
                      <p className="text-gray-500 mb-6">Showcase your work by adding your projects and achievements</p>
                      <Button
                        onClick={() => setState({ isEditingProjects: true })}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Project
                      </Button>
                    </motion.div>
                  )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Achievements Section */}
              <Card id="achievements-section" className="bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-400/20 to-yellow-400/20 rounded-full blur-2xl"></div>
                
                <CardContent className="relative p-4 md:p-6">

                  <div 
                    className="flex items-center justify-between mb-3 cursor-pointer"
                    onClick={() => toggleSection('achievements')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                        <Award className="w-4 h-4 text-white transform -rotate-3" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-yellow-800 to-orange-800 bg-clip-text text-transparent">
                          Achievements & Awards
                        </h3>
                        <p className="text-sm text-gray-500">Your recognitions and honors</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setState({ isEditingAchievements: true });
                        }}
                        className="w-8 h-8 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
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

                  {/* Add Achievement Form */}
                  <AnimatePresence>
                    {state.isEditingAchievements && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-8 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur-sm"></div>
                        <div className="relative bg-white/80 rounded-3xl p-8 border border-white/50 shadow-xl">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                              <Plus className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Add New Achievement</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Achievement Title</label>
                              <Input
                                placeholder="e.g., Employee of the Year"
                                value={state.achievementForm.title}
                                onChange={(e) => setState({ 
                                  achievementForm: { ...state.achievementForm, title: e.target.value }
                                })}
                                className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Organization</label>
                              <Input
                                placeholder="e.g., Tech Solutions Inc"
                                value={state.achievementForm.organization}
                                onChange={(e) => setState({ 
                                  achievementForm: { ...state.achievementForm, organization: e.target.value }
                                })}
                                className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Date</label>
                              <Input
                                placeholder="e.g., Dec 2023"
                                value={state.achievementForm.date}
                                onChange={(e) => setState({ 
                                  achievementForm: { ...state.achievementForm, date: e.target.value }
                                })}
                                className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">Achievement Image</label>
                              <div className="flex items-center gap-3">
                                <Input
                                  ref={(ref) => {
                                    if (ref && !state.achievementForm.image) {
                                      ref.value = '';
                                    }
                                  }}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        setState({ 
                                          achievementForm: { ...state.achievementForm, image: event.target?.result as string }
                                        });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                                />
                                <Upload className="w-5 h-5 text-gray-400" />
                              </div>
                              {state.achievementForm.image && (
                                <div className="mt-2 relative inline-block">
                                  <img 
                                    src={state.achievementForm.image} 
                                    alt="Preview" 
                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setState({ 
                                        achievementForm: { ...state.achievementForm, image: null }
                                      });
                                      // Clear the file input
                                      const fileInput = e.currentTarget.parentElement?.parentElement?.querySelector('input[type="file"]') as HTMLInputElement;
                                      if (fileInput) {
                                        fileInput.value = '';
                                      }
                                    }}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-6">
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <Textarea
                              placeholder="Describe your achievement and its significance..."
                              value={state.achievementForm.description}
                              onChange={(e) => setState({ 
                                achievementForm: { ...state.achievementForm, description: e.target.value }
                              })}
                              className="border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 min-h-[100px]"
                            />
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              onClick={addAchievement} 
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Save Achievement
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setState({ isEditingAchievements: false })}
                              className="border-gray-300 hover:bg-gray-50"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Achievements List */}
                  <div className="space-y-4">
                    {state.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-3xl blur-sm group-hover:from-yellow-500/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
                        <div className="relative bg-white/70 rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                          <div className="flex items-start gap-6">
                            {/* Achievement Icon */}
                            <div className="flex-shrink-0">
                              {achievement.image ? (
                                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <img 
                                    src={achievement.image} 
                                    alt={achievement.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Award className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                            
                            {/* Achievement Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between md:mb-1">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
                                      {achievement.title}
                                    </h4>
                                  </div>
                                  <p className="text-md font-semibold text-yellow-600 mb-1">{achievement.organization}</p>
                                  <div className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">{achievement.date}</span>
                                  </div>
                                </div>
                                
                                {/* Desktop Action Buttons - Top Right */}
                                <div className="hidden md:flex gap-2">
                                  <Button variant="outline" size="sm" className="hover:bg-yellow-50 border-yellow-200 group/btn">
                                    <Edit className="w-4 h-4 text-yellow-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteAchievement(achievement.id)}
                                    className="hover:bg-red-50 border-red-200 group/btn"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:scale-110 transition-transform" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Achievement Description */}
                              <div className="bg-gradient-to-r from-gray-50 to-yellow-50/50 rounded-2xl p-4 border border-gray-100 mb-4">
                                <p className="text-gray-700 leading-relaxed text-sm">{achievement.description}</p>
                              </div>
                              
                              {/* Mobile Action Buttons - Bottom Right */}
                              <div className="flex md:hidden justify-end gap-2">
                                <Button variant="outline" size="sm" className="hover:bg-yellow-50 border-yellow-200 group/btn">
                                  <Edit className="w-4 h-4 text-yellow-600 group-hover/btn:scale-110 transition-transform" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteAchievement(achievement.id)}
                                  className="hover:bg-red-50 border-red-200 group/btn"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600 group-hover/btn:scale-110 transition-transform" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Empty State */}
                  {state.achievements.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-12 h-12 text-gray-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">No Achievements Added</h4>
                      <p className="text-gray-500 mb-6">Showcase your awards and recognitions</p>
                      <Button
                        onClick={() => setState({ isEditingAchievements: true })}
                        className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Achievement
                      </Button>
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
      </div>
    </div>
  );
}