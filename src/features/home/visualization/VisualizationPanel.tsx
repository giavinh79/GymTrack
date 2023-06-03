import { ReactElement, Suspense } from 'react';
import { Group, Space } from '@mantine/core';

import { EVisualization } from 'src/pages/home/types';
import { RunningLoader } from 'src/shared/components';
import { lazyImport } from 'src/utils';

import { ActivityCalendar, PanelIcon } from './sub-components';
import { useVisualizationPanelStyles } from './VisualizationPanel.styles';

const { Models } = lazyImport(() => import('src/features/home/visualization/sub-components/model/Models'), 'Models');

interface IVisualizationPanelProps {
  setVisualization: (type: EVisualization) => void;
  visualization: EVisualization;
}

export const VisualizationPanel = ({ setVisualization, visualization }: IVisualizationPanelProps): ReactElement => {
  const { classes } = useVisualizationPanelStyles();

  const handleClick = (visualization: EVisualization) => {
    setVisualization(visualization);
  };

  const renderVisualization = (): ReactElement => {
    switch (visualization) {
      case EVisualization.CALENDAR:
        return (
          <Suspense fallback={<RunningLoader height='326px' />}>
            <ActivityCalendar />
          </Suspense>
        );
      case EVisualization.GRAPH:
        return <div>{/* @TODO */}</div>;
      default:
        return (
          <Suspense fallback={<RunningLoader height='600px' />}>
            <Models />
          </Suspense>
        );
    }
  };

  return (
    <>
      <Space h='xl' />
      <Group position='right' className={classes.panel} spacing={0}>
        <PanelIcon
          ariaLabel='calendar'
          iconClassName='fas fa-calendar-day'
          selected={visualization === EVisualization.CALENDAR}
          onClick={() => handleClick(EVisualization.CALENDAR)}
        />
        <PanelIcon
          ariaLabel='body model'
          iconClassName='fas fa-child'
          selected={visualization === EVisualization.MODEL}
          onClick={() => handleClick(EVisualization.MODEL)}
        />
        <PanelIcon
          ariaLabel='graphs'
          iconClassName='fas fa-chart-bar'
          selected={visualization === EVisualization.GRAPH}
          onClick={() => handleClick(EVisualization.GRAPH)}
        />
      </Group>
      <div className={classes.visualizationWrapper}>{renderVisualization()}</div>
      <Space h='xl' />
    </>
  );
};
