import React, { useState, useMemo, useCallback } from "react";
import { Container, Content } from './styles';

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from '../../components/WalletBox'
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import relievedImg from '../../assets/relieved.svg'

import listOfMonths from "../../utils/months";
import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })
    },[]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });
        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        });
    },[]);

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid Value! Only Numbers.')
                }
            }
        });
        return total;
    },[monthSelected,yearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid Value! Only Numbers.')
                }
            }
        });
        return total;
    },[monthSelected,yearSelected]);

    const totalBalance = useMemo(() =>{
        return totalGains - totalExpenses;
    },[totalGains, totalExpenses]);

    const balanceMessage = useMemo(() => {
        if(totalBalance < 0){
            return{
                title: "Que Triste!",
                description: "Neste mês, você gastou mais do que deveria.",
                footerText: "Analise seus gastos e corte o que for desnecessário!",
                icon: sadImg
            }
        }
        else if(totalBalance === 0){
            return{
                title: "Por Pouco!",
                description: "Neste mês, você quase entrou no vermelho!",
                footerText: "Tome cuidado! Reveja seus gastos!",
                icon: relievedImg
            }
        }
        else{
            return{
                title: "Muito bem!",
                description: "Seu Saldo Está Positivo!",
                footerText: "Continue assim. Considere investir o seu saldo!",
                icon: happyImg
            }
        }
    },[totalBalance]);

    const expensesVsGains = useMemo(() => {
        const total = totalGains + totalExpenses;
        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: "#009900"
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: "#FF6666"
            },
        ]
        return data;
    },[totalGains, totalExpenses]);

    const historyData = useMemo(() => {
        return listOfMonths.map((_,month) => {
            let amountInput = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountInput += Number(gain.amount); 
                    } catch{
                        throw new Error('amountInput invalid. Only numbers accepted!');
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if (expenseMonth === month && expenseYear === yearSelected) {
                    try {
                        amountOutput += Number(expense.amount); 
                    } catch{
                        throw new Error('amountOutput invalid. Only numbers accepted!');
                    }
                }
            });
            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0,3),
                amountInput,
                amountOutput
            }
        }).filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        })
    },[yearSelected]);

    const relationRecurrentVsEventualExpenses = useMemo (() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected;
        })
        .forEach ((expense) =>{
            if(expense.frequency === 'recorrente'){
                return amountRecurrent += Number(expense.amount);
            }
            if(expense.frequency === 'eventual'){
                return amountEventual += Number(expense.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const recurrentPercent = Number(((amountRecurrent/total) * 100).toFixed(1));
        const eventualPercent = Number(((amountEventual/total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color: "#4E41F0"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: eventualPercent ? eventualPercent : 0,
                color: "#E44C4E"
            }
        ];

    },[monthSelected, yearSelected])

    const relationRecurrentVsEventualGains = useMemo (() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected;
        })
        .forEach ((gain) =>{
            if(gain.frequency === 'recorrente'){
                return amountRecurrent += Number(gain.amount);
            }
            if(gain.frequency === 'eventual'){
                return amountEventual += Number(gain.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const recurrentPercent = Number(((amountRecurrent/total) * 100).toFixed(1));
        const eventualPercent = Number(((amountEventual/total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color: "#4E41F0"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: eventualPercent ? eventualPercent : 0,
                color: "#E44C4E"
            }
        ];

    },[monthSelected, yearSelected])

    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch (error){
            throw new Error('Invalid Month Value. It Only Accepts 0 - 24')
        }
    },[]);

    const handleYearSelected = useCallback((month: string) => {
        try {
            const parseYear = Number(month);
            setYearSelected(parseYear);
        }catch {
            throw new Error('Invalid Month Value. It Only Accepts Integer Numbers')
        }
    },[]);


    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#000">
                <SelectInput
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected}/>
                <SelectInput
                    options={years}
                    onChange={(e) => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected}/>
            </ContentHeader>

            <Content>
                <WalletBox
                    title="Saldo"
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="dolar"
                    color= "#4E41F0"
                />
                <WalletBox
                    title="Entradas"
                    amount={totalGains}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                    color= "#009900"
                />
                <WalletBox
                    title="Saídas"
                    amount={totalExpenses}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                    color= "#FF6666"
                />
                <MessageBox
                    title={balanceMessage.title}
                    description={balanceMessage.description}
                    footerText={balanceMessage.footerText}
                    icon={balanceMessage.icon}
                />
                <PieChartBox data={expensesVsGains} />
                <HistoryBox
                    data={historyData}
                    lineColorAmountInput="#009900"
                    lineColorAmountOutput="#FF6666"
                />
                <BarChartBox
                    title="Saídas"
                    data={relationRecurrentVsEventualExpenses}
                />
                <BarChartBox
                    title="Entradas"
                    data={relationRecurrentVsEventualGains}
                />
            </Content>
        </Container>
    );
}

export default Dashboard;