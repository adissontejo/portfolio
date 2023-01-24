import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { projects } from '~/data';

import { About } from './About';
import { Name } from './Name';

import {
  AboutContainer,
  Container,
  NamesContainer,
  OpacityFilter,
} from './styles';
import { ArrowButton } from './ArrowButton';

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
        <ArrowButton type="back" onClick={back} />
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
        <ArrowButton type="forward" onClick={forward} />
      </Container>
      <AboutContainer>
        <OpacityFilter type="top" />
        <OpacityFilter type="left" />
        <OpacityFilter type="right" />
        <motion.div
          className="about-wrapper"
          initial={animationType !== 'back' && { y: '-110%' }}
          animate={{ x: -1000 * position, y: 0 }}
          exit={
            animationType === 'back' && {
              y: '-110%',
              transition: { duration: 1 },
            }
          }
          transition={{
            duration: entering ? 1 : 0.5,
            delay:
              entering && animationType === 'forward'
                ? 1.5
                : entering
                ? 0.5
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
      </AboutContainer>
    </>
  );
};
