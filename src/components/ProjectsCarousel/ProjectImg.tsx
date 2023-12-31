import Image, { StaticImageData } from 'next/image';
import { MotionValue, motion } from 'framer-motion';

import { useTranslateX } from './useTranslateX';

export interface ProjectImgProps {
  src: StaticImageData;
  index: number;
  offset: MotionValue<number>;
  length: number;
}

export const ProjectImg = ({ src, index, offset, length }: ProjectImgProps) => {
  const x = useTranslateX(offset, { index, length });

  return (
    <motion.div className="relative h-full min-w-full p-2" style={{ x }}>
      <div className="relative h-[126px] w-[224px] sm:h-[234px] sm:w-[416px]">
        <Image
          className="object-cover"
          src={src}
          alt="Projeto"
          draggable={false}
          fill
          quality={70}
          placeholder="blur"
        />
      </div>
    </motion.div>
  );
};
