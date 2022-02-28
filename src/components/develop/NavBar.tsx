import React from "react";
import styled from "@emotion/styled";
import {NavLink, useRouteMatch, match} from 'react-router-dom';
import { navBorder } from "../../commons/colors";

const NavBarContainer = styled.div`
position: fixed;
top:0px;
left: 0px;
z-index: 1;
width: 100px;
height: 100%;
color: white;
padding-top: 100px;
background-color: #ec8e06;
border: 2px solid ${navBorder};
display: flex;
flex-direction: column;
`;

const NavLinkStyled = styled(NavLink)`
    width: 100%;
    height: 62px;
`;

const NavLinkButton = styled.button`
    width: 100%;
    height: 100%;
    background-color: inherit;
    border: none;
    border-top: 1px solid ${navBorder};
    border-bottom: 1px solid ${navBorder};
    box-shadow: 0px 1px 2px black;
    font-size: 14pt;
    color: white;
`;

const NavBar = () => {
    let match: match = useRouteMatch();

    return (
        <NavBarContainer>
            <NavLinkStyled to={`/admin/cities`}>
                <NavLinkButton>
                    Города
                </NavLinkButton>
            </NavLinkStyled>
            <NavLinkStyled to={`/admin/places`}>
                <NavLinkButton>
                    Заведения
                </NavLinkButton>
            </NavLinkStyled>
            <NavLinkStyled to={`/admin/categories`}>
                <NavLinkButton>
                    Категории
                </NavLinkButton>
            </NavLinkStyled>
            <NavLinkStyled to={`/admin/items`}>
                <NavLinkButton>
                    Товары
                </NavLinkButton>
            </NavLinkStyled>
            <NavLinkStyled to={`/admin/orders`}>
                <NavLinkButton>
                    Заказы
                </NavLinkButton>
            </NavLinkStyled>
            <NavLinkStyled to={`/admin/cliets`}>
                <NavLinkButton>
                    Клиенты
                </NavLinkButton>
            </NavLinkStyled>
            <NavLinkStyled to={`/admin/admins`}>
                <NavLinkButton>
                    Админы
                </NavLinkButton>
            </NavLinkStyled>
        </NavBarContainer>
    )
}

export default NavBar;