"use client";

import { skillBlocks } from "@/constants";
import SkillText from "../sub/SkillText";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SkillBadge = ({ tag }: { tag: string }) => {
  // Default styling for tags; customize colors based on tag content if desired
  let colorClasses = "bg-gray-800 border-gray-600 text-gray-300";

  // Example: customize based on tag value (optional)
  // if (tag.toLowerCase() === "dart") {
  //   colorClasses = "bg-blue-900/30 border-blue-500/50 text-blue-300";
  // }

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorClasses}`}>
      {tag}
    </span>
  );
};

const SkillBlockCard = ({ block, index }: { block: any; index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={cardVariants}
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col relative overflow-hidden rounded-xl border border-[#2A0E61] bg-[#030014]/50 backdrop-blur-md p-6 h-full w-full max-w-[350px]"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{block.icon}</span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
            {block.label}
          </span>
          <h3 className="text-lg font-bold text-white">{block.title}</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {block.tags.map((tag: any, idx: number) => (
          <SkillBadge key={idx} tag={tag} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20 z-[20]"
    >
      <SkillText />

      <div className="w-full max-w-7xl mx-auto px-5 md:px-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {skillBlocks.map((block, index) => (
            <SkillBlockCard key={index} block={block} index={index} />
          ))}
        </div>
      </div>

      <div className="w-full h-full absolute top-0 left-0">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="none"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;