import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  Play, 
  Star, 
  Tag,
  Eye,
  Code2,
  Zap,
  X
} from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard, Card, CardContent, CardHeader } from "../../ui/card";
import { useLazyImage } from "../../../lib/utils";

function ProjectCard({ 
  title, 
  imgUrl, 
  uTubeUrl, 
  demoUrl, 
  codeUrl, 
  description, 
  skills = [], 
  category,
  featured = false 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  // Lazy load image for better performance
  const { imgRef, imageSrc, isLoaded } = useLazyImage(imgUrl);
  
  const toggleVideo = useCallback(() => setShowVideo(true), []);
  const closeVideo = useCallback(() => setShowVideo(false), []);
  
  const skillTags = useMemo(() => 
    skills.map((skill, index) => (
      <span
        key={index}
        className="px-2 py-1 bg-accent/50 text-accent-foreground text-xs rounded-md font-medium"
      >
        {skill}
      </span>
    )), [skills]
  );

  return (
    <motion.div
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="h-full overflow-hidden group">
        {/* Project Image/Video */}
        <div className="relative aspect-video overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            {showVideo && uTubeUrl ? (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <iframe
                  src={uTubeUrl}
                  title={`${title} demo video`}
                  className="max-w-full max-h-full"
                  style={{ aspectRatio: '16/9' }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                {/* Close Video Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={closeVideo}
                  className="absolute top-2 right-2 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full"
              >
                <div ref={imgRef} className="w-full h-full">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={title}
                      className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                    />
                  )}
                  {!isLoaded && (
                    <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  )}
                </div>
                
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center"
                >
                  <div className="flex space-x-4">
                    {uTubeUrl && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={toggleVideo}
                        className="backdrop-blur-sm"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Demo
                      </Button>
                    )}
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
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured Badge - Hidden when video is playing */}
          {featured && !showVideo && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                <Star className="w-3 h-3" />
                <span>Featured</span>
              </div>
            </div>
          )}

          {/* Category Badge - Also hidden when video is playing to avoid overlap */}
          {!showVideo && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-1 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                <Tag className="w-3 h-3" />
                <span>{category}</span>
              </div>
            </div>
          )}
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
              {skillTags}
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
      </GlassCard>
    </motion.div>
  );
}

export default React.memo(ProjectCard);
