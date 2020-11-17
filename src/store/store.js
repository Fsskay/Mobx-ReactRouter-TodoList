import React from 'react'
import {observable, computed, action} from 'mobx';

//引入mobx的依赖,TodoStore里的observable就是让人组件可通过props获取

class Todo {
    // 定义一个 TODO 项目的类，id 是随机数，没有使用@observable 装饰可以理解为是只读的
    id = Math.random();
    // todo 的 title 及完成状态 finished 是可被观察及更新的，同时 finished 的初始状态为 false
    @observable title;
    @observable finished = false;

    // 构造函数接收tile
    constructor(title) {
        this.title = title;
    }
}


class TodoStore {
    @observable todos = []


    @action
    addTodo = title => {
        if (!title) return;
        this.todos.push(new Todo(title));
    }

    @action
    deleteTodo = id => {
        const deleteTodoID = id ;

        this.todos = this.todos.filter(todo=>todo.id !== deleteTodoID)
    }

}


const store = new TodoStore();

//构造函数创造实例

export default store