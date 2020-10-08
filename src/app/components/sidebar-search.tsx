import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import iconClose from '../images/icon-close.svg';
import iconSearch from '../images/icon-search.svg';

/**
 * Define stylesheet.
 */
const UI = styled.aside`
    position: fixed;
    top: 0;
    right: ${(props: UIProps) => props.isOpen ? '0' : '-280px'};
    bottom: 0;
    z-index: 90;
    width: 280px;
    height: 100%;
    overflow: auto;
    background-color: #f7f7f7;
    box-shadow: 0 0 6px rgba(0,0,0,.2);
`;
const Header = styled.header`
    padding: 20px 16px;
`;
const HeaderButtonClose = styled.button`
    padding: 0;
    outline: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
`;
const HeaderButtonImg = styled.img`
    display: inline-block;
    margin-right: 4px;
    width: 24px;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;
`;
const SearchTitle = styled.h4`
    margin: 24px 0 8px;
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
`;
const SearchGroup = styled.div`
    position: relative;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 32px;
`;
const SearchLabel = styled.label`
    font-size: 0;
    line-height: 0;
`;
const SearchInput = styled.input`
    padding: 0 16px;
    width: 100%;
    height: 32px;
    font-size: 1.4rem;
    border: 0;
    outline: 0;
`;
const SearchIcon = styled.img`
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
const SearchResults = styled.div`
    padding: 0 16px;
`;
const EmptyState = styled.p`
    margin: 0 0 40px;
    text-align: center;
`;
const Item = styled.div`
    padding: 12px 0;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,.08);
`;
const ItemCard = styled.div`
    display: flex;
    position: relative;
`;
const ItemDetail = styled.div`
    padding-right: 16px;
`;
const ItemTitle = styled.h3`
    margin: 0;
    font-size: 1.325rem;
    font-weight: 500;
    @media (min-width: 640px) {
        font-size: 1.6rem;
    }
`;
const ItemMeta = styled.span`
    display: block;
    margin: 1px 0 0;
    font-size: 1.25rem;
    color: #666;
    line-height: 1.3;
`;
const ItemArab = styled.div`
    flex-grow: 1;
    font-size: 1.55rem;
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
interface UIState {
    find: string;
    items: any;
}
interface UIProps {
    isOpen: boolean;
}
export default class UISidebarSearch extends PureComponent<any, UIState> {
    constructor(props: any) {
        super(props);

        this.state = {
            find: '',
            items: []
        };
    }

    /**
     * Fetch data from API.
     */
    componentDidMount() {
        const items = localStorage.getItem('quran_items');
        if (items) {
            this.setState({
                items: JSON.parse(items)
            });
        } else {
            axios.get('https://api.quran.sutanlab.id/surah').then(responses => {
                this.setState({
                    items: responses.data.data
                }, () => localStorage.setItem('quran_items', JSON.stringify(responses.data.data)));
            });
        }
    }

    /**
     * Handle find items.
     */
    handleFindItem(e: any) {
        this.setState({
            find: e.target.value
        });
    }

    /**
     * Render layout.
     */
    render() {
        return (
            <UI isOpen={this.props.isOpen}>
                <Header>
                    <HeaderButtonClose aria-label="Button Search" onClick={(e: any) => this.props.handleSearch(e)}>
                        <HeaderButtonImg src={iconClose} alt="Icon Search" />
                    </HeaderButtonClose>
                    <SearchTitle>Cari Surat</SearchTitle>
                    <SearchGroup>
                        <SearchLabel htmlFor="quran-sidebar-searchbox">Cari Surat</SearchLabel>
                        <SearchInput id="quran-sidebar-searchbox" placeholder="Cth: yasin" onChange={(e: any) => this.handleFindItem(e)} />
                        <SearchIcon src={iconSearch} alt="Icon Search" />
                    </SearchGroup>
                </Header>
                <UISearchResults items={this.state.items} find={this.state.find} {...this.props} />
            </UI>
        );
    }
}

function UISearchResults(props: any) {
    const { items, find }: any = props;
    const UIList: any = items.filter((item: any) => {
        return find === '' ? item : item.name.transliteration.id.toLowerCase().includes(find.toLowerCase())
    }).map((item: any) => {
        return <UIItem key={item.number} item={item} {...props} />
    });
    return (
        <>
            {UIList.length === 0 ? <UIEmptyState /> : (
                <SearchResults>
                    {UIList}
                </SearchResults>
            )}
        </>
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
                    <Link to={"/surah/" + item.number} onClick={(e: any) => props.handleSearch(e)}>{item.name.transliteration.id}</Link>
                </ItemLink>
            </ItemCard>
        </Item>
    );
}