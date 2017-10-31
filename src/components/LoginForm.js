import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';


class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {snackbarStatus: false};
    }

    submitForm(e) {
        e.preventDefault();
        this.props.loginUser(this.username.value, this.password.value, this.props.next);
        this.password.value = '';
    }

    componentWillReceiveProps(nextProps) {
        const {non_field_errors} = nextProps.user.response || {};
        if (non_field_errors) {
            this.setState({snackbarStatus: true});
        }
    }

    handleRequestClose() {
        this.setState({snackbarStatus: false});
    }

    render() {
        const {username, password, non_field_errors} = this.props.user.response || {};
        return (
            <form noValidate autoComplete="off" onSubmit={this.submitForm.bind(this)}>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={this.state.snackbarStatus}
                    autoHideDuration={2500}
                    onRequestClose={this.handleRequestClose.bind(this)}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{non_field_errors && non_field_errors[0]}</span>}
                />
                <TextField
                    error={username && true}
                    helperText={username && username[0] || ' '}
                    id="username"
                    label="Login"
                    margin="normal"
                    inputRef={input => this.username = input}
                />
                <br/>
                <TextField
                    error={password && true}
                    helperText={password && password[0] || ' '}
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    inputRef={input => this.password = input}
                />
                <br/>
                <br/>
                <Button raised type="submit">Submit</Button>
            </form>
        );
    }
}

export default LoginForm;
