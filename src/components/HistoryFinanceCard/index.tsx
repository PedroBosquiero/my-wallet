import React from "react";

import { Container, Tag, Money } from './styles';

interface IHistoryFinanceCardProps {
    tagColor: string;
    title: string;
    subTitle: string;
    amount: string;
    moneyColor: string;
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    tagColor, title, subTitle, amount, moneyColor
}) => (
    <Container>
        <Tag color={tagColor} />
        <div>
            <span>{title}</span>
            <small>{subTitle}</small>
        </div>
        <Money color={moneyColor}>
            <h3>{amount}</h3>
        </Money>
            
    </Container>
);

export default HistoryFinanceCard;