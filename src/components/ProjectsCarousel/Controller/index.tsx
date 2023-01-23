import { motion } from 'framer-motion';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import { useDrawersContext } from '~/contexts';
import { projects } from '~/data';
import { About } from './About';
import { Name } from './Name';

import {
  AboutContainer,
  ArrowButton,
  Container,
  NamesContainer,
  OpacityFilter,
} from './styles';

export type ControllerProps = {
  back: () => void;
  forward: () => void;
  selected: number;
  position: number;
  entering: boolean;
};

export const Controller = ({
  back,
  forward,
  position,
  entering,
}: ControllerProps) => {
  const { animationType } = useDrawersContext();

  return (
    <>
      <Container>
        <div className="arrow-wrapper">
          <ArrowButton
            className="back"
            onClick={back}
            initial={animationType !== 'back' && { width: 0 }}
            animate={{
              width: '100%',
              transition: {
                duration: 1,
                delay: animationType === 'forward' ? 1.5 : 0.5,
              },
            }}
            exit={animationType === 'back' && { width: 0 }}
            transition={{ duration: 1 }}
          >
            <MdOutlineArrowBackIosNew className="icon" />
          </ArrowButton>
        </div>
        <NamesContainer>
          <motion.div
            className="names-wrapper"
            animate={{ x: -1000 * position }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((item, index) => (
              <Name
                key={index}
                name={item.name}
                index={index}
                position={position}
                length={projects.length}
              />
            ))}
          </motion.div>
        </NamesContainer>
        <div className="arrow-wrapper">
          <ArrowButton
            className="forward"
            onClick={forward}
            initial={animationType !== 'back' && { width: 0 }}
            animate={{
              width: '100%',
              transition: {
                duration: 1,
                delay: animationType === 'forward' ? 1.5 : 0.5,
              },
            }}
            exit={animationType === 'back' && { width: 0 }}
            transition={{ duration: 1 }}
          >
            <MdOutlineArrowForwardIos className="icon" />
          </ArrowButton>
        </div>
      </Container>
      <AboutContainer>
        <OpacityFilter type="left" />
        <motion.div
          className="about-wrapper"
          initial={animationType !== 'back' && { x: 1000 }}
          animate={{ x: -1000 * position }}
          exit={
            animationType === 'back' && {
              x: 1000 * (position + 1),
              transition: { duration: 1 },
            }
          }
          transition={{
            duration: entering ? 0.6 : 0.5,
            delay:
              entering && animationType === 'forward'
                ? 1.9
                : entering
                ? 0.9
                : 0,
          }}
        >
          {projects.map((item, index) => (
            <About
              key={index}
              about={item.about}
              index={index}
              position={position}
              length={projects.length}
            />
          ))}
        </motion.div>
        <OpacityFilter type="right" />
      </AboutContainer>
    </>
  );
};
