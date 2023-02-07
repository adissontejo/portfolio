import { professionalExperiences } from '~/data';

import { Container } from './styles';
import { Experience } from './Experience';

export const ProfessionalExperiences = () => {
  return (
    <Container>
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
