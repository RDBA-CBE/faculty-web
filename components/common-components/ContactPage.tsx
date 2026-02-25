"use client";

export default function ContactPage() {
  return (
    <main className="bg-gray-50">
      {/* ================= HERO ================= */}
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
            Contact & Support
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            We’re here to assist faculty members and institutions every step of the way.
          </p>
        </div>
      </section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Email Support",
              value: "support@facultyweb.com",
              img: "https://img.icons8.com/fluency/96/email.png",
            },
            {
              title: "Phone Support",
              value: "+91 90000 00000",
              img: "https://img.icons8.com/fluency/96/phone.png",
            },
            {
              title: "Office Hours",
              value: "Mon – Fri, 9:00 AM – 6:00 PM",
              img: "https://img.icons8.com/fluency/96/time.png",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-8 text-center hover:shadow-lg transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SUPPORT CATEGORIES ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            How Can We Help?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Faculty Support",
                desc: "Help with profile setup, applications, and job listings.",
                img: "https://img.icons8.com/fluency/96/teacher.png",
              },
              {
                title: "Institution Support",
                desc: "Assistance with job postings and recruitment.",
                img: "https://img.icons8.com/fluency/96/university.png",
              },
              {
                title: "Technical Support",
                desc: "Website access, login issues, and system help.",
                img: "https://img.icons8.com/fluency/96/settings.png",
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

      {/* ================= LOCATION SECTION ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              alt="Office location"
              className="rounded-xl shadow-lg"
            />

            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Our Office
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Faculty Web operates remotely with support teams across India.
                Our goal is to provide reliable assistance to both faculty members
                and academic institutions nationwide.
              </p>
              <p className="text-gray-600">
                📍 India
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}