import { MotionValue, motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';

import { useTranslateX } from './useTranslateX';

export interface ProjectDescriptionProps {
  children: string;
  index: number;
  offset: MotionValue<number>;
  length: number;
}

export const ProjectDescription = ({
  children,
  index,
  offset,
  length,
}: ProjectDescriptionProps) => {
  const { variants } = useDrawersContext();

  const x = useTranslateX(offset, { index, length });

  const descriptionVariants = variants({
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
    <motion.p
      style={{ x }}
      className="relative min-w-full px-8 text-center text-light max-[896px]:px-2"
    >
      <motion.span variants={descriptionVariants}>{children}</motion.span>
    </motion.p>
  );
};
