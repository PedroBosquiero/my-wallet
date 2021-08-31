import React from "react";
import logoImg from '../../assets/favicon.svg';
import { useAuth } from '../../hooks/auth';
import { Title, Container, Header, LogoImg, MenuContainer, MenuItemLink, MenuItemButton } from './styles';
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp } from 'react-icons/md'


const Aside: React.FC = () => {
    const{ signOut } = useAuth();

    return (
        <Container>
            <Header>
                <LogoImg src={logoImg} alt="Logo My Wallet" />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/income">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="/list/outcome">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemButton onClick={ signOut }>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>

        </Container>
    );
}

export default Aside;