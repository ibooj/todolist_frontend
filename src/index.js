import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Redirect} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import {todoStore, history} from './store/index';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import AboutPage from './containers/AboutPage';

import './styles/main.scss';


const theme = createMuiTheme();

const PrivateRoute = ({component: Component, ...rest}) => {
    return (<Route {...rest} render={props => {
        const {token} = todoStore.getState().userReducer;
        return (token ? (<Component {...props}/>) : (
            <Redirect to={{pathname: '/login', state: {from: props.location}}}/>));
    }}/>);
};

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={todoStore}>
            <ConnectedRouter history={history}>
                <div>
                    <PrivateRoute exact path="/" component={App}/>
                    <PrivateRoute path="/task/:id" component={App}/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/login" component={LoginPage}/>
                </div>
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);