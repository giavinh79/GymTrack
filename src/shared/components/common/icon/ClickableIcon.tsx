import type { ReactElement } from 'react';
import { createStyles } from '@mantine/core';

type IconColor = 'blue' | 'green' | 'red';

interface ClickableIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  iconStyle?: React.CSSProperties;
  children?: ReactElement | null;
  color?: IconColor;
  onClick: () => void;
  margin?: string;
}

const useClickableIconStyles = createStyles(() => ({
  button: {
    cursor: 'pointer',
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: '0',
    font: 'inherit',
    outline: 'inherit',
    margin: 'inherit',
    ':hover, :focus-visible': {
      filter: 'brightness(50%)',
    },
  },
}));

const mapColorToHex: Record<IconColor, string> = {
  blue: '#6a99c5',
  green: '#5aa45a',
  red: '#d93030',
};

export const ClickableIcon = ({
  children = null,
  color,
  iconStyle,
  margin = '0 0.5rem',
  onClick,
  style,
  ...rest
}: ClickableIconProps): ReactElement => {
  const { classes } = useClickableIconStyles();

  const iconStyles = {
    ...iconStyle,
    ...(color ? { color: mapColorToHex[color] } : {}), // default value for color varies cross browser
  };

  return (
    <button
      onClick={onClick}
      className={classes.button}
      aria-label={rest['aria-label']}
      style={{ margin: margin ?? 0, ...style }}
      type='button'
    >
      <i {...rest} style={iconStyles}>
        {children}
      </i>
    </button>
  );
};
