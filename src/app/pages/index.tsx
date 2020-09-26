import React, { Component } from 'react';
import axios from 'axios';

/**
 * Import components.
 */
import UINav from '../components/nav';
import UISearch from '../components/search';
import UIItems from '../components/items';
import UIFooter from '../components/footer';

/**
 * Define component.
 */
interface UIState {
    find: string;
    items: any;
}
export default class UIIndex extends Component<{}, UIState> {
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
        const { items, find }: any = this.state;
        return (
            <>
                <UINav />
                <UISearch handleFindItem={this.handleFindItem.bind(this)} />
                <UIItems find={find} items={items} />
                <UIFooter />
            </>
        );
    }
}