"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Award, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

const highlights = [
  {
    icon: BookOpen,
    title: "Quality Education",
    description: "Comprehensive curriculum designed to develop critical thinking and creativity",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description: "Experienced educators dedicated to student success and personal growth",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Consistent academic achievements and awards from national competitions",
  },
  {
    icon: Zap,
    title: "Modern Facilities",
    description: "State-of-the-art labs, library, and sports facilities for holistic development",
  },
]

export function Highlights() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EduHub?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide a comprehensive educational experience with modern facilities and expert guidance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
