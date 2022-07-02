import { Button, createStyles } from '@mantine/core';

interface PanelIconProps {
  ariaLabel: string;
  disabled?: boolean;
  iconClassName: string;
  selected: boolean;

  onClick: () => void;
}

const usePanelIconStyles = createStyles((_, { disabled, selected }: Pick<PanelIconProps, 'selected' | 'disabled'>) => ({
  icon: {
    color: selected ? '#5a5562' : '#5a556296',
    cursor: disabled ? 'not-allowed' : 'pointer',
    padding: '0.5rem 1rem',
    fontSize: '2rem',
  },
}));

export const PanelIcon = ({ ariaLabel, disabled = false, iconClassName, onClick, selected }: PanelIconProps) => {
  const { classes } = usePanelIconStyles({ disabled, selected });

  return (
    <Button variant='subtle' onClick={onClick}>
      <i aria-label={ariaLabel} className={`${iconClassName} ${classes.icon}`} />
    </Button>
  );
};
