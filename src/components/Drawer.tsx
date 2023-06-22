import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';
import { getColumnLeftPos } from '~/lib';

export interface DrawerProps {
  id: DrawerId;
  className?: string;
}

export const Drawer = ({ id, className = '' }: DrawerProps) => {
  const { color, label, rightToLeftPosition } = drawers[id];

  const columnLeftPos = getColumnLeftPos(id);

  // go to screenX = 0 -> - columnLeftPos + 15px hover
  const openingTranslateX = `calc(15px - ${columnLeftPos})`;
  // start at screenX = 0 -> - columnLeftPos
  const closingTranslateX = `calc(-1 * ${columnLeftPos})`;

  const [hover, setHover] = useState(false);

  const router = useRouter();

  const { prevScreen, currentScreen, navigationType, transitioning, variants } =
    useDrawersContext();

  const opening = useMemo(() => {
    return transitioning && navigationType === 'forward';
  }, [transitioning, navigationType]);

  const closing = useMemo(() => {
    return transitioning && navigationType === 'back';
  }, [transitioning, navigationType]);

  const shouldHover = useMemo(() => {
    const shouldNotHover = (opening && currentScreen !== id) || closing;

    return (hover || (opening && currentScreen === id)) && !shouldNotHover;
  }, [hover, opening, currentScreen, closing]);

  const onClick = () => {
    if (opening) {
      return;
    }

    router.push(`/${id}`);
  };

  const slide = {
    default: {
      x: 0,
    },

    forward: {
      exit: {
        x: currentScreen === id ? openingTranslateX : '100vw',
        transition: {
          duration: currentScreen === id ? 1.5 : 1,
        },
      },
    },

    back: {
      initial: {
        x: prevScreen === id ? closingTranslateX : '100vw',
      },
      animate: {
        x: 0,
        transition: {
          duration: prevScreen === id ? 1.5 : 1,
        },
      },
    },
  };

  const barVariants = variants({
    default: {
      ...slide.default,
      width: '100%',
    },

    forward: slide.forward,

    back: slide.back,

    load: {
      initial: {
        width: 0,
      },
      animate: {
        width: '100%',
        transition: {
          duration: 2,
          delay: 1.5 + rightToLeftPosition * 0.2,
        },
      },
    },
  });

  const columnVariants = variants({
    default: {
      ...slide.default,
      height: '100%',
    },

    forward: slide.forward,

    back: slide.back,

    load: {
      initial: {
        height: 0,
      },
      animate: {
        height: '100%',
        transition: {
          duration: 1,
          delay: 0.5 + rightToLeftPosition * 0.2,
        },
      },
    },
  });

  return (
    <button
      className={`${className} relative flex w-full cursor-pointer justify-end self-end lg:self-center lg:justify-self-end`}
      style={{ zIndex: (2 - rightToLeftPosition) * 10 }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        className="h-[35px] w-full overflow-hidden pl-[30px] sm:h-[50px]"
        variants={barVariants}
      >
        <motion.div
          className="flex h-full w-full items-center"
          style={{ backgroundColor: `var(--${color}-color)` }}
          animate={{ x: shouldHover ? -15 : 0 }}
        >
          <div className="flex items-center gap-4 lg:flex-row-reverse lg:justify-end">
            <img
              className="h-18 ml-4 sm:h-auto lg:ml-0"
              src={`/drawer-icons/${id}.svg`}
              alt={label}
            />
            <p className="text-light lg:ml-8 lg:text-xl">{label}</p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed top-0 h-full w-[calc(var(--drawer-column-width)+30px)]"
        style={{ left: columnLeftPos }}
        variants={columnVariants}
      >
        <motion.div
          className="h-full w-full"
          style={{ backgroundColor: `var(--${color}-color)` }}
          animate={{ x: shouldHover ? -15 : 0 }}
        />
      </motion.div>
    </button>
  );
};
