import React from 'react';
import './styles/visualization-panel.scss';
import { VISUALIZATION } from '../../screens/types';

interface Props {
  setShowVisualization: (type: string) => void;
}

const VisualizationPanel: React.FC<Props> = ({ setShowVisualization }) => {
  return (
    <div className='container panel'>
      <i
        className='fas fa-calendar-day'
        style={{
          marginLeft: 'auto',
          color: '#5a5562',
        }}
        onClick={() => setShowVisualization(VISUALIZATION.CALENDAR)}
      ></i>
      <i className='fas fa-child' onClick={() => setShowVisualization(VISUALIZATION.MODEL)}></i>
      <i className='fas fa-chart-bar' onClick={() => setShowVisualization(VISUALIZATION.GRAPH)}></i>
    </div>
  );
};

export default VisualizationPanel;
