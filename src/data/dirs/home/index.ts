import { Dir } from '~/types';

import { academic } from './academic';
import { knowledge } from './knowledge';
import { medalsDir } from './medals';

export const home: Dir = {
  name: 'Pasta pessoal',
  folders: [academic, knowledge, medalsDir],
};
