"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

const TO_EMAIL = "alqershiahmed20@gmail.com";

const NAME_MAX = 100;
const EMAIL_MAX = 200;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const hits = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function stripHeaderInjection(v: string): string {
  return v.replace(/[\r\n]/g, "");
}

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Message sent. I'll get back to you soon." };
  }

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return {
      status: "error",
      message: "Too many messages from this connection. Try again in a few minutes.",
    };
  }

  const name = stripHeaderInjection(String(formData.get("name") ?? "").trim());
  const email = stripHeaderInjection(String(formData.get("email") ?? "").trim());
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "All fields are required." };
  }
  if (name.length > NAME_MAX) {
    return { status: "error", message: "That name is unusually long." };
  }
  if (email.length > EMAIL_MAX) {
    return { status: "error", message: "That email is unusually long." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That doesn't look like a valid email." };
  }
  if (message.length < MESSAGE_MIN) {
    return { status: "error", message: "Message is a bit short — give a little more context." };
  }
  if (message.length > MESSAGE_MAX) {
    return { status: "error", message: `Message too long (max ${MESSAGE_MAX} characters).` };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message:
        "Email isn't wired up yet. Please email me directly at contact@aalqershi.com.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <noreply@aalqershi.com>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        status: "error",
        message: "Something went wrong sending your message. Try emailing me directly.",
      };
    }

    return {
      status: "success",
      message: "Message sent. I'll get back to you soon.",
    };
  } catch (err) {
    console.error("Contact send failed:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Try emailing me directly.",
    };
  }
}
