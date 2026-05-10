"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Code2, Cpu, Globe2, Layers3, Sparkles } from "lucide-react"

import { styles } from "../styles"
import { SectionWrapper } from "../hoc"
import { fadeIn } from "../utils/motion"
import { profilepic } from "../assets"

const OverviewIconBadge = ({ children }) => (
  <span className="overview-icon-badge mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#915EFF]/35 via-[#1a1535] to-cyan-400/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_40px_rgba(145,94,255,0.22)] backdrop-blur-md ring-1 ring-white/[0.06]">
    {children}
  </span>
)

const OVERVIEW_ITEMS = [
  {
    Icon: Code2,
    body: (
      <>
        I&apos;m Ryota Okada, a Full Stack Software Engineer based in Japan—shipping APIs, data layers, and interfaces
        users rely on every day.
      </>
    ),
  },
  {
    Icon: Globe2,
    body: (
      <>
        I care about clear architecture, maintainable codebases, and collaboration across design, product, and
        engineering.
      </>
    ),
  },
  {
    Icon: Layers3,
    body: (
      <>
        From backend services and databases to React-based front ends, I enjoy owning features end to end and improving
        how teams deliver software.
      </>
    ),
  },
  {
    Icon: Cpu,
    body: (
      <>
        Always learning—whether that&apos;s performance, DevOps, or new frameworks that fit the problem at hand.
      </>
    ),
  },
  {
    Icon: Sparkles,
    body: <>I&apos;m always curious and constantly learning.</>,
  },
]

const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.05, margin: "0px 0px -80px 0px" })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <div ref={sectionRef} className="pt-[60px] md:pt-0 overflow-hidden">
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <p className={styles.sectionSubText}>Introduction</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <div className="mt-10 flex flex-col md:flex-row items-center md:items-start gap-10">
        <motion.div
          variants={fadeIn("right", "spring", 0.5, 0.75)}
          className="w-full md:w-1/3 flex flex-col items-center"
        >
          <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-[0_0_22.5px_7.5px_rgba(128,0,1028,1.0)] ring-2 ring-white/[0.08]">
            <div className="w-full h-full overflow-hidden">
              <img
                src={profilepic || "/placeholder.svg"}
                alt="Ryota Okada"
                className="w-full h-full object-cover"
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn("left", "spring", 0.5, 0.75)} className="w-full md:w-2/3">
          <motion.ul variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl space-y-6 list-none">
            {OVERVIEW_ITEMS.map(({ Icon, body }, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                variants={fadeIn("up", "spring", (index + 1) * 0.1, 0.75)}
              >
                <OverviewIconBadge>
                  <Icon className="h-[22px] w-[22px] text-violet-100" strokeWidth={1.85} aria-hidden />
                </OverviewIconBadge>
                <span>{body}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  )
}

export default SectionWrapper(About, "about")
