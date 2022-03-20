import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colors: {
    // nine shades
    green: ['#DBE7DB', '#C2D7C2', '#ABC9AB', '#95BD95', '#80B380', '#6CAB6C', '#5AA45A', '#539153', '#4D814D'],
    red: ['#FFF5F5', '#FFE3E3', '#FFC9C9', '#FFA8A8', '#FF8787', '#FF6B6B', '#FA5252', '#F03E3E', '#E03131'],
    violet: ['#EDECEE', '#D6D5DA', '#C0BFC9', '#ACABBA', '#9996AE', '#8682A4', '#736E9E', '#6159A6', '#5c53a9'],
  },
  primaryColor: 'violet',
  headings: {
    fontWeight: 500,
  },
};
