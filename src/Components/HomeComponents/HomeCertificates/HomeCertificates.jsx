import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import CertificateCard from "./HomeCertificateCard";
import { Button } from "../../ui/button";
import { useIntersectionObserver } from "../../../lib/utils";

import icpcc from "../../Assets/Certificates/icpc.jpg";
import namekart_Internc from "../../Assets/Certificates/namekart_intern.png";
import rydeu_internc from "../../Assets/Certificates/rydeu_intern.png";

function Certificates() {
  const { ref, hasIntersected } = useIntersectionObserver();

  const certificatelist = [
    {
      title: "Namekart Pvt. Ltd",
      imgUrl: namekart_Internc,
      siteUrl: "https://www.namekart.com/",
      tagline: "SDE Intern"
    },
    {
      title: "Rydeu Logistics India Pvt. Ltd",
      imgUrl: rydeu_internc,
      siteUrl: "https://www.rydeu.com/",
      tagline: "Backend Development Intern"
    },
    {
      title: "ACM-ICPC",
      imgUrl: icpcc,
      siteUrl: "https://icpc.global/",
      tagline: "ICPC 2022 Regionalist"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className="py-12 md:py-16 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">Certificates & Achievements</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional certifications and achievements that showcase my expertise and continuous learning
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {certificatelist.map((certificate, index) => (
              <motion.div key={certificate.title} variants={itemVariants}>
                <CertificateCard
                  title={certificate.title}
                  tagline={certificate.tagline}
                  imgUrl={certificate.imgUrl}
                  siteUrl={certificate.siteUrl}
                />
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <Button variant="gradient" size="lg" className="group" asChild>
              <Link to="/certificates">
                <Award className="w-5 h-5 mr-2" />
                View More Certificates
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Certificates;
