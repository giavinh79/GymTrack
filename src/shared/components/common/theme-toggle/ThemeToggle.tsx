import { Box, Center, createStyles, Group, SegmentedControl, useMantineColorScheme } from '@mantine/core';

const useThemeToggleStyles = createStyles((theme) => ({
  label: {
    marginBottom: '0',
  },
  iconText: {
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      display: 'none',
    },
  },
}));

export const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useThemeToggleStyles();

  return (
    <Group position='center' my='xl'>
      <SegmentedControl
        data-testid='theme-toggle'
        classNames={classes}
        value={colorScheme}
        onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <i className='fas fa-sun' />
                <Box ml={10} className={classes.iconText}>
                  Light
                </Box>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <i className='fas fa-moon' />
                <Box ml={10} className={classes.iconText}>
                  Dark
                </Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};
