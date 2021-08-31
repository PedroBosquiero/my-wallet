import React from "react";
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from 'recharts';

import { Container, SideLeft, SideRight, LegendContainer, Legend } from './styles';
import formatCurrency from '../../utils/formatCurrency';
import { v4 as uuidv4 } from 'uuid';

interface IBarChartBoxProps {
    title: string;
    data: {
        name: string;
        amount: number;
        percent: number;
        color: string
    }[],
}

const BarChartBox: React.FC<IBarChartBoxProps> = ({ title, data }) => (
        <Container>
            <SideLeft>
                <h2>{title}</h2>
                <LegendContainer>
                    {
                        data.map((item) => (
                            <Legend key={uuidv4()} color={item.color}>
                            <div>{item.percent}%</div>
                            <span>{item.name}</span>
                            </Legend>
                        ))
                    }
                </LegendContainer>
            </SideLeft>
            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar dataKey="amount" name="Valor" >
                            {
                                data.map((item) => (
                                    <Cell
                                        key={item.name}
                                        fill={item.color}
                                        cursor="pointer"
                                    />
                                ))
                            }
                        </Bar>
                        <Tooltip
                        formatter={formatCurrency}
                        cursor={{ fill: 'none' }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    );

export default BarChartBox;