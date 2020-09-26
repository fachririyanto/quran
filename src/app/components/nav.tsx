import React from 'react';
import styled from 'styled-components';

/**
 * Define stylesheet.
 */
const UI = styled.header`
    height: 72px;
`;
const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    width: 100%;
    height: 72px;
    background-color: #fff;
`;
const Container = styled.div`
    display: flex;
    padding: 0 20px;
    width: 100%;
    height: 100%;
    align-items: center;
`;
const SiteName = styled.h3`
    margin: 0;
    font-size: 1.8rem;
`;

export default function UINav() {
    return (
        <UI>
            <Nav>
                <Container>
                    <SiteName>Quran</SiteName>
                </Container>
            </Nav>
        </UI>
    );
}