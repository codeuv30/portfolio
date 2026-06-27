"use client";

import { useEffect, useRef } from "react";
import TextReveal from "./TextReveal";
import gsap, { ScrollTrigger, useGSAP } from "@/libs/gsap";
import { projects } from "@/data/projects";
import useViewTransition from "@/hooks/useViewTransition";

const ProjectPage = ({ project }) => {
  const { navigateTo, preOverlay } = useViewTransition();

  useEffect(() => {
    preOverlay();
  }, []);

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const nextProject = projects[project.id - 1 + 1];

  const handleClick = () => {
    navigateTo(`/projects/${nextProject.slug}`);
  };

  useGSAP(
    () => {
      const sections = gsap.utils.toArray("section");

      gsap.to(imgRef.current, {
        clipPath: "inset(0 0 0% 0)",
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        delay: 0.6,
      });

      sections.forEach((section, idx) => {
        const container = section.children[0];

        gsap.to(container, {
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });

        if (idx === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <main ref={containerRef}>
        <section className="h-screen w-full">
          <div className="sectionContainer h-full w-full flex pt-28 pb-16 px-12">
            <div className="firstSegment h-full w-[15%]">
              <TextReveal delay={0.6}>
                <h3 className="text-[2rem]">{project.number}</h3>
              </TextReveal>
            </div>

            <div className="secondSegment h-full w-[30%]">
              <div className="imageDiv h-full w-full overflow-hidden">
                <img
                  ref={imgRef}
                  style={{
                    clipPath: "inset(0 0 100% 0)",
                  }}
                  className="h-full w-full object-cover scale-[1.4]"
                  src={project.coverImage}
                  alt={project.title}
                />
              </div>
            </div>

            <div className="thirdSegment pl-[5rem] h-full w-[60%] flex flex-col justify-end">
              <div className="heading">
                <TextReveal splitBy={"chars"} delay={0.6}>
                  <h1 className="text-[2rem]">{project.title}</h1>
                </TextReveal>
              </div>

              <div className="subheading flex gap-[3rem] opacity-70">
                <TextReveal splitBy={"chars"} delay={0.6}>
                  <h1
                    className="text-[1.3rem] leading-[1.1]
                "
                  >
                    {project.subtitle}
                  </h1>
                </TextReveal>

                <TextReveal splitBy={"chars"} delay={0.6}>
                  <h1 className="text-[1.5rem]">{project.year}</h1>
                </TextReveal>
              </div>

              <div className="description mt-[2rem] w-[80%] opacity-70">
                <TextReveal splitBy={"lines"} delay={0.6}>
                  <p className="text-[1.1rem] leading-[1.2]">
                    {project.description}
                  </p>
                </TextReveal>
              </div>
            </div>
          </div>
        </section>

        {project.gallery.map((img, idx) => {
          return (
            <section key={idx} className="h-screen w-full">
              <div
                style={{
                  transformOrigin: "bottom left",
                }}
                className="sectionContainer h-full w-full rotate-[30deg]"
              >
                <img className="h-full w-full" src={img} alt="" />
              </div>
            </section>
          );
        })}
        <footer className="h-screen flex items-center justify-center w-full">
          <h1>Next Project</h1>
          <h1 onClick={handleClick}>{nextProject.title}</h1>
        </footer>
      </main>
    </>
  );
};

export default ProjectPage;
