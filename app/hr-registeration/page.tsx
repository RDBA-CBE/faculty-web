"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSetState, Success, Failure } from "@/utils/function.utils";
import { TextInput } from "@/components/common-components/textInput";
import CustomPhoneInput from "@/components/common-components/phoneInput";
import * as Yup from "yup";
import * as Validation from "@/utils/validation.utils";

const HRRegistrationPage = () => {
  const router = useRouter();

  const [state, setState] = useSetState({
    username: "",
    email: "",
    institution: "",
    college: "",
    phone: "",
    password: "",
    confirm_password: "",
    submitting: false,
    errors: {},
  });

  const handleFormChange = (field: string, value: any) => {
    setState({
      [field]: value,
      errors: { ...state.errors, [field]: "" },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setState({ submitting: true });

      const body = {
        username: state.username,
        email: state.email,
        phone: state.phone,
        // password: state.password,
        // password_confirm: state.confirm_password,
        role: "hr",
        institution: state.institution,
        college: state.college,
      };

      await Validation.hrRegistrationSchema.validate(body, {
        abortEarly: false,
      });

      // await Models.auth.createUser(body);

      Success("HR Registration successful!");
      router.push("/login");
    } catch (error: any) {
      Failure("Registration failed");
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err?.message;
        });
        console.log("✌️validationErrors --->", validationErrors);

        setState({ errors: validationErrors });
      } else {
        if (error?.data?.error) {
          // Failure(capitalizeFLetter(error?.data?.error));
          console.log("error", error);
        }
      }
    } finally {
      setState({ submitting: false });
    }
  };

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

          <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your email"
              value={state.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              error={state.errors.email}
              required
            />

            <TextInput
              title="Institution Name"
              placeholder="Enter institution"
              value={state.institution}
              onChange={(e) => handleFormChange("institution", e.target.value)}
              error={state.errors.institution}
              required
            />

            <TextInput
              title="College Name"
              placeholder="Enter college"
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

            {/* <TextInput
              title="Password"
              type="password"
              placeholder="Enter password"
              value={state.password}
              onChange={(e) => handleFormChange("password", e.target.value)}
              error={state.errors.password}
              required
            /> */}

            {/* <TextInput
              title="Confirm Password"
              type="password"
              placeholder="Confirm password"
              value={state.confirm_password}
              onChange={(e) =>
                handleFormChange("confirm_password", e.target.value)
              }
              error={state.errors.confirm_password}
              required
            /> */}

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-[#1E3786] text-white py-3 rounded-lg font-semibold hover:bg-[#162a69] transition disabled:opacity-50"
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
