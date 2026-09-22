import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { socials } from "../data/content";
import { useProfile } from "../data/useSiteData";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import SocialIcon from "../components/SocialIcon";

const PROJECT_TYPES = ["Photography", "Film", "Wedding", "Commercial", "Documentary", "Other"];
const BUDGETS = ["< ₹25k", "₹25k – ₹75k", "₹75k – ₹2L", "₹2L+"];

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const profile = useProfile();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New inquiry from yogirajsomavanshi.com");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative bg-midnight px-4 py-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <h2 className="my-0 font-display max-w-xl text-4xl font-light leading-tight text-pearl sm:text-6xl">
          <RevealText text="Let's create something beautiful." />
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-16 lg:grid-cols-5">
          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="space-y-8 font-body">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-pearl/50">Email</p>
                <a href={`mailto:${profile.email}`} className="text-lg text-pearl hover:text-ocean">
                  {profile.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-pearl/50">Phone</p>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="text-lg text-pearl hover:text-ocean">
                  {profile.phone}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-pearl/50">Studio</p>
                <p className="text-lg text-pearl">{profile.address}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-pearl/50">Hours</p>
                <p className="text-lg text-pearl">Mon – Sat, 10:00 – 19:00 IST</p>
              </div>
              <div className="flex gap-3 pt-2">
                {Object.entries(socials).map(([name, href]) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    data-cursor="OPEN"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-pearl/15 text-pearl/70 hover:border-ocean hover:text-ocean"
                  >
                    <SocialIcon name={name as "behance" | "instagram" | "linkedin"} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.2}>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full min-h-72 flex-col items-center justify-center rounded-lg border border-ocean/30 bg-pearl/[0.04] p-10 text-center"
              >
                <p className="font-display text-2xl text-ocean">Thank you.</p>
                <p className="mt-2 max-w-sm font-body text-sm text-pearl/60">
                  Your brief has been sent. We'll be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {status === "error" && (
                  <p className="font-body text-sm text-red-400 sm:col-span-2">
                    Something went wrong sending your message. Please try again or email us directly.
                  </p>
                )}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <SelectField label="Project Type" name="projectType" options={PROJECT_TYPES} />
                <SelectField label="Budget" name="budget" options={BUDGETS} />
                <Field label="Timeline" name="timeline" placeholder="e.g. Sept 2026" />
                <div className="sm:col-span-2">
                  <Field label="Message" name="message" textarea required />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs uppercase tracking-[0.1em] text-pearl/50">
                    Upload Brief (optional)
                  </label>
                  <input
                    type="file"
                    name="brief"
                    className="block w-full text-sm text-pearl/60 file:mr-4 file:rounded-full file:border-0 file:bg-ocean file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-wide file:text-midnight"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    data-cursor="SEND"
                    className="w-full rounded-full bg-pearl py-4 font-body text-xs font-medium uppercase tracking-[0.2em] text-midnight transition-all duration-300 hover:scale-[1.02] hover:bg-ocean hover:shadow-[0_0_24px_rgba(201,162,75,0.4)] disabled:opacity-60 disabled:hover:scale-100 sm:w-auto sm:px-10"
                  >
                    {status === "submitting" ? (
                      <span className="inline-flex items-center gap-2">
                        Sending
                        <span className="flex gap-0.5">
                          <span className="animate-dot-bounce h-1 w-1 rounded-full bg-midnight [animation-delay:0ms]" />
                          <span className="animate-dot-bounce h-1 w-1 rounded-full bg-midnight [animation-delay:150ms]" />
                          <span className="animate-dot-bounce h-1 w-1 rounded-full bg-midnight [animation-delay:300ms]" />
                        </span>
                      </span>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  textarea = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const base =
    "w-full border-b border-pearl/20 bg-transparent py-2 font-body text-sm text-pearl outline-none transition-colors focus:border-ocean placeholder:text-pearl/30";
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs uppercase tracking-[0.1em] text-pearl/50">
        {label}
      </label>
      {textarea ? (
        <textarea id={name} name={name} required={required} rows={4} className={base} placeholder={placeholder} />
      ) : (
        <input id={name} name={name} type={type} required={required} className={base} placeholder={placeholder} />
      )}
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs uppercase tracking-[0.1em] text-pearl/50">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full border-b border-pearl/20 bg-transparent py-2 font-body text-sm text-pearl outline-none transition-colors focus:border-ocean"
      >
        <option value="" className="bg-midnight">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-midnight">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
