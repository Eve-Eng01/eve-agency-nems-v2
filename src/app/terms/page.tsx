import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms", description: "The terms for using the Eve Studio website.", robots: { index: false } };

/* Draft wording. Have a lawyer check it, and add the company's legal details, before launch. */
export default function Terms() {
  return (
    <section className="legal">
      <div className="wrap prose">
        <h1 className="heading-3">Terms</h1>
        <p>These terms cover this website. Project work runs under the proposal you sign with us, and that proposal takes priority.</p>
        <h2 className="heading-5">Prices</h2>
        <p>Prices shown are starting points, not offers. Your fixed quote comes in the proposal after the call.</p>
        <h2 className="heading-5">Our content</h2>
        <p>Text and images on this site belong to Eve Studio or our clients. Please ask before you reuse them.</p>
      </div>
    </section>
  );
}
