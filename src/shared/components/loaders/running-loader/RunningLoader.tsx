import { Center, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import { Runner } from './Runner';

interface IRunningLoaderProps {
  height?: string;
  transparentBng?: boolean;
  margin?: string;
}

export const RunningLoader = ({ height = 'inherit', margin, transparentBng = true }: IRunningLoaderProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const getBackgroundColor = (): string => {
    if (transparentBng) {
      return 'transparent';
    }

    return colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1];
  };

  return (
    <Center
      style={{
        width: '100%',
        minHeight: '45px',
        height,
        backgroundColor: getBackgroundColor(),
        ...(margin ? { margin } : {}),
      }}
    >
      <Runner />
    </Center>
  );
};
