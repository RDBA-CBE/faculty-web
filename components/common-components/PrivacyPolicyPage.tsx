"use client";

import Footer from "./new_components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
    <main className="bg-white">
      {/* HEADER */}
      <section className="section-wid border-b">
        <div className="mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-wid mx-auto px-6 py-16 text-gray-700 leading-relaxed">
        <div className="space-y-8">
          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">1. Introduction</h2>
            <p>
              Faculty Web respects your privacy and is committed to protecting
              the personal information you share with us. This Privacy Policy
              explains how we collect, use, and safeguard your data.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details such as name, email address, and phone number</li>
              <li>Professional information including qualifications and experience</li>
              <li>Usage data related to your interaction with the platform</li>
            </ul>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To operate and maintain the Faculty Web platform</li>
              <li>To connect faculty members with institutions</li>
              <li>To improve our services and user experience</li>
            </ul>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">4. Data Protection</h2>
            <p>
              We implement reasonable technical and organizational measures to
              protect your information. However, no online system is completely
              secure.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">
              5. Third-Party Services
            </h2>
            <p>
              Faculty Web may use trusted third-party services to support
              platform operations. These services are required to protect your
              information.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">6. Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal
              information by contacting us.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">7. Contact</h2>
            <p>
              For privacy-related questions, contact us at:
              <br />
              <span className="font-medium">support@facultyweb.com</span>
            </p>
          </div>
        </div>
      </section>
    </main>

   
    </>
  );
}