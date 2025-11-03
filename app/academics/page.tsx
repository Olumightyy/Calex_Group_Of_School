"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { BookOpen, Users, Award, Microscope } from "lucide-react"

const programs = [
  {
    icon: BookOpen,
    title: "Primary Education",
    description: "Grades 1-5: Foundation building with focus on core subjects and creative development",
    subjects: ["Mathematics", "English", "Science", "Social Studies", "Arts", "Physical Education"],
  },
  {
    icon: Microscope,
    title: "Secondary Education",
    description: "Grades 6-8: Advanced curriculum with specialized labs and project-based learning",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History"],
  },
  {
    icon: Award,
    title: "Senior Secondary",
    description: "Grades 9-12: Specialized streams with college preparation and career guidance",
    subjects: ["Science Stream", "Commerce Stream", "Humanities Stream"],
  },
  {
    icon: Users,
    title: "Extracurricular",
    description: "Holistic development through sports, arts, and clubs",
    subjects: ["Sports", "Music", "Drama", "Debate", "Coding Club", "Science Club"],
  },
]

export default function AcademicsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Academic Programs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive curriculum designed to nurture excellence and foster lifelong learning
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{program.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm font-semibold mb-3">Key Subjects:</p>
                      <div className="flex flex-wrap gap-2">
                        {program.subjects.map((subject, i) => (
                          <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
