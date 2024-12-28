import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';
import { RiEdit2Line } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  


  useEffect(() => {
    let todoString = window.localStorage.getItem("todos")
    // console.log(todoString)
    // console.log("i am useEffect one")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos))
    // console.log(todos)
    // console.log("going to store todos in local storage")
    // console.log('todos:', todos)
  }, [todos]);


  const handleChange = (e) => {
    // console.log(e)
    setTodo(e.target.value)
  }

  const handleSubmit = () => {
    setTodos([...todos, {id : uuidv4(), todo, isCompleted:false}])
    setTodo('')
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  const handleEdit = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id
      
    })
    setTodo(todos[index].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
      
    })
    setTodos(newTodos)
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  return (

    <>
    <Navbar/>
      <div className='container bg-blue-300 mx-auto my-3 rounded-lg py-3'>
        <h1 className='font-bold text-center mx-4'>Add a Task and Start Hustling</h1>
        <div className='my-2'>
          <h2 className='text-center text-lg'>Add tasks</h2>
        </div>
        <div className='my-3   flex justify-around'>
          <label htmlFor="task"></label>
          <input type="text" value={todo}  id='task' onChange={handleChange} className=' rounded-lg border border-blue-300 w-[87%] justify-center px-3 placeholder-slate-500 outline-none focus:border focus:border-gray-400' placeholder='Add your Todo'/>
          <button disabled={todo.length <= 3} className='rounded-lg background mx-2 bg-slate-300 py-1 px-3 cursor-pointer hover:font-bold w-[78px]' onClick={handleSubmit}>Save</button>
        </div>
        <hr />
        <h2 className='text-center font-bold py-2'>Tasks</h2>
        <div className='mx-5 flex gap-1'>
          <input type="checkbox"  id='show' onChange={toggleFinished} checked={showFinished} />
          <label htmlFor="show">Show Finished</label>
        </div>
        <div className='todos-list  my-3 h-[30rem] mx-5'>
          {
            todos.length === 0 && 
            <div className='text-center font-bold text-lg'>
              No todos to display
            </div>
          }
          {
            todos.map((item) => {
              return (
                (showFinished || !item.isCompleted)
                &&
                <div key = {item.id}>
                <div  className='flex gap-5 border border-blue-200 bg-purple-300 rounded-lg py-1 px-3 my-1 justify-between mx-auto w-2/3'>

                  <div className='flex gap-3'>
                  <input type="checkbox" checked = {item.isCompleted} name={item.id} onChange={handleCheckbox} id='' className='cursor-pointer'/>
                  <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                  </div>
                  <div className='flex gap-3'>
                    <button className='cursor-pointer' onClick={(e) => handleEdit(e, item.id)}><RiEdit2Line /></button>
                    <button className='cursor-pointer' onClick={() => handleDelete(item.id)}><AiTwotoneDelete/></button>
                  </div>
                </div>
                </div>
                
              )
            })
          }
        </div>
      </div>

    </>
  )
}

export default App
