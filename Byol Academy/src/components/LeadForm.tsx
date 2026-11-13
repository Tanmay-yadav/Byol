"use client";

import { useRef, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type Intent = "learner" | "parent" | "institution" | "other";
type FormErrors = Record<string, string[] | undefined>;
type LeadFormProps = { initialIntent?: string };

const intentOptions: { value: Intent; label: string }[] = [
  { value: "learner", label: "I’m a learner" },
  { value: "parent", label: "I’m a parent or guardian" },
  { value: "institution", label: "I represent an institution" },
  { value: "other", label: "Something else" },
];

const consentCopy =
  "I agree to be contacted about this enquiry and have read the";

export function LeadForm({ initialIntent }: LeadFormProps) {
  const initial = intentOptions.some((option) => option.value === initialIntent)
    ? (initialIntent as Intent)
    : "learner";
  const [intent, setIntent] = useState<Intent>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const started = useRef(false);
  const enabled = process.env.NEXT_PUBLIC_LEAD_FORM_ENABLED === "true";

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form: "lead", intent });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setStatus("");
    setSubmitting(true);
    setStatus("This is a UI demo. Submissions are disabled.");
    trackEvent("form_submit_error", { form: "lead", intent });
    setSubmitting(false);
  }

  if (!enabled) {
    return (
      <div className="form-disabled" role="status">
        <span className="form-disabled__icon" aria-hidden="true">!</span>
        <div>
          <h2>Enquiries are not open just yet.</h2>
          <p>
            The form will be available after the Privacy Policy and consent
            language receive legal approval and secure delivery is configured.
          </p>
          <p className="form-disabled__status">Pending legal and operational review</p>
        </div>
      </div>
    );
  }

  return (
    <form className="lead-form" onFocus={markStarted} onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="lead-name">Your name <span aria-hidden="true">*</span></label>
          <input
            autoComplete="name"
            id="lead-name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
          />
          {errors.name && <p className="field-error" id="lead-name-error">{errors.name[0]}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="lead-email">Email address <span aria-hidden="true">*</span></label>
          <input
            autoComplete="email"
            id="lead-email"
            name="email"
            type="email"
            required
            maxLength={200}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "lead-email-error" : undefined}
          />
          {errors.email && <p className="field-error" id="lead-email-error">{errors.email[0]}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="lead-intent">I’m getting in touch as <span aria-hidden="true">*</span></label>
          <select
            id="lead-intent"
            name="intent"
            required
            value={intent}
            onChange={(event) => setIntent(event.target.value as Intent)}
          >
            {intentOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        {intent === "institution" && (
          <div className="form-field">
            <label htmlFor="lead-organisation">Institution name <span aria-hidden="true">*</span></label>
            <input
              id="lead-organisation"
              name="organisation"
              required
              maxLength={150}
              aria-invalid={Boolean(errors.organisation)}
              aria-describedby={errors.organisation ? "lead-organisation-error" : undefined}
            />
            {errors.organisation && (
              <p className="field-error" id="lead-organisation-error">{errors.organisation[0]}</p>
            )}
          </div>
        )}
        <div className="form-field form-field--wide">
          <label htmlFor="lead-message">How can we help? <span className="form-optional">(optional)</span></label>
          <textarea id="lead-message" name="message" rows={4} maxLength={2000} />
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="lead-website">Leave this field empty</label>
        <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent-check">
        <input name="consent" type="checkbox" required />
        <span>
          {consentCopy} <a href="/privacy">Privacy Policy</a>.
        </span>
      </label>
      {errors.consent && <p className="field-error">{errors.consent[0]}</p>}
      <div className="form-submit-row">
        <button className="button button--primary" type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <LoaderCircle className="spin" size={17} aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight size={17} aria-hidden="true" />
            </>
          )}
        </button>
        <span>Fields marked with * are required.</span>
      </div>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
