'use client'

import { useActionState } from 'react'
import { sendDiscordMessage } from '@/app/actions/sendMessage'
import { motion } from 'framer-motion'
import { Loader2, Send } from 'lucide-react'

const initialState = {
  success: false,
  message: '',
  errors: {},
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendDiscordMessage, initialState)

  return (
    <section className="pt-0 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-gray-400 mb-8">
            Have a project in mind? Send me a message directly to my Discord.
          </p>

          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="Your name"
              />
              {state?.errors?.name && (
                <p className="text-red-400 text-sm">{state.errors.name[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
              {state?.errors?.email && (
                <p className="text-red-400 text-sm">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                placeholder="Tell me about your project..."
              />
              {state?.errors?.message && (
                <p className="text-red-400 text-sm">{state.errors.message[0]}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isPending}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.02, textShadow: "0 0 8px rgba(255,255,255,0.5)" },
                tap: { scale: 0.98 }
              }}
              className="w-full bg-white cursor-pointer text-black font-bold py-3 px-6 rounded-lg 
                shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]
                focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black 
                transition-all disabled:opacity-50 disabled:cursor-not-allowed 
                flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Send Message</span>
                  
                  {/* Arrow hidden initially, reveals on hover */}
                  <motion.div
                    initial={{ width: 0, opacity: 0, x: -10 }}
                    variants={{
                      hover: { 
                        width: "auto", 
                        opacity: 1, 
                        x: 0,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }
                    }}
                    className="overflow-hidden flex items-center"
                  >
                    <Send className="w-5 h-5 ml-2" />
                  </motion.div>
                </>
              )}
            </motion.button>

            {state?.message && (
              <p
                className={`text-center text-sm ${
                  state.success ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {state.message}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
