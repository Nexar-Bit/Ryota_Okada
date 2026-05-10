import React, { useRef, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion, useAnimation, useInView } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn } from "../utils/motion";
import { useI18n } from "../i18n";

const ProjectCard = ({
  project,
  animate,
}) => {
  const { get } = useI18n();
  const loc = project?.id ? get(`projects.${project.id}`) : null;
  const name = loc?.name ?? project.name;
  const description = loc?.description ?? project.description;
  const { tags, image } = project;
  return (
    <motion.div variants={animate}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <p key={index} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" }); // Adjust amount as needed
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <section ref={ref}>
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h3 className={`${styles.sectionSubText} text-center`}>{t("works.subtitle")}</h3>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h3 className={`${styles.sectionHeadText} text-center`}>{t("works.title")}</h3>
      </motion.div>

      <motion.div>
        <div
          className={`${
            window.innerWidth <= 768
              ? "grid grid-cols-1 gap-4 place-items-center"
              : "flex flex-wrap gap-7"
          }`}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id ?? `project-${index}`}
              project={project}
              animate={
                window.innerWidth <= 768
                  ? {}
                  : fadeIn("up", "spring", index * 0.5, 0.75)
              }
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SectionWrapper(Works, "projects");
