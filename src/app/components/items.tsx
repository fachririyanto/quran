import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Define stylesheet.
 */
const UI = styled.section`
    padding: 16px 0;
`;
const Container = styled.div`
    padding: 0 20px;
    @media (min-width: 960px) {
        margin: auto;
        padding: 0;
        max-width: 960px;
    }
`;
const EmptyState = styled.p`
    margin: 0 0 40px;
    text-align: center;
`;
const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 640px) {
        margin: 0 -24px;
    }
`;
const Item = styled.div`
    padding: 16px 0;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,.08);
    @media (min-width: 640px) {
        padding: 0 24px 32px;
        width: 50%;
        border-bottom: 0;
    }
    @media (min-width: 960px) {
        width: 33.33%;
    }
`;
const ItemCard = styled.div`
    display: flex;
    position: relative;
`;
const ItemNumber = styled.div`
    flex: none;
    width: 40px;
    height: 40px;
    font-size: 1.6rem;
    font-weight: normal;
    color: #333;
    line-height: 36px;
    text-align: center;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 40px;
`;
const ItemDetail = styled.div`
    padding: 0 16px 0 12px;
`;
const ItemTitle = styled.h2`
    margin: 0;
    font-size: 1.45rem;
    font-weight: 500;
    @media (min-width: 640px) {
        font-size: 1.6rem;
    }
`;
const ItemMeta = styled.span`
    display: -webkit-box;
    margin: 1px 0 0;
    font-size: 1.35rem;
    color: #666;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;
const ItemArab = styled.div`
    flex-grow: 1;
    font-size: 1.7rem;
    font-weight: 500;
    text-align: right;
    white-space: nowrap;
    @media (min-width: 640px) {
        font-size: 1.8rem;
    }
`;
const ItemLink = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    a {
        display: flex;
        width: 100%;
        height: 100%;
        font-size: 0;
        line-height: 0;
    }
`;

/**
 * Define component.
 */
interface UIProps {
    find: string;
    items: any;
    isLoading: boolean;
}
export default function UIItems(props: UIProps) {
    const { items, find, isLoading }: any = props;

    if (isLoading) {
        const data: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return (
            <UI>
                <Container>
                    <List>
                        {data.map((item: number) => <UIItemPlaceholder key={item} />)}
                    </List>
                </Container>
            </UI>
        );
    }
    const UIList: any = items.filter((item: any) => {
        return find === '' ? item : item.name.transliteration.id.toLowerCase().includes(find.toLowerCase())
    }).map((item: any) => {
        return <UIItem key={item.number} item={item} />
    });
    return (
        <UI>
            <Container>
                {UIList.length === 0 ? <UIEmptyState /> : (
                    <List>
                        {UIList}
                    </List>
                )}
            </Container>
        </UI>
    );
}

function UIEmptyState() {
    return (
        <EmptyState>
            Data not found.
        </EmptyState>
    );
}

function UIItem(props: any) {
    const { item }: any = props;
    return (
        <Item>
            <ItemCard>
                <ItemNumber>
                    {item.number}
                </ItemNumber>
                <ItemDetail>
                    <ItemTitle>
                        {item.name.transliteration.id}
                    </ItemTitle>
                    <ItemMeta>
                        {item.name.translation.id}, {item.numberOfVerses} Ayat
                    </ItemMeta>
                </ItemDetail>
                <ItemArab>
                    {item.name.short}
                </ItemArab>
                <ItemLink>
                    <Link to={"/surah/" + item.number}>{item.name.transliteration.id}</Link>
                </ItemLink>
            </ItemCard>
        </Item>
    );
}

function UIItemPlaceholder() {
    return (
        <Item>
            <ItemCard className="ui-placeholder">
                <ItemNumber>
                    0
                </ItemNumber>
                <ItemDetail>
                    <ItemTitle>
                        Placeholder
                    </ItemTitle>
                    <ItemMeta>
                        Placeholder
                    </ItemMeta>
                </ItemDetail>
                <ItemArab>
                    Placeholder
                </ItemArab>
            </ItemCard>
        </Item>
    );
}