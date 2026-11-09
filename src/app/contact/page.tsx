import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons";
import { share } from "@/lib/share";
import { PageHero } from "@/components/PageHero";
import { BriefForm } from "@/components/BriefForm";
import { CopyEmail } from "@/components/Footer";
import { CalEmbed } from "@/components/CalEmbed";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a free call",
  description: "Book a free 30 minute call with Eve Studio. You leave with a scope and a start date for your app, website, brand or launch, and get a fixed quote before you decide.",
  ...share("/contact/", "Book a free call | Eve Studio", "Thirty minutes, free. Leave with a scope, a start date and then a fixed quote for your app, website, brand or launch."),
};

export default function Contact() {
  return (
    <>
      <PageHero title="Book a free call" lead="Thirty minutes, free. You leave with a scope and a start date, and get a fixed quote before you decide." />
      <section className="contact">
        <div className="wrap contact__grid">
          <section id="book" aria-labelledby="book-h" className="contact__book">
            <h2 id="book-h" className="h-5">Book a time</h2>
            {site.calLink && <p className="contact__note">Pick a day and a time that suits you. You get a calendar invite and a video link straight away.</p>}
            {site.calLink ? (
              <CalEmbed />
            ) : site.booking ? (
              <iframe src={site.booking} title="Book a call with Eve Studio" loading="lazy" className="contact__frame" />
            ) : !site.emailReady ? (
              <div className="notice">
                <p>Online booking opens soon. Until then, ask for a quote below and we reply within a working day with times for your call.</p>
                <a className="btn btn--primary" href="#brief">Ask for a quote <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
              </div>
            ) : (
              <div className="notice">
                <p>Online booking opens soon. Until then, email two times that suit you and we confirm one within a working day.</p>
                <a className="btn btn--primary" href={`mailto:${site.email}?subject=${encodeURIComponent("Book a call")}`}>Email to book <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
                <CopyEmail />
              </div>
            )}
            {site.whatsapp ? <p><a className="link" href={`https://wa.me/${site.whatsapp}`}>Message us on WhatsApp</a></p> : null}
          </section>
          <section id="brief" aria-labelledby="brief-h" className="contact__brief">
            <div>
              <h2 id="brief-h" className="h-5">Or ask for a quote</h2>
              <p className="contact__note">Rather write it down first? Tell us the idea in a line and when you need it. We reply within one working day.</p>
            </div>
            <BriefForm />
          </section>
        </div>
      </section>
    </>
  );
}
