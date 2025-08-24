import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  Star, 
  Tag,
  Calendar,
  Eye,
  Code2
} from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard, Card, CardContent, CardHeader } from "../../ui/card";

function ProjectCard({ 
  title, 
  imgUrl, 
  demoUrl, 
  codeUrl, 
  description, 
  skills = [], 
  category,
  featured = false,
  year,
  viewMode = "grid"
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === "list") {
    return (
      <GlassCard 
        className="overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-1/3 aspect-video md:aspect-square overflow-hidden">
            <img
              src={imgUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <div className="flex space-x-4">
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                  className="backdrop-blur-sm"
                >
                  <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4 mr-2" />
                    Demo
                  </a>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                  className="backdrop-blur-sm"
                >
                  <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                    <Code2 className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Badges */}
            {featured && (
              <div className="absolute top-4 left-4">
                <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Star className="w-3 h-3" />
                  <span>Featured</span>
                </div>
              </div>
            )}
            
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-1 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                <Calendar className="w-3 h-3" />
                <span>{year}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <CardContent className="md:w-2/3 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-primary font-medium">{category}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/50 text-accent-foreground text-sm rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 group/btn"
                asChild
              >
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-45 transition-transform" />
                  Live Demo
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 group/btn"
                asChild
              >
                <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                  Source Code
                </a>
              </Button>
            </div>
          </CardContent>
        </div>
      </GlassCard>
    );
  }

  // Grid view (default)
  return (
    <motion.div
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="h-full overflow-hidden group">
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
          >
            <div className="flex space-x-4">
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="backdrop-blur-sm"
              >
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="backdrop-blur-sm"
              >
                <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                <Star className="w-3 h-3" />
                <span>Featured</span>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              <Tag className="w-3 h-3" />
              <span>{category}</span>
            </div>
          </div>

          {/* Year Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center space-x-1 bg-background/90 text-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              <Calendar className="w-3 h-3" />
              <span>{year}</span>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {description}
              </p>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent/50 text-accent-foreground text-xs rounded-md font-medium"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
                  +{skills.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 group/btn"
              asChild
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-45 transition-transform" />
                Demo
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 group/btn"
              asChild
            >
              <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                Code
              </a>
            </Button>
          </div>
        </CardContent>
      </GlassCard>
    </motion.div>
  );
}

export default ProjectCard;
