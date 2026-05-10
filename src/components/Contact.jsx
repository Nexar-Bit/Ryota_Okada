"use client"

import { EarthCanvas } from "./canvas"
import { SectionWrapper } from "../hoc"

const Contact = () => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 md:py-14">
      <div className="w-full min-h-[75vh] h-[min(92vh,920px)] rounded-2xl overflow-hidden border border-white/10 bg-black-100/30 shadow-[0_0_80px_rgba(145,94,255,0.12)]">
        <EarthCanvas />
      </div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")
