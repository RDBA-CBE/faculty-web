"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Star,
  Loader,
  Building,
  MapPin,
  Calendar,
  User,
  Mail,
  ArrowRight,
} from "lucide-react";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  useSetState,
  Failure,
  Success,
  capitalizeFLetter,
} from "@/utils/function.utils";
import Models from "@/imports/models.import";
import * as Validation from "@/utils/validation.utils";
import TextArea from "./textArea";

const FeedbackForm = ({ token: propToken }) => {
  console.log("✌️propToken --->", propToken);
  const router = useRouter();

  const [state, setState] = useSetState({
    loading: false,
    token: "",
    job: null,
    round: null,
    candidate: null,
    score: 0,
    hoverScore: 0,
    feedback: "",
    btnLoading: false,
  });

  /* ---------------- TOKEN FROM HASH ---------------- */

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (propToken) {
        fetchInterviewDetails();
      }
    }
  }, [propToken]);

  /* ---------------- FETCH SAMPLE DATA ---------------- */

  const fetchInterviewDetails = async () => {
    try {
      setState({ loading: true });
      const res: any = await Models.applications.interview_feedback(propToken);
      console.log("✌️res --->", res);
      // simulate API response - using your actual data structure

      setState({
        detail: res,
        job: res?.applications?.length > 0 && res.applications?.[0],
        round: res.round,
        candidate: res.candidate,
        loading: false,
      });

      if (res?.applications?.length > 0) {
        if (res?.applications?.[0]?.interview_slots?.length > 0) {
          setState({
            interview_slot: res?.applications?.[0]?.interview_slots?.[0],
          });
        }
      }
      setState({ loading: false });
    } catch (error) {
      if (error?.data?.error) {
        Failure(capitalizeFLetter(error?.data?.error));
      }
      console.log("✌️error --->", error);
      setState({ loading: false });
    }
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    console.log("✌️handleSubmit --->");
    try {
      setState({ btnLoading: true });

      const body = {
        interview_slot_id: state.interview_slot?.id,
        panel_id: state.interview_slot?.panel_ids?.[0],
        application_id: state.interview_slot?.application_ids?.[0],
        score: state.score,
        feedback_text: state.feedback_text,
      };
      console.log("✌️body --->", body);

      await Validation.interview_feedback.validate(body, { abortEarly: false });

      const res = await Models.applications.create_interview_feedback(body);
      console.log("✌️res --->", res);

      setState({ btnLoading: false });

      Success("Feedback submitted successfully!");
      router.push("/jobs");
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
        if (error?.data?.error) {
          Failure(capitalizeFLetter(error?.data?.error));
        }

      }
    }
  };

  /* ---------------- HELPER FUNCTIONS ---------------- */

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
    if (!state.job?.locations) return "";
    return state.job.locations.map((loc) => loc.city).join(", ");
  };

  /* ---------------- LOADING ---------------- */

  if (state.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
        {/* JOB DETAILS */}

        <div className="border-b pb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {state.job?.job_title}
          </h2>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              {state.job?.job_detail?.college?.name}
            </span>

            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {getLocationNames()}
              {state.job?.job_detail?.locations
                ?.map((item) => item?.city)
                .join(", ")}
            </span>

            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(state.detail?.scheduled_date)}
            </span>
          </div>

          {/* Additional job details */}
          <div className="mt-3 text-sm text-gray-600">
            {state.job?.department && (
              <p className="mt-1">
                <span className="font-medium">Department:</span>{" "}
                {state.job?.department?.department_name}
              </p>
            )}
            {state.interview_slot?.round_name && (
              <p className="mt-1">
                <span className="font-medium">Round:</span>{" "}
                {state.interview_slot.round_name}
              </p>
            )}
            {state.interview_slot?.status && (
              <p className="mt-1">
                <span className="font-medium">Status:</span>{" "}
                {state.interview_slot.status}
              </p>
            )}
            {/* {state.job?.experiences && (
              <p className="mt-1">
                <span className="font-medium">Experience:</span>{" "}
                {state.job.experiences.name}
              </p>
            )} */}
          </div>
        </div>

        {/* CANDIDATE */}

        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
            {state.job?.applicant_name?.charAt(0)}
          </div>

          <div>
            <p className="font-medium">{state.job?.applicant_name}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {state.job?.email}
            </p>
          </div>
        </div>

        {/* RATING */}

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">
            Candidate Rating
          </label>

          <div className="flex gap-1">
            {[...Array(10)].map((_, index) => {
              const ratingValue = index + 1;

              return (
                <button
                  key={ratingValue}
                  type="button"
                  onClick={() => setState({ score: ratingValue })}
                  onMouseEnter={() => setState({ hoverScore: ratingValue })}
                  onMouseLeave={() => setState({ hoverScore: 0 })}
                >
                  <Star
                    className={`h-7 w-7 transition ${
                      ratingValue <= (state.hoverScore || state.score)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-500">
            {state.score ? `${state.score} / 10 rating` : "Select rating"}
          </p>
        </div>

        {/* FEEDBACK */}

        <div className="space-y-2">
          <TextArea
            title="Feedback"
            rows={6}
            value={state.feedback_text}
            onChange={(e) => setState({ feedback_text: e.target.value })}
            className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Write interview feedback..."
            required
            error={state.errors?.feedback_text}
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#1d1d57] hover:bg-amber-500 text-white font-bold rounded-3xl flex items-center justify-center gap-2"
          disabled={state.btnLoading}
        >
          {state.btnLoading ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : (
            "Submit Feedback"
          )}

          {!state.btnLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackForm;
