import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'

import Routes from 'routes'
import TopMenu from 'components/topMenu'
import {CurrentUserProvider} from 'contexts/currentUser'
import CurrentUserChecker from 'components/currentUserChecker'
import withToastProvider from "components/Toaster/withToastProvider";

const App = () => {
    return (
        <CurrentUserProvider>
            <CurrentUserChecker>
            <Router>
                <TopMenu />
                <Routes />
            </Router>
            </CurrentUserChecker>
        </CurrentUserProvider>
           )
}

//ReactDOM.render(<App />, document.getElementById('root'))

const AppWithToastProvider = withToastProvider(App);
ReactDOM.render(<AppWithToastProvider />, document.getElementById('root'));
