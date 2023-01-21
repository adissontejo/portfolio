import { useEffect, useState } from 'react';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import { ArrowButton, Container, Controller } from './styles';
import { Project } from './Project';
import { useMeasures } from './useMeasures';

export const ProjectsCarousel = () => {
  const { radius } = useMeasures();

  const [current, setCurrent] = useState(0);
  const [entering, setEntering] = useState(true);

  const position = useMotionValue(-5);

  const rotate = useTransform(position, value => -20 * value);

  const transform = useMotionTemplate`translateZ(-${radius}px) rotateY(${rotate}deg)`;

  useEffect(() => {
    animate(position, 0, {
      delay: 1.5,
      duration: 1,
      onComplete: () => {
        setEntering(false);
      },
    });
  }, []);

  useEffect(() => {
    if (entering || position.get() === current) {
      return;
    }

    animate(position, current, {
      duration: 0.5,
    });
  }, [current, entering]);

  return (
    <Container>
      <div className="carousel">
        <motion.div className="scene" style={{ transform }}>
          <Project
            index={-2}
            length={6}
            position={position}
            entering={entering}
          />
          <Project
            index={-1}
            length={6}
            position={position}
            entering={entering}
          />
          <Project
            index={0}
            length={6}
            position={position}
            entering={entering}
          />
          <Project
            index={1}
            length={6}
            position={position}
            entering={entering}
          />
          <Project
            index={2}
            length={6}
            position={position}
            entering={entering}
          />
          <Project
            index={3}
            length={6}
            position={position}
            entering={entering}
          />
        </motion.div>
      </div>
      <Controller>
        <div className="arrow-wrapper">
          <ArrowButton
            className="back"
            onClick={() => setCurrent(prev => prev - 1)}
          >
            <MdOutlineArrowBackIosNew className="icon" />
          </ArrowButton>
        </div>
        <h2 className="project-name">Vampiro</h2>
        <div className="arrow-wrapper">
          <ArrowButton
            className="forward"
            onClick={() => setCurrent(prev => prev + 1)}
          >
            <MdOutlineArrowForwardIos className="icon" />
          </ArrowButton>
        </div>
      </Controller>
    </Container>
  );
};
