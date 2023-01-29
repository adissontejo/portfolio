import { useDrawersContext } from '~/contexts';
import { professionalExperiences } from '~/data';
import { useInViewAnimation } from '~/hooks';
import { AnimationVariants } from '~/types';

import { Container } from './styles';
import { Experience } from './Experience';

export const ProfessionalExperiences = () => {
  const { animationType } = useDrawersContext();

  const animationStates = useInViewAnimation(
    animationType === 'forward' ? 3 : 2
  );

  const containerVariants: AnimationVariants = {
    whileInView: {
      transition: {
        delayChildren: 0.5,
      },
    },
  };

  return (
    <Container
      variants={containerVariants}
      viewport={{ once: true, margin: '0px 0px -200px 0px' }}
      {...animationStates}
    >
      {professionalExperiences.map((item, index) => (
        <Experience
          key={index}
          index={index}
          name={item.name}
          about={item.about}
          init={item.init}
          end={item.end}
        />
      ))}
    </Container>
  );
};
