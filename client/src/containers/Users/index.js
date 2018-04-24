import React, { Component } from 'react';
import { Button, Form, FormGroup, InputGroup, FormControl, Table } from 'react-bootstrap';
import {connect} from "react-redux";

import { userAdd, usersFetch, userDel } from '../../actions/index';

class Users extends Component {
    constructor (props) {
        super(props);
        console.log('constructor props =', props);
        this.state = {
            users: {},
            isPinging: false,
            username: '',
            user: {}
        };
    }
//componentDidMount - срабатывает после того, как компонент был отрисован в DOM.
//вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам
    componentDidMount() {
        this.f_usersFetch();
    };

    shouldComponentUpdate(props){
        console.log("shouldComponentUpdate()", props);
        return true;
        // if (props.users && props.users.length > 0 ){
        //     console.log('true');
        //     return true;
        // }else{
        //     console.log('false');
        //     return false;
        // }
    }


//componentWillReceiveProps вызывается при обновлении объекта props. Новые значения этого объекта
// передаются в функции в качестве параметра. Как правило, в этой функции устанавливаются
// свойства компонента, в том числе из this.state,
    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps()", props);
        this.setState({
            users: props.users,
            isPinging: props.isPinging,
            username: props.username,
            user: props.user
        })
    }


    componentWillUpdate(){
        console.log("componentWillUpdate()");
    }
    componentDidUpdate(){
        console.log("componentDidUpdate()");
    }



    // callApi_addUser = async (username) => {
    //     const response = await fetch('/api/users', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: username,
    //         })}
    //     );
    //     if (response.status !== 403) {
    //         const body = await response.json();
    //         if (response.status !== 200) throw Error(body.message);
    //         return body;
    //     } else {
    //         //this.rowColor(response.statusText);
    //         console.log('204', response.statusText);
    //     }
    // };
    // addUser = (username) => {
    //     this.callApi_addUser(username)
    //         .then(res => {
    //             if (res) {
    //                 this.setState({
    //                     users: res
    //                 });
    //             }
    //         })
    //         .catch(err => console.log(err));
    // };
    // delUser = (user) => {
    //   console.log('del user = ', user.name);
    //     this.callApi_delUser(user)
    //         .then(res => {
    //             if (res) {
    //                 this.setState({
    //                     users: res
    //                 });
    //             }
    //         })
    //         .catch(err => console.log(err));
    // };
    // callApi_delUser = async (user) => {
    //     console.log('del', user);
    //     const response = await fetch('/api/users', {
    //         method: 'DELETE',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             user: user,
    //         })}
    //     );
    //     const body = await response.json();
    //     if (response.status !== 200) throw Error(body.message);
    //     return body;
    // };

    f_userAdd = (username) => {
        console.log('f_userAdd ', username);
        this.props.onAddUser(username);
    };
    f_usersFetch = () => {
        console.log('t_usersFetch');
        this.props.onFetchUsers();
    };

    f_userDel = (user) => {
      console.log('f_userDel ', user);
      this.props.onDelUser(user);
    };

    render() {

        const usersList = () => {
            if(this.state.users){
                return [...this.state.users];
            } else {
                return null }};

         //console.log('render-------props--', this.props.isPinging, this.props.username, this.props.users);
        console.log('render-------State--', this.state.isPinging, this.state.username, this.state.users);

        return (
            <div>
                <h1>Users</h1>

                {/*<div className="container">*/}
                    {/*<h2>is pinging: <strong>{this.props.isPinging.toString()}</strong></h2>*/}
                    {/*<button onClick={userAdd}>Start PING</button>*/}
                {/*</div>*/}

                <Form inline>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder = "Enter User Name"
                            inputRef={input => this.usernameInput = input}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        onClick={(e) => {
                        e.preventDefault();
                        this.f_userAdd(this.usernameInput.value);
                        this.usernameInput.value = '';
                    }}><i className="fa fa-user"></i> Add</Button>

                </Form>

                <div className="allUsers">
                    <Table bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Password</th>
                            <th>Towns</th>
                            <th>del</th>
                        </tr>
                        </thead>
                        <tbody id="likeTable">


                    { usersList() &&
                        usersList().length > 0 &&
                        usersList().map(
                            (item, index) => (
                                <tr key={index} id = {index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.password}</td>
                                    <td>{item.towns}</td>
                                    <td>
                                        <Button
                                            bsSize="xsmall" bsStyle="danger"
                                            //onClick={() => this.delUser(item)}
                                            onClick={() => this.f_userDel(item)}
                                        >
                                            del
                                        </Button>
                                    </td>
                                </tr>)
                            )
                    }

                        </tbody>
                    </Table>
                </div>
                {/*<div className="container">*/}
                    {/*<h2>test userEpic: <strong>{this.props.isPinging.toString()}</strong></h2>*/}
                    {/*<button onClick={this.f_userAdd}>test Add</button>*/}
                    {/*<button onClick={this.f_usersFetch}>test Fetch</button>*/}
                {/*</div>*/}
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     //const isPinging  = state.usersReducer.isPinging;
//     return {
//         isPinging: state.usersReducer.isPinging
//     }
// }
//
//
// Users = connect(
//     mapStateToProps,
//     { userAdd }
// )(Users);


//export default Users;

function mapStateToProps (state) {
    console.log('state', state);
    return {
        isPinging: state.usersReducer.isPinging,
        username: state.usersReducer.username,
        users: state.usersReducer.users,
        user: state.usersReducer.user
        // mess: state.usersReducer.mess,
        // users: state.usersReducer

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddUser: (username) => { dispatch(userAdd(username)) },
        onFetchUsers: () => { dispatch(usersFetch()) },
        onDelUser: (user) => {dispatch(userDel(user))}

    }
};
Users = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

export default Users;

