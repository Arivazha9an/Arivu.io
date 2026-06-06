"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideInFromLeft, slideInFromTop } from "@/utils/motion";
import { experiences } from "@/constants";

const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={slideInFromLeft(0.2 + index * 0.1)}
      className="relative flex flex-col md:flex-row gap-6 md:gap-10 border border-[#2A0E61] bg-[#030014]/50 backdrop-blur-md rounded-xl p-6 md:p-8 w-full z-[20]"
    >
      <div className="flex flex-col md:w-1/3 shrink-0">
        <h3 className="text-2xl font-bold text-white mb-2">{experience.company}</h3>
        <p className="text-[#0AD3FF] font-medium mb-1">{experience.location}</p>
        <p className="text-gray-400 text-sm">{experience.period}</p>
      </div>
      
      <div className="flex flex-col md:w-2/3">
        <ul className="list-disc list-outside ml-4 space-y-3 text-gray-300">
          {experience.bullets.map((bullet: string, i: number) => (
            <li key={i} className="leading-relaxed pl-1">
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center py-20 px-5 md:px-10 z-[20] w-full max-w-7xl mx-auto"
      id="experience"
    >
      <motion.h1
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={slideInFromTop}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-14 text-center"
      >
        EXPERIENCE
      </motion.h1>

      <div className="flex flex-col gap-10 w-full">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
