import { MutableRefObject, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { MdArrowForwardIos } from 'react-icons/md';

import { useDrawersContext } from '~/contexts';
import { useDrawer, useMedias } from '~/hooks';

interface ScrollUpButtonProps {
  containerRef: MutableRefObject<HTMLElement | null>;
}

export const ScrollUpButton = ({ containerRef }: ScrollUpButtonProps) => {
  const { navigationType } = useDrawersContext();

  const medias = useMedias();

  const { color } = useDrawer();

  const [hover, setHover] = useState(false);

  const shouldStartOpen = useRef(navigationType === 'back');

  const { scrollY, scrollYProgress } = useScroll({
    container: containerRef,
    axis: 'y',
  });

  const yPercentValue = useTransform(
    [scrollY, scrollYProgress],
    ([value, progressValue]: number[]) => {
      if (value === 0 && shouldStartOpen.current) {
        return -50;
      }

      if (value < (medias.sm ? 95 : 80)) {
        return 0;
      }

      const height = value / progressValue;

      if (height - value <= (medias.sm ? 100 : 70)) {
        shouldStartOpen.current = false;

        return -50;
      }

      // 50px on mobile and 53px on desktop
      return -(medias.sm ? 53 / 400 : 50 / 280) * 100;
    }
  );

  const yPercent = useSpring(yPercentValue);

  const y = useMotionTemplate`${yPercent}%`;

  return (
    <motion.div className="absolute bottom-0 left-8 z-40 h-[280px] w-[35px] overflow-visible sm:left-[5vw] sm:h-[400px] sm:w-[50px]">
      <motion.div
        className="relative -bottom-full h-full w-full var-[full-y_-140px] var-[semi-y_-70px] sm:var-[full-y_-200px] sm:var-[semi-y_-70px]"
        style={{ y }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.5 }}
      >
        <motion.button
          className="flex h-full w-full flex-col items-center bg-light"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() =>
            containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
          }
          animate={{ y: hover ? -15 : 0 }}
          style={{ color: `var(--${color}-color)` }}
        >
          <MdArrowForwardIos className="mt-4 -rotate-90 text-[18px] sm:text-[21px]" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
