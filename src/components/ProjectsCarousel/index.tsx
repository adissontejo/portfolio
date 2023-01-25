import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

  const { width } = useMeasures();

  const animationStates = useInViewAnimation(
    animationType === 'forward' ? 1 : 0
  );

  const [position, setPosition] = useState(0);
  const [entering, setEntering] = useState(true);

  const positionQueue = useRef<number>(0);

  const back = () => {
    if (entering || transitioning) {
      positionQueue.current--;

      return;
    }

    setPosition(prev => prev - 1);
  };

  const forward = () => {
    if (entering || transitioning) {
      positionQueue.current++;

      return;
    }

    setPosition(prev => prev + 1);
  };

  useEffect(() => {
    if (!entering && !transitioning && positionQueue.current !== position) {
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
      x: width * projects.length,
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
      x: width * (projects.length - position),
      transition: { duration: 1, delay: 0 },
    },
  };

  return (
    <Container
      variants={containerVariants}
      viewport={{ once: true, margin: '-500px 0px 0px 0px' }}
      {...animationStates}
    >
      <div className="carousel-wrapper">
        <OpacityFilter type="left" />
        <Carousel>
          <div className="scene">
            <motion.div className="border">
              <svg
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
            </motion.div>
            <motion.div
              animate={{ x: -width * position }}
              transition={{ duration: 0.5 }}
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
                    position={position}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </Carousel>
        <OpacityFilter type="right" />
      </div>
      <Controller back={back} forward={forward} position={position} />
    </Container>
  );
};
