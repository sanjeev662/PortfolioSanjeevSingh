import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Eye } from "lucide-react";
import { GlassCard } from "../../ui/card";
import { Button } from "../../ui/button";
import LazyImage from "../../ui/LazyImage";

function CertificateCard({ imgUrl, title, tagline, siteUrl }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <GlassCard className="overflow-hidden h-full bg-white/70 dark:bg-black/10 border-border/50">
        <div className="relative">
          {/* Certificate Image */}
          <div className="aspect-[3/2] overflow-hidden border-b border-border/30">
            <LazyImage 
              src={imgUrl} 
              alt={title}
              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1 line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-white/90 text-xs mb-3 line-clamp-2">
                    {tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-4 bg-card/80 dark:bg-transparent">
          <div className="flex items-start space-x-2">
            <div className="p-1.5 rounded-lg bg-primary/15 flex-shrink-0">
              <Award className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors text-card-foreground">
                {title}
              </h3>
              <p className="text-muted-foreground text-xs line-clamp-2">
                {tagline}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-3">
            <Button variant="outline" size="sm" className="flex-1 text-xs h-8" asChild>
              <a href={imgUrl} target="_blank" rel="noopener noreferrer">
                <Eye className="w-3 h-3 mr-1" />
                View Certificate
              </a>
            </Button>
            
            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" asChild>
              <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                Visit Site
              </a>
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default React.memo(CertificateCard);
