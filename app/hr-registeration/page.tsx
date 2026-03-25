"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSetState, Success, Failure, Dropdown } from "@/utils/function.utils";
import { TextInput } from "@/components/common-components/textInput";
import CustomPhoneInput from "@/components/common-components/phoneInput";

const HRRegistrationPage = () => {
  const router = useRouter();
  const [state, setState] = useSetState({
    username: "",
    email: "",
    institution: null,
    college: null,
    phone: "",
    password: "",
    confirm_password: "",
    showPassword: false,
    showConfirmPassword: false,

    // Dropdown state
    institutionOptions: [],
    institutionLoading: false,
    institutionPage: 1,
    institutionNext: null,

    collegeOptions: [],
    collegeLoading: false,
    collegePage: 1,
    collegeNext: null,

    submitting: false,
    errors: {},
  });

  // useEffect(() => {
  //   loadInstitutions(1);
  // }, []);

  // useEffect(() => {
  //   if (state.institution) {
  //     loadColleges(1, "", false, state.institution);
  //   } else {
  //     setState({ collegeOptions: [], college: null });
  //   }
  // }, [state.institution]);

  // const loadInstitutions = async (page, search = "", loadMore = false) => {
  //   try {
  //     setState({ institutionLoading: true });
  //     const res = await Models.institution.list(page, { search });
  //     const dropdownOptions = Dropdown(res?.results, "institution_name");
  //     setState({
  //       institutionOptions: loadMore
  //         ? [...state.institutionOptions, ...dropdownOptions]
  //         : dropdownOptions,
  //       institutionNext: res?.next,
  //       institutionPage: page,
  //       institutionLoading: false,
  //     });
  //   } catch (error) {
  //     setState({ institutionLoading: false });
  //   }
  // };

  // const loadColleges = async (
  //   page,
  //   search = "",
  //   loadMore = false,
  //   institution,
  // ) => {
  //   try {
  //     setState({ collegeLoading: true });
  //     const body = { search };
  //     if (institution) {
  //       body.institution = institution.value;
  //     }
  //     const res = await Models.college.list(page, body);
  //     const dropdownOptions = Dropdown(res?.results, "college_name");
  //     setState({
  //       collegeOptions: loadMore
  //         ? [...state.collegeOptions, ...dropdownOptions]
  //         : dropdownOptions,
  //       collegeNext: res?.next,
  //       collegePage: page,
  //       collegeLoading: false,
  //     });
  //   } catch (error) {
  //     setState({ collegeLoading: false });
  //   }
  // };

  const handleFormChange = (field, value) => {
    setState({ [field]: value, errors: { ...state.errors, [field]: "" } });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setState({ submitting: true, errors: {} });

  //   const errors = {};
  //   if (!state.username) errors.username = "Username is required";
  //   if (!state.email) errors.email = "Email is required";
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email))
  //     errors.email = "Please enter a valid email address";
  //   if (!state.institution) errors.institution = "Institution is required";
  //   if (!state.college) errors.college = "College is required";
  //   if (!state.phone) errors.phone = "Phone number is required";
  //   if (!state.password) errors.password = "Password is required";
  //   if (state.password !== state.confirm_password)
  //     errors.confirm_password = "Passwords do not match";

  //   if (Object.keys(errors).length > 0) {
  //     setState({ errors, submitting: false });
  //     return;
  //   }

  //   try {
  //     const body = {
  //       username: state.username,
  //       email: state.email,
  //       phone: state.phone,
  //       password: state.password,
  //       password_confirm: state.confirm_password,
  //       role: "hr",
  //       institution: state.institution.value,
  //       college: state.college.value,
  //     };

  //     await Models.auth.createUser(body);

  //     Success("HR Registration successful! Please login.");
  //     router.push("/login");
  //   } catch (error) {
  //     const apiErrors = error?.response?.data;
  //     if (apiErrors) {
  //       setState({ errors: apiErrors });
  //       const errorMessage = Object.values(apiErrors).flat().join(" ");
  //       Failure(errorMessage || "Registration failed. Please try again.");
  //     } else {
  //       Failure("Registration failed. Please try again.");
  //     }
  //   } finally {
  //     setState({ submitting: false });
  //   }
  // };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center py-12 lg:py-20">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-[#151515]">
              HR Registration
            </h1>
            <p className="text-gray-600 mt-2">
              Create your account to start managing recruitments.
            </p>
          </div>
          <form
          //  onSubmit={handleSubmit} 
           className="space-y-6">
            <TextInput
              title="Username"
              placeholder="Enter your Username"
              value={state.username}
              onChange={(e) => handleFormChange("username", e.target.value)}
              error={state.errors.username}
              required
            />
            <TextInput
              title="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={state.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              error={state.errors.email}
              required
            />

            <TextInput
              title="Institution Name"
              type="text"
              placeholder="Enter your institution name"
           
              value={state.institution}
              onChange={(e) => handleFormChange("institution", e.target.value)}
              error={state.errors.institution}
              required
            />

            <TextInput
              title="college Name"
              type="text"
              placeholder="Enter your college name"
           
              value={state.college}
              onChange={(e) => handleFormChange("college", e.target.value)}
              error={state.errors.college}
              required
            />
           
            
            <CustomPhoneInput
              title="Phone Number"
              value={state.phone}
              onChange={(value) => handleFormChange("phone", value)}
              error={state.errors.phone}
              required
            />
            
            
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-[#1E3786] text-white py-3 rounded-lg font-semibold hover:bg-[#162a69] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Registering..." : "Register"}
            </button>
          </form>
          
        </div>
      </div>
    </section>
  );
};

export default HRRegistrationPage;
