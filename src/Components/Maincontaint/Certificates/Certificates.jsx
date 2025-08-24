import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import CertificateCard from "./CertificateCard";
import { useIntersectionObserver } from "../../../lib/utils";

import multigradc from "../../Assets/Certificates/multigrad.png"
import namekart_Internc from "../../Assets/Certificates/namekart_intern.png";
import rydeu_internc from "../../Assets/Certificates/rydeu_intern.png";
import iitk_mlc from "../../Assets/Certificates/iitk_ml.png";
import risec from "../../Assets/Certificates/rise.png";
import icpcc from "../../Assets/Certificates/icpc.jpg";
import mernc from "../../Assets/Certificates/udemy.jpg";
import tsfc from "../../Assets/Certificates/spark.jpg";
import unic from "../../Assets/Certificates/unicompiler.jpg";
import tcsc from "../../Assets/Certificates/tcs.jpg"
import nitmizoramc from "../../Assets/Certificates/nit_mijoram.jpg";
import flipc from "../../Assets/Certificates/flipkart.jpg";
import codechefc from "../../Assets/Certificates/codechef.jpg";
import hackc from "../../Assets/Certificates/hackerrank_java.jpg";
import uiet from "../../Assets/Certificates/uiet.jpg";
import isro from "../../Assets/Certificates/isro.jpg";

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
    },
    {
      title: "IIT Kanpur",
      imgUrl: iitk_mlc,
      siteUrl: "https://www.iitk.ac.in/",
      tagline: "Machine Learning Course"
    },
    {
      title: "Udemy",
      imgUrl: mernc,
      siteUrl: "https://www.udemy.com/",
      tagline: "Web Development Bootcamp"
    },
    {
      title: "ISRO",
      imgUrl: isro,
      siteUrl: "https://www.isro.gov.in/",
      tagline: "Machine Learning"
    },
    {
      title: "Rise Higher Education Inc",
      imgUrl: risec,
      siteUrl: "https://www.risehighereducation.com/",
      tagline: "Full Stack Development Intern"
    },
    {
      title: "The Sparks Foundation",
      imgUrl: tsfc,
      siteUrl: "https://www.thesparksfoundationsingapore.org/",
      tagline: "Web Development & Designing Intern"
    },
    {
      title: "Fightage Pvt Ltd (Multigrad)",
      imgUrl: multigradc,
      siteUrl: "https://multigrad.in/",
      tagline: "Full Stack Development Intern"
    },
    {
      title: "UNICompiler",
      imgUrl: unic,
      siteUrl: "https://unicompiler.com/",
      tagline: "Web Dev Intern"
    },
    {
      title: "Tata Consultancy Services",
      imgUrl: tcsc,
      siteUrl: "https://www.tcs.com/",
      tagline: "TCS Soft Skills Certificate"
    },
    {
      title: "NIT Mijoram",
      imgUrl: nitmizoramc,
      siteUrl: "https://www.nitmz.ac.in/",
      tagline: "Web Dev Contest"
    },
    {
      title: "Codechef",
      imgUrl: codechefc,
      siteUrl: "https://www.codechef.com/",
      tagline: "SnackDown Certificate"
    },
    {
      title: "Hackerrank",
      imgUrl: hackc,
      siteUrl: "https://www.hackerrank.com/",
      tagline: "Java Certification"
    },
    {
      title: "UIET CSJMU",
      imgUrl: uiet,
      siteUrl: "http://csjmu.ac.in/",
      tagline: "Internet of Things (IOT)"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">Certificates & Achievements</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Professional certifications, internship completions, and competitive programming achievements demonstrating continuous learning and excellence.
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {certificatelist.map((certificate, index) => (
              <motion.div key={`${certificate.title}-${index}`} variants={itemVariants}>
                <CertificateCard
                  title={certificate.title}
                  tagline={certificate.tagline}
                  imgUrl={certificate.imgUrl}
                  siteUrl={certificate.siteUrl}
                />
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-12">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">15+</div>
              <div className="text-xs text-muted-foreground">Total Certificates</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
              <div className="text-xl font-bold text-green-600 dark:text-green-400 mb-1">6+</div>
              <div className="text-xs text-muted-foreground">Internships</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200 dark:border-purple-800">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-1">5+</div>
              <div className="text-xs text-muted-foreground">Tech Courses</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800">
              <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">3+</div>
              <div className="text-xs text-muted-foreground">Competitions</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Certificates;
