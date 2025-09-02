import styled from '@emotion/styled';
import { JSX } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type BmiChartProps = {
  proteinsPercentFromTarget: number;
  fatsPercentFromTarget: number;
  carbsPercentFromTarget: number;
};

export function BmiChart({
  proteinsPercentFromTarget,
  fatsPercentFromTarget,
  carbsPercentFromTarget,
}: BmiChartProps): JSX.Element {
  const data = [
    {
      name: 'Proteins',
      value: proteinsPercentFromTarget,
      color: '#4765FA',
    },
    {
      name: 'Fats',
      value: fatsPercentFromTarget,
      color: '#ffbf2b',
    },
    {
      name: 'Carbs',
      value: carbsPercentFromTarget,
      color: '#26C26F',
    },
  ];

  return (
    <StyledChart>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={45}
            innerRadius={38}
            startAngle={90}
            endAngle={450}
            cornerRadius={10}
            paddingAngle={8}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map(({ name, color }) => (
              <Cell key={`cell-${name}`} fill={color} stroke="none" />
            ))}
          </Pie>
          <Pie
            data={[{ value: 1 }]}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={31}
            innerRadius={24}
            fill="#DEDEE9"
            stroke="none"
            isAnimationActive={false}
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledChart>
  );
}

const StyledChart = styled.div`
  width: 92px;
  height: 92px;
`;
