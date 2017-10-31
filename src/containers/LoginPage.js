import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router';
import Grid from 'material-ui/Grid';
import LoginForm from '../components/LoginForm';
import {loginUser} from '../actions/user';


const styles = {
    height: 400,
    alignItems: "center",
    justifyContent: "center"
};

class LoginPage extends React.Component {
    render() {
        return (
            this.props.user.token ?
                <Redirect to={{pathname: '/'}}/>
                :
                <Grid container style={styles}>
                    <LoginForm {...this.props}/>
                </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    const {from: {pathname: next = false} = {}} = state.routing.location.state || {};
    return {
        user: state.userReducer,
        next
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: bindActionCreators(loginUser, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
