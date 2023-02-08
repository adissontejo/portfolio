import { academicActivities } from '~/data';

import { Container } from './styles';
import { Activity } from './Activity';

export const AcademicActivities = () => {
  return (
    <Container>
      {academicActivities.map((item, index) => (
        <Activity
          key={index}
          index={index}
          name={item.name}
          about={item.about}
          src={item.src}
        />
      ))}
    </Container>
  );
};
