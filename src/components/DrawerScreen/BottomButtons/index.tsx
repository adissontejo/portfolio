import { MutableRefObject, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MdArrowForwardIos } from 'react-icons/md';

import { useStylesContext } from '~/contexts';
import { useMediaQuery } from '~/hooks';

import { Container } from './styles';

export type BottomButtonsProps = {
  containerRef: MutableRefObject<HTMLDivElement>;
};

export const BottomButtons = ({ containerRef }: BottomButtonsProps) => {
  const { theme } = useStylesContext();

  const isSmall = useMediaQuery(theme.queries.small);

  const { scrollY, scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: false,
  });

  const [hover, setHover] = useState(false);

  const translateYValue = useTransform(
    [scrollY, scrollYProgress],
    ([value, progressValue]: number[]) => {
      const height = value / progressValue;

      if (value < (isSmall ? 80 : 95)) {
        return isSmall ? 190 : 250;
      }

      if (height - value <= (isSmall ? 70 : 100)) {
        return 0;
      }

      return isSmall ? 90 : 150;
    }
  );

  const translateY = useSpring(translateYValue);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const onClick = () => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <motion.div
        className="up-button-wrapper"
        animate={{ y: hover ? -15 : 0 }}
      >
        <motion.button
          className="up-button"
          style={{ translateY }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          <MdArrowForwardIos className="icon" />
        </motion.button>
      </motion.div>
    </Container>
  );
};
