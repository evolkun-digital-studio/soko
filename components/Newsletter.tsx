"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to your email provider (Mailchimp, Brevo, a Next.js route handler, etc.)
    setDone(true);
  };

  if (done) {
    return (
      <p className="nl-done">
        You&apos;re on the list! See you at the counter. <span aria-hidden>🥐</span>
      </p>
    );
  }

  return (
    <form className="newsletter" onSubmit={submit}>
      <label htmlFor="nl-email">Email *</label>
      <input
        id="nl-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <label className="nl-check">
        <input type="checkbox" required checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>Yes, subscribe me to the SOKO newsletter. *</span>
      </label>
      <button type="submit">Subscribe</button>
    </form>
  );
}
