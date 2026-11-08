import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { BriefForm } from "@/components/BriefForm";
import { CopyEmail } from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Book a free call", description: "Book thirty free minutes with Eve Studio, or send a project brief." };

export default function Contact() {
  return (
    <>
      <PageHero title="Book a free call" lead="Thirty minutes, free. You leave with a scope, a price range and a start date, whether or not we work together." />
      <section className="contact">
        <div className="wrap contact__grid">
          <section id="book" aria-labelledby="book-h" className="contact__book">
            <h2 id="book-h" className="h-5">Book a time</h2>
            {site.booking ? (
              <iframe src={site.booking} title="Book a call with Eve Studio" loading="lazy" className="contact__frame" />
            ) : !site.emailReady ? (
              <div className="notice">
                <p>Online booking opens soon. Until then, send the short brief and we reply within a working day with times for your call.</p>
                <a className="btn btn--primary" href="#brief">Send a brief <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
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
          <section id="brief" aria-labelledby="brief-h">
            <h2 id="brief-h" className="h-5">Or send a brief</h2>
            <BriefForm />
          </section>
        </div>
      </section>
    </>
  );
}
