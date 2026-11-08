import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "What Eve Studio collects and why.", robots: { index: false } };

/* Draft wording. Have a lawyer check it, and add the company's legal details, before launch. */
export default function Privacy() {
  return (
    <section className="legal">
      <div className="wrap prose">
        <h1 className="heading-3">Privacy</h1>
        <p>When you send a brief or book a call, we keep your name, email, budget range and project idea so we can reply and run the project.</p>
        <h2 className="heading-5">What we collect</h2>
        <p>Only what you type into our forms or booking page. This site sets no advertising cookies. Your browser remembers, for this visit only, that you have seen the opening animation.</p>
        <h2 className="heading-5">Who sees it</h2>
        <p>The Eve Studio team, and the service that delivers our form or booking. We never sell your details.</p>
        <h2 className="heading-5">How long we keep it</h2>
        <p>Enquiries that do not become projects are deleted after 12 months. Ask us at any time to see or delete what we hold about you, using the email in the footer.</p>
      </div>
    </section>
  );
}
