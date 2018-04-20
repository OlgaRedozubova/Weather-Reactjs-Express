import React, { Component } from 'react';
import { Button, Form, FormGroup, InputGroup, FormControl, Table } from 'react-bootstrap';
import {authSingOut, ping} from "../../actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import { userAdd } from '../../actions/index';
// import {connect} from "react-redux";
// import {userAdd} from "../../actions";


// let Users = ({ isPinging, userAdd }) => (
//     <div className="container">
//         <h1>It's secret page!!!</h1>
//         <h2>is pinging: <strong>{isPinging.toString()}</strong></h2>
//         <button onClick={userAdd}>Start PING</button>
//     </div>
// );







class Users extends Component {
    constructor (props) {
        super(props);
    }
    state = {
        users: {}
    };

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({
                    users: res,
                });
            })
            .catch(err => console.log(err));
    };

    callApi = async () => {
        const response = await fetch('/api/users');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    // addUser = (username, town) => {
    //     this.props.onAddUser(username, town);
    //     console.log('!!! props', this.props);
    // };

    callApi_addUser = async (username) => {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            })}
        );
        if (response.status !== 403) {
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            return body;
        } else {
            //this.rowColor(response.statusText);
            console.log('204', response.statusText);
        }
    };

    addUser = (username) => {
        this.callApi_addUser(username)
            .then(res => {
                if (res) {
                    this.setState({
                        users: res
                    });
                }
            })
            .catch(err => console.log(err));
    };



    delUser = (user) => {
      console.log('del user = ', user.name);
        this.callApi_delUser(user)
            .then(res => {
                if (res) {
                    this.setState({
                        users: res
                    });
                }
            })
            .catch(err => console.log(err));
    };


    callApi_delUser = async (user) => {
        console.log('del', user);
        const response = await fetch('/api/users', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user,
            })}
        );
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };



    render() {
        const usersList = [...this.state.users];

        console.log('-------', this.props.users);
        return (
            <div>
                <h1>Users</h1>

                <div className="container">
                    <h1>It's secret page!!!</h1>
                    <h2>is pinging: <strong>{this.props.isPinging.toString()}</strong></h2>
                    <button onClick={()=>{userAdd}}>Start PING</button>
                </div>

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
                        this.addUser(this.usernameInput.value);
                        this.usernameInput.value = '';
                    }}><i className="fa fa-user"></i> Add</Button>

                </Form>

                <div className="allUsers">
                    <Table bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Towns</th>
                            <th>del</th>
                        </tr>
                        </thead>
                        <tbody id="likeTable">


                    {
                        usersList.map(
                            (item, index) => (
                                <tr key={index} id = {index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.towns}</td>
                                    <td>
                                        <Button
                                            bsSize="xsmall" bsStyle="danger"
                                            onClick={() => this.delUser(item)}
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

            </div>
        )
    }
}

function mapStateToProps(state) {
    //const isPinging  = state.usersReducer.isPinging;
    return {
        isPinging: state.usersReducer.isPinging
    }
}


Users = connect(
    mapStateToProps,
    { userAdd }
)(Users);


export default Users;

// function mapStateToProps (state) {
//     console.log('state', state);
//     return {
//         mess: state.usersReducer.mess,
//         users: state.usersReducer
//
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         onAddUser: (username, town) => { dispatch(userAdd(username, town)) },
//
//     }
// };
// Users = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Users);

//export default Users;

