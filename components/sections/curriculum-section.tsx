"use client"

import { SkillDevelopment } from "@/components/curriculum/skill-development"
import { LearningOutcomes } from "@/components/curriculum/learning-outcomes"

export function CurriculumSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Curriculum Overview</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <SkillDevelopment />
            <LearningOutcomes />
          </div>
        </div>
      </div>
    </section>
  )
}

