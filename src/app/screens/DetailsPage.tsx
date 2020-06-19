import React from 'react';
import { Container } from 'reactstrap';
import { LineChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts';
import './DetailsPageStyles.css';

const data = [
  {
    name: 'January',
    benchpress: 4000,
    bicepcurl: 2400,
    amt: 2400,
  },
  {
    name: 'February',
    benchpress: 3000,
    bicepcurl: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    benchpress: 2000,
    bicepcurl: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    benchpress: 2780,
    bicepcurl: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    benchpress: 1890,
    bicepcurl: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    benchpress: 2390,
    bicepcurl: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    benchpress: 3490,
    bicepcurl: 4300,
    amt: 2100,
  },
];

const DetailsPage = () => {
  return (
    <Container
      fluid='lg'
      style={{
        textAlign: 'center',
        marginLeft: 'auto !important',
        marginRight: 'auto  !important',
        padding: '2rem 1rem',
        maxWidth: '50rem',
      }}
    >
      <h2 style={{ marginBottom: '3rem', color: '#5a5a5a' }}>Monthly Exercise Changes</h2>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='bicepcurl' stroke='#8884d8' activeDot={{ r: 8 }} />
          <Line type='monotone' dataKey='benchpress' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
      <h2 style={{ margin: '3rem', color: '#5a5a5a' }}>Exercises</h2>
    </Container>
  );
};

export default DetailsPage;
