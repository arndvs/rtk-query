import Modal from "./Modal"
import {useState} from 'react'

// RTK Query hook import
import { useUpdateTaskMutation } from "./services/api-services"; // import RTK Query hook to update a task on the server

function EditTask({open, onClose, toEditTitle, toEditDescription, id}) {

  const [title, setTitle] = useState(toEditTitle)
  const [description, setDescription] = useState(toEditDescription)

  // RTK Query hook
  const [updateTask] = useUpdateTaskMutation(); // call the useUpdateTaskMutation hook to update a task on the server

  // call the updateTask trigger function and pass it the task we want to update as a parameter when the updateTask form is submitted
  const handleUpdateTask = (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      completed: false,
      id
    };
    updateTask(task);
    onClose();
  };

  return (
    <Modal modalLabel='Edit Task' onClose={onClose} open={open}>
      <form className='editTask' name='updateTask'
      // call the handleUpdateTask function when the updateTask form is submitted
      onSubmit={handleUpdateTask}>
        <input
          type='text'
          name='title'
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <button type='submit'>Edit</button>
      </form>
    </Modal>
  )
}

export default EditTask
