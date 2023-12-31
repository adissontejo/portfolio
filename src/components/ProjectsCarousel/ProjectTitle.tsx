import { MotionValue, motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';

import { useTranslateX } from './useTranslateX';

export interface ProjectTitleProps {
  children: string;
  index: number;
  offset: MotionValue<number>;
  length: number;
}

export const ProjectTitle = ({
  children,
  index,
  offset,
  length,
}: ProjectTitleProps) => {
  const { variants } = useDrawersContext();

  const x = useTranslateX(offset, { index, length });

  const titleVariants = variants({
    enter: {
      initial: {
        opacity: 0,
      },
      whileInView: {
        opacity: 1,
        transition: {
          duration: 1,
          delay: 0.7,
        },
      },
    },

    back: {
      exit: {
        opacity: 0,
        transition: {
          duration: 1,
        },
      },
    },
  });

  return (
    <motion.h3
      style={{ x }}
      className="relative min-w-full pl-1 text-center text-2xl text-light"
    >
      <motion.span variants={titleVariants}>{children}</motion.span>
    </motion.h3>
  );
};
