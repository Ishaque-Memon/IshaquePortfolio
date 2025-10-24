import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

// Example data for charts (replace with real data from props or API)
export const projectStatusData = [
  { name: 'Completed', value: 8 },
  { name: 'In Progress', value: 3 },
  { name: 'Featured', value: 2 },
];

export const skillCategoryData = [
  { name: 'Frontend', value: 5 },
  { name: 'Backend', value: 3 },
  { name: 'DevOps', value: 2 },
  { name: 'Other', value: 1 },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function ProjectStatusChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SkillCategoryPie({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
