import { PointerEvent, useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
} from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { projects } from '~/data';
import { useInViewAnimation } from '~/hooks';
import { AnimationVariants } from '~/types';

import { Carousel, Container, OpacityFilter } from './styles';
import { Controller } from './Controller';
import { Project } from './Project';
import { useMeasures } from './useMeasures';

export const ProjectsCarousel = () => {
  const { transitioning, animationType } = useDrawersContext();

  const { carouselWidth } = useMeasures();

  const x = useMotionValue(0);

  const dragControls = useDragControls();

  const animationStates = useInViewAnimation(
    animationType === 'forward' ? 1 : 0
  );

  const [entering, setEntering] = useState(true);

  const position = useRef(0);
  const down = useRef(false);
  const dragging = useRef(false);

  const animateX = () => {
    const value = -position.current * carouselWidth;

    animate(x, value, {
      duration: 0.5,
    });
  };

  const back = () => {
    position.current--;

    if (entering || transitioning) {
      return;
    }

    animateX();
  };

  const forward = () => {
    position.current++;

    if (entering || transitioning) {
      return;
    }

    animateX();
  };

  const onPointerDown = () => {
    down.current = true;

    document.body.style.cursor = 'grabbing';

    const listener = () => {
      down.current = false;

      dragging.current = false;

      document.body.style.cursor = 'initial';

      window.removeEventListener('pointerup', listener);
    };

    window.addEventListener('pointerup', listener);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (Math.abs(e.movementX) < 3) {
      return;
    }

    if (!dragging.current && down.current) {
      dragging.current = true;

      dragControls.start(e);
    }
  };

  const modifyTarget = (target: number) => {
    position.current = -Math.round(target / carouselWidth);

    return -position.current * carouselWidth;
  };

  useEffect(() => {
    const listener = () => {
      down.current = false;

      dragging.current = false;
    };

    window.addEventListener('pointerup', listener);

    return () => window.removeEventListener('pointerup', listener);
  }, []);

  useEffect(() => {
    if (!entering && !transitioning) {
      animateX();
    }
  }, [entering, transitioning]);

  const containerVariants: AnimationVariants = {
    whileInView: {
      transition: {
        delayChildren: 0.5,
      },
    },
  };

  const borderVariants: AnimationVariants = {
    enterInitial: {
      pathLength: 0,
    },
    whileInView: {
      pathLength: 1,
      transition: {
        duration: 0.8,
        delay: 1.2,
      },
    },
    backExit: {
      pathLength: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const carouselVariants: AnimationVariants = {
    enterInitial: {
      x: `${projects.length * 100}%`,
    },
    backInitial: {
      x: 0,
    },
    whileInView: {
      x: 0,
      transition: {
        duration: 0.7,
      },
    },
    backExit: {
      x: `${projects.length * 100}%`,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Container
      variants={containerVariants}
      viewport={{ once: true, margin: '0px 0px -200px 0px' }}
      {...animationStates}
    >
      <div className="carousel-wrapper">
        <OpacityFilter type="left" />
        <Carousel>
          <div className="scene">
            <svg
              className="border"
              width="100%"
              height="100%"
              viewBox="0 0 436 254"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path d="M 1 1 H 435 V 253" variants={borderVariants} />
              <motion.path d="M 1 1 V 253 H 435" variants={borderVariants} />
            </svg>
            <motion.div
              variants={carouselVariants}
              onAnimationComplete={() => setEntering(false)}
            >
              <motion.div
                className="carousel"
                drag={entering ? false : 'x'}
                dragControls={dragControls}
                dragListener={false}
                dragTransition={{
                  power: 0.05,
                  timeConstant: 80,
                  restDelta: 0,
                  modifyTarget,
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                style={{ x }}
                whileDrag={{ cursor: 'grabbing' }}
              >
                {projects.map((item, index) => (
                  <Project
                    src={item.src}
                    key={index}
                    index={index}
                    length={projects.length}
                    carouselX={x}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </Carousel>
        <OpacityFilter type="right" />
      </div>
      <Controller back={back} forward={forward} carouselX={x} />
    </Container>
  );
};
