import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { projects } from '~/data';

import { Carousel, Container, OpacityFilter } from './styles';
import { Controller } from './Controller';
import { Project } from './Project';
import { useMeasures } from './useMeasures';

export const ProjectsCarousel = () => {
  const { animationType, transitioning } = useDrawersContext();

  const { width } = useMeasures();

  const [position, setPosition] = useState(0);
  const [entering, setEntering] = useState(true);

  const positionQueue = useRef<number>(0);

  const selected = useMemo(() => {
    const value = position % projects.length;

    if (value < 0) {
      return value + projects.length;
    }

    return value;
  }, [position]);

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

  return (
    <Container>
      <div className="carousel-wrapper">
        <OpacityFilter type="left" />
        <Carousel>
          <div className="scene">
            <motion.div
              className="carousel"
              initial={
                animationType !== 'back' && { x: width * projects.length }
              }
              animate={{ x: -width * position }}
              exit={
                animationType === 'back' && {
                  x: width * (projects.length - position),
                  transition: { duration: 1, delay: 0 },
                }
              }
              transition={{
                duration: entering ? 1 : 0.5,
                delay: entering && animationType === 'forward' ? 1.5 : 0,
              }}
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
          </div>
        </Carousel>
        <OpacityFilter type="right" />
      </div>
      <Controller
        back={back}
        forward={forward}
        selected={selected}
        position={position}
        entering={entering}
      />
    </Container>
  );
};
