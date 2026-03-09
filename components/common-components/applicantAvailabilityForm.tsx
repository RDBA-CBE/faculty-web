"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Loader,
  Building,
  MapPin,
  Calendar,
  Mail,
  ArrowRight,
  CheckCircle,
  XCircle,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSetState, Failure, Success } from "@/utils/function.utils";
import Models from "@/imports/models.import";
import TextArea from "./textArea";
import { TextInput } from "./textInput";
import * as Yup from "yup";
import * as Validation from "@/utils/validation.utils";

const ApplicantAvailabilityForm = ({ token: propToken }) => {
  console.log("✌️propToken --->", propToken);
  const router = useRouter();

  const [state, setState] = useSetState({
    loading: true,
    token: propToken || "",
    job: null,
    round: null,
    candidate: null,
    isAvailable: true,
    availableTime: "",
    reason: "",
    btnLoading: false,
    errors: {},
    response_from_applicant: false,
  });
  console.log("✌️response_from_applicant --->", state.response_from_applicant);

  useEffect(() => {
    if (propToken) {
      setState({ token: propToken });
      fetchInterviewDetails(propToken);
    }
  }, [propToken]);

  const fetchInterviewDetails = async (token) => {
    try {
      const res: any = await Models.applications.get_applicant_feedback(token);
      console.log("✌️res --->", res);
      setState({
        job: res?.applications?.length > 0 ? res?.applications?.[0] : null,
        loading: false,
        detail:res
      });
      if (res?.applications?.length > 0) {
        if (res?.applications?.[0]?.interview_slots?.length > 0) {
          setState({
            response_from_applicant:
              res?.applications?.[0]?.interview_slots?.[0]
                ?.response_from_applicant,
          });
        }
      }
    } catch (error) {
      Failure("Invalid or expired link");
      setState({ loading: false });
    }
  };

  console.log("✌️detail --->", state.detail);

  const handleSubmit = async () => {
    try {
      setState({ btnLoading: true, errors: {} });

      const validation = {
        isAvailable: state.isAvailable,
        availableTime: state.availableTime,
        response_from_applicant: state.response_from_applicant,
      };

      await Validation.applicant_feedback.validate(validation, {
        abortEarly: false,
      });

      const body = {
        is_available: state.isAvailable,
        feedback_text:
          state.isAvailable && state.response_from_applicant
            ? ""
            : state.availableTime,
            pannel_id:state.detail?.panel_ids?.[0]
      };
      console.log('✌️body --->', body);

      const res = await Models.applications.create_applicant_feedback(body,propToken);
console.log('✌️res --->', res);

      Success("Availability updated successfully!");
      // router.push("/");
      setState({ btnLoading: false, errors: {} });

    } catch (error) {
      setState({ btnLoading: false });
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err?.message;
        });
        console.log("✌️validationErrors --->", validationErrors);

        setState({ errors: validationErrors });
      } else {
        console.log("error", error);

        Failure(error.error || "An error occurred. Please try again.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDepartmentNames = () => {
    if (!state.job?.department) return "";
    return state.job.department.map((dept) => dept.name).join(", ");
  };

  const getLocationNames = () => {
    if (!state.job?.job_detail?.locations) return "";
    return state.job?.job_detail?.locations.map((loc) => loc.city).join(", ");
  };

  if (state.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#1d1d57] to-[#F2B31D] p-6 text-white">
          <h1 className="text-2xl font-bold">Interview Availability</h1>
          <p className="text-gray-100 mt-1">
            Please confirm your availability for the scheduled interview
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* JOB DETAILS CARD */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
            <div className="flex items-start gap-4">
              {state.job?.college?.college_logo && (
                <img
                  src={state.job.college.college_logo}
                  alt="College Logo"
                  className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                />
              )}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {state.job?.job_title}
                </h2>
                <p className="text-gray-600 font-medium mt-1">
                  {state.job?.college?.name || state.job?.institution?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="h-4 w-4 text-[#F2B31D]" />
                <span>{state.job?.job_detail?.college?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building className="h-4 w-4 text-[#F2B31D]" />
                <span>{state.job?.department?.department_name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-[#F2B31D]" />
                <span>{getLocationNames()}</span>
              </div>
            </div>
          </div>

          {state.job?.interview_slots?.length > 0 &&
            state.job?.interview_slots?.[0] && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#1d1d57]" />
                  Interview Schedule
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Round:</span>
                    <span className="font-semibold text-gray-900">
                      {state.job?.interview_slots?.[0]?.round_name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(
                        state.job?.interview_slots?.[0]?.scheduled_date
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="px-3 py-1 bg-[#F2B31D] bg-opacity-20 text-[#1d1d57] rounded-full text-sm font-medium">
                      {state.job?.interview_slots?.[0]?.status}
                    </span>
                  </div>
                </div>
              </div>
            )}

          {/* AVAILABILITY SECTION */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Your Availability
            </h3>

            {/* TOGGLE BUTTONS */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setState({ isAvailable: true, errors: {} })}
                className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  state.isAvailable
                    ? "bg-[#1d1d57] text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 border-2 border-gray-200 hover:border-[#F2B31D]"
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                Available
              </button>
              <button
                onClick={() => setState({ isAvailable: false, errors: {} })}
                className={`flex-1   px-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  !state.isAvailable
                    ? "bg-[#F2B31D] text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 border-2 border-gray-200 hover:border-[#1d1d57]"
                }`}
              >
                <XCircle className="h-5 w-5" />
                Not Available
              </button>
            </div>

            {/* CONDITIONAL FIELDS */}
            {!state.isAvailable && state.response_from_applicant && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <TextArea
                    title=" When are you available?"
                    type="text"
                    placeholder="e.g., Tomorrow 2 PM or Next Monday"
                    value={state.availableTime}
                    onChange={(e) =>
                      setState({
                        availableTime: e.target.value,
                        errors: { ...state.errors, availableTime: undefined },
                      })
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#F2B31D] ${
                      state.errors?.availableTime
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    required
                    error={state.errors?.availableTime}
                  />
                </div>
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            onClick={handleSubmit}
            disabled={state.btnLoading}
            className="w-full py-4 bg-[#1d1d57] hover:bg-amber-500 text-white font-bold rounded-3xl flex items-center justify-center gap-2"

            // className="w-full from-[#1d1d57]  text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {state.btnLoading ? (
              <Loader className="animate-spin h-5 w-5" />
            ) : (
              <>
                Submit Response
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantAvailabilityForm;
