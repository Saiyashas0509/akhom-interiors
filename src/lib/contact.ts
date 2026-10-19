// Single source of truth for AKHOM contact channels. Change a number or address here only.

export const WHATSAPP_NUMBER = "919704352346"; // +91 97043 52346
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DISPLAY = "+91 97043 52346";

export const PHONE_TEL = "+919177361122";
export const PHONE_DISPLAY = "+91 91773 61122";

export const LEAD_EMAIL = "info@akhominteriors.com";

/** A wa.me link that opens a chat with the AKHOM WhatsApp number, message pre-filled. */
export function whatsappLink(message = "Hi AKHOM, I'd like to discuss my space.") {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * Emails an enquiry to LEAD_EMAIL through FormSubmit (no account needed).
 * The very first submission triggers a one-time activation email to that inbox;
 * enquiries are delivered once it is confirmed.
 */
export async function sendLead(subject: string, fields: Record<string, string | number | boolean | undefined>) {
  const body: Record<string, string> = {
    _subject: subject,
    _template: "table",
    _captcha: "false",
  };
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== "") body[k] = String(v);
  }
  const res = await fetch(`https://formsubmit.co/ajax/${LEAD_EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Lead delivery failed (${res.status})`);
  const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
  if (json.success === false || json.success === "false") throw new Error("Lead delivery rejected");
}
