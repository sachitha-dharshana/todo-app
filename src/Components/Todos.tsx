import { ChangeEvent, FormEvent, useState } from "react";
import { Row } from "./Row";
import { AddTodo } from "./AddTodo";
import { data } from "../todos";

type Todo = {
    id: string,
    task: string,
    isCompleted: boolean
}

export const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>(data)
    const [task, setTask] = useState("")
    const { v4: uuidv4 } = require('uuid')
    const todosLength = todos.length
    const hasTodos = todos.length > 0
    const remainingTodos = todos.filter((todo) => !todo.isCompleted).length

    const handleAddTodo = (todo: Todo) => {
        const updatedTodos = [... todos, todo]
        setTodos(updatedTodos) 
        setTask("")
    }

    const handleChange = (e:ChangeEvent) => {
        const { value } = e.target as HTMLInputElement
        setTask(value)
    }

    const handleSubmitTodo = (e:FormEvent) => {
        e.preventDefault()
        if(!task) {
            alert('Please add a task!')
        }
        else{
            const todo = {
                id: uuidv4(),
                task: task,
                isCompleted: false,
            }
            task && handleAddTodo(todo)
        }   
    }

    const handleDeleteTodo = (id: string) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id)
        setTodos(updatedTodos)
    }

    const handleCheckTodo = (id: string) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return{
                    ...todo,
                    isCompleted: !todo.isCompleted,
                }
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    return (
        <section className="w-10/12 sm:w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center">
        
            <AddTodo  
                task={task}
                handleChange={handleChange}
                handleSubmitTodo={handleSubmitTodo}
            />
            <div className="h-10 "></div>
            <h2 className="text-center">All Tasks</h2>
            <div className="h-10 "></div>
            <div className="taskWrapper flex justify-between w-full flex-col">
                {todos.map((todo) => (
                    <Row 
                        key={todo.id} 
                        todo={todo} 
                        handleDeleteTodo={handleDeleteTodo}
                        handleCheckTodo={handleCheckTodo}  
                    />
                ))}
                {!hasTodos && (
                    <p className="mb-5 text-xl text-gray-500 text-center">No tasks available!</p>
                )}
                {hasTodos && (
                    <p className="flex justify-center w-full">{`[${remainingTodos} of ${todosLength}] todos remaining`}</p>
                )}
            </div>
        </section>
    )
}