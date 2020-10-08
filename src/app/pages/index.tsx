import React, { PureComponent } from 'react';
import axios from 'axios';

/**
 * Import components.
 */
import UINav from '../components/nav';
import UISearch from '../components/search';
import UILastRead from '../components/last-read';
import UIItems from '../components/items';
import UIFooter from '../components/footer';

/**
 * Define component.
 */
interface UIState {
    find: string;
    items: any;
    lastRead: any;
    isLoading: boolean;
}
export default class UIIndex extends PureComponent<{}, UIState> {
    constructor(props: any) {
        super(props);

        this.state = {
            find: '',
            items: [],
            lastRead: false,
            isLoading: true
        };
    }

    /**
     * Fetch data from API.
     */
    componentDidMount() {
        const items    = localStorage.getItem('quran_items');
        const lastRead = localStorage.getItem('quran_last_read');
        if (items) {
            this.setState({
                items: JSON.parse(items),
                lastRead: lastRead ? JSON.parse(lastRead) : false,
                isLoading: false
            });
        } else {
            axios.get('https://api.quran.sutanlab.id/surah').then(responses => {
                this.setState({
                    items: responses.data.data,
                    lastRead: lastRead ? JSON.parse(lastRead) : false,
                    isLoading: false
                }, () => localStorage.setItem('quran_items', JSON.stringify(responses.data.data)));
            });
        }
        window.scrollTo(0, 0);
        document.title = 'Digital Quran';
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
        const { items, find, lastRead, isLoading }: any = this.state;
        return (
            <>
                <UINav isHome={true} />
                <UISearch handleFindItem={this.handleFindItem.bind(this)} />
                {lastRead ? <UILastRead {...lastRead} /> : null}
                <UIItems find={find} items={items} isLoading={isLoading} />
                <UIFooter />
            </>
        );
    }
}