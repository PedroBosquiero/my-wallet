import styled from "styled-components";

interface ILegendProps{
    color: string;
}

export const Container = styled.div`
    width: 48%;
    min-height: 260px;

    margin: 10px 0;
    border-radius: 7px;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    display: flex;
`;

export const SideLeft = styled.aside`
    flex: 1;
    padding: 30px 20px;

    > h2 {
        padding-left: 17px;
        margin-bottom: 10px;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;

    max-height: 175px;
    padding-right: 15px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.colors.tertiary};
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;

    padding-left: 17px;
    
    > div {
        background-color: ${props => props.color};
        
        width: 40px;
        height: 40px;
        border-radius: 5px;
        
        font-size: 14px;
        line-height: 40px;
        text-align: center;
    }

    > span {
        margin-left: 5px;
    }
`;

export const SideRight = styled.main`
    flex: 1;
    min-height: 150px;
    display: flex;
    justify-content: center;
    padding-top: 35px;
`;