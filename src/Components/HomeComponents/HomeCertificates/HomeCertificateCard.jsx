import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Eye } from "lucide-react";
import { GlassCard } from "../../ui/card";
import { Button } from "../../ui/button";

function CertificateCard({ imgUrl, title, tagline, siteUrl }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <GlassCard className="overflow-hidden h-full">
        <div className="relative">
          {/* Certificate Image */}
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={imgUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-2">
                    {tagline}
                  </p>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    asChild
                  >
                    <a href={imgUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="w-4 h-4" />
                    </a>
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    asChild
                  >
                    <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {tagline}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href={imgUrl} target="_blank" rel="noopener noreferrer">
                <Eye className="w-4 h-4 mr-2" />
                View Certificate
              </a>
            </Button>
            
            <Button variant="ghost" size="sm" asChild>
              <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default CertificateCard;
