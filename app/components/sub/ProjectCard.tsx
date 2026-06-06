import Image from "next/image";
import React from "react";
import { FaGithub, FaGooglePlay, FaLink } from "react-icons/fa";

interface Link {
  label: string;
  url: string;
  type: string;
}

interface Props {
  title: string;
  shortDescription: string;
  fullDescription: string;
  badge?: string;
  badgeType?: string;
  role?: string;
  duration?: string;
  stats?: string[];
  stack: string[];
  highlights?: string[];
  screenshotUrls: string[];
  links?: Link[];
}

const ProjectCard = ({
  title,
  shortDescription,
  fullDescription,
  badge,
  badgeType,
  role,
  duration,
  stats,
  stack,
  highlights,
  screenshotUrls,
  links,
}: Props) => {
  const getBadgeColor = (type?: string) => {
    switch (type) {
      case "live":
        return "bg-green-900/50 text-green-300 border-green-500/50";
      case "dev":
        return "bg-amber-900/50 text-amber-300 border-amber-500/50";
      case "internal":
        return "bg-purple-900/50 text-purple-300 border-purple-500/50";
      default:
        return "bg-gray-800 text-gray-300 border-gray-600";
    }
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case "github":
        return <FaGithub />;
      case "playStore":
        return <FaGooglePlay />;
      default:
        return <FaLink />;
    }
  };

  const mainImage = screenshotUrls && screenshotUrls.length > 0 ? screenshotUrls[0] : "/placeholder.png";

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#030014]/50 backdrop-blur-md w-full flex flex-col h-full group">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getBadgeColor(badgeType)} shadow-md backdrop-blur-md`}>
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="relative p-5 flex flex-col flex-1">
        <div className="flex flex-col gap-1 mb-3">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-[#0AD3FF] text-sm font-medium">{role} &bull; {duration}</p>
        </div>
        
        <h3 className="text-base font-semibold text-[#8b26eb] mb-3">{shortDescription}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {stack.map((tech, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-purple-900/30 text-purple-200 border border-purple-700/50 rounded-md">
              {tech}
            </span>
          ))}
        </div>

        <div className="text-gray-300 text-sm space-y-4 mb-4 flex-1">
          <p className="whitespace-pre-line leading-relaxed">{fullDescription}</p>
          
          {highlights && highlights.length > 0 && (
            <div>
              <p className="font-semibold text-white mb-2">Key Highlights:</p>
              <ul className="list-disc pl-4 space-y-1">
                {highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {stats && stats.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-[#2A0E61]">
            {stats.map((stat, i) => (
              <span key={i} className="text-xs text-gray-400 font-medium bg-gray-900/50 px-2 py-1 rounded">
                {stat}
              </span>
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#2A0E61]">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-white/5 text-white border border-[#7042f88b] rounded-lg text-sm font-medium transition-all"
              >
                {getLinkIcon(link.type)} {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;