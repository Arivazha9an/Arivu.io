"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import ProjectCard from "../sub/ProjectCard";
import { projects } from "@/constants";

const INITIAL_DESKTOP = 6;
const INITIAL_MOBILE = 3;

const Projects = () => {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center py-20 z-[20] w-full"
      id="projects"
    >
      <motion.h1
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={slideInFromTop}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-10"
      >
        PROJECTS
      </motion.h1>

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={slideInFromLeft(0.3)}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 md:px-10 max-w-7xl mx-auto"
      >
        {projects.map((project, index) => {
          let className = "flex";
          if (!expanded) {
            if (index >= INITIAL_DESKTOP) {
              className = "hidden";
            } else if (index >= INITIAL_MOBILE) {
              className = "hidden md:flex lg:flex";
            }
          }
          return (
            <div key={project.title} className={className}>
              <ProjectCard {...project} />
            </div>
          );
        })}
      </motion.div>

      {!expanded && projects.length > INITIAL_MOBILE && (
        <motion.button
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={slideInFromRight(0.5)}
          onClick={() => setExpanded(true)}
          className="mt-12 py-3 px-8 button-primary text-center text-white cursor-pointer rounded-lg border border-[#7042f88b] text-sm font-medium transition-all duration-300"
        >
          View More Projects
        </motion.button>
      )}
    </div>
  );
};

export default Projects;
