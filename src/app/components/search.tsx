import React from 'react';
import styled from 'styled-components';
import iconSearch from '../images/icon-search.svg';

/**
 * Define stylesheet.
 */
const UI = styled.section`
    position: relative;
`;
const Container = styled.div`
    padding: 24px 20px 0;
    @media (min-width: 680px) {
        margin: auto;
        padding: 48px 0;
        max-width: 640px;
    }
`;
const Heading = styled.h1`
    margin: 0;
    font-size: 3.2rem;
    font-weight: 500;
    line-height: 1.1;
    text-align: center;
    @media (min-width: 640px) {
        font-size: 4.8rem;
    }
`;
const GroupBox = styled.div`
    position: relative;
    margin: 16px 0 0;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 48px;
    background-color: #fff;
    @media (min-width: 640px) {
        margin: 32px 0 0;
    }
`;
const Inputbox = styled.input`
    padding: 0 16px;
    width: 100%;
    height: 40px;
    outline: 0;
    border: 0;
`;
const InputIcon = styled.img`
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 1;
    margin-top: -12px;
    margin-right: 8px;
    width: 24px;
    opacity: .6;
`;

export default function UISearch(props: any) {
    return (
        <UI>
            <Container>
                <Heading>Quran Digital</Heading>
                <GroupBox>
                    <Inputbox type="text" onChange={(e: any) => props.handleFindItem(e)} placeholder="Cari surat. Cth: yasin" />
                    <InputIcon src={iconSearch} />
                </GroupBox>
            </Container>
        </UI>
    );
}