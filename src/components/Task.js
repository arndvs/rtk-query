import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'

  // RTK Query hook imports
import {useDeleteTaskMutation} from './services/api-services' // import RTK Query hook to delete a task from the server
import {useUpdateTaskMutation} from './services/api-services' // import RTK Query hook to update a task on the server

function Task({id, title, description, completed}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  // RTK Query hooks
  const [deleteTask] = useDeleteTaskMutation(); // call the useDeleteTaskMutation hook to delete a task from the server
  const [updateTask] = useUpdateTaskMutation(); // call the useUpdateTaskMutation hook to update a task on the server

  // updating the checkbox state
  const handleUpdateTask = (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      completed: checked,
      id
    };
    updateTask(task);
  };

  // deleting a task
  const handleDeleteTask = (e) => {
    e.preventDefault();
    deleteTask(id);
    handleClose();
  };

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className='checkbox-custom'
          name="checkbox"
          checked={checked}
          // add onchange handleUpdateTask to checkmark task
          onChange={handleUpdateTask}
          type="checkbox" />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          // add onclick handleDeleteTask to delete tasks
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button
              className='task__editButton'
              onClick={() => setOpen({...open, edit: true})}>
              Edit
            </button>

            <button className='task__deleteButton'
            // add onclick handleDeleteTask to delete tasks
            onClick={handleDeleteTask}>Delete</button>
          </div>
          <button
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view} />
      }

      {open.edit &&
        <EditTask
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id} />
      }
    </div>
  )
}

export default Task
