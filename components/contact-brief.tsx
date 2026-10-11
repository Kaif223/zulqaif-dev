"use client";

import { useState, type FormEvent } from "react";

const inquiryTypes = ["Full-time role", "Freelance project", "Collaboration", "Something else"];
const timelines = ["As soon as possible", "Within 1–3 months", "Later this year", "Not sure yet"];

const fieldClass =
  "mt-2 w-full border border-line-strong bg-surface px-3 py-3 text-fg placeholder:text-muted focus-visible:border-signal";
const labelClass = "font-mono text-annotation uppercase text-muted";

// Composes a mailto: link from the form instead of posting to a server.
// No backend, no API keys, no stored data — the visitor's own mail app sends it.
// A server-side form can replace this later without changing the fields.
export function ContactBrief({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const type = String(data.get("type") ?? "");
    const timeline = String(data.get("timeline") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const subject = `${type} — from ${name}`;
    const body = [`Name: ${name}`, `Inquiry: ${type}`, `Timeline: ${timeline}`, "", message].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      <div>
        <label htmlFor="brief-name" className={labelClass}>
          Your name
        </label>
        <input
          id="brief-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldClass}
        />
      </div>

      <fieldset>
        <legend className={labelClass}>What is this about?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {inquiryTypes.map((type, index) => (
            <label
              key={type}
              className="flex min-h-12 cursor-pointer items-center gap-3 border border-line-strong px-3 has-[:checked]:border-signal has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal"
            >
              <input
                type="radio"
                name="type"
                value={type}
                required
                defaultChecked={index === 0}
                className="accent-[var(--signal)] focus-visible:outline-none"
              />
              {type}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="brief-timeline" className={labelClass}>
          Timeline
        </label>
        <select id="brief-timeline" name="timeline" className={fieldClass} defaultValue={timelines[0]}>
          {timelines.map((timeline) => (
            <option key={timeline}>{timeline}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="brief-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="brief-message"
          name="message"
          required
          rows={6}
          aria-describedby="brief-message-hint"
          className={fieldClass}
        />
        <p id="brief-message-hint" className="mt-2 text-sm text-muted">
          A few lines on the role or project, and a link if you have one.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!email}
          className="inline-flex min-h-12 items-center gap-3 bg-signal px-5 font-mono text-sm uppercase tracking-wider text-on-signal transition-colors duration-200 hover:bg-fg hover:text-bg disabled:cursor-not-allowed disabled:opacity-50"
        >
          Open in email app <span aria-hidden="true">→</span>
        </button>
        <p role="status" className="text-sm text-muted">
          {!email
            ? "The contact form will be enabled once an email address is added."
            : status === "opened"
              ? `If your email app didn't open, write to ${email} directly.`
              : ""}
        </p>
      </div>
    </form>
  );
}
