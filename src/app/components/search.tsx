import React from 'react';
import styled from 'styled-components';

/**
 * Define stylesheet.
 */
const UI = styled.section`
    position: relative;
`;
const Container = styled.div`
    padding: 24px 20px 0;
    @media (min-width: 640px) {
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
const Inputbox = styled.input`
    margin: 16px 0 0;
    padding: 0 16px;
    width: 100%;
    height: 40px;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 48px;
    @media (min-width: 640px) {
        margin: 32px 0 0;
        height: 48px;
    }
`;

export default function UISearch(props: any) {
    return (
        <UI>
            <Container>
                <Heading>Quran Digital</Heading>
                <Inputbox type="text" onChange={(e: any) => props.handleFindItem(e)} placeholder="Cari surat. Cth: yasin" />
            </Container>
        </UI>
    );
}