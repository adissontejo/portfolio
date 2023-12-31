import { professionalExperiences } from '~/data';

import { Experience } from './Experience';

export const ProfessionalExperiences = () => {
  return (
    <div className="flex w-full flex-col gap-16">
      {professionalExperiences.map((item, index) => (
        <Experience
          key={index}
          index={index}
          name={item.name}
          about={item.about}
        />
      ))}
    </div>
  );
};
