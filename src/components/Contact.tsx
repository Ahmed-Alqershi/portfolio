"use client";

import { useActionState } from "react";
import FadeIn from "./FadeIn";
import SectionLabel from "./SectionLabel";
import { sendContact, type ContactState } from "@/app/actions";

const INITIAL: ContactState = { status: "idle", message: "" };

export default function Contact() {
  const [state, formAction, pending] = useActionState(sendContact, INITIAL);

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-20 sm:py-32">
      <SectionLabel number="07" title="Contact" />
      <FadeIn delay={0.1}>
        <form
          action={formAction}
          className="max-w-xl space-y-4"
          aria-label="Contact form"
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="company">Company (leave blank)</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              disabled={pending}
              className="w-full rounded-md border border-border bg-surface px-4 py-2 outline-none transition focus:border-accent disabled:opacity-60"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={200}
              disabled={pending}
              className="w-full rounded-md border border-border bg-surface px-4 py-2 outline-none transition focus:border-accent disabled:opacity-60"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              minLength={10}
              maxLength={5000}
              disabled={pending}
              className="w-full resize-none rounded-md border border-border bg-surface px-4 py-2 outline-none transition focus:border-accent disabled:opacity-60"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-accent px-5 py-2 text-sm font-medium text-background btn-lift hover:bg-accent-hover disabled:opacity-60"
            >
              {pending ? "Sending..." : "Send"}
            </button>
            {state.status !== "idle" && (
              <p
                aria-live="polite"
                className={`text-sm ${
                  state.status === "success" ? "text-accent" : "text-[#ef4444]"
                }`}
              >
                {state.message}
              </p>
            )}
          </div>
        </form>

        <p className="mt-12 text-sm text-muted">
          Or just email me at{" "}
          <a
            href="mailto:alqershiahmed20@gmail.com"
            className="link-underline text-foreground"
          >
            alqershiahmed20@gmail.com
          </a>
          .
        </p>
      </FadeIn>
    </section>
  );
}
