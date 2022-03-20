import { createStyles } from '@mantine/core';
import { ReactElement } from 'react';

type IconColor = 'blue' | 'green' | 'red';

interface ClickableIconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: ReactElement | null;
  color?: IconColor;
  onClick?: () => void;
  margin?: string;
}

const useClickableIconStyles = createStyles((theme) => ({
  button: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: '0',
    font: 'inherit',
    outline: 'inherit',
    margin: 'inherit',
  },
}));

export const ClickableIcon = ({
  children = null,
  color,
  margin,
  onClick,
  ...rest
}: ClickableIconProps): ReactElement => {
  const { classes } = useClickableIconStyles();

  const mapColorToHex: Record<IconColor, string> = {
    blue: '#6a99c5',
    green: '#5aa45a',
    red: '#d93030',
  };

  const customStyle = {
    margin: margin ?? 0,
    ...(color ? { color: mapColorToHex[color] } : {}), // default value for color varies cross browser
  };

  return onClick ? (
    <button onClick={onClick} className={classes.button}>
      <i {...rest} style={customStyle}>
        {children}
      </i>
    </button>
  ) : (
    <i {...rest} style={customStyle}>
      {children}
    </i>
  );
};
