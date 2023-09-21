import react from 'react'
import "./Task.css"
const Task= ({id, title,description ,priority}) => {
 return (
    <div className='task-continer'>
        <h1 className='task-title'>{title}</h1>
        <p className='task-descriptin'>{description}</p>
       <span className='task-priority'> 🎯{priority}</span> 
    </div>
 )   

}
export default Task