import React from "react";
import { Grid } from './styles';
import MainHeader from "../MainHeader";
import Content from "../Content";
import Aside from "../Aside";

const Layout: React.FC = ({ children }) => (
        <Grid>
            <MainHeader />
            <Aside />
            <Content>
                { children }
            </Content>
        </Grid>
);

export default Layout;