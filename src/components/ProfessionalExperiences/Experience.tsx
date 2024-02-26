import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';

export interface ExperienceProps {
  index: number;
  name: string;
  about: string;
}

export const Experience = ({ index, name, about }: ExperienceProps) => {
  const type = index % 2 === 0 ? 'left' : 'right';

  const { variants } = useDrawersContext();

  const barVariants = variants({
    default: {
      perspective: 1,
    },

    enter: {
      initial: {
        x: type === 'left' ? '-101%' : '101%',
      },
      whileInView: {
        x: 0,
        transition: {
          duration: 1,
          delay: 0.5 * index,
        },
      },
    },

    back: {
      exit: {
        x: type === 'left' ? '-101%' : '101%',
        transition: {
          duration: 1,
        },
      },
    },
  });

  const aboutVariants = variants({
    default: {
      perspective: 1,
    },

    enter: {
      initial: {
        y: '-100%',
      },
      whileInView: {
        y: 0,
        transition: {
          duration: 1,
          delay: 1 + 0.5 * index,
        },
      },
    },

    back: {
      exit: {
        y: '-100%',
        transition: {
          duration: 1,
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col items-center gap-3 overflow-hidden">
      <motion.div
        className="relative z-10 flex w-[480px] min-w-[50%] max-w-full items-center bg-light"
        style={{ alignSelf: type === 'left' ? 'flex-start' : 'flex-end' }}
        variants={barVariants}
      >
        <p
          className={`${
            type === 'left' ? 'text-end' : 'text-start'
          } w-full px-12 py-3 text-green max-[480px]:px-1 max-[480px]:text-center`}
        >
          {name}
        </p>
        <div
          className={`${
            type === 'left' ? 'left-0' : 'right-0'
          } absolute -bottom-8 h-8 w-screen bg-gradient-to-b from-green to-transparent`}
        />
      </motion.div>
      <div className="relative overflow-hidden">
        <motion.p
          className="w-full max-w-6xl p-8  text-center text-light"
          variants={aboutVariants}
        >
          {about}
        </motion.p>
      </div>
    </div>
  );
};
