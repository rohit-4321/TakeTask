import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../modal'

import {AiFillEdit , AiFillDelete} from 'react-icons/ai';
import {MdDone} from 'react-icons/md';

type Props ={
  todo : Todo;
  todos : Todo[];
  setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
}




function SingleTodo({todo  , todos , setTodos} : Props) {

  const [edit , setEdit]  = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  
  




  const handleDelete =(id : number) =>{
    setTodos(todos.filter((todo)=> todo.id !== id))
  }
  const handleDone = (id : number)=>{
    console.log("Hello")
    setTodos(
      todos.map(
        (t)=> t.id === id ?{...t , isDone : !t.isDone}:t
      )
    )
  }
  const handleSubmit = (e : React.FormEvent , id : number) =>{
    e.preventDefault()
    todos.map(function(todo){
      if(todo.id  === id){
        todo.todo = editTodo
        setEdit(false)
      }
      return todo
    })
  }

  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() =>{

    inputRef.current?.focus()
  } , [edit])



  console.log(todo.isDone);
  return (
    <form className='todos_single' onSubmit={(e) =>{handleSubmit(e , todo.id)}}>
      {
        edit ? (
          <input ref ={inputRef} type="text" className="todos_single--text" 
          value={editTodo} 
          onChange={(e) => setEditTodo(e.target.value)} />
        ) : (
          todo.isDone ? (
            
            <s className="todos_single--text">
          {todo.todo}
          </s>
          ) : (
            <span className="todos_single--text">
            {todo.todo}
            </span>
          )

        )
          
        }
      
      <div>
        <span className="icon" onClick={() =>{
          if(!edit && !todo.isDone){
            setEdit(!edit)
          }
        }}>
          <AiFillEdit/>
        </span>
        <span className="icon" onClick={()=>{handleDelete(todo.id)}}>
        <AiFillDelete/>
        </span>
        
        <span className="icon" onClick={()=>{handleDone(todo.id)}}>
          <MdDone/>
        </span>

         
        
      </div>

    </form>
  )
}

export default SingleTodo