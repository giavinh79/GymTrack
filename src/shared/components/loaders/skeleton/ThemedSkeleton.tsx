import { memo } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

/**
 * Wrapper around Skeleton component from react-loading-skeleton that responds to current theme
 * @returns
 */
const ThemedSkeletonComponent = (props: SkeletonProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const themedProps: SkeletonProps = {
    ...props,
    ...(colorScheme === 'dark'
      ? {
          baseColor: theme.colors.dark[5],
          highlightColor: theme.colors.dark[4],
        }
      : {}),
  };

  return <Skeleton {...themedProps}></Skeleton>;
};

export const ThemedSkeleton = memo(ThemedSkeletonComponent);
