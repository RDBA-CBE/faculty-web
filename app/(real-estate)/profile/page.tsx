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
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSetState } from "@/utils/function.utils";

export default function NaukriProfilePage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      { 
        threshold: 0,
        rootMargin: '-1px 0px 0px 0px'
      }
    );
    
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const [state, setState] = useSetState({
    // Profile Data
    name: "RAJESH KUMAR",
    title: "Full Stack Developer",
    company: "at TechCorp Solutions Pvt Ltd",
    location: "Chennai, INDIA",
    experience: "6 Years",
    salary: "₹ 12,00,000",
    phone: "9876543210",
    email: "rajesh.kumar@techcorp.com",
    noticePeriod: "1 Month notice period",
    profileCompletion: 95,
    lastUpdated: "21 Jan, 2026",
    resumeFile: "Rajesh_Kumar_Resume.pdf",
    resumeUploadDate: "Jan 15, 2026",

    // Edit States
    isEditingProfile: false,
    isEditingEmployment: false,
    isEditingEducation: false,
    isEditingSkills: false,

    // Employment Data
    employments: [
      {
        id: "1",
        company: "Repute Digital Business Agency",
        designation: "Software Developer",
        startDate: "Jan 2021",
        endDate: "Present",
        current: true,
        salary: "₹ 6,00,000",
        description:
          "Working on web development projects using React, Node.js and other modern technologies.",
      },
    ],

    // Education Data
    educations: [
      {
        id: "1",
        institution: "Anna University",
        degree: "Bachelor of Engineering",
        field: "Computer Science",
        startYear: "2017",
        endYear: "2021",
        grade: "8.5 CGPA",
      },
    ],

    // Skills Data
    skills: [
      { id: "1", name: "JavaScript", experience: "4 years" },
      { id: "2", name: "React.js", experience: "3 years" },
      { id: "3", name: "Node.js", experience: "3 years" },
      { id: "4", name: "Python", experience: "2 years" },
      { id: "5", name: "MongoDB", experience: "2 years" },
    ],

    // Form States
    employmentForm: {
      company: "",
      designation: "",
      startDate: "",
      endDate: "",
      current: false,
      salary: "",
      description: "",
    },

    educationForm: {
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      grade: "",
    },

    skillForm: {
      name: "",
      experience: "",
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
        salary: "",
        description: "",
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Profile Header - Will hide on scroll */}
        <Card ref={headerRef} className="bg-white shadow-sm border border-gray-200 mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-green-500 overflow-hidden bg-gray-100">
                    <Image
                      src="/assets/images/profile-placeholder.jpg"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {state.profileCompletion}%
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                          {state.name}
                        </h1>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit3 className="w-4 h-4 text-gray-500" />
                        </Button>
                      </div>
                      <p className="text-lg text-gray-700 mb-1">{state.title}</p>
                      <p className="text-gray-600 mb-4">{state.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      Profile last updated - {state.lastUpdated}
                    </div>
                  </div>

                  {/* Profile Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {state.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      {state.phone}
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {state.experience}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      {state.email}
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <IndianRupee className="w-4 h-4" />
                      {state.salary}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {state.noticePeriod}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
          {/* Left Sidebar - Quick Links */}
          <div className="lg:w-1/4">
            <div className={!isHeaderVisible ? "sticky top-4" : ""}>
              <Card className="bg-white shadow-sm border border-gray-200 h-fit">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Quick links
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Resume</span>
                      <Button
                        variant="link"
                        className="text-blue-600 p-0 h-auto font-normal"
                      >
                        Update
                      </Button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Resume headline</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Key skills</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Employment</span>
                      <Button
                        variant="link"
                        className="text-blue-600 p-0 h-auto font-normal"
                        onClick={() => setState({ isEditingEmployment: true })}
                      >
                        Add
                      </Button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Education</span>
                      <Button
                        variant="link"
                        className="text-blue-600 p-0 h-auto font-normal"
                        onClick={() => setState({ isEditingEducation: true })}
                      >
                        Add
                      </Button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">IT skills</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Projects</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Content Area - Scrollable */}
          <div className="lg:w-3/4 overflow-y-auto">
            <div className="space-y-6 pr-2">
              {/* Naukri Pro Banner */}
             

              {/* Resume Section */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Resume</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                    <div>
                      <h4 className="font-medium text-gray-900">{state.resumeFile}</h4>
                      <p className="text-sm text-gray-500">Uploaded on {state.resumeUploadDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Button className="mb-4">
                      <Upload className="w-4 h-4 mr-2" />
                      Update resume
                    </Button>
                    <p className="text-sm text-gray-500">
                      Supported Formats: doc, docx, rtf, pdf, upto 2 MB
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Employment Section */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Employment</h3>
                    <Button
                      onClick={() => setState({ isEditingEmployment: true })}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employment
                    </Button>
                  </div>

                  {/* Add Employment Form */}
                  <AnimatePresence>
                    {state.isEditingEmployment && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-6 bg-gray-50 rounded-lg border"
                      >
                        <h4 className="font-semibold mb-4">Add Employment Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Input
                            placeholder="Company Name"
                            value={state.employmentForm.company}
                            onChange={(e) => setState({ 
                              employmentForm: { ...state.employmentForm, company: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="Designation"
                            value={state.employmentForm.designation}
                            onChange={(e) => setState({ 
                              employmentForm: { ...state.employmentForm, designation: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="Start Date (e.g., Jan 2021)"
                            value={state.employmentForm.startDate}
                            onChange={(e) => setState({ 
                              employmentForm: { ...state.employmentForm, startDate: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="End Date (e.g., Present)"
                            value={state.employmentForm.endDate}
                            onChange={(e) => setState({ 
                              employmentForm: { ...state.employmentForm, endDate: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="Salary (e.g., ₹ 6,00,000)"
                            value={state.employmentForm.salary}
                            onChange={(e) => setState({ 
                              employmentForm: { ...state.employmentForm, salary: e.target.value }
                            })}
                          />
                        </div>
                        <Textarea
                          placeholder="Job Description"
                          value={state.employmentForm.description}
                          onChange={(e) => setState({ 
                            employmentForm: { ...state.employmentForm, description: e.target.value }
                          })}
                          className="mb-4"
                        />
                        <div className="flex gap-2">
                          <Button onClick={addEmployment} className="bg-green-600 hover:bg-green-700">
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setState({ isEditingEmployment: false })}
                          >
                            Cancel
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Employment List */}
                  <div className="space-y-4">
                    {state.employments.map((emp) => (
                      <div key={emp.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{emp.designation}</h4>
                            <p className="text-blue-600 font-medium mb-2">{emp.company}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span>{emp.startDate} - {emp.endDate}</span>
                              <span>{emp.salary}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{emp.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteEmployment(emp.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education Section */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Education</h3>
                    <Button 
                      onClick={() => setState({ isEditingEducation: true })}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>

                  {/* Add Education Form */}
                  <AnimatePresence>
                    {state.isEditingEducation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-6 bg-gray-50 rounded-lg border"
                      >
                        <h4 className="font-semibold mb-4">Add Education Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Input
                            placeholder="Institution Name"
                            value={state.educationForm.institution}
                            onChange={(e) => setState({ 
                              educationForm: { ...state.educationForm, institution: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="Degree"
                            value={state.educationForm.degree}
                            onChange={(e) => setState({ 
                              educationForm: { ...state.educationForm, degree: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="Field of Study"
                            value={state.educationForm.field}
                            onChange={(e) => setState({ 
                              educationForm: { ...state.educationForm, field: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="Grade/CGPA"
                            value={state.educationForm.grade}
                            onChange={(e) => setState({ 
                              educationForm: { ...state.educationForm, grade: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="Start Year"
                            value={state.educationForm.startYear}
                            onChange={(e) => setState({ 
                              educationForm: { ...state.educationForm, startYear: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="End Year"
                            value={state.educationForm.endYear}
                            onChange={(e) => setState({ 
                              educationForm: { ...state.educationForm, endYear: e.target.value }
                            })}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addEducation} className="bg-green-600 hover:bg-green-700">
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setState({ isEditingEducation: false })}
                          >
                            Cancel
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Education List */}
                  <div className="space-y-4">
                    {state.educations.map((edu) => (
                      <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{edu.degree}</h4>
                            <p className="text-blue-600 font-medium mb-1">{edu.institution}</p>
                            <p className="text-gray-600 text-sm mb-1">{edu.field}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{edu.startYear} - {edu.endYear}</span>
                              <span>{edu.grade}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteEducation(edu.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills Section */}
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">IT Skills</h3>
                    <Button 
                      onClick={() => setState({ isEditingSkills: true })}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>

                  {/* Add Skill Form */}
                  <AnimatePresence>
                    {state.isEditingSkills && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-6 bg-gray-50 rounded-lg border"
                      >
                        <h4 className="font-semibold mb-4">Add Skill</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Input
                            placeholder="Skill Name"
                            value={state.skillForm.name}
                            onChange={(e) => setState({ 
                              skillForm: { ...state.skillForm, name: e.target.value }
                            })}
                          />
                          <Input
                            placeholder="Experience (e.g., 3 years)"
                            value={state.skillForm.experience}
                            onChange={(e) => setState({ 
                              skillForm: { ...state.skillForm, experience: e.target.value }
                            })}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addSkill} className="bg-green-600 hover:bg-green-700">
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setState({ isEditingSkills: false })}
                          >
                            Cancel
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Skills List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {state.skills.map((skill) => (
                      <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900">{skill.name}</h4>
                            <p className="text-sm text-gray-600">{skill.experience}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteSkill(skill.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}