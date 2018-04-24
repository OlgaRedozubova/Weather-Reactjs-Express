import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authRequest } from '../../actions/index';
import { authSecret } from '../../actions/index';
import { authFailure } from '../../actions/index';
import { authSingOut } from '../../actions/index';
import LoginForm from '../../components/LoginForm/index';
import  { Redirect } from 'react-router-dom';

import { isLogin } from '../../components/Auth';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            mess: '',
            isLogin: false,
            isSingIn: false,
            username: '',
            payload: '',
            password: '',
            token: ''
        }
    }
    componentDidMount() {
        this.setState({mess: ''})
    }

    shouldComponentUpdate(props) {
        console.log('shouldComponentUpdate', props);
        return true;
    }

    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps', props);
        this.setState ({
            mess: props.mess,
            username: props.username,
            payload: props.payload,
            password: props.password,
            token: props.token,
            isLogin: props.isLogin,
            isSingIn: props.isSingIn
        })
    }

    getSecret = () => {
        console.log('token!=', this.props.payload);
        this.props.getSecret(this.props.payload);
    };

    auth = (username, password) => {
        this.props.onAddTodo(username, password);
        //this.props.getSecret(this.props.token);
        //setTimeout(() => {this.props.getSecret(this.props.token)}, 100);
    };

    render() {
        window.localStorage.setItem('ls_token', this.props.token);
        window.localStorage.setItem('ls_username', this.props.username);
        console.log('Render this.props', this.props);
        console.log('Render this.state', this.state);
        const {from} = this.props.location.state || { from: { pathname: "/" } };
         if (isLogin()) {
              return <Redirect to={from} />;
         }

        return(
            <div className="login">
                <LoginForm login = {this.auth}/>
                {/*<button onClick={this.getSecret}>get secret message</button>*/}
            </div>
        )
    }

}

function mapStateToProps (state) {
    return {
        mess: state.authReducer.mess,
        username: state.authReducer.username,
        payload: state.authReducer.payload,
        password: state.authReducer.password,
        token: state.authReducer.token,
        isLogin: state.authReducer.isLogin,
        isSingIn: state.authReducer.isSingIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (username, password) => { dispatch(authRequest(username, password)) },
        getSecret: (token) => {
            console.log('token!!!', token);
            if (token){
                dispatch(authSecret(token))
            }else {
                dispatch(authFailure())
            }
        },
        singOut: () => {
            console.log('SingOut');
            dispatch(authSingOut());
        }
    }
};

Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default Login;
