import React, { useState } from "react";
import { Plus, X, Upload } from "lucide-react";

const faqData = [
  {
    id: "01",
    question: "Can I upload a CV?",
    answer:
      "Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in.",
  },
  {
    id: "02",
    question: "How long will the recruitment process take?",
    answer: "Recruitment timeline depends on the role.",
  },
  {
    id: "03",
    question: "Do you recruit for Graduates, Apprentices and Students?",
    answer: "Yes, based on job openings.",
  },
  {
    id: "04",
    question: "What does the recruitment and selection process involve?",
    answer: "Screening, interviews and final selection.",
  },
  {
    id: "05",
    question:
      "Can I receive notifications for any future jobs that may interest me?",
    answer: "Yes, subscribe for alerts.",
  },
];

const FaqResumeSection = () => {
  const [active, setActive] = useState("01");

  return (
    <section className="section-wid py-20 ">
      <div className=" grid lg:grid-cols-3 " style={{columnGap:"40px"}}>
        {/* LEFT SIDE - FAQ (WIDER) */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-10">
            There are many variations of passages of Lorem Ipsum available.
          </p>

          <div className="space-y-8">
            {faqData.map((item) => (
              <div
                key={item.id}
                className={` p-6 transition ${
                  active === item.id
                    ? "rounded-2xl bg-[#01014B0D] shadow-md"
                    : "border-b border-gray-300"
                }`}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setActive(active === item.id ? "" : item.id)}
                >
                  <div className="flex gap-5 items-center">
                    <span className="text-2xl font-bold text-black">
                      {item.id}
                    </span>
                    <h4 className="sub-ti font-bold">
                      {item.question}
                    </h4>
                  </div>

                  {active === item.id ? (
                    <div className="bg-[#0a1551] rounded-full p-1">
                      <X className="text-white h-5 w-5" />
                    </div>
                  ) : (
                    <div className="border border-[#0a1551] rounded-full p-1">
                      <Plus className="h-5 w-5 text-[#0a1551]" />
                    </div>
                  )}
                </div>

                {active === item.id && (
                  <p className="text-gray-600 mt-4 pl-14">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - SMALLER FORM */}
        <div
          className="relative rounded-xl overflow-hidden min-h-[650px]"
          style={{
            backgroundImage: "url('/assets/images/Faculty/resume_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width:"100%",
            height:"100%",
          }}
        >
          {/* Dark Overlay */}

          {/* <div className="relative p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Drop Your Resume Here</h3>
            <p className="text-gray-300 mb-8 text-sm">
              Submit your resume and grow with us
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent border border-white/30 p-3 rounded-md placeholder-gray-300 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email ID"
                className="w-full bg-transparent border border-white/30 p-3 rounded-md placeholder-gray-300 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-transparent border border-white/30 p-3 rounded-md placeholder-gray-300 focus:outline-none"
              />

              <select className="w-full bg-transparent border border-white/30 p-3 rounded-md text-gray-200 focus:outline-none">
                <option className="text-black">Select Job Position</option>
              </select>

              <div className="relative">
                <input
                  type="file"
                  className="w-full bg-transparent border border-white/30 p-3 rounded-md text-gray-300 file:hidden"
                />
                <Upload className="absolute right-3 top-3 text-gray-300 w-5 h-5" />
              </div>

              <textarea
                rows="4"
                placeholder="Message"
                className="w-full bg-transparent border border-white/30 p-3 rounded-md placeholder-gray-300 focus:outline-none"
              ></textarea>

              <button
                type="submit"
                className="bg-[#F2B31D] hover:bg-[#F2B31D] text-black font-semibold px-6 py-2 rounded-full mt-4 transition"
              >
                Send application
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FaqResumeSection;
