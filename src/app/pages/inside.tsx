import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

/**
 * Import components.
 */
import UINav from '../components/nav';
import UISurah from '../components/surah';
import UIFooter from '../components/footer';

export default function UIInside() {
    const { itemId }: any = useParams();
    const [item, setItem] = useState<any>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /**
     * Fetch data from API.
     */
    useEffect(() => {
        async function getItem(itemId: number) {
            const results = await axios.get('https://api.quran.sutanlab.id/surah/' + itemId);
            setItem(results.data);
            setIsLoading(false);
            localStorage.setItem('quran_last_read', JSON.stringify({
                surah: results.data,
                position: 0
            }));
        }
        let isMounted: boolean = true;
        if (isMounted) {
            var lastRead = localStorage.getItem('quran_last_read');
            if (lastRead) {
                const { surah }: any = JSON.parse(lastRead);
                if (surah.data.number === parseInt(itemId)) {
                    setItem(surah);
                    setIsLoading(false);
                } else {
                    getItem(itemId);
                }
            } else {
                getItem(itemId);
            }
        }
        return () => {
            setIsLoading(true);
            isMounted = false;
        };
    }, [itemId]);

    /**
     * Tracking scroll position.
     */
    useEffect(() => {
        let scrollId: number;
        function handleScroll(e: any) {
            if (e.target.documentElement.scrollTop > 0) {
                localStorage.setItem('quran_last_read', JSON.stringify({
                    surah: item,
                    position: e.target.documentElement.scrollTop
                }));
            }
        }
        function isFunction(functionToCheck: any) {
            return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
        }
        function debounce(method: any, delay: number) {
            clearTimeout(scrollId);
            scrollId = setTimeout(() => {
                if (isFunction(method)) {
                    method();
                }
            }, delay);
        }
        function handleScrollWrapper(e: any) {
            debounce(handleScroll(e), 300);
        }
        if (item) {
            window.addEventListener('scroll', handleScrollWrapper);
        }
        return () => {
            const lastRead = localStorage.getItem('quran_last_read');
            if (lastRead) {
                const { position, surah }: any = JSON.parse(lastRead);
                if (surah.data.number === parseInt(itemId)) {
                    window.scrollTo(0, position);
                }
            }
            window.removeEventListener('scroll', handleScrollWrapper);
        }
    }, [item, itemId]);

    /**
     * Change document title.
     */
    useEffect(() => {
        if (item) {
            document.title = item.data.name.transliteration.id + ' | Digital Quran';
        }
    }, [item]);

    /**
     * Render layout.
     */
    return (
        <>
            <UINav isHome={false} />
            <UISurah item={item} isLoading={isLoading} />
            <UIFooter />
        </>
    );
}