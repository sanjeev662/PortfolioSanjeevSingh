import React, { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Helmet } from "react-helmet-async";
import { ArrowDown, Download } from "lucide-react";

import { Button } from "../../ui/button";
import LazyImage from "../../ui/LazyImage";
import { HERO_SOCIAL_LINKS, PROFILE, getIcon } from "../../../data";
import portrait from "../../Assets/Images/me2.webp";
import HomeAbout from "../../HomeComponents/HomeAbout/HomeAbout";
import HomeCertificate from "../../HomeComponents/HomeCertificates/HomeCertificates";
import HomeContacts from "../../HomeComponents/HomeContacts/HomeContacts";
import HomeDomain from "../../HomeComponents/HomeDomain/HomeDomain";
import HomeProjects from "../../HomeComponents/HomeProjects/HomeProjects";

// The two soft glows behind the hero. This used to be a pair of 320px
// `blur-3xl animate-pulse` circles, which meant the GPU re-blurred them
// forever. A plain radial gradient paints once and looks the same.
const HERO_GLOW =
  "radial-gradient(40rem 26rem at 88% -8%, hsl(var(--primary) / 0.22), transparent 70%), " +
  "radial-gradient(34rem 22rem at 6% 108%, hsl(var(--primary) / 0.16), transparent 70%)";

// Ring around the avatar. Static until you hover it.
const AVATAR_RING =
  "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--primary) / 0.08), hsl(var(--primary)))";

// The identical hairline that separates each homepage section. It was
// copy-pasted four times; one local helper is easier to keep in step.
function SectionDivider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="container-custom" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scaleX: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        className="h-px w-full origin-center bg-gradient-to-r from-transparent via-border to-transparent"
      />
    </div>
  );
}

function Home() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById("about-section");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  }, [prefersReducedMotion]);

  return (
    <>
      <Helmet>
        <title>{`${PROFILE.name} - Full Stack Developer | Portfolio`}</title>
        <meta name="description" content="Full Stack Developer specializing in JavaScript, Java, React.js, and Spring Boot. Explore my projects, certificates, and professional journey." />
        <meta name="keywords" content="Sanjeev Singh, Full Stack Developer, JavaScript, Java, React, Spring Boot, Portfolio" />
        <meta property="og:title" content={`${PROFILE.name} - Full Stack Developer`} />
        <meta property="og:description" content="Full Stack Developer specializing in JavaScript, Java, React.js, and Spring Boot" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={PROFILE.siteUrl} />
      </Helmet>

      <div>
        {/* Hero. 100svh rather than 100vh so iOS Safari's URL bar doesn't push
            the scroll indicator off screen. */}
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 hero-gradient-bg" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ backgroundImage: HERO_GLOW }}
          />

          <div className="container-custom section-padding relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
              className="space-y-8"
            >
              {/* Avatar */}
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { scale: 0, rotate: -180, opacity: 1 }
                }
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 260, damping: 20, delay: 0.2 }
                }
                className="flex justify-center"
              >
                <motion.div
                  className="relative"
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                >
                  <motion.div
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-full opacity-80"
                    style={{ background: AVATAR_RING }}
                    variants={{
                      hover: {
                        rotate: 360,
                        transition: { duration: 8, ease: "linear", repeat: Infinity },
                      },
                    }}
                  />
                  {/* LCP element: eager + high priority, fixed box so it can't
                      shift the layout when it lands. */}
                  <LazyImage
                    src={portrait}
                    alt={PROFILE.name}
                    eager
                    aspectRatio="1/1"
                    className="relative h-40 w-40 rounded-full shadow-2xl ring-4 ring-background md:h-48 md:w-48"
                    imgClassName="rounded-full"
                  />
                </motion.div>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.15,
                  duration: prefersReducedMotion ? 0 : 0.6,
                }}
                className="space-y-4"
              >
                {/* The real heading. Static, so screen readers and crawlers get
                    one stable sentence instead of a string that keeps changing. */}
                <h1 className="sr-only">Hi, I'm {PROFILE.name}</h1>

                {/* The visible version. Hidden from assistive tech because it is
                    the same sentence mid-animation. It types through the three
                    phrases once and settles back on the name — no infinite loop. */}
                <p
                  aria-hidden="true"
                  className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  {prefersReducedMotion ? (
                    <span className="gradient-text">Hi, I'm {PROFILE.name}</span>
                  ) : (
                    <TypeAnimation
                      cursor
                      wrapper="span"
                      className="gradient-text"
                      sequence={[
                        "",
                        500,
                        `Hi, I'm ${PROFILE.name}`,
                        2000,
                        "Hi, I'm a Full Stack Developer",
                        2000,
                        "Hi, I'm a Problem Solver",
                        2000,
                        `Hi, I'm ${PROFILE.name}`,
                      ]}
                    />
                  )}
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.3,
                    duration: prefersReducedMotion ? 0 : 0.6,
                  }}
                  className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg md:text-xl"
                >
                  {PROFILE.role} specializing in{" "}
                  <span className="font-semibold text-primary">Java</span> &{" "}
                  <span className="font-semibold text-primary">JavaScript</span>
                </motion.p>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.38,
                  duration: prefersReducedMotion ? 0 : 0.6,
                }}
                className="flex flex-wrap justify-center gap-4 sm:gap-6"
              >
                {HERO_SOCIAL_LINKS.map((social, index) => {
                  const Icon = getIcon(social.icon);
                  return (
                    <motion.a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground backdrop-blur-sm transition-colors duration-300 ${social.color}`}
                      whileHover={
                        prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }
                      }
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.46 + index * 0.06,
                      }}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.55,
                  duration: prefersReducedMotion ? 0 : 0.6,
                }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Button variant="gradient" size="lg" className="group" asChild>
                  <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Download
                      className="mr-2 h-5 w-5 group-hover:animate-bounce"
                      aria-hidden="true"
                    />
                    Download Resume
                  </a>
                </Button>

                <Button variant="outline" size="lg" onClick={scrollToNext} className="group">
                  Explore My Work
                  <ArrowDown
                    className="ml-2 h-5 w-5 group-hover:animate-bounce"
                    aria-hidden="true"
                  />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.7,
              duration: prefersReducedMotion ? 0 : 0.6,
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.button
              type="button"
              onClick={scrollToNext}
              aria-label="Scroll to about section"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
              transition={
                prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }
              }
            >
              <ArrowDown className="h-6 w-6" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </section>

        {/* Homepage sections */}
        <div className="space-y-20">
          <div id="about-section">
            <HomeAbout />
          </div>

          <SectionDivider />
          <HomeCertificate />

          <SectionDivider />
          <HomeProjects />

          <SectionDivider />
          <HomeDomain />

          <SectionDivider />
          <HomeContacts />
        </div>
      </div>
    </>
  );
}

export default React.memo(Home);
