import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

const PageHero = ({ 
  title, 
  description, 
  icon: Icon, 
  badge, 
  gradient = "from-cyan-500/20 to-blue-600/20",
  className 
}) => {
  return (
    <section className={cn("relative pt-32 pb-20 overflow-hidden", className)}>
      {/* Background Glow */}
      <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b via-transparent to-transparent -z-10", gradient)} />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {badge && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                {badge}
              </span>
            )}
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              {Icon && (
                <div className="p-3 rounded-2xl bg-gray-800 border border-white/10 shadow-2xl">
                  <Icon className="w-8 h-8 text-cyan-400" />
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                {title}
              </h1>
            </div>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Border Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  )
}

export default PageHero
