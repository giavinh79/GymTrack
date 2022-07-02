import { Center, useMantineColorScheme, useMantineTheme } from '@mantine/core';

import { Runner } from './Runner';

interface IRunningLoaderProps {
  height?: string;
  transparentBng?: boolean;
}

export const RunningLoader = ({ height = 'inherit', transparentBng = true }: IRunningLoaderProps) => {
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
        height,
        backgroundColor: getBackgroundColor(),
      }}
    >
      <Runner />
    </Center>
  );
};
