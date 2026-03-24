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
  User,
  FileText,
  School,
  Briefcase,
  BrainCircuit,
  MessageSquare,
  Smile,
  Award,
  CheckCircle2,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

const RatingField = ({
  label,
  icon: Icon,
  rating,
  onRatingChange,
  comment,
  onCommentChange,
}) => (
  <div className="rounded-xl border bg-slate-50/50 p-5 transition-all hover:border-indigo-200 hover:shadow-sm">
    <div className="mb-4 flex items-center gap-3">
      <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-100">
        {Icon && <Icon className="h-5 w-5 text-indigo-600" />}
      </div>
      <h4 className="font-semibold text-gray-900">{label}</h4>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Rating
        </label>
        <select
          value={rating}
          onChange={(e) => onRatingChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-shadow"
        >
          <option value="">Select Level</option>
          {ratingOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Comments
        </label>
        <textarea
          rows={2}
          placeholder="Add details and observations..."
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-shadow resize-none"
        />
      </div>
    </div>
  </div>
);

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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="section-wid mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#1E3786] tracking-tight">
            Interview Feedback
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Please review the candidate&apos;s performance and provide your
            detailed assessment below.
          </p>
        </div>

        {/* Job & Interview Card */}
        <Card className="border-t-4 border-t-[#1E3786] shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {state.job?.job_detail?.college?.college_logo && (
                <div className="flex-shrink-0">
                  <img
                    src={state.job?.job_detail?.college?.college_logo}
                    alt="College Logo"
                    className="w-20 h-20 rounded-xl bg-white object-contain border border-gray-100 shadow-sm p-1"
                  />
                </div>
              )}
              <div className="flex-grow space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {state.job?.job_title}
                  </h2>
                  <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                    {state.interview_slot?.round_name} Round
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-indigo-500" />
                    {state.job?.job_detail?.college?.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-indigo-500" />
                    {state.job?.job_detail?.locations
                      ?.map((l) => l.city)
                      .join(", ")}
                  </span>
                  <span className="flex items-center gap-2 text-gray-900 font-medium bg-gray-50 px-2 py-0.5 rounded">
                    <Calendar className="h-4 w-4 text-indigo-500" />
                    {formatScheduleDateTime(
                      state.interview_slot?.scheduled_date,
                      state.interview_slot?.scheduled_time
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Candidate Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <User className="h-5 w-5 text-indigo-600" />
                Candidate Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg ring-2 ring-white shadow-sm">
                    {state.job?.applicant_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg leading-tight">
                      {state.job?.applicant_name}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Mail className="h-3.5 w-3.5" />
                      {state.job?.email}
                    </p>
                  </div>
                </div>
              </div>
              {state.job?.resume && (
                <Link
                  href={state.job?.resume}
                  target="_blank"
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-[#1E3786] rounded-lg hover:bg-indigo-800 transition-colors gap-2 shadow-sm"
                >
                  <FileText className="h-4 w-4" />
                  View Resume
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Evaluator Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                Evaluator Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </p>
                  <p className="font-medium text-gray-900">
                    {state.panels?.name || "N/A"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Designation
                    </p>
                    <p className="font-medium text-gray-900 text-sm">
                      {state.panels?.designation || "N/A"}
                    </p>
                  </div>
                  {state.job?.email}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {state.panels?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Feedback Form */}
        <Card className="shadow-md border-0 ring-1 ring-gray-200">
          <CardHeader className="bg-gray-50/50 border-b pb-4">
            <CardTitle className="text-xl text-[#1E3786]">
              Evaluation Form
            </CardTitle>
            <CardDescription>
              Fill in the details below based on the interview performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {/* Verification */}
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <label className="block text-sm font-bold text-amber-900 mb-2">
                Applicant Verification
              </label>
              <div className="flex items-center gap-4">
                <p className="text-sm text-amber-800">
                  Is the candidate same as the applicant?
                </p>
                <select
                  value={state.is_same_as_applicant}
                  onChange={(e) =>
                    setState({ is_same_as_applicant: e.target.value })
                  }
                  className="rounded-md border-amber-200 text-sm py-1.5 pl-3 pr-8 focus:ring-amber-500 focus:border-amber-500 bg-white"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <Separator />

            {/* General Remarks */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <School className="h-4 w-4 text-indigo-600" />
                  <h4 className="font-semibold text-gray-800">
                    Academic Record
                  </h4>
                </div>
                <textarea
                  rows={4}
                  placeholder="Remarks on academic background..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-shadow resize-none"
                  value={state.academic_record_remark}
                  onChange={(e) =>
                    setState({ academic_record_remark: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="h-4 w-4 text-indigo-600" />
                  <h4 className="font-semibold text-gray-800">
                    Experience
                  </h4>
                </div>
                <textarea
                  rows={4}
                  placeholder="Remarks on work experience..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-shadow resize-none"
                  value={state.experience_remark}
                  onChange={(e) =>
                    setState({ experience_remark: e.target.value })
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Detailed Ratings */}
            <div className="space-y-6">
              <RatingField
                label="Knowledge & Technical Skills"
                icon={BrainCircuit}
                rating={state.knowledge_rating}
                onRatingChange={(v) => setState({ knowledge_rating: v })}
                comment={state.knowledge_detail}
                onCommentChange={(v) => setState({ knowledge_detail: v })}
              />

              <RatingField
                label="Communication Skills"
                icon={MessageSquare}
                rating={state.communication_skills_rating}
                onRatingChange={(v) =>
                  setState({ communication_skills_rating: v })
                }
                comment={state.communication_skills_comment}
                onCommentChange={(v) =>
                  setState({ communication_skills_comment: v })
                }
              />

              <RatingField
                label="Attitude & Behavior"
                icon={Smile}
                rating={state.attitude_rating}
                onRatingChange={(v) => setState({ attitude_rating: v })}
                comment={state.attitude_comment}
                onCommentChange={(v) => setState({ attitude_comment: v })}
              />

              <RatingField
                label="Overall Assessment"
                icon={Target}
                rating={state.overall_assessment_rating}
                onRatingChange={(v) =>
                  setState({ overall_assessment_rating: v })
                }
                comment={state.overall_assessment_remark}
                onCommentChange={(v) =>
                  setState({ overall_assessment_remark: v })
                }
              />
            </div>

            <Separator />

            {/* Final Recommendation */}
            <div className="bg-indigo-50/50 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-center gap-2 mb-4 text-[#1E3786]">
                <Award className="h-6 w-6" />
                <h3 className="text-lg font-bold">Final Recommendation</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Position Recommendation
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Recommended position or level..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                    value={state.position_recommendation}
                    onChange={(e) =>
                      setState({ position_recommendation: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Supporting Comments
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Additional comments justifying the recommendation..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                    value={state.recommendation_comments}
                    onChange={(e) =>
                      setState({ recommendation_comments: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSubmit}
                disabled={state.btnLoading}
                className="px-8 py-6 bg-[#1E3786] hover:bg-[#152861] text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 flex items-center gap-2 text-base"
              >
                {state.btnLoading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    Submit Feedback
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackForm;
