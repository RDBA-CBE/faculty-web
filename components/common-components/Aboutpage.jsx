"use client";

export default function AboutPage() {
  return (
    <main className="bg-gray-50">
      {/* ================= HERO SECTION ================= */}
    

      <section
        className="relative h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About Faculty Web
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            Connecting faculty members with the right academic opportunities.
          </p>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
            alt="Faculty discussion"
            className="rounded-xl shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Faculty Web is a dedicated academic job platform designed
              specifically for faculty members and educational institutions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our goal is to simplify recruitment by providing verified job
              listings, clear job details, and a transparent hiring process.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            How Faculty Web Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Profile",
                desc: "Faculty members create a profile with qualifications and experience.",
                img: "https://img.icons8.com/fluency/96/user-male-circle.png",
              },
              {
                step: "02",
                title: "Explore Jobs",
                desc: "Browse verified academic job opportunities from institutions.",
                img: "https://img.icons8.com/fluency/96/search.png",
              },
              {
                step: "03",
                title: "Apply & Connect",
                desc: "Apply directly and connect with institutions easily.",
                img: "https://img.icons8.com/fluency/96/handshake.png",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border rounded-xl p-8 text-center hover:shadow-lg transition"
              >
                <span className="text-indigo-600 font-bold text-lg">
                  {item.step}
                </span>

                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto my-4"
                />

                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Why choose faculty web"
              className="rounded-xl shadow-lg"
            />

            <div>
              <h2 className="text-3xl font-semibold mb-6">
                Why Choose Faculty Web
              </h2>

              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">✔</span>
                  Verified institutions and authentic job listings
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">✔</span>
                  Faculty-focused platform built for academics
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">✔</span>
                  Transparent and simple application process
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">✔</span>
                  Saves time for both faculty and institutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURE CARDS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Trusted Institutions",
                img: "https://img.icons8.com/fluency/96/university.png",
                desc: "Only verified academic institutions are listed.",
              },
              {
                title: "Qualified Faculty",
                img: "https://img.icons8.com/fluency/96/teacher.png",
                desc: "Connect with experienced and skilled educators.",
              },
              {
                title: "Easy Hiring",
                img: "https://img.icons8.com/fluency/96/handshake.png",
                desc: "Smooth and efficient recruitment process.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border rounded-xl p-8 text-center hover:shadow-lg transition"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}