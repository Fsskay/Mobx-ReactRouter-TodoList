import React from 'react'

const TodoBox = ({todos,toggleTodo,deleteTodo,editTodo}) => (
    <ul>
        {todos.map((todo) =>(
        <ul style={{border:"solid 1px red",borderRadius:"10px",textAlign:"center"}}>
            <li style={{
                textDecoration: todo.finished === false ? 'none' : 'line-through'
            }}>{todo.title}</li>
            <li>{todo.finished === false ? '未完成' : '已完成'}</li>

            <button onClick={(event) => {
                event.preventDefault();
                toggleTodo(todo)
            }}>切换
            </button>

            <button id={todo.id} onClick={(e) => {
                e.preventDefault();
                deleteTodo(todo.id)
            }}
            >删除
            </button>
            <button onClick={(event) => {
                event.preventDefault()
                editTodo(todo)
            }}>编辑
            </button>
        </ul>
        ))
        }
    </ul>
)
export default TodoBox