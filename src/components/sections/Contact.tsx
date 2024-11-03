'use client'
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  User, 
  CheckCircle2, 
  AlertCircle,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
  hoverColor: string;
  glowColor: string;
}

const socialLinks: SocialLink[] = [
  { 
    icon: Github, 
    href: "https://github.com/MezdadAchour", 
    label: "GitHub",
    color: "from-gray-600 to-gray-800",
    hoverColor: "group-hover:from-gray-700 group-hover:to-gray-900",
    glowColor: "rgba(75, 85, 99, 0.4)"
  },
  { 
    icon: Linkedin, 
    href: "https://www.linkedin.com/in/achour-mezdad-b04526197/", 
    label: "LinkedIn",
    color: "from-blue-500 to-blue-700",
    hoverColor: "group-hover:from-blue-600 group-hover:to-blue-800",
    glowColor: "rgba(37, 99, 235, 0.4)"
  },
  { 
    icon: Facebook, 
    href: "#", 
    label: "Facebook",
    color: "from-sky-500 to-sky-700",
    hoverColor: "group-hover:from-sky-600 group-hover:to-sky-800",
    glowColor: "rgba(14, 165, 233, 0.4)"
  },
  { 
    icon: Instagram, 
    href: "#", 
    label: "Instagram",
    color: "from-pink-500 to-rose-500",
    hoverColor: "group-hover:from-pink-600 group-hover:to-rose-600",
    glowColor: "rgba(236, 72, 153, 0.4)"
  }
];

const contactMethods = [
  {
    icon: PhoneCall,
    label: "Tél - Viber - Whatsapp",
    value: "+213 555 972 541",
    color: "from-green-500 to-emerald-600",
    hoverColor: "group-hover:from-green-600 group-hover:to-emerald-700",
    glowColor: "rgba(16, 185, 129, 0.4)"
  }
];

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [revealedContact, setRevealedContact] = useState<string | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
  
      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen pt-24 pb-16">
      {/* Background avec effet parallax et grid */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <motion.div
          style={{ x, y }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[128px]"
        />
        <motion.div
          style={{ 
            x: useTransform(x, value => -value), 
            y: useTransform(y, value => -value) 
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-8 group hover:border-gray-600 transition-colors duration-300"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Parlons de votre projet</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
              Prenons Contact
            </span>
          </h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Retrouvez-moi sur
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                        style={{ backgroundColor: social.glowColor }}
                      />
                      <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                        <div className={`p-3 rounded-full bg-gradient-to-br ${social.color} ${social.hoverColor} transition-colors duration-300`}>
                          <social.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="mt-2 block text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                          {social.label}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {contactMethods.map((method) => (
                    <motion.button
                      key={method.label}
                      onClick={() => setRevealedContact(method.label)}
                      className="group relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                        style={{ backgroundColor: method.glowColor }}
                      />
                      <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                        <div className={`p-3 rounded-full bg-gradient-to-br ${method.color} ${method.hoverColor} transition-colors duration-300`}>
                          <method.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="mt-2 space-y-1">
                          <span className="block text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                            {method.label}
                          </span>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: revealedContact === method.label ? 1 : 0 }}
                            className="block text-sm text-white/90 font-medium"
                          >
                            {revealedContact === method.label ? method.value : "Cliquez pour révéler"}
                          </motion.span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-blue-500/20 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm text-white/80">Nom</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-hover:text-blue-400 transition-colors duration-300" />
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm text-white/80">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-hover:text-blue-400 transition-colors duration-300" />
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-sm text-white/80">Message</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-white/50 group-hover:text-blue-400 transition-colors duration-300" />
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 resize-none transition-all duration-300"
                      placeholder="Votre message..."
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full h-12 overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 transition-transform duration-300 group-hover:scale-105" />
                  <div className="relative flex items-center justify-center gap-2 text-white">
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? "Envoi en cours..." : "Envoyer"}</span>
                  </div>
                </motion.button>

                {/* Status Messages */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-2 text-green-400 bg-green-500/20 p-4 rounded-lg">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Message envoyé avec succès !</span>
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 bg-red-500/20 p-4 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span>Une erreur est survenue</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;