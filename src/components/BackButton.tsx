import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import { useDrawersContext } from '~/contexts';
import { DrawerId, drawers } from '~/data';

export interface BackButtonProps {
  drawerId: DrawerId;
}

export const BackButton = ({ drawerId }: BackButtonProps) => {
  const { color } = drawers[drawerId];

  const [hover, setHover] = useState(false);

  const actionQueue = useRef<'onMouseEnter' | 'onMouseLeave'>(null);

  const router = useRouter();

  const { prevScreen, currentScreen, transitioning, variants } =
    useDrawersContext();

  const backStyle = useRef(
    (() => {
      if (prevScreen === null || prevScreen === 'home') {
        return { color: `var(--${color}-color)` };
      }

      const { color: prevColor } = drawers[prevScreen];

      return { backgroundColor: `var(--${prevColor}-color)` };
    })()
  ).current;

  const onClick = () => {
    if (currentScreen !== drawerId) {
      return;
    }

    router.back();
  };

  const onMouseEnter = () => {
    if (transitioning) {
      actionQueue.current = 'onMouseEnter';

      return;
    }

    setHover(true);
  };

  const onMouseLeave = () => {
    if (transitioning) {
      actionQueue.current = 'onMouseLeave';

      return;
    }

    setHover(false);
  };

  useEffect(() => {
    if (transitioning || actionQueue.current === null) {
      return;
    }

    const actions = { onMouseEnter, onMouseLeave };

    actions[actionQueue.current]();
  }, [transitioning]);

  const buttonVariants = variants({
    default: {
      width: 'auto',
    },

    enter: {
      initial: {
        width: 0,
      },
      animate: {
        width: 'auto',
        transition: {
          duration: 0.7,
          delay: prevScreen === 'home' ? 0.8 : 0,
        },
      },
    },

    load: {
      animate: {
        width: 'auto',
        transition: {
          duration: 0.7,
        },
      },
    },

    back: {
      exit: {
        width: 0,
        transition: {
          duration: 0.7,
          delay: currentScreen === 'home' ? 0 : 0.8,
        },
      },
    },
  });

  return (
    <div className="mt-14 h-[35px] w-4/5 max-w-lg self-start overflow-hidden sm:h-[50px]">
      <motion.div className="h-full w-full" variants={buttonVariants}>
        <div className="h-full w-full pr-5">
          <div
            className="relative -left-5 h-full w-full bg-light transition-dark-mode dark:bg-dark"
            style={backStyle}
          >
            <motion.button
              className="relative left-1 flex h-full w-full items-center justify-end gap-4 bg-inherit transition-dark-mode"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              animate={{ x: hover ? 15 : 0 }}
            >
              <p className="sm:text-lg">voltar</p>
              <MdOutlineArrowBackIosNew className="mr-8 text-[18px] sm:text-[21px]" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
