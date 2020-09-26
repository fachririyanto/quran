import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './scss/global.scss';

/**
 * Import UI pages.
 */
import UIIndex from './pages/index';
import UIInside from './pages/inside';

/**
 * Setup router.
 */
export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/surah/:Id">
                    <UIInside />
                </Route>
                <Route path="/">
                    <UIIndex />
                </Route>
            </Switch>
        </Router>
    );
}