import { StaticImageData } from 'next/image';
import vampiro from 'public/projects/vampiro.png';

type Project = {
  name: string;
  about: string;
  src: StaticImageData;
};

export const projects: Project[] = [
  {
    name: 'Vampiro',
    about:
      'O Vampiro é um jogo mobile e local em desenvolvimento baseado no jogo de grupo "Cidade Dorme", onde são atribuídas classes secretas com diferentes objetivos e times para os jogadores. O jogo atualmente é desenvolvido com React Native.',
    src: vampiro,
  },
  {
    name: 'Vampiro 2',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
    src: vampiro,
  },
  {
    name: 'Vampiro 3',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
    src: vampiro,
  },
  {
    name: 'Vampiro 4',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
    src: vampiro,
  },
  {
    name: 'Vampiro 5',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
    src: vampiro,
  },
  {
    name: 'Vampiro 6',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat',
    src: vampiro,
  },
];
