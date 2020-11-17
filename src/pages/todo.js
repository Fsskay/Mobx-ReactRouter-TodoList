import React from 'react'
import {observer, inject} from 'mobx-react';
//由于provider的原因,所以不需要import store了,直接@inject注入store数据,使用@observer观察,this.prop.store取得

const tabsText = [SHOW_ALL, SHOW_FINISHED, SHOW_UNFINISHED]
var SHOW_ALL = 'showAll';
var SHOW_FINISHED = 'showFinished';
var SHOW_UNFINISHED = 'showUnFinished';


@inject('store')
@observer

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '来输入',
            tabView: SHOW_ALL,
        }
    }


    AddTodo = (inputValue) => {
        this.props.store.addTodo(inputValue)
        console.log(this.props.store.todos)
        this.setState({})
    }

    DeleteTodo = (id) => {
        this.props.store.deleteTodo(id)
        console.log(this.props.store.todos)
        this.setState({})
    }


    handleShowAll = () => {
        this.setState({tabView: SHOW_ALL})
    }
    handleShowFinished = () => {
        this.setState({tabView: SHOW_FINISHED})
    }
    handleShowUnFinished = () => {
        this.setState({tabView: SHOW_UNFINISHED})
    }

    render() {
        let input
        const {tabView} = this.state
        return (
            <React.Fragment>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if (!input.value.trim()) {
                            return
                        }
                        //只是防止输入空白的
                        console.log(input.value)
                        this.AddTodo(input.value)
                        input.value = ''
                    }}>
                        <input ref={node => input = node}
                            //回调refs
                        />
                        <button type="submit">
                            Add Todo
                        </button>
                    </form>
                    <button onClick={this.handleShowAll}>显示全部</button>
                    <button onClick={this.handleShowFinished}>显示已完成</button>
                    <button onClick={this.handleShowUnFinished}>显示未完成</button>

                </div>

                {tabView === SHOW_ALL &&
                <div>
                    所有的todo有:
                    {this.props.store.todos.map((todo) => {
                        return (
                            <ul id={todo.id}>
                                <li>{todo.title}</li>
                                <li>{todo.finished === false ? '未完成' : '已完成'}</li>
                                <button onClick={(event) => {
                                    event.preventDefault();
                                    todo.finished = !todo.finished;
                                    this.setState({})
                                }}>切换
                                </button>

                                <button id={todo.id} onClick={(e) => {
                                    e.preventDefault();
                                    this.DeleteTodo(todo.id)
                                }}
                                >删除
                                </button>

                            </ul>
                        )
                    })}
                </div>
                }


                {tabView === SHOW_FINISHED &&
                <div>

                    已完成的todo有:
                    {this.props.store.todos.filter((todo) => todo.finished === true).map((todo) => {
                        return (
                            <ul key={todo.id}>
                                <li>{todo.title}</li>
                                <li>{todo.finished === false ? '未完成' : '已完成'}</li>
                                <button onClick={(event) => {
                                    event.preventDefault();
                                    todo.finished = !todo.finished;
                                    this.setState({})
                                }}>切换
                                </button>
                            </ul>
                        )
                    })}
                </div>

                }

                {tabView === SHOW_UNFINISHED &&
                <div>
                    未完成的todo有:
                    {this.props.store.todos.filter((todo) => todo.finished === false).map((todo) => {
                        return (
                            <ul key={todo.id}>
                                <li>{todo.title}</li>
                                <li>{todo.finished === false ? '未完成' : '已完成'}</li>
                                <button onClick={(event) => {
                                    event.preventDefault();
                                    todo.finished = !todo.finished;
                                    this.setState({})
                                }}>切换
                                </button>
                            </ul>
                        )
                    })}
                </div>
                }


            </React.Fragment>

        );
    }
}

export default TodoList