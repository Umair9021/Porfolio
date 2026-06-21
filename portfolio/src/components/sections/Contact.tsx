"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await supabase.from("messages").insert([{ name, email, message }]);
      }
      setStatus("success");
      setName(""); setEmail(""); setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-4 md:px-8 bg-[#111] w-full text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
            LET&apos;S TALK
          </h2>
          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto mb-16">
            Have a project in mind or want to discuss a potential opportunity? Drop me a line below.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl flex flex-col gap-6 text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white/80 uppercase tracking-widest">Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-4 focus:outline-none focus:border-white transition-colors text-white"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white/80 uppercase tracking-widest">Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-4 focus:outline-none focus:border-white transition-colors text-white"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-white/80 uppercase tracking-widest">Message</label>
            <textarea 
              required 
              rows={5} 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-4 focus:outline-none focus:border-white transition-colors text-white resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className="mt-4 bg-white text-[#111] font-black text-lg py-5 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "SENDING..." : status === "success" ? "MESSAGE SENT ✓" : "SEND MESSAGE"}
          </button>
        </motion.form>

      </div>
    </section>
  );
}
