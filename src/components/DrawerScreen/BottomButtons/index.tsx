import { MutableRefObject, useMemo } from 'react';

import { useDrawersContext } from '~/contexts';
import { DrawerId } from '~/data';

import { Container } from './styles';
import { NextButtton } from './NextButton';
import { UpButton } from './UpButton';

export type BottomButtonsProps = {
  id: DrawerId;
  containerRef: MutableRefObject<HTMLDivElement>;
};

export const BottomButtons = ({ id, containerRef }: BottomButtonsProps) => {
  const { screenHistory } = useDrawersContext();

  const leftingDrawers = useMemo(() => {
    const drawers: DrawerId[] = ['experiences', 'qualifications', 'contact'];

    return drawers.filter(item => {
      return !screenHistory.includes(item) && id !== item;
    });
  }, []);

  return (
    <Container>
      <UpButton containerRef={containerRef} />
      {leftingDrawers.map(item => (
        <NextButtton key={item} id={item} />
      ))}
    </Container>
  );
};
