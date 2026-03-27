import React from 'react'
import { motion } from 'framer-motion'

const TechMarquee = () => {
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Vue.js', icon: '🟢' },
    { name: 'Angular', icon: '🔺' },
    { name: 'Node.js', icon: '🟩' },
    { name: 'Python', icon: '🐍' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '☸️' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Google Cloud', icon: '🌩️' },
    { name: 'Azure', icon: '☁️' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Redis', icon: '🔴' },
    { name: 'GraphQL', icon: '◈' },
    { name: 'REST API', icon: '🔌' },
    { name: 'Git', icon: '📦' },
    { name: 'CI/CD', icon: '🔄' },
    { name: 'Terraform', icon: '🏗️' },
    { name: 'Vercel', icon: '▲' }
  ]

  return (
    <section className="py-12 bg-gray-800/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Kullandığımız <span className="gradient-text">Teknolojiler</span>
        </h2>
        
        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-10" />
          
          {/* First Marquee */}
          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-8"
              animate={{
                x: [0, -2000] // Adjust based on content width
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-6 py-3 glass rounded-lg border border-white/10 flex-shrink-0"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-white font-medium">{tech.name}</span>
                </div>
              ))}
              
              {/* Duplicate for seamless loop */}
              {technologies.map((tech, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex items-center space-x-3 px-6 py-3 glass rounded-lg border border-white/10 flex-shrink-0"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-white font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second Marquee (reverse direction) */}
          <div className="overflow-hidden mt-4">
            <motion.div
              className="flex space-x-8"
              animate={{
                x: [-2000, 0] // Reverse direction
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
            >
              {technologies.slice().reverse().map((tech, index) => (
                <div
                  key={`reverse-${index}`}
                  className="flex items-center space-x-3 px-6 py-3 glass rounded-lg border border-white/10 flex-shrink-0"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-white font-medium">{tech.name}</span>
                </div>
              ))}
              
              {/* Duplicate for seamless loop */}
              {technologies.slice().reverse().map((tech, index) => (
                <div
                  key={`reverse-duplicate-${index}`}
                  className="flex items-center space-x-3 px-6 py-3 glass rounded-lg border border-white/10 flex-shrink-0"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-white font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechMarquee
