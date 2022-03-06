import { MantineThemeOverride } from '@mantine/core';

// testing change #7950F2 to #736E9E from default violet mantine palette
export const theme: MantineThemeOverride = {
  colors: {
    red: ['#FFF5F5', '#FFE3E3', '#FFC9C9', '#FFA8A8', '#FF8787', '#FF6B6B', '#FA5252', '#F03E3E', '#E03131', '#C92A2A'],
    purple: ['##F3F0FF', '#E5DBFF', '#7f6d96', '#736E9E', '#A9A3D6', '#8E88BA', '#736E9E', '#6159A6', '#5c53a9'],
  },
  primaryColor: 'purple',
};
