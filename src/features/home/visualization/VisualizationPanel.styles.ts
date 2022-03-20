import styled from '@emotion/styled';
import { createStyles } from '@mantine/core';

export const useVisualizationPanelStyles = createStyles((theme) => ({
  visualizationWrapper: {
    margin: '0 1rem',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      margin: 0,
    },
  },
  panel: {
    margin: '1rem 0',
    padding: '0',
  },
  panelIcon: {
    padding: '0.5rem 1rem',
    color: '#5a556296',
    fontSize: '2rem',
  },
}));

export const PanelIcon = styled.i<{ disabled?: boolean; selected: boolean }>((props) => ({
  color: props.selected ? '#5a5562' : '#5a556296',
  cursor: props.disabled ? 'not-allowed' : 'pointer',
  padding: '0.5rem 1rem',
  fontSize: '2rem',
}));
