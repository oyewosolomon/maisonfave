'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';

import { maisonFaveEnquiry } from '@/lib/data/maison-fave';

type Status = 'idle' | 'sending' | 'sent' | 'error';

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * The site is a static export, so there is no API route to post to. Enquiries
 * go to a hosted form endpoint (Formspree, Web3Forms, …) when one is configured
 * and otherwise fall back to opening a pre-filled email.
 */
const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;
const ENQUIRY_EMAIL = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL || maisonFaveEnquiry.email;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Mounting the dialog only while open means every visit starts with a fresh form.
const BookingModal = ({ open, onClose }: BookingModalProps) =>
  open ? <BookingDialog onClose={onClose} /> : null;

const BookingDialog = ({ onClose }: { onClose: () => void }) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [services, setServices] = useState<string[]>([]);

  // Lock the page behind the dialog, trap focus inside it and hand focus back
  // to whichever button opened it once it closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const firstField = dialogRef.current?.querySelector<HTMLElement>('input, textarea, select');
    firstField?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [onClose]);

  const toggleService = (service: string) =>
    setServices((current) =>
      current.includes(service) ? current.filter((s) => s !== service) : [...current, service],
    );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    // Honeypot: real visitors never see this field, bots tend to fill it.
    if (form.get('company_website')) {
      setStatus('sent');
      return;
    }

    const enquiry = {
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim(),
      services: services.join(', '),
      date: String(form.get('date') ?? '').trim(),
      location: String(form.get('location') ?? '').trim(),
      budget: String(form.get('budget') ?? ''),
      message: String(form.get('message') ?? '').trim(),
    };

    if (!ENQUIRY_ENDPOINT) {
      const details = [
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        enquiry.phone && `Phone: ${enquiry.phone}`,
        enquiry.services && `Interested in: ${enquiry.services}`,
        enquiry.date && `Date: ${enquiry.date}`,
        enquiry.location && `Location: ${enquiry.location}`,
        enquiry.budget && `Budget: ${enquiry.budget}`,
      ].filter(Boolean);
      const body = `${details.join('\n')}\n\n${enquiry.message}`;
      const subject = `Enquiry from ${enquiry.name}`;
      window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...enquiry, _subject: `New Maison Fave enquiry — ${enquiry.name}` }),
      });
      setStatus(response.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[#1E0A0E]/70 backdrop-blur-[3px] animate-in fade-in duration-300"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-[#F6F1E9] shadow-[0_30px_80px_-20px_rgba(30,10,14,0.6)] animate-in fade-in slide-in-from-bottom-8 duration-500 sm:rounded-2xl sm:zoom-in-95 lg:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-[#2A1E18] transition-colors hover:bg-[#2A1E18]/5 lg:right-5 lg:top-5"
        >
          <X className="h-5 w-5" />
        </button>

        <BrandPanel titleId={titleId} />

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-6 sm:px-10 lg:px-12 lg:py-12">
          {status === 'sent' ? (
            <ThankYou usedEmail={!ENQUIRY_ENDPOINT} onClose={onClose} />
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input name="name" required autoComplete="name" className={inputClass} />
                </Field>
                <Field label="Email" required>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Phone / WhatsApp">
                <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
              </Field>

              <fieldset>
                <legend className={labelClass}>What can we help with?</legend>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {maisonFaveEnquiry.services.map((service) => {
                    const selected = services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleService(service)}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-lato text-[12px] tracking-[0.04em] transition-colors ${
                          selected
                            ? 'border-[#4A1620] bg-[#4A1620] text-[#F6F1E9]'
                            : 'border-[#2A1E18]/20 text-[#2A1E18] hover:border-[#4A1620]/60'
                        }`}
                      >
                        {selected && <Check className="h-3.5 w-3.5" />}
                        {service}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-7 sm:grid-cols-3">
                <Field label="Date (if known)">
                  <input name="date" type="date" className={`${inputClass} [color-scheme:light]`} />
                </Field>
                <Field label="Location">
                  <input name="location" placeholder="City, country" className={inputClass} />
                </Field>
                <Field label="Budget">
                  <select name="budget" defaultValue="" className={`${inputClass} cursor-pointer`}>
                    <option value="">Prefer not to say</option>
                    {maisonFaveEnquiry.budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Tell us about it" required>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="The occasion, the feeling you're after, anything we should know…"
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Honeypot — hidden from people and assistive tech. */}
              <input
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {status === 'error' && (
                <p role="alert" className="font-lato text-[13px] text-[#9B2335]">
                  Something went wrong sending your enquiry. Please try again, or email us at{' '}
                  <a href={`mailto:${ENQUIRY_EMAIL}`} className="underline underline-offset-2">
                    {ENQUIRY_EMAIL}
                  </a>
                  .
                </p>
              )}

              <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-lato text-[12px] leading-relaxed text-[#2A1E18]/55">
                  We reply to every enquiry within two working days.
                </p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex shrink-0 items-center gap-4 rounded-full bg-[#4A1620] px-8 py-4 font-lato text-[11px] uppercase tracking-[0.24em] text-[#F6F1E9] transition-colors hover:bg-[#6A2130] disabled:opacity-70"
                >
                  {status === 'sending' ? 'Sending' : 'Send enquiry'}
                  {status === 'sending' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const labelClass = 'font-lato text-[10px] uppercase tracking-[0.24em] text-[#2A1E18]/70';

const inputClass =
  'mt-2 w-full rounded-none border-0 border-b border-[#2A1E18]/20 bg-transparent px-0 py-2.5 font-lato text-[15px] text-[#2A1E18] placeholder:text-[#2A1E18]/35 transition-colors focus:border-[#4A1620] focus:outline-none focus:ring-0';

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) => (
  <label className="block">
    <span className={labelClass}>
      {label}
      {required && <span className="text-[#9B2335]"> *</span>}
    </span>
    {children}
  </label>
);

const BrandPanel = ({ titleId }: { titleId: string }) => (
  <div className="relative shrink-0 overflow-hidden bg-[#4A1620] px-6 pb-7 pt-8 text-[#F3E9DC] sm:px-10 lg:flex lg:w-[38%] lg:flex-col lg:justify-between lg:px-12 lg:py-12">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        background:
          'radial-gradient(120% 90% at 18% 20%, rgba(122,38,52,0.85) 0%, rgba(74,22,32,0) 60%)',
      }}
    />

    <div className="relative pr-10 lg:pr-0">
      <p className="font-lato text-[10px] uppercase tracking-[0.3em] text-[#DCC3BC]">
        Work with us
      </p>
      <h2 id={titleId} className="mt-4 font-playfair text-3xl leading-tight lg:text-[2.5rem]">
        Let&rsquo;s create something <em>beautiful</em>.
      </h2>
      <p className="mt-4 hidden font-lato text-[14px] leading-relaxed text-[#F3E9DC]/75 sm:block">
        Share a little about what you have in mind — a celebration, a space, a gesture — and
        we&rsquo;ll take it from there.
      </p>
    </div>

    <div className="relative mt-10 hidden lg:block">
      <ol className="flex flex-col gap-5">
        {maisonFaveEnquiry.steps.map((step, index) => (
          <li key={step} className="flex items-baseline gap-4">
            <span className="font-playfair text-sm italic text-[#DCC3BC]">0{index + 1}</span>
            <span className="font-lato text-[13px] leading-relaxed text-[#F3E9DC]/85">{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-10 font-playfair text-xl italic leading-snug">
        Ideas travel.
        <br />
        Experiences stay.
      </p>
    </div>
  </div>
);

const ThankYou = ({ usedEmail, onClose }: { usedEmail: boolean; onClose: () => void }) => (
  <div className="flex min-h-[22rem] flex-col items-start justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#4A1620]/30 text-[#4A1620]">
      <Check className="h-5 w-5" />
    </span>
    <p className="mt-6 font-playfair text-3xl text-[#2A1E18]">Thank you.</p>
    <p className="mt-4 max-w-md font-lato text-[15px] leading-relaxed text-[#2A1E18]/70">
      {usedEmail
        ? 'Your email app should have opened with your enquiry ready to send. Once it’s on its way, we’ll be in touch within two working days.'
        : 'Your enquiry is with us. We’ll be in touch within two working days to start the conversation.'}
    </p>
    <button
      type="button"
      onClick={onClose}
      className="mt-10 inline-flex items-center gap-3 font-lato text-[11px] uppercase tracking-[0.24em] text-[#2A1E18] transition-opacity hover:opacity-60"
    >
      Back to the site
      <ArrowRight className="h-4 w-4" />
    </button>
  </div>
);

export default BookingModal;
