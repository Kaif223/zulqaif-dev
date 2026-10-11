"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

const projectTypes = [
  "Website or landing page",
  "Web application",
  "Frontend for an existing product",
  "Full-time or contract role",
  "Something else",
];
const budgets = ["Not sure yet", "Under $1,000", "$1,000 – $3,000", "$3,000 – $7,500", "$7,500+"];

type Fields = { name: string; email: string; projectType: string; budget: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { kind: "idle" } | { kind: "invalid"; count: number } | { kind: "opened" } | { kind: "unconfigured" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address so I can reply.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter an email address like name@example.com.";
  if (!values.projectType) errors.projectType = "Choose what this is about.";
  if (values.message.trim().length < 20) errors.message = "Write at least 20 characters about your project or role.";
  return errors;
}

const fieldOrder: (keyof Fields)[] = ["name", "email", "projectType", "budget", "message"];

// Honest behaviour: there is no backend. With an email address configured,
// a valid submission opens the visitor's mail app with the message filled
// in (nothing is sent until they press send). Without one, the form says so
// and points to LinkedIn — it never shows a fake "message sent" state.
export function ContactForm({ email, linkedInUrl }: { email: string; linkedInUrl?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function readValues(): Fields {
    const data = new FormData(formRef.current!);
    return {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      projectType: String(data.get("projectType") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? ""),
    };
  }

  // After the first submit attempt, re-validate as the visitor fixes fields.
  function handleChange() {
    if (submitted) setErrors(validate(readValues()));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const values = readValues();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const invalid = fieldOrder.filter((field) => nextErrors[field]);
    if (invalid.length > 0) {
      setStatus({ kind: "invalid", count: invalid.length });
      formRef.current?.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus();
      return;
    }

    if (!email) {
      setStatus({ kind: "unconfigured" });
      return;
    }

    const subject = `${values.projectType} — ${values.name.trim()}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Project type: ${values.projectType}`,
      values.budget ? `Budget: ${values.budget}` : null,
      "",
      values.message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "opened" });
  }

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} onChange={handleChange} className="mt-8 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" required {...invalidProps("name", errors)} className={inputClass(errors.name)} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required {...invalidProps("email", errors)} className={inputClass(errors.email)} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="projectType" label="Project type" error={errors.projectType}>
          <select id="projectType" name="projectType" required defaultValue="" {...invalidProps("projectType", errors)} className={inputClass(errors.projectType)}>
            <option value="" disabled>
              Choose one…
            </option>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Budget range" optional>
          <select id="budget" name="budget" defaultValue="" className={inputClass()}>
            <option value="">Prefer not to say</option>
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message} hint="What are you building, and what do you need help with?">
        <textarea id="message" name="message" rows={6} required {...invalidProps("message", errors, true)} className={inputClass(errors.message)} />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-surface"
        >
          {email ? "Open in my email app" : "Check my message"}
          <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </button>
        <p className="text-sm text-ink-soft">All fields except budget are required.</p>
      </div>

      <div role="status" aria-live="polite" className="empty:hidden">
        {status.kind === "invalid" ? (
          <p className="rounded-xl border border-accent-ink/40 bg-accent-soft px-4 py-3 text-sm text-ink">
            Please fix {status.count === 1 ? "1 field" : `${status.count} fields`} marked above.
          </p>
        ) : null}
        {status.kind === "opened" ? (
          <p className="rounded-xl border border-line bg-subtle px-4 py-3 text-sm text-ink">
            Your email app should now open with this message filled in. <strong>Nothing has been sent yet</strong> —
            review it and press send there. If nothing opened, email{" "}
            <a href={`mailto:${email}`} className="font-medium text-accent-ink underline underline-offset-2">
              {email}
            </a>{" "}
            directly.
          </p>
        ) : null}
        {status.kind === "unconfigured" ? (
          <div className="rounded-xl border border-line bg-subtle px-4 py-3 text-sm text-ink">
            <p>
              <strong>Your message has not been sent.</strong> Email isn&apos;t set up on this site yet. Your text is
              still in the form, so you can copy it and send it to me on LinkedIn.
            </p>
            {linkedInUrl ? (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-10 items-center gap-1.5 font-medium text-accent-ink underline underline-offset-2"
              >
                Message me on LinkedIn
                <ArrowUpRight className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}

function invalidProps(field: keyof Fields, errors: Errors, hasHint = false) {
  const describedBy = [hasHint ? `${field}-hint` : null, errors[field] ? `${field}-error` : null]
    .filter(Boolean)
    .join(" ");
  return {
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": describedBy || undefined,
  };
}

function inputClass(error?: string) {
  return cx(
    "mt-2 block w-full rounded-xl border bg-surface px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-soft",
    "focus-visible:border-accent-ink focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent-ink/30",
    error ? "border-accent-ink" : "border-line-strong",
  );
}

function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional ? <span className="font-normal text-ink-soft"> (optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-accent-ink">
          <span aria-hidden="true">!</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
