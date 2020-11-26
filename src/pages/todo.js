import React from 'react'
import {observer, inject} from 'mobx-react';
import TodoBox from "./TodoBox";
import {withRouter} from 'react-router-dom'
import {computed} from "mobx";

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

    @computed get AllTodo(){
        return this.props.store.todos
    }

    @computed get AllFinishedTodo(){
        return this.props.store.todos.filter((todo) => todo.finished === false)
    }

    @computed get AllUnFinishedTodo(){
        return this.props.store.todos.filter((todo) => todo.finished === true)
    }

    @computed get AllSearchedTodos(){
        return this.props.store.searchedTodos
    }




    AddTodo = (inputValue) => {
        this.props.store.addTodo(inputValue)
        this.setState({})
    }

    DeleteTodo = (id) => {
        this.props.store.deleteTodo(id)
        this.setState({})
    }

    SearchTodo = (inputValue) => {
        this.props.store.searchTodo(inputValue)
        this.setState({})
    }

    EditTodo = (todo) => {
        todo.title = prompt('Todo标题', todo.title) || todo.title;
        this.setState({})
    }

    ToggleTodo = (todo) => {
        todo.finished = !todo.finished;
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
        let input2
        const {tabView} = this.state
        // const AllTodo = this.props.store.todos
        // const AllFinishedTodo = AllTodo.filter((todo) => todo.finished === false)
        // const AllUnFinishedTodo = AllTodo.filter((todo) => todo.finished === true)
        // const AllSearchedTodos = this.props.store.searchedTodos
        return (
            <React.Fragment>


                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if (!input.value.trim()) {
                            return
                        }
                        this.AddTodo(input.value)
                        input.value = ''
                    }}>
                        <input ref={node => input = node}/>
                        <button type="submit">添加 Todo</button>
                    </form>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if (!input2.value.trim()) {
                            return
                        }
                        this.SearchTodo(input2.value)
                        input2.value = ''
                        this.props.history.push('/SearchResult')
                    }}>
                        <input ref={node => input2 = node}/>
                        <button type="submit">
                            搜索 Todo
                        </button>
                    </form>
                    <button onClick={this.handleShowAll}>显示全部</button>
                    <button onClick={this.handleShowFinished}>显示已完成</button>
                    <button onClick={this.handleShowUnFinished}>显示未完成</button>
                </div>

                {tabView === SHOW_ALL &&
                <div>
                    <h3>所有的todo 全部任务数为({this.props.store.AllTodosCount}):</h3>
                    <TodoBox todos={this.AllTodo} deleteTodo={this.DeleteTodo} editTodo={this.EditTodo}
                             toggleTodo={this.ToggleTodo}/>
                </div>
                }

                {tabView === SHOW_FINISHED &&
                <div>
                    <h3>已完成的todo 完成任务数为({this.props.store.FinishedCount}):</h3>
                    <TodoBox todos={this.AllUnFinishedTodo} deleteTodo={this.DeleteTodo} editTodo={this.EditTodo}
                             toggleTodo={this.ToggleTodo}/>
                </div>
                }

                {tabView === SHOW_UNFINISHED &&
                <div>
                    <h3>未完成的todo 未完成任务数为({this.props.store.UnFinishedCount}):</h3>
                    <TodoBox todos={this.AllFinishedTodo} deleteTodo={this.DeleteTodo} editTodo={this.EditTodo}
                             toggleTodo={this.ToggleTodo}/>
                </div>
                }


                {/*<div>*/}
                {/*    <div>以下是todo的搜索结果[用于展示数据同步] ({this.AllSearchedTodos.length})</div>*/}

                {/*    {this.AllSearchedTodos.length === 0 ?*/}
                {/*        <div>暂无搜索结果</div> :*/}
                {/*        <div>*/}
                {/*            <TodoBox todos={this.AllSearchedTodos} deleteTodo={this.DeleteTodo} editTodo={this.EditTodo}*/}
                {/*                     toggleTodo={this.ToggleTodo}/>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}


            </React.Fragment>

        );
    }
}

export default withRouter(TodoList)