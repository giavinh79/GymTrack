import React from 'react';
import { useSelector } from 'react-redux';

import { EVisualization } from '../../screens/types';
import { selectLoading } from '../../slices/general/loadingSlice';

import './styles/visualization-panel.scss';

interface IVisualizationPanelProps {
  setVisualization: (type: EVisualization) => void;
  visualization: EVisualization;
}

export const VisualizationPanel: React.FC<IVisualizationPanelProps> = ({ setVisualization, visualization }) => {
  const isLoading = useSelector(selectLoading);

  const handleClick = (visualization: EVisualization) => {
    if (!isLoading) {
      setVisualization(visualization);
    }
  };

  return (
    <div className='container panel'>
      <i
        className='fas fa-calendar-day'
        style={{
          marginLeft: 'auto',
          color: visualization === EVisualization.CALENDAR ? '#5a5562' : undefined,
        }}
        onClick={() => handleClick(EVisualization.CALENDAR)}></i>
      <i
        className='fas fa-child'
        style={{ color: visualization === EVisualization.MODEL ? '#5a5562' : undefined }}
        onClick={() => handleClick(EVisualization.MODEL)}></i>
      <i
        className='fas fa-chart-bar'
        style={{ color: visualization === EVisualization.GRAPH ? '#5a5562' : undefined }}
        onClick={() => handleClick(EVisualization.GRAPH)}></i>
    </div>
  );
};
