import { Phone } from "lucide-react";
import * as Yup from "yup";

export const jobApplicationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
  experience: Yup.string().required("Experience is required"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
  resume: Yup.mixed()
    .required("Resume is required")
    .test(
      "fileType",
      "Only PDF and DOC/DOCX files are allowed",
      (value: any) => {
        if (!value) return false;
        const allowedTypes: any = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        return allowedTypes.includes(value.type);
      },
    )
    .test("fileSize", "File size must be less than 12MB", (value: any) => {
      if (!value) return false;
      return value.size <= 12 * 1024 * 1024;
    }),
});

export const login = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const register = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  password_confirm: Yup.string().required("Password Confirm is required"),
});

export const user = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
  current_location: Yup.string().required(" Location is required"),
  experience: Yup.string().required("Experience is required"),
  gender: Yup.string().required("Gender is required"),
});

export const userResume = Yup.object({
  resume: Yup.mixed()
    .required("Resume is required")
    .test(
      "fileValidation",
      "Only PDF/DOC/DOCX files under 12MB are allowed",
      (file: any) =>
        file &&
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type) &&
        file.size <= 12 * 1024 * 1024
    ),
});

