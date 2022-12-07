import Modal from "./Modal"
import {useState} from 'react'

// RTK Query hook import
import { useAddTaskMutation } from "./services/api-services"; // import RTK Query hook to add a task to the server

function AddTask({onClose, open}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // RTK Query hooks
  const [addTask, result] = useAddTaskMutation(); // call the useAddTaskMutation hook to add a task to the server

    // mutation hooks return a tuple.
    // The first item in the tuple is the “trigger” function, which we will use to fire off the mutation request for that endpoint
    // The second item in the tuple is the result object with status, error, and data. It contains the status of the mutation request, as well as the data returned from the server.

  // Calling the addTask trigger function and pass it the task we want to add as a parameter when the addTask form is submitted
  const handleAddTask = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      completed: false,
      id: Math.random()
    };
    await addTask(task);
    onClose();
  };

  return (
    <Modal modalLabel='Add Task' onClose={onClose} open={open}>
      {/* call the handleAddTask function when the addTask form is submitted */}
      <form className='addTask' name='addTask' onSubmit={handleAddTask}>
        <input
          type='text'
          name='title'
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder='Enter title'/>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form>
    </Modal>
  )
}

export default AddTask
