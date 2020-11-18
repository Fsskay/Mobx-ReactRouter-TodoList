import React from 'react'
import TodoBox from "./TodoBox";
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom'

@inject('store')
@observer


class SearchResult extends React.Component{
    constructor(props) {
        super(props);
    }

    DeleteTodo = (id) => {
        this.props.store.deleteTodo(id)
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

    BackToTodo=()=>{
        this.props.history.push('/')
    }
    render() {

        const AllSearchedTodos = this.props.store.searchedTodos
        return(

            <React.Fragment>
                <div>以下是todo的搜索结果 ({AllSearchedTodos.length})</div>


                {
                    AllSearchedTodos.length === 0 ?
                        <div>暂无搜索结果</div> :
                        <div>
                            <TodoBox todos={AllSearchedTodos} deleteTodo={this.DeleteTodo} editTodo={this.EditTodo}
                                     toggleTodo={this.ToggleTodo}/>
                        </div>
                }
                <button onClick={this.BackToTodo}>返回</button>
            </React.Fragment>

        );
    }
}

export default withRouter(SearchResult)