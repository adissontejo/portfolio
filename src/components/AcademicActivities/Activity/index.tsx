import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';

import { AnimationVariants } from '~/types';

import { Container } from './styles';

export type ActivityProps = {
  name: string;
  about: string;
  src: StaticImageData;
  index: number;
};

export const Activity = ({ name, about, src, index }: ActivityProps) => {
  const type = index % 2 === 0 ? 'left' : 'right';

  const x = type === 'left' ? '-101%' : '101%';

  const containerVariants: AnimationVariants = {
    enterInitial: {
      x,
    },
    whileInView: {
      x: 0,
      transition: {
        duration: 1,
      },
    },
    backExit: {
      x,
      transition: {
        duration: 1,
      },
    },
  };

  const textVariants: AnimationVariants = {
    enterInitial: {
      x,
    },
    whileInView: {
      x: 0,
      transition: {
        duration: 1,
        delay: 1,
      },
    },
    backExit: {
      x,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Container type={type} variants={containerVariants}>
      <div className="image-wrapper">
        <Image
          className="image"
          src={src}
          alt={name}
          draggable={false}
          fill
          quality={70}
          placeholder="blur"
        />
      </div>
      <div className="text-wrapper">
        <motion.h2 className="title" variants={textVariants}>
          {name}
        </motion.h2>
        <motion.p className="about" variants={textVariants}>
          {about}
        </motion.p>
      </div>
    </Container>
  );
};
