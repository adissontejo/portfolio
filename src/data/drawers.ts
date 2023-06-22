interface DrawerProps {
  color: 'brown' | 'purple' | 'green';
  rightToLeftPosition: number;
  label: string;
  title: string;
}

export const drawers = {
  experiences: {
    color: 'green',
    rightToLeftPosition: 1,
    label: 'experiências',
    title: 'Experiências',
  } as DrawerProps,
  qualifications: {
    color: 'brown',
    rightToLeftPosition: 0,
    label: 'qualificações',
    title: 'Qualificações',
  } as DrawerProps,
  contact: {
    color: 'purple',
    rightToLeftPosition: 2,
    label: 'contato',
    title: 'Contato',
  } as DrawerProps,
};

export type Drawers = typeof drawers;

export type DrawerId = keyof Drawers;
