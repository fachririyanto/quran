import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * Define stylesheet.
 */
const UI = styled.section`
    position: relative;
    z-index: 2;
    margin-top: -24px;
    padding: 0 0 40px;
    color: #777;
    text-align: center;
`;
const Container = styled.div`
    padding: 0 20px;
    @media (min-width: 680px) {
        margin: auto;
        padding: 0;
        max-width: 640px;
    }
    a {
        color: #333;
    }
`;

export default function UILastRead(props: any) {
    const { surah }: any = props;
    return (
        <UI>
            <Container>
                Lanjutkan membaca: <Link to={"/surah/" + surah.data.number}>Surat {surah.data.name.transliteration.id}</Link>.
            </Container>
        </UI>
    );
}