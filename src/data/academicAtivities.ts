import { StaticImageData } from 'next/image';
import vampiro from 'public/projects/vampiro.png';

type AcademicActivity = {
  name: string;
  about: string;
  src: StaticImageData;
};

export const academicActivities: AcademicActivity[] = [
  {
    name: 'GREL - Grupo de Robótica Educacional Livre',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
    src: vampiro,
  },
  {
    name: 'POP - Projeto Olímpico de Programação',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
    src: vampiro,
  },
];
