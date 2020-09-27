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

    /**
     * Fetch data from API.
     */
    useEffect(() => {
        async function getItem(itemId: number) {
            const results = await axios.get('https://api.quran.sutanlab.id/surah/' + itemId);
            setItem(results.data);
            console.log(results.data);
        }
        let isMounted: boolean = true;
        if (isMounted) {
            getItem(itemId);
        }
        return () => { isMounted = false };
    }, [itemId]);

    /**
     * Render layout.
     */
    return (
        <>
            <UINav isHome={false} />
            {item ? <UISurah item={item} /> : null}
            <UIFooter />
        </>
    );
}