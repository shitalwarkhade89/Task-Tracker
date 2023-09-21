import react, { useState } from 'react'
import Task from "./../../components/Task/Task"
import "./Home.css"

const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'Submit Assingment',
            description: 'Nahi to gali padegi',
            priority: 'heigh'
        },
      
    ])
    const [title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [priority,setpriority] = useState('');
    const AddTaskToList =() => {
        const randomId = Math.floor(Math.random
            ()*1000);
        const obj = {
            id: randomId,
            title:title,
            description:description,
            priority:priority,
        }
        setTaskList([...taskList,obj])
        setTitle('');
        setpriority('');
        setDescription('');
    }

    return (
        <div className='container'>
            <h1 className='app-title'>Task Tracker 📓</h1>
            <div className='todo-flex-cont'>
                <div>
                    <h2 className='text-center'> Show List</h2>
                    {
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;

                            return <Task id={id} title={title} description={description} priority={priority} />
                        })
                    }



                </div>
                <div>
                    <h2 className='text-center'>Add List</h2>
                    <div className='add-task-form-container'>
                        {/* <h3>Show me title:{title} </h3> */}
                        <form>
                        
                            <input type='text' value={title} onChange={(e)=>{
                              setTitle(e.target.value) 
                            }}
                            placeholder='enter Title'
                            className='task-input'
                        

                            />
                         
                            <input type='text' value={description} onChange={(e)=>{
                              setDescription(e.target.value) 
                            }}
                            placeholder='Enter Description'
                            className='task-input'
                            
                            />
                       
                            <input type='text' value={priority} onChange={(e)=>{
                              setpriority(e.target.value) 
                            }}
                            placeholder='Enter priority'
                            className='task-input'
                            />
                           <button className='btn-add-task' type='button' onClick={AddTaskToList}>Add Task To List</button> 
                        </form>
                        

                    </div>

                </div>
            </div>
        </div>

    )
}
export default Home