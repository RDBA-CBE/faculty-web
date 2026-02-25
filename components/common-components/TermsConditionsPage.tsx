"use client";

export default function TermsConditionsPage() {
  return (
    <main className="bg-white">
      {/* HEADER */}
      <section className="section-wid border-b">
        <div className="  mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-gray-500">
            Effective date: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className=" section-wid  mx-auto px-6 py-16 text-gray-700 leading-relaxed">
        <div className="space-y-8">
          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Faculty Web, you agree to comply with and be
              bound by these Terms & Conditions.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">2. User Accounts</h2>
            <p>
              Users must provide accurate, complete, and up-to-date information
              when creating an account on the platform.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">
              3. Platform Usage
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Do not misuse or disrupt the platform</li>
              <li>No false or misleading job postings or profiles</li>
              <li>All activities must comply with applicable laws</li>
            </ul>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">
              4. Content Responsibility
            </h2>
            <p>
              Faculty Web does not guarantee the accuracy of user-generated
              content and is not responsible for third-party postings.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">5. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms without prior notice.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              Faculty Web shall not be liable for any indirect, incidental, or
              consequential damages resulting from platform use.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">7. Changes to Terms</h2>
            <p>
              We may update these Terms & Conditions periodically. Continued use
              of the platform indicates acceptance of the updated terms.
            </p>
          </div>

          <div>
            <h2 className="sub-ti font-semibold text-black mb-3">8. Contact</h2>
            <p>
              For questions regarding these terms, contact:
              <br />
              <span className="font-medium">support@facultyweb.com</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}