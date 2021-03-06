import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import axios from 'axios'


const request = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


export default class TodoBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };

        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
        request.get('todos')
            .then((response) => {
                console.log(response);
                this.setState({ data: response.data })
            })
            .catch((err) => {
                alert(err)
            })

    }


    addTodo(todo) {
        this.setState((state) => ({
            data: [...state.data, todo]
        }));
        request.post(`todos`, todo)
            .then((response) => {
              
            })
            .catch((err) => {
                alert(err)
            })

    }
    deleteTodo(id) {
        this.setState((state) => ({
            data: state.data.filter(item => item.id != id)
        }))
        request.delete(`todos/${id}`)
            .then((response) => {
               
            })
            .catch((err) => {
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <h1> Daftar Todo</h1>
                <TodoList data={this.state.data} deleteTodo={this.deleteTodo} />
                <TodoForm addTodo={this.addTodo} />
            </div>
        )
    }
}