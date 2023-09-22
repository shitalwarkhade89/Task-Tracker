import { useEffect, useState } from 'react'
import Task from "./../../components/Task/Task"
import "./Home.css"

const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: 'Submit Assingment',
            description: 'Nahi to gali padegi',
            priority: 'high'
        },
    ])
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setpriority] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('pinklist'));
        if (list && list.length > 0)
            setTaskList(list)
    }, []);

    const saveListToLocalStorage = (tasks) => {
        localStorage.setItem('pinklist', JSON.stringify(tasks))
    }
    const AddTaskToList = () => {
        const randomId = Math.floor(Math.random
            () * 1000);
        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority,
        }

        const newTaskList = [...taskList, obj]


        setTaskList(newTaskList)
        setTitle('');
        setpriority('');
        setDescription('');
        saveListToLocalStorage(newTaskList);
    }
    const removeTaskFromList = (id) => {
        let index;
        taskList.forEach((task, i) => {
            if (task.id === id) {
                index = i
            }
        })

        const tempArry = taskList;
        tempArry.splice(index, 1);

        setTaskList([...tempArry])

        saveListToLocalStorage(tempArry)
    }
    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);
        let currentEditTask;
        taskList.forEach((task) => {
            if (task.id === id) {
                currentEditTask = task;
            }
        })
        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setpriority(currentEditTask.priority);
    }
    const UpdateTask = () => {
        let indexToUpdate;

        taskList.forEach((task, i) => {
            if (task.id === id) {
                indexToUpdate = 1;

            }
        })
        const tempArry = taskList;
        tempArry[indexToUpdate] = {
            id: id,
                title: title,
                    description: description,
                        priority: priority
        }
        setTaskList([...tempArry])

        saveListToLocalStorage(tempArry)

        setId(0);
        setTitle('');
        setDescription('');
        setpriority('');
        setIsEdit(false);
    }


    return (
        <div className='container'>
            <h1 className='app-title'> 📓Task Tracker 🎯</h1>
            <div className='todo-flex-cont'>
                <div>
                    <h2 className='text-center'> Show List</h2>
                    {
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;

                            return <Task id={id} title={title} description={description} priority={priority}
                                key={index}
                                removeTaskFromList={removeTaskFromList}
                                setTaskEditable={setTaskEditable}
                            />
                        })
                    }
                </div>
                <div>
                    <h2 className='text-center'>
                        {isEdit ? `Update Task ${id}` : 'Add Task'}
                    </h2>
                    <div className='add-task-form-container'>
                        <form>
                            <input type='text' value={title} onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                                placeholder='enter Title'
                                className='task-input'
                            />

                            <input type='text' value={description} onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                                placeholder='Enter Description'
                                className='task-input'

                            />

                            <input type='text' value={priority} onChange={(e) => {
                                setpriority(e.target.value)
                            }}
                                placeholder='Enter priority'
                                className='task-input'
                            />
                            <div className='d-flex-btn'>
                                {
                                    isEdit ?
                                        <button className='btn-add-task' type='button' onClick={UpdateTask}> Update
                                        </button>
                                        :
                                        <button className='btn-add-task' type='button' onClick={AddTaskToList}>Add </button>
                                }
                            </div>
                        </form>


                    </div>

                </div>
            </div>
        </div>

    );
}

export default Home
