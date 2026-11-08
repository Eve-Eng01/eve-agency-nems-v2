"use client";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { site } from "@/content/site";
import { services } from "@/content/services";

type Vals = { name: string; email: string; budget: string; service: string; idea: string };
type Errs = Partial<Record<keyof Vals, string>>;

const budgets = ["Under $2,500", "$2,500 to $7,500", "$7,500 to $20,000", "Over $20,000", "Not sure yet"];

const validate = (v: Vals): Errs => {
  const e: Errs = {};
  if (!v.name.trim()) e.name = "Add your name so we know who to reply to.";
  if (!v.email.trim()) e.email = "Add your email so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "That email looks incomplete. Check it has an @ and a domain.";
  if (!v.budget) e.budget = "Pick a budget range. A rough one is fine.";
  if (!v.service) e.service = "Pick the service closest to what you need.";
  if (!v.idea.trim()) e.idea = "Tell us the idea in a line. You can keep it rough.";
  return e;
};

export function BriefForm() {
  const [v, setV] = useState<Vals>({ name: "", email: "", budget: "", service: "", idea: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const svc = q.get("service");
    const idea = q.get("idea");
    if (svc && services.some((s) => s.slug === svc)) setV((o) => ({ ...o, service: svc }));
    if (idea) setV((o) => ({ ...o, idea: idea.slice(0, 300) }));
  }, []);

  const set = (k: keyof Vals) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((o) => ({ ...o, [k]: e.target.value }));
    if (errs[k]) setErrs((o) => ({ ...o, [k]: undefined }));
  };
  const blur = (k: keyof Vals) => () => setErrs((o) => ({ ...o, [k]: validate(v)[k] }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const es = validate(v);
    setErrs(es);
    const first = Object.keys(es)[0];
    if (first) { document.getElementById(`f-${first}`)?.focus(); return; }
    if (!site.formEndpoint) {
      const text = `Name: ${v.name}\nEmail: ${v.email}\nBudget: ${v.budget}\nService: ${v.service}\n\n${v.idea}`;
      location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project brief from ${v.name}`)}&body=${encodeURIComponent(text)}`;
      return;
    }
    setState("sending");
    try {
      const r = await fetch(site.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(v) });
      setState(r.ok ? "sent" : "failed");
    } catch { setState("failed"); }
  };

  if (state === "sent") {
    return (
      <div className="notice" role="status">
        <p className="title-2"><Check size={20} weight="bold" aria-hidden="true" /> Brief sent</p>
        <p>Thanks, {v.name.split(" ")[0]}. A person on the team replies within one working day.</p>
      </div>
    );
  }

  const field = (k: keyof Vals, label: string, node: React.ReactNode) => (
    <div className={`field${errs[k] ? " has-error" : ""}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      {node}
      {errs[k] && <p className="field__err" id={`e-${k}`} role="alert">{errs[k]}</p>}
    </div>
  );
  const a = (k: keyof Vals) => ({ id: `f-${k}`, name: k, value: v[k], onChange: set(k), onBlur: blur(k), "aria-invalid": !!errs[k] || undefined, "aria-describedby": errs[k] ? `e-${k}` : undefined });

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form__row">
        {field("name", "Your name", <input {...a("name")} autoComplete="name" />)}
        {field("email", "Work email", <input {...a("email")} type="email" autoComplete="email" />)}
      </div>
      <div className="form__row">
        {field("budget", "Budget range", (
          <select {...a("budget")}>
            <option value="">Choose a range</option>
            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        ))}
        {field("service", "Service", (
          <select {...a("service")}>
            <option value="">Choose a service</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            <option value="not-sure">Not sure yet</option>
          </select>
        ))}
      </div>
      {field("idea", "Your idea, in one line", <textarea {...a("idea")} rows={3} />)}
      {state === "failed" && <p className="field__err" role="alert">Your brief did not send. Check your connection and try again, or email us instead.</p>}
      <div className="form__send">
        <button className="btn btn--primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending your brief" : <>Send your brief <ArrowRight size={16} weight="bold" aria-hidden="true" /></>}
        </button>
        <span className="muted">A person replies within one working day.</span>
      </div>
    </form>
  );
}
