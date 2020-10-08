import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconSearch from '../images/icon-search.svg';

/**
 * Import component.
 */
import UISidebarSearch from './sidebar-search';

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
    a {
        color: #333;
        text-decoration: none;
    }
`;
const SearchForm = styled.div`
    flex-grow: 1;
    align-items: flex-end;
`;
const SearchGroup = styled.button`
    position: relative;
    padding: 8px;
    float: right;
    background-color: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
`;
const SearchIcon = styled.img`
    display: block;
    width: 24px;
`;

/**
 * Define component.
 */
interface UIProps {
    isHome: boolean;
}
export default function UINav(props: UIProps) {
    const [active, setActive] = useState<any>(false);

    // handle search button
    function handleSearch(e: any): void {
        if (active) {
            document.body.style.overflow = 'initial';
        } else {
            document.body.style.overflow = 'hidden';
        }
        setActive(!active);
    };

    return (
        <>
            <UI>
                <Nav>
                    <Container>
                        <SiteName>
                            <Link to="/">Quran</Link>
                        </SiteName>
                        {props.isHome ? null : <SearchForm>
                            <SearchGroup aria-label="Button Search" onClick={(e: any) => handleSearch(e)}>
                                <SearchIcon src={iconSearch} alt="Icon Search" />
                            </SearchGroup>
                        </SearchForm>}
                    </Container>
                </Nav>
            </UI>
            <UISidebarSearch isOpen={active} handleSearch={handleSearch} />
        </>
    );
}