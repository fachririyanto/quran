import React from 'react';
import styled from 'styled-components';
import '../fonts/alqalam/stylesheet.css';

/**
 * Define stylesheet.
 */
const UI = styled.section`
    padding: 64px 0;
`;
const Container = styled.div`
    padding: 0 20px;
    @media (min-width: 640px) {
        margin: auto;
        padding: 0;
        max-width: 640px;
    }
`;
const BlockHeader = styled.header`
    margin: 0 0 32px;
    text-align: center;
`;
const BlockTitle = styled.h1`
    margin: 0;
    font-size: 4.8rem;
    font-weight: 500;
    line-height: 1.1;
`;
const BlockTitleArab = styled.p`
    margin: 0 0 8px;
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 1.1;
`;
const BlockMeta = styled.span`
    display: block;
    margin: 12px 0 0;
    font-size: 1.4rem;
    color: #666;
`;
const Bismillah = styled.div`
    margin-bottom: 24px;
    font-family: 'Al Qalam Quran';
    font-size: 3.675rem;
    text-align: center;
`;
const List = styled.div`
    direction: rtl;
    font-family: 'Al Qalam Quran';
    font-size: 3.675rem;
    line-height: 1.7;
    text-align: right;
`;
const VerseNumber = styled.div`
    display: inline-block;
    margin: 0 8px;
    width: 28px;
    height: 28px;
    font-size: 1.2rem;
    color: #00796b;
    line-height: 24px;
    text-align: center;
    border: 2px solid #00796b;
    border-radius: 100%;
    vertical-align: middle;
`;

/**
 * Define components.
 */
export default function UISurah(props: any) {
    const { item, isLoading }: any = props;
    return isLoading ? (
        <UI>
            <Container>
                <BlockHeader>
                    <BlockTitleArab>&nbsp;</BlockTitleArab>
                    <BlockTitle>Quran</BlockTitle>
                    <BlockMeta>Loading...</BlockMeta>
                </BlockHeader>
                <Bismillah className="ui-placeholder">Placeholder</Bismillah>
                <Bismillah className="ui-placeholder">Placeholder</Bismillah>
                <Bismillah className="ui-placeholder">Placeholder</Bismillah>
            </Container>
        </UI>
    ) : (
        <UI>
            <Container>
                <BlockHeader>
                    <BlockTitleArab>{item.data.name.long}</BlockTitleArab>
                    <BlockTitle>{item.data.name.transliteration.id}</BlockTitle>
                    <BlockMeta>{item.data.name.translation.id} &mdash; {item.data.revelation.id}, {item.data.numberOfVerses} Ayat</BlockMeta>
                </BlockHeader>
                {item.data.preBismillah === null ? null : <Bismillah>{item.data.preBismillah.text.arab}</Bismillah>}
                <List>
                    {item.data.verses.map((item: any) => <UIVerse key={item.number.inSurah} data={item} />)}
                </List>
            </Container>
        </UI>
    );
}

function UIVerse(props: any) {
    const { data }: any = props;

    return (
        <>
            {data.text.arab}<VerseNumber className="font-default">{data.number.inSurah}</VerseNumber>
        </>
    );
}