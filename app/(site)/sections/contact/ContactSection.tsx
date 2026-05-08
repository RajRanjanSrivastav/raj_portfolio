"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<FormState>;

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Errors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (form.message.length < 10) newErrors.message = "Message too short";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    // simulate API
    await new Promise((res) => setTimeout(res, 1200));

    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setForm({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 py-32 overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto space-y-16 text-center">
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold">
            Let’s build something great
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Have an idea or project? I’d love to hear about it.
          </p>
        </div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative group rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl p-8 space-y-6 text-left overflow-hidden"
        >
          {/* ✨ Cursor reactive glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
            <div className="absolute w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
          </div>

          <FloatingInput
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <FloatingInput
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <FloatingTextarea
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            error={errors.message}
          />

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.01 }}
            type="submit"
            disabled={loading}
            className="relative w-full py-3 rounded-xl font-medium overflow-hidden border border-white/10"
          >
            {/* Button background animation */}
            <span className="absolute inset-0 bg-white text-black transition-transform duration-300 origin-left scale-x-100 group-hover:scale-x-100" />

            <span className="relative text-black">
              {loading ? "Sending..." : "Send Message"}
            </span>
          </motion.button>

          {/* Success */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-sm text-center"
            >
              Message sent successfully 🚀
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

/* 🔥 Floating Input */
function FloatingInput({ label, name, value, onChange, error }: any) {
  return (
    <div className="relative">
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full px-4 pt-6 pb-2 rounded-xl bg-transparent border transition
        ${error ? "border-red-500" : "border-[var(--border)]"}
        focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20`}
      />

      <label
        className={`absolute left-4 top-2 text-xs transition-all
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
        peer-focus:top-2 peer-focus:text-xs
        ${error ? "text-red-400" : "text-[var(--muted)]"}
        `}
      >
        {label}
      </label>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* 🔥 Floating Textarea */
function FloatingTextarea({ label, name, value, onChange, error }: any) {
  return (
    <div className="relative">
      <textarea
        name={name}
        rows={5}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full px-4 pt-6 pb-2 rounded-xl bg-transparent border transition
        ${error ? "border-red-500" : "border-[var(--border)]"}
        focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20`}
      />

      <label
        className={`absolute left-4 top-2 text-xs transition-all
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
        peer-focus:top-2 peer-focus:text-xs
        ${error ? "text-red-400" : "text-[var(--muted)]"}
        `}
      >
        {label}
      </label>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
