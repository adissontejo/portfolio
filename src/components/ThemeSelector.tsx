import { useMemo, useState } from 'react';
import { setCookie } from 'cookies-next';
import { motion } from 'framer-motion';

import { useDrawersContext } from '~/contexts';

export interface ThemeSelectorProps {
  initialMode?: 'light' | 'dark';
}

export const ThemeSelector = ({
  initialMode = 'light',
}: ThemeSelectorProps) => {
  const [mode, setMode] = useState(initialMode);
  const [hover, setHover] = useState(false);

  const { variants } = useDrawersContext();

  const hoverMode = useMemo(() => {
    if ((mode === 'dark') === hover) {
      return 'light';
    }

    return 'dark';
  }, [mode, hover]);

  const onClick = () => {
    setHover(false);

    const newMode = mode === 'light' ? 'dark' : 'light';

    const html = document.getElementsByTagName('html')[0];

    setCookie('theme-mode', newMode);

    setMode(newMode);

    html.classList.remove(mode);
    html.classList.add(newMode);
  };

  const themeSelectorVariants = variants({
    default: {
      y: 0,
      opacity: 1,
    },

    load: {
      initial: {
        y: -35,
        opacity: 0,
      },
      animate: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 1,
          delay: 0.5,
        },
      },
    },
  });

  return (
    <motion.div className="relative z-10" variants={themeSelectorVariants}>
      <button
        className="flex cursor-pointer items-center gap-[12px]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
      >
        <div className="relative flex h-[18px] w-[18px] items-center justify-center overflow-hidden rounded-full bg-light">
          <div className="absolute left-0 top-0 z-10 h-full w-full rounded-full border border-dark transition-dark-mode dark:border-light" />
          <motion.div
            className="h-full w-full rounded-full bg-dark"
            initial={false}
            animate={{
              x: (mode === 'dark') !== hover ? 0 : -18,
            }}
          />
        </div>
        <p className="text-base text-purple transition-dark-mode after:invisible after:content-['escuro'] dark:text-light">
          modo&nbsp;
          <span className="invisible absolute">
            {hoverMode === 'dark' ? 'escuro' : 'claro'}
          </span>
        </p>
      </button>
      <span className="absolute left-[30px] top-0 -z-10 text-base text-purple transition-dark-mode before:invisible before:content-['modo'] dark:text-light">
        &nbsp;
        <motion.span
          className="absolute left-full before:content-['claro']"
          initial={false}
          animate={{
            y: hoverMode === 'light' ? 0 : -20,
            opacity: hoverMode === 'light' ? 1 : 0,
          }}
        />
        <motion.span
          className="absolute left-full before:content-['escuro']"
          initial={false}
          animate={{
            y: hoverMode === 'dark' ? 0 : 20,
            opacity: hoverMode === 'dark' ? 1 : 0,
          }}
        />
      </span>
    </motion.div>
  );
};
