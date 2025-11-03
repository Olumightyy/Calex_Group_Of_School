"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Users, Target, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EduHub</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforming education through technology and innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description:
                  "To provide a comprehensive, technology-enabled educational platform that empowers students, supports teachers, and keeps parents engaged in their child's learning journey.",
              },
              {
                icon: Lightbulb,
                title: "Our Vision",
                description:
                  "To revolutionize school management by creating a seamless ecosystem where education is accessible, transparent, and personalized for every student.",
              },
              {
                icon: Users,
                title: "Our Values",
                description:
                  "Excellence, integrity, innovation, and inclusivity guide everything we do. We believe in the power of education to transform lives.",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 text-center h-full">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                EduHub was founded with a simple vision: to bridge the gap between schools, students, teachers, and
                parents through technology. We recognized that traditional school management systems were outdated and
                disconnected.
              </p>
              <p>
                Today, EduHub serves thousands of students, teachers, and parents across multiple institutions,
                providing a unified platform for academic excellence and transparent communication.
              </p>
              <p>
                Our commitment to innovation and user experience continues to drive us forward as we expand our platform
                with new features and capabilities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
