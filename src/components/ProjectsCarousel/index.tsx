import { useRef } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { projects } from '~/data';
import { useInViewAnimation } from '~/hooks';

import { ArrowButton } from './ArrowButton';
import { ProjectImg } from './ProjectImg';
import { ProjectTitle } from './ProjectTitle';
import { ProjectDescription } from './ProjectDescription';

export const ProjectsCarousel = () => {
  const { transitioning, variants } = useDrawersContext();
  const inViewProps = useInViewAnimation<HTMLDivElement>();

  const x = useMotionValue(0);

  const carouselRef = useRef<HTMLDivElement>();
  const integerOffset = useRef(0);

  const getFrameWidth = () => {
    if (!carouselRef.current) {
      return undefined;
    }

    const rect = carouselRef.current.getBoundingClientRect();

    return Math.round(rect.width);
  };

  const offset = useTransform(x, value => {
    const width = getFrameWidth();

    if (width === undefined) {
      return 0;
    }

    return value / width;
  });

  const percentX = useTransform(offset, value => {
    return `${value * 100}%`;
  });

  const animateX = (newOffset: number) => {
    if (transitioning) {
      return;
    }

    const width = getFrameWidth();

    integerOffset.current = newOffset;

    animate(x, newOffset * width, {
      duration: 0.5,
    });
  };

  const back = () => {
    animateX(integerOffset.current + 1);
  };

  const forward = () => {
    animateX(integerOffset.current - 1);
  };

  const onPointerDown = () => {
    document.body.classList.add('grabbing');

    const listener = () => {
      document.body.classList.remove('grabbing');

      window.removeEventListener('pointerup', listener);
    };

    window.addEventListener('pointerup', listener);
  };

  const modifyTarget = (target: number) => {
    const width = getFrameWidth();

    integerOffset.current = Math.round(target / width);

    return width * integerOffset.current;
  };

  const borderVariants = variants({
    enter: {
      initial: {
        pathLength: 0,
      },
      whileInView: {
        pathLength: 1,
        transition: {
          duration: 0.8,
          delay: 0.9,
        },
      },
    },

    back: {
      exit: {
        pathLength: 0,
        transition: {
          duration: 1,
        },
      },
    },
  });

  const initialPercent = `${projects.length * 100}%`;

  const carouselVariants = variants({
    enter: {
      initial: {
        x: initialPercent,
      },

      whileInView: {
        x: 0,
        transition: {
          duration: 0.7,
        },
      },
    },

    back: {
      exit: {
        x: initialPercent,
        transition: {
          duration: 0.7,
        },
      },
    },
  });

  return (
    <motion.div {...inViewProps} className="flex w-full flex-col items-center">
      <div className="relative h-[142px] w-[240px] sm:h-[250px] sm:w-[432px]">
        <svg
          className="pointer-events-none absolute left-0 top-0 z-[100] h-full w-full touch-none stroke-light stroke-1"
          width="100%"
          height="100%"
          viewBox="0 0 432 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path d="M 1 1 H 431 V 249" variants={borderVariants} />
          <motion.path d="M 1 1 V 249 H 431" variants={borderVariants} />
        </svg>
        <motion.div
          variants={carouselVariants}
          className="w-[240px] cursor-grab sm:w-[432px]"
        >
          <motion.div
            ref={carouselRef}
            style={{ x }}
            className="flex w-full cursor-grab"
            drag={transitioning ? false : 'x'}
            dragTransition={{
              power: 0.05,
              timeConstant: 80,
              restDelta: 0,
              modifyTarget,
            }}
            draggable={false}
            onPointerDown={onPointerDown}
          >
            {projects.map((item, index) => (
              <ProjectImg
                src={item.src}
                key={index}
                index={index}
                length={projects.length}
                offset={offset}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-8 flex w-full items-center justify-center">
        <ArrowButton type="back" onClick={back} />
        <motion.div
          style={{ x: percentX }}
          className="flex w-[256px] sm:w-[448px] "
        >
          {projects.map((item, index) => (
            <ProjectTitle
              key={index}
              index={index}
              length={projects.length}
              offset={offset}
            >
              {item.name}
            </ProjectTitle>
          ))}
        </motion.div>
        <ArrowButton type="forward" onClick={forward} />
      </div>
      <div className="flex w-full">
        <div className="relative z-10 flex-1 bg-green">
          <div className="absolute -right-8 top-0 h-full w-8 bg-gradient-to-r from-green to-transparent max-[896px]:hidden" />
        </div>
        <motion.div
          style={{ x: percentX }}
          className="mt-12 flex w-full max-w-4xl"
        >
          {projects.map((item, index) => (
            <ProjectDescription
              key={index}
              index={index}
              length={projects.length}
              offset={offset}
            >
              {item.about}
            </ProjectDescription>
          ))}
        </motion.div>
        <div className="relative z-10 flex-1 bg-green">
          <div className="absolute -left-8 top-0 h-full w-8 bg-gradient-to-l from-green to-transparent max-[896px]:hidden" />
        </div>
      </div>
    </motion.div>
  );
};
