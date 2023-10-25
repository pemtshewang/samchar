"use client"
import React, { PureComponent } from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import { Writeable } from 'zod';

export default class CustomPieChart extends PureComponent {
  //make the props writeable
  props: Writeable<{ data: any[] }>;
  render() {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={this.props.data} fill='fill' label />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
