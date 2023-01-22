import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import { useDrawersContext } from '~/contexts';

import {
  ArrowButton,
  Carousel,
  Container,
  Controller,
  OpacityFilter,
} from './styles';
import { Project } from './Project';
import { useMeasures } from './useMeasures';

export const ProjectsCarousel = () => {
  const { animationType, exitingDrawer, transitioning } = useDrawersContext();

  const { width } = useMeasures();

  const [position, setPosition] = useState(0);
  const [entering, setEntering] = useState(true);
  const [exiting, setExiting] = useState(false);

  console.log(entering, exiting);

  const x = useMotionValue(0);
  const lastX = useMotionValue(0);

  useEffect(() => {
    if (
      transitioning &&
      animationType === 'back' &&
      exitingDrawer === 'experiences'
    ) {
      lastX.jump(x.get());

      setExiting(true);
    }
  }, [transitioning]);

  return (
    <Container>
      <div className="carousel-wrapper">
        <OpacityFilter type="left" />
        <Carousel>
          <div className="scene">
            <motion.div
              className="carousel"
              initial={{ x: width * 6 }}
              animate={{ x: -width * position }}
              exit={{
                x: width * (6 - position),
                transition: { duration: 1, delay: 0 },
              }}
              transition={{
                duration: entering ? 1 : 0.5,
                delay: entering && animationType === 'forward' ? 1.5 : 0,
              }}
              onAnimationComplete={() => setEntering(false)}
            >
              <Project index={0} length={6} position={position} />
              <Project index={1} length={6} position={position} />
              <Project index={2} length={6} position={position} />
              <Project index={3} length={6} position={position} />
              <Project index={4} length={6} position={position} />
              <Project index={5} length={6} position={position} />
            </motion.div>
            <div className="border" />
          </div>
        </Carousel>
        <OpacityFilter type="right" />
      </div>
      <Controller>
        <div className="arrow-wrapper">
          <ArrowButton
            className="back"
            onClick={() => setPosition(prev => prev - 1)}
            initial={animationType !== 'back' && { width: 0 }}
            animate={{
              width: '100%',
              transition: {
                duration: 1,
                delay: animationType === 'forward' ? 1.5 : 0,
              },
            }}
            exit={animationType === 'back' && { width: 0 }}
            transition={{ duration: 1 }}
          >
            <MdOutlineArrowBackIosNew className="icon" />
          </ArrowButton>
        </div>
        <h2 className="project-name">Vampiro</h2>
        <div className="arrow-wrapper">
          <ArrowButton
            className="forward"
            onClick={() => setPosition(prev => prev + 1)}
            initial={animationType !== 'back' && { width: 0 }}
            animate={{
              width: '100%',
              transition: {
                duration: 1,
                delay: animationType === 'forward' ? 1.5 : 0,
              },
            }}
            exit={animationType === 'back' && { width: 0 }}
            transition={{ duration: 1 }}
          >
            <MdOutlineArrowForwardIos className="icon" />
          </ArrowButton>
        </div>
      </Controller>
    </Container>
  );
};
