import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { setCookie } from 'cookies-next';

import { useStylesContext } from '~/contexts';

import { Container, Float } from './styles';

export const ModeSelector = () => {
  const { mode, setMode } = useStylesContext();

  const [hover, setHover] = useState(false);

  const hoverMode = useMemo(() => {
    if ((mode === 'dark') === hover) {
      return 'light';
    }

    return 'dark';
  }, [mode, hover]);

  const onClick = () => {
    setHover(false);

    setCookie('theme-mode', mode === 'dark' ? 'light' : 'dark');

    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Container>
      <button
        className="selector"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
      >
        <div className="round-wrapper">
          <div className="border" />
          <motion.div
            className="round"
            initial={false}
            animate={{
              x: (mode === 'dark') !== hover ? 0 : -18,
            }}
          />
        </div>
        <p className="label">
          modo&nbsp;
          <span className="value">
            {hoverMode === 'dark' ? 'escuro' : 'claro'}
          </span>
        </p>
      </button>
      <Float>
        &nbsp;
        <motion.span
          className="light"
          initial={false}
          animate={{
            y: hoverMode === 'light' ? 0 : -20,
            opacity: hoverMode === 'light' ? 1 : 0,
          }}
        />
        <motion.span
          className="dark"
          initial={false}
          animate={{
            y: hoverMode === 'dark' ? 0 : 20,
            opacity: hoverMode === 'dark' ? 1 : 0,
          }}
        />
      </Float>
    </Container>
  );
};
