"use client"

import React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, FreeMode } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"

import { styles } from "../styles"
import { SectionWrapper } from "../hoc"
import { textVariant } from "../utils/motion"
import { CLIENT_REVIEWS } from "../data/clientReviews"
import { useI18n } from "../i18n"

const StarRating = () => (
  <div className="flex items-center justify-center gap-0.5 pt-1" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]" strokeWidth={0} />
    ))}
  </div>
)

const Feedbacks = () => {
  const { t, get } = useI18n()

  return (
    <div className="mt-12 md:mt-20 pb-8">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className={styles.sectionSubText}>{t("feedback.subtitle")}</p>
        <h2 className={styles.sectionHeadText}>{t("feedback.title")}</h2>
      </motion.div>

      <div className="mt-10 md:mt-14 px-2 sm:px-0">
        <Swiper
          modules={[Autoplay, Pagination, FreeMode]}
          loop
          speed={600}
          slidesPerView={1.15}
          spaceBetween={16}
          centeredSlides={false}
          freeMode={{ enabled: true, momentum: true }}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 1.35, spaceBetween: 18 },
            640: { slidesPerView: 2.1, spaceBetween: 20 },
            900: { slidesPerView: 2.75, spaceBetween: 22 },
            1200: { slidesPerView: 3.35, spaceBetween: 24 },
          }}
          className="feedback-swiper !pb-12"
        >
          {CLIENT_REVIEWS.map((review, index) => (
            <SwiperSlide key={`${review.name}-${index}`} className="!h-auto">
              <div className="feedback-card relative flex h-full min-h-[220px] flex-col justify-between gap-4 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-[#1a1535]/95 via-tertiary to-black-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_40px_rgba(145,94,255,0.12)] backdrop-blur-md">
                <div>
                  <p className="text-center font-semibold text-white text-[17px] leading-snug">{review.name}</p>
                  <p className="mt-2 text-center text-secondary text-[13px]">
                    {get(`countries.${review.nationalityKey}`) ?? review.nationalityKey}
                  </p>
                  <p className="mt-3 text-center text-[13px] sm:text-[14px] leading-relaxed text-white/85">
                    {get(`feedback.reviews.${index}`)}
                  </p>
                </div>
                <StarRating />
                <span className="sr-only">
                  {t("feedback.ratingLabel")}. {get(`feedback.reviews.${index}`)}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .feedback-swiper .swiper-pagination-bullet {
          background: rgba(167, 139, 250, 0.45);
        }
        .feedback-swiper .swiper-pagination-bullet-active {
          background: #915eff;
        }
      `}</style>
    </div>
  )
}

export default SectionWrapper(Feedbacks, "feedback")
