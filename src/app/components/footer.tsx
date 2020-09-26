import React from 'react';
import styled from 'styled-components';

/**
 * Define stylesheet.
 */
const UI = styled.footer`
    position: relative;
`;
const Container = styled.div`
    padding: 20px;
    color: #777;
    border-top: 1px solid rgba(0,0,0,.08);
    a {
        color: #333;
    }
    @media (min-width: 960px) {
        margin: auto;
        padding: 20px 0;
        max-width: 960px;
    }
`;

export default function UIFooter() {
    return (
        <UI>
            <Container>
                &copy; 2020. Forked me on <a href="https://github.com/fachririyanto/quran">Github</a>. API by <a href="https://github.com/sutanlab/quran-api">Sutanlab</a>.
            </Container>
        </UI>
    );
}