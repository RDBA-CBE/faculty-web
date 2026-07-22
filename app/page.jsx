import Home1Page from "./home1/page";

export const metadata = {
  title: "FacultyPro – Academic Job Portal for Faculty Recruitment",
  description:
    "FacultyPro connects qualified educators with top colleges and universities across India. Browse faculty, professor, and academic job openings today.",
  alternates: {
    canonical: "https://www.facultypro.in",
  },
  openGraph: {
    title: "FacultyPro – Academic Job Portal for Faculty Recruitment",
    description:
      "Browse faculty and academic job openings at top colleges and universities across India.",
    url: "https://www.facultypro.in",
    type: "website",
  },
};

export default function App() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.facultypro.in/#organization",
                name: "FacultyPro",
                url: "https://www.facultypro.in/",
                logo: "https://www.facultypro.in/assets/images/footer_logo.png",
                description:
                  "FacultyPro connects educators with faculty and academic job opportunities at colleges and universities across India.",
              },
              {
                "@type": "WebSite",
                "@id": "https://www.facultypro.in/#website",
                name: "FacultyPro",
                url: "https://www.facultypro.in/",
                publisher: {
                  "@id": "https://www.facultypro.in/#organization",
                },
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://www.facultypro.in/jobs?search={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is FacultyPro?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "FacultyPro is an academic recruitment platform that connects qualified educators with colleges and institutions seeking faculty members and academic professionals.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How can I apply for a faculty position?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Candidates can create a profile, upload their resume, and apply directly to available faculty positions through the FacultyPro portal.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How can institutions post job vacancies?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Institutions can register on the platform, create an institutional profile, and publish faculty job openings to attract qualified candidates.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
      <Home1Page />
    </main>
  );
}
