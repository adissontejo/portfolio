import { useId, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { setCookie } from 'cookies-next';

import { useStylesContext } from '~/contexts';

import { Container } from './styles';

export const ModeSelector = () => {
  const id = useId();

  const { mode, setMode } = useStylesContext();

  const [roundHover, setRoundHover] = useState(false);
  const [labelHover, setLabelHover] = useState(false);

  const hover = useMemo(
    () => roundHover || labelHover,
    [roundHover, labelHover]
  );

  const hoverMode = useMemo(() => {
    if ((mode === 'dark') === hover) {
      return 'light';
    }

    return 'dark';
  }, [mode, hover]);

  const onChange = () => {
    setRoundHover(false);
    setLabelHover(false);

    setCookie('theme-mode', mode === 'dark' ? 'light' : 'dark');

    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Container>
      <input
        id={id}
        className="checkbox"
        type="checkbox"
        checked={mode === 'dark'}
        onChange={onChange}
      />
      <label
        className="round-wrapper"
        htmlFor={id}
        onMouseEnter={() => setRoundHover(true)}
        onMouseLeave={() => setRoundHover(false)}
      >
        <div className="border" />
        <motion.div
          className="round"
          initial={false}
          animate={{
            x: (mode === 'dark') !== hover ? 0 : -18,
          }}
        />
      </label>
      <label className="label" htmlFor={id}>
        <span
          onMouseEnter={() => setLabelHover(true)}
          onMouseLeave={() => setLabelHover(false)}
        >
          modo&nbsp;
        </span>
        <AnimatePresence initial={false} mode="popLayout">
          {hoverMode === 'light' ? (
            <motion.span
              key="light"
              className="mode"
              initial={{
                y: -20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
            >
              claro
            </motion.span>
          ) : (
            <motion.span
              key="dark"
              className="mode"
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 20,
                opacity: 0,
              }}
            >
              escuro
            </motion.span>
          )}
        </AnimatePresence>
      </label>
    </Container>
  );
};
