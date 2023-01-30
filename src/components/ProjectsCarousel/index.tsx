import { useEffect, useRef, useState } from 'react';
import { motion, PanInfo, useMotionValue } from 'framer-motion';

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

  const { imageWidth } = useMeasures();

  const x = useMotionValue(0);

  const animationStates = useInViewAnimation(
    animationType === 'forward' ? 1 : 0
  );

  const [position, setPosition] = useState(0);
  const [entering, setEntering] = useState(true);

  const positionQueue = useRef(0);
  const duration = useRef(0.5);

  const back = () => {
    if (entering || transitioning) {
      positionQueue.current--;

      return;
    }

    duration.current = 0.5;

    setPosition(prev => prev - 1);
  };

  const forward = () => {
    if (entering || transitioning) {
      positionQueue.current++;

      return;
    }

    duration.current = 0.5;

    setPosition(prev => prev + 1);
  };

  const onDragEnd = (info: PanInfo) => {
    const value = x.get();

    const acceleration = -50000;

    const velocity = info.velocity.x;

    const distance = -(velocity ** 2) / (2 * acceleration);

    const offset = info.offset.x;

    if (offset >= 0) {
      const target = value + distance;

      const finalPosition = Math.floor(-target / imageWidth);

      duration.current =
        (Math.abs(target + finalPosition * imageWidth) * 0.3) / imageWidth +
        0.2;

      setPosition(finalPosition);
    } else {
      const target = value - distance;

      const finalPosition = Math.ceil(-target / imageWidth);

      duration.current =
        (Math.abs(target + finalPosition * imageWidth) * 0.3) / imageWidth +
        0.2;

      setPosition(finalPosition);
    }
  };

  useEffect(() => {
    if (!entering && !transitioning && positionQueue.current !== position) {
      duration.current = 0.5;

      setPosition(positionQueue.current);
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
    backInitial: {
      pathLength: 1,
    },
    whileInView: {
      pathLength: 1,
      transition: {
        duration: 1,
        delay: 1,
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
      x: imageWidth * projects.length,
    },
    backInitial: {
      x: 0,
    },
    whileInView: {
      x: 0,
      transition: {
        duration: 1,
      },
    },
    backExit: {
      x: imageWidth * (projects.length - position),
      transition: { duration: 1, delay: 0 },
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
              <motion.path
                d="M 1 1 H 435 V 253 H 1 Z"
                stroke="white"
                strokeWidth={1}
                radius={0}
                variants={borderVariants}
              />
            </svg>
            <motion.div
              animate={{ x: -position * imageWidth }}
              transition={{ duration: duration.current }}
              style={{ x, cursor: 'grab' }}
              drag="x"
              onDragEnd={(e, info) => onDragEnd(info)}
              whileDrag={{ cursor: 'grabbing' }}
            >
              <motion.div
                className="carousel"
                variants={carouselVariants}
                onAnimationComplete={() => setEntering(false)}
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
