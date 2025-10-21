import React, { useMemo, useState } from "react";
import "./contactUs.css";
import ScrollToTop from "../components/global/ScrollTop";
import useAuthStore from "../store/authStore";

const WEB3FORMS_ACCESS_KEY =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_WEB3FORMS_KEY) ||
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_WEB3FORMS_KEY) ||
  "e60f25c4-ee75-480a-8d86-dd990a2d5c24"

function ContactUs() {
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState({ name: "", email: "", message: "", botcheck: "" });
  const [status, setStatus] = useState({ state: "idle", msg: "" }); 

  const isValid = useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(form.email.trim());
    return form.name.trim().length >= 2 && emailOk && form.message.trim().length >= 10;
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || status.state === "loading") return;

    if (form.botcheck) {
      setStatus({ state: "error", msg: "Spam detected." });
      return;
    }

    try {
      setStatus({ state: "loading", msg: "Sending your message…" });

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        from_name: form.name.trim(),
        subject: "New enquiry from Contact Us (kevaa.in)",
        site: typeof window !== "undefined" ? window.location.hostname : "",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (data && (data.success || res.ok)) {
        setStatus({ state: "success", msg: "Thanks! Your message has been sent. We’ll get back to you soon." });
        setForm({ name: "", email: "", message: "", botcheck: "" });
      } else {
        const reason = data?.message || `Request failed (${res.status})`;
        throw new Error(reason);
      }
    } catch (err) {
      console.error(err);
      setStatus({ state: "error", msg: err.message || "Error connecting to server." });
    }
  };

  return (
    <div className="contactus-container" style={{ marginTop: user ? "140px" : "140px" }}>
      <ScrollToTop />

      <header className="contactus-header">
        <h1>Contact Us</h1>
        <p>
          Have a question, feedback, or need support? Fill out the form below or email us at
          {" "}
          <a href="mailto:support@kevaa.in">support@kevaa.in</a>.
        </p>
      </header>

      {status.state === "success" ? (
        <div className="contactus-banner success" role="status" aria-live="polite">
          <div className="icon" aria-hidden>✓</div>
          <div>
            <h3>Thank you!</h3>
            <p>{status.msg}</p>
          </div>
        </div>
      ) : status.state === "error" ? (
        <div className="contactus-banner error" role="alert" aria-live="assertive">
          <div className="icon" aria-hidden>!</div>
          <div>
            <h3>Something went wrong</h3>
            <p>{status.msg}</p>
          </div>
        </div>
      ) : null}

      <form className="contactus-form" onSubmit={handleSubmit} noValidate>
        {/* Honeypot field (hidden from users, visible to bots) */}
        <input
          type="text"
          name="botcheck"
          value={form.botcheck}
          onChange={handleChange}
          className="hp-field"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="field">
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange}
            minLength={2}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="jane@company.com"
            value={form.email}
            onChange={handleChange}
            required
            inputMode="email"
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="How can we help? Please include relevant details."
            value={form.message}
            onChange={handleChange}
            rows={6}
            minLength={10}
            required
          />
          <div className="helptext" aria-hidden>
            Minimum 10 characters
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={!isValid || status.state === "loading"}
          aria-busy={status.state === "loading"}
        >
          {status.state === "loading" ? <span className="spinner" aria-hidden /> : "Send Message"}
        </button>

        <p className="privacy-note">
          This form uses Web3Forms to securely deliver your message. By submitting, you agree to share the provided
          details for support purposes.
        </p>
      </form>
    </div>
  );
}

export default ContactUs;