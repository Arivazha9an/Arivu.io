"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SkillItem {
  skill_name: string;
  image: string;
}

const SI = (slug: string, color = "") =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;

const ALL_SKILLS: SkillItem[] = [
  { skill_name: "Flutter", image: SI("flutter", "54C5F8") },
  { skill_name: "Dart", image: SI("dart", "0175C2") },
  { skill_name: "BLoC", image: "https://plugins.jetbrains.com/files/12129/953327/icon/default.svg" },
  { skill_name: "GetX", image: "https://camo.githubusercontent.com/2faf438fdd0c11b915289d7cb7e07faec7370897385ef8e6b8669fcd97930fe1/68747470733a2f2f6170692e696e746f70726f732e636f6d2f75706c6f6164732f323032332d30332f756e617574682d313637393339393231353830302d35333034626536346262383934396630623138653731623566393434383863302e706e67" },
  { skill_name: "Android Studio", image: "/androidStudio.png" },
  { skill_name: "Play Store", image: SI("googleplay", "34A853") },
  { skill_name: "App Store", image: SI("appstore", "0D96F6") },
  { skill_name: "Firebase Auth", image: "https://firebase.google.com/static/images/products/auth/auth-hero_2x.png" },
  { skill_name: "Firestore", image: "https://firebase.google.com/static/images/products/firestore/firestore-hero_2x.png" },
  { skill_name: "Realtime DB", image: "https://firebase.google.com/static/images/products/realtime-database/database-hero_2x.png" },
  { skill_name: "Firebase Storage", image: "https://firebase.google.com/static/images/products/storage/storage-hero_2x.png" },
  { skill_name: "FCM", image: "https://firebase.google.com/static/images/products/cloud-messaging/cloud-messaging-hero_2x.png" },
  { skill_name: "Analytics", image: SI("googleanalytics", "E37400") },
  { skill_name: "Hive", image: "https://avatars.githubusercontent.com/u/55202745?s=200&v=4" },
  { skill_name: "Google Cloud", image: "/googleCloud.png" },
  { skill_name: "AWS", image: "https://miro.medium.com/v2/resize:fit:1200/format:webp/1*xZxuVErHAS3EE7B0S2siVA.png" },
  { skill_name: "Google Maps SDK", image: SI("googlemaps", "4285F4") },
  { skill_name: "REST APIs", image: "https://media.licdn.com/dms/image/v2/D5612AQE0nEZrPGv0JA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1679583758253?e=2147483647&v=beta&t=4QpsM1YKchLOfxVzpfFJAQWdkJ3vg3aKUWYL5tFVXXI" },
  { skill_name: "WebSockets", image: SI("socketdotio", "25D4C6") },
  { skill_name: "JWT Auth", image: SI("jsonwebtokens", "FB015B") },
  { skill_name: "WebRTC", image: "https://webrtc.github.io/webrtc-org/assets/images/webrtc-logo-vert-retro-255x305.png" },
  { skill_name: "Razorpay", image: SI("razorpay", "3395FF") },
  { skill_name: "Stripe", image: "/stripe.webp" },
  { skill_name: "PhonePe", image: SI("phonepe", "5F259F") },
  { skill_name: "PayU", image: "https://vectorseek.com/wp-content/uploads/2023/08/Payu-Icon-Logo-Vector.svg-.png" },
  { skill_name: "Git", image: "/git.png" },
  { skill_name: "GitHub", image: "/github.png" },
  { skill_name: "Github Actions", image: "https://codilime.com/img/github-actions-logo-ci-cd-tools.png" },
  { skill_name: "Postman", image: "/postman.png" },
  { skill_name: "Figma", image: "/figma.png" },
  { skill_name: "Shorebird", image: "https://avatars.githubusercontent.com/u/115746275?s=200&v=4" },
];

const SkillIcon = ({
  skill,
  index,
}: {
  skill: SkillItem;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex flex-col items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap pointer-events-none"
          >
            <span
              className="text-[11px] font-bold px-3 py-1.5 rounded-lg text-white shadow-xl tracking-wide"
              style={{
                background: `linear-gradient(135deg, rgba(112,66,248,0.9), rgba(80,200,220,0.9))`,
                boxShadow: `0 0 16px rgba(112,66,248,0.5)`,
              }}
            >
              {skill.skill_name}
            </span>
            <span
              className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
              style={{
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: `5px solid rgba(112,66,248,0.9)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-[70px] h-[70px] cursor-pointer"
      >
        {imgError ? (
          <span className="text-xl font-extrabold text-purple-400">
            {skill.skill_name.charAt(0)}
          </span>
        ) : (
          <img
            src={skill.image}
            alt={skill.skill_name}
            onError={() => setImgError(true)}
            className="object-contain w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20 z-[20]"
    >
      <div className="flex flex-col items-center justify-center mb-10 z-[21]">
        <h1 className="text-[50px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-5">
          SKILLS
        </h1>
      </div>

      <div className="w-full max-w-5xl mx-auto px-5 md:px-10 flex flex-wrap gap-x-10 gap-y-12 justify-center items-center z-[21]">
        {ALL_SKILLS.map((skill, i) => (
          <SkillIcon
            key={skill.skill_name}
            skill={skill}
            index={i}
          />
        ))}
      </div>

      {/* background video */}
      <div className="w-full h-full absolute top-0 left-0 pointer-events-none">
        <div className="w-full h-full z-[-10] opacity-20 absolute flex items-center justify-center bg-cover">
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