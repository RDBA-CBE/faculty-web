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
  Building2,
  Star,
} from "lucide-react";

import * as Yup from "yup";
import { Button } from "@/components/ui/button";

import {
  useSetState,
  Failure,
  Success,
  capitalizeFLetter,
  formatScheduleDateTime,
} from "@/utils/function.utils";

import Models from "@/imports/models.import";
import Link from "next/link";

const ratingOptions = [
  "Strongly Recommended",
  "Recommended",
  "Not Recommended",
  "Strongly Not Recommended",
];

const FeedbackForm = ({ token }) => {
  const router = useRouter();

  const [state, setState] = useSetState({
    loading: false,
    btnLoading: false,

    job: null,
    candidate: null,
    round: null,
    interview_slot: null,

    evaluator_name: "",
    email: "",
    position: "",

    is_same_as_applicant: "",

    academic_record_remark: "",
    experience_remark: "",

    knowledge_rating: "",
    knowledge_detail: "",

    communication_skills_rating: "",
    communication_skills_comment: "",

    attitude_rating: "",
    attitude_comment: "",

    overall_assessment_rating: "",
    overall_assessment_remark: "",

    position_recommendation: "",
    recommendation_comments: "",

    errors: {},
  });

  /* ---------------- FETCH INTERVIEW DETAILS ---------------- */

  useEffect(() => {
    if (token) fetchInterviewDetails();
  }, [token]);

  const fetchInterviewDetails = async () => {
    try {
      setState({ loading: true });

      const res: any = await Models.applications.interview_feedback(token);

      setState({
        job: res?.applications?.[0],
        round: res?.round,
        candidate: res?.candidate,
        interview_slot: res?.applications?.[0]?.interview_slots?.[0],
        position: res?.panel?.designation,
        loading: false,
        panels: res?.panels?.length > 0 ? res?.panels[0] : null,
      });
    } catch (error) {
      setState({ loading: false });

      if (error?.data?.error) {
        Failure(capitalizeFLetter(error.data.error));
      }
    }
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    try {
      setState({ btnLoading: true });

      const body = {
        interview_slot_id: state.interview_slot?.id,
        panel_id: state.interview_slot?.panel_ids?.[0],
        application_id: state.interview_slot?.application_ids?.[0],

        is_same_as_applicant:
          state.is_same_as_applicant == "Yes" ? true : false,

        academic_record_remark: state.academic_record_remark,
        experience_remark: state.experience_remark,

        knowledge_rating: state.knowledge_rating,
        knowledge_detail: state.knowledge_detail,

        communication_skills_rating: state.communication_skills_rating,
        communication_skills_comment: state.communication_skills_comment,

        attitude_rating: state.attitude_rating,
        attitude_comment: state.attitude_comment,

        overall_assessment_rating: state.overall_assessment_rating,
        overall_assessment_remark: state.overall_assessment_remark,

        position_recommendation: state.position_recommendation,
        recommendation_comments: state.recommendation_comments,
      };
      console.log("✌️body --->", body);

      await Models.applications.create_interview_feedback(body);
      setState({ btnLoading: false });

      Success("Feedback submitted successfully");

      router.push("/jobs");
    } catch (error) {
      setState({ btnLoading: false });

      if (error?.data?.error) {
        Failure(capitalizeFLetter(error.data.error));
      }
    }
  };

  if (state.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-indigo-50 border rounded-xl shadow">
          {/* JOB TITLE */}

          <div className="text-center  mt-4">
            <h1 className="text-2xl font-bold text-[#1d1d57]">
              Interview Feedback Form
            </h1>

            <p className="text-sm text-gray-500">
              Please provide your evaluation for the candidate interview
            </p>
          </div>

          <div className="p-4 items-center flex gap-4">
            {state.job?.job_detail?.college?.college_logo && (
              <img
                src={state.job?.job_detail?.college?.college_logo}
                alt="College Logo"
                className="w-16 h-16 rounded-xl bg-white object-contain border-2 border-white shadow-md"
              />
            )}
            <div className="space-y-1 ">
              <h2 className="text-xl font-bold text-gray-800">
                {state.job?.job_title}
              </h2>
              <div className=" flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#ffb400]" />
                  {state.job?.job_detail?.college?.name}
                </span>

                {/* <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#ffb400]" />
                  {state.job?.department?.department_name}
                </span> */}

                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#ffb400]" />
                  {state.job?.job_detail?.locations
                    ?.map((l) => l.city)
                    .join(", ")}
                </span>

                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#ffb400]" />
                  {formatScheduleDateTime(
                    state.interview_slot?.scheduled_date,
                    state.interview_slot?.scheduled_time
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* LINE */}

          <div className="border-t"></div>

          {/* CANDIDATE DETAILS */}

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#1d1d57] text-white flex items-center justify-center font-semibold">
                {state.job?.applicant_name?.charAt(0)}
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {state.job?.applicant_name}
                </p>

                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {state.job?.email}
                </p>
              </div>
            </div>

            {state.job?.resume && (
              <Link
                href={state.job?.resume}
                target="_blank"
                className="px-3 py-2 text-sm rounded-lg bg-[#1d1d57] hover:bg-[#ffb400] text-white"
              >
                View Resume
              </Link>
            )}
          </div>
          <div className="border-t"></div>

          <div className="p-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg">
              <span className="text-md font-medium uppercase tracking-wide text-indigo-600">
                Interview Round :
              </span>

              <span className="text-md font-bold">
                {state.interview_slot?.round_name}
              </span>
            </div>
          </div>

          <div className="border-t"></div>

          {/* EVALUATOR DETAILS */}

          <div className=" p-4">
            <h3 className="font-semibold mb-3">Evaluator Details</h3>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-semibold">{state.panels?.name}</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-semibold">{state.panels?.email}</p>
              </div>

              <div>
                <p className="text-gray-500">Designation</p>
                <p className="font-semibold">{state.panels?.designation}</p>
              </div>
            </div>
          </div>
          <div className="border-t"></div>

          {/* APPLICANT CONFIRMATION */}

          <div className=" p-4 space-y-2 ">
            <h3 className="font-semibold">Applicant Verification</h3>

            <select
              value={state.is_same_as_applicant}
              onChange={(e) =>
                setState({ is_same_as_applicant: e.target.value })
              }
              className="w-full border rounded-lg p-3"
            >
              <option value="">Is the candidate same as applicant?</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="border-t"></div>

          {/* ACADEMIC & EXPERIENCE */}

          <div className=" p-4 space-y-2">
            <h3 className="font-semibold">Academic Record</h3>

            <textarea
              rows={3}
              placeholder="Academic record remark"
              className="w-full border rounded-lg p-3"
              value={state.academic_record_remark}
              onChange={(e) =>
                setState({ academic_record_remark: e.target.value })
              }
            />
          </div>
          <div className="border-t"></div>

          <div className=" p-4 space-y-2">
            <h3 className="font-semibold">Experience</h3>

            <textarea
              rows={3}
              placeholder="Experience remark"
              className="w-full border rounded-lg p-3"
              value={state.experience_remark}
              onChange={(e) => setState({ experience_remark: e.target.value })}
            />
          </div>
          <div className="border-t"></div>

          {/* KNOWLEDGE */}

          <div className=" p-4 space-y-2">
            <h3 className="font-semibold">Knowledge</h3>

            <select
              value={state.knowledge_rating}
              onChange={(e) => setState({ knowledge_rating: e.target.value })}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select rating</option>
              {ratingOptions.map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>

            <textarea
              rows={3}
              placeholder="Knowledge detail"
              className="w-full border rounded-lg p-3"
              value={state.knowledge_detail}
              onChange={(e) => setState({ knowledge_detail: e.target.value })}
            />
          </div>
          <div className="border-t"></div>

          {/* COMMUNICATION */}

          <div className=" p-4 space-y-2">
            <h3 className="font-semibold">Communication Skills</h3>

            <select
              value={state.communication_skills_rating}
              onChange={(e) =>
                setState({ communication_skills_rating: e.target.value })
              }
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select rating</option>
              {ratingOptions.map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>

            <textarea
              rows={3}
              placeholder="Communication comment"
              className="w-full border rounded-lg p-3"
              value={state.communication_skills_comment}
              onChange={(e) =>
                setState({ communication_skills_comment: e.target.value })
              }
            />
          </div>
          <div className="border-t"></div>

          {/* ATTITUDE */}

          <div className=" p-4 space-y-2">
            <h3 className="font-semibold">Attitude</h3>

            <select
              value={state.attitude_rating}
              onChange={(e) => setState({ attitude_rating: e.target.value })}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select rating</option>
              {ratingOptions.map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>

            <textarea
              rows={3}
              placeholder="Attitude comment"
              className="w-full border rounded-lg p-3"
              value={state.attitude_comment}
              onChange={(e) => setState({ attitude_comment: e.target.value })}
            />
          </div>
          <div className="border-t"></div>

          {/* OVERALL */}

          <div className=" p-4 space-y-2">
            <h3 className="font-semibold">Overall Assessment</h3>

            <select
              value={state.overall_assessment_rating}
              onChange={(e) =>
                setState({ overall_assessment_rating: e.target.value })
              }
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select rating</option>
              {ratingOptions.map((r, i) => (
                <option key={i}>{r}</option>
              ))}
            </select>

            <textarea
              rows={3}
              placeholder="Overall remark"
              className="w-full border rounded-lg p-3"
              value={state.overall_assessment_remark}
              onChange={(e) =>
                setState({ overall_assessment_remark: e.target.value })
              }
            />
          </div>
          <div className="border-t"></div>

          {/* FINAL RECOMMENDATION */}

          <div className=" p-4 space-y-2 ">
            <h3 className="font-semibold">Position Recommendation</h3>

            <textarea
              rows={3}
              placeholder="Recommendation"
              className="w-full border rounded-lg p-3"
              value={state.position_recommendation}
              onChange={(e) =>
                setState({ position_recommendation: e.target.value })
              }
            />

            <textarea
              rows={4}
              placeholder="Comments Supporting the Recommendation"
              className="w-full border rounded-lg p-3"
              value={state.recommendation_comments}
              onChange={(e) =>
                setState({ recommendation_comments: e.target.value })
              }
            />
          </div>
          <div className=" flex items-center justify-end p-3">
            <Button
              onClick={handleSubmit}
              disabled={state.btnLoading}
              className="  py-3 bg-[#1d1d57] hover:bg-amber-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"
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

        {/* SUBMIT */}
      </div>
    </div>
  );
};

export default FeedbackForm;
