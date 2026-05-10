import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useState, useEffect } from "react";
import { useI18n } from "../i18n";

const TypewriterText = ({ texts }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!texts?.length) return;
    const typingInterval = setInterval(() => {
      if (isTyping) {
        const currentText = texts[currentIndex];
        if (displayText.length < currentText.length) {
          setDisplayText((prevText) => currentText.slice(0, prevText.length + 1));
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(true);
            setDisplayText("");
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }, 2000);
        }
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, isTyping, texts, displayText]);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsTyping(true);
  }, [texts]);

  return (
    <span className="inline-block text-[#915EFF] font-bold">
      {displayText.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
      {isTyping && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

const WavingHand = () => {
  return (
    <img
      src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f44b.png"
      alt=""
      className="wave-emoji"
      style={{ display: "inline-block", marginLeft: "10px", width: "50px", height: "50px" }}
    />
  );
};

const Hero = () => {
  const { get, t } = useI18n();
  const typedItems = get("hero.typed");
  const welcome = t("hero.welcomeBold");

  return (
    <section className="relative isolate w-full min-h-screen mx-auto overflow-x-hidden overflow-y-visible bg-primary">
      <style>{`
        @keyframes hero-wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(-10deg); }
          20% { transform: rotate(12deg); }
          30% { transform: rotate(-10deg); }
          40% { transform: rotate(9deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .wave-emoji {
          animation-name: hero-wave;
          animation-duration: 1.8s;
          animation-iteration-count: infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>
      <div className={`absolute inset-0 top-[120px] z-10 max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            {t("hero.greetingHi")}
            <span className="text-[#915EFF]">{t("hero.name")}</span> <WavingHand />
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            <TypewriterText texts={Array.isArray(typedItems) ? typedItems : []} />
            <br />
            <b>{welcome}</b>
          </p>
        </div>
      </div>

      <div className="relative z-0 mt-6 sm:mt-10 flex min-h-[380px] h-[min(64vh,720px)] w-full flex-col sm:min-h-[420px] sm:h-[min(66vh,760px)]">
        <ComputersCanvas />
      </div>

      <div className="absolute xs:bottom-10 bottom-32 z-10 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
