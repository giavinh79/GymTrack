import { ReactElement, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Group, Space } from '@mantine/core';

import { EVisualization } from 'src/pages/home/types';
import { selectLoading } from 'src/slices/general/loadingSlice';
import { RunningLoader } from 'src/shared/components';
import { lazyImport } from 'src/utils';

const { Models } = lazyImport(() => import('src/features/home/visualization/sub-components/Models'), 'Models');

import { ActivityCalendar } from './sub-components/calendar/Calendar';
import { PanelIcon, useVisualizationPanelStyles } from './VisualizationPanel.styles';

interface IVisualizationPanelProps {
  setVisualization: (type: EVisualization) => void;
  visualization: EVisualization;
}

// const VISUALIZATION = {
//   [EVisualization.CALENDAR]: (
//     <Suspense fallback={<RunningLoader height='326px' />}>
//       <ActivityCalendar />
//     </Suspense>
//   ),
//   [EVisualization.GRAPH]: null,
//   [EVisualization.CALENDAR]: '',
// };

export const VisualizationPanel = ({ setVisualization, visualization }: IVisualizationPanelProps): ReactElement => {
  const isLoading = useSelector(selectLoading);

  const { classes } = useVisualizationPanelStyles();

  const handleClick = (visualization: EVisualization) => {
    if (!isLoading) {
      setVisualization(visualization);
    }
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
          // <div className='container'>
          <Suspense fallback={<RunningLoader height='600px' />}>
            <Models />
          </Suspense>
          // </div>
        );
    }
  };

  return (
    <>
      <Space h='xl' />
      <Group position='right' className={classes.panel} spacing={0}>
        <PanelIcon
          aria-label='calendar'
          className='fas fa-calendar-day'
          selected={visualization === EVisualization.CALENDAR}
          onClick={() => handleClick(EVisualization.CALENDAR)}
        />
        <PanelIcon
          aria-label='body model'
          className={`fas fa-child ${classes.panelIcon}`}
          selected={visualization === EVisualization.MODEL}
          onClick={() => handleClick(EVisualization.MODEL)}
        />
        <PanelIcon
          aria-label='graphs'
          className={`fas fa-chart-bar ${classes.panelIcon}`}
          selected={visualization === EVisualization.GRAPH}
          onClick={() => handleClick(EVisualization.GRAPH)}
        />
      </Group>
      <div className={classes.visualizationWrapper}>{renderVisualization()}</div>
      <Space h='xl' />
    </>
  );
};
