import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { useInViewAnimation } from '~/hooks';

export interface SectionProps {
  title: string;
  children?: ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  const { variants } = useDrawersContext();

  const inViewProps = useInViewAnimation<HTMLDivElement>();

  const titleVariants = variants({
    enter: {
      initial: {
        opacity: 0,
        y: 30,
      },
      whileInView: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
        },
      },
    },

    back: {
      exit: {
        opacity: 0,
        y: 30,
        transition: {
          duration: 1,
        },
      },
    },
  });

  const divisorVariants = variants({
    default: {
      width: '100%',
    },

    enter: {
      initial: {
        width: 0,
      },
      animate: {
        width: '100%',
        transition: {
          duration: 1,
        },
      },
    },

    back: {
      exit: {
        width: 0,
        transition: {
          duration: 1,
        },
      },
    },
  });

  return (
    <motion.section
      className="mt-14 flex w-full flex-col items-center"
      {...inViewProps}
    >
      <motion.h2
        className="mb-7 text-light sm:text-xl"
        variants={titleVariants}
      >
        {title}
      </motion.h2>
      {children}
      <div className="mt-14 h-[1px] w-3/4 max-w-md bg-light opacity-25">
        <motion.div variants={divisorVariants} />
      </div>
    </motion.section>
  );
};
