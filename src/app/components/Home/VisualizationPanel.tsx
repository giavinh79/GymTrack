import React from 'react';
import { VISUALIZATION } from '../../screens/types';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../../slices/loadingSlice';
import './styles/visualization-panel.scss';

interface Props {
  setShowVisualization: (type: string) => void;
}

const VisualizationPanel: React.FC<Props> = ({ setShowVisualization }) => {
  const loadingState = useSelector(selectLoading);

  return (
    <div className='container panel'>
      <i
        className='fas fa-calendar-day'
        style={{
          marginLeft: 'auto',
          color: '#5a5562',
        }}
        onClick={loadingState ? undefined : () => setShowVisualization(VISUALIZATION.CALENDAR)}
      ></i>
      <i
        className='fas fa-child'
        onClick={loadingState ? undefined : () => setShowVisualization(VISUALIZATION.MODEL)}
      ></i>
      <i
        className='fas fa-chart-bar'
        onClick={loadingState ? undefined : () => setShowVisualization(VISUALIZATION.GRAPH)}
      ></i>
    </div>
  );
};

export default VisualizationPanel;
