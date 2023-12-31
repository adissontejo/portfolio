import { motion } from 'framer-motion';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import { useDrawersContext } from '~/contexts';

export interface ArrowButtonProps {
  type: 'back' | 'forward';
  onClick?: () => void;
}

export const ArrowButton = ({ type, onClick }: ArrowButtonProps) => {
  const Icon =
    type === 'back' ? MdOutlineArrowBackIos : MdOutlineArrowForwardIos;

  const { variants } = useDrawersContext();

  const buttonVariants = variants({
    default: {
      perspective: 1,
    },

    enter: {
      initial: {
        x: type === 'back' ? '-105%' : '105%',
      },
      whileInView: {
        x: 0,
        transition: {
          duration: 1,
          delay: 0.7,
        },
      },
    },

    back: {
      exit: {
        x: type === 'back' ? '-105%' : '105%',
        transition: {
          duration: 1,
        },
      },
    },
  });

  return (
    <div className="relative z-10 min-w-[60px] flex-1 bg-green">
      <motion.button
        className={`group flex h-[35px] w-full items-center bg-light sm:h-[50px] ${
          type === 'back' ? 'justify-end pr-4' : 'justify-start pl-4'
        }`}
        variants={buttonVariants}
        onClick={onClick}
      >
        <Icon className="text-[21px] text-green transition-opacity group-hover:opacity-70" />
      </motion.button>
    </div>
  );
};
