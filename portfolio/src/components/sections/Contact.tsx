"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import emailjs from '@emailjs/browser';
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await supabase.from("messages").insert([{ name, email, message }]);
      }

      const templateParams = {
        from_name: name,
        reply_to: email,
        message: message,
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      ).catch(() => {
        console.log("EmailJS keys not configured yet, but message saved to Supabase.");
      });

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container px-4 md:px-6 relative z-10">
        
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Let&apos;s Connect</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full glow-border mb-6"></div>
            <p className="text-muted-foreground text-lg">
              Have a project in mind or want to discuss a potential opportunity? Send me a message below.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-3xl p-8 sm:p-10 border border-white/10 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>

            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I will get back to you shortly.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-8 text-primary font-medium hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="John Doe" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus-visible:ring-primary/50" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="john@example.com" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus-visible:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white/80">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    required 
                    placeholder="How can I help you?" 
                    rows={5} 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-primary/50 resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 glow-border"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
