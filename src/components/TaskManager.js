import Task from './Task'
import AddTask from './AddTask'
import {useState} from 'react'

// RTK Query hook imports
import { useTasksQuery } from "./services/api-services"; // import RTK Query hook to fetch tasks from the server

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)

  // RTK Query hooks
  const { data, error, isLoading, isSuccess } = useTasksQuery(); // use the useTasksQuery hook to fetch tasks from the server
   // In the above code, we are destructing {data, error, isLoading, isSuccess} from the object returned from the useTasksQuery hooks.
   // Frequently Used Query Hook Return Values: https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values

    // Frequently Used Query Hook Return Values:
    // data - The latest returned result regardless of hook arg, if present.
    // currentData - The latest returned result for the current hook arg, if present.
    // error - The error result if present.
    // isUninitialized - When true, indicates that the query has not started yet.
    // isLoading - When true, indicates that the query is currently loading for the first time, and has no data yet. This will be true for the first request fired off, but not for subsequent requests.
    // isFetching - When true, indicates that the query is currently fetching, but might have data from an earlier request. This will be true for both the first request fired off, as well as subsequent requests.
    // isSuccess - When true, indicates that the query has data from a successful request.
    // isError - When true, indicates that the query is in an error state.
    // refetch - A function to force refetch the query

  return (
    <div className='taskManager'>
      <header>Task Manager</header>
      <div className='taskManager__container'>
        <button
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>

        {/*  Use the values from the query hook to display error, loading message, or the task data based on whether the values are true or false. */}
        <div className='taskManager__tasks'>
            <div className='isErrorIsLoading'>
                {error && <p>An error occured</p>}
                {isLoading && <p>Loading...</p>}
            </div>
                {isSuccess && (
                <>
                    {/* RTK Query data */}
                    {data.map((task) => (
                    <Task
                        id={task.id}
                        key={task.id}
                        completed={task.completed}
                        title={task.title}
                        description={task.description}
                    />
                    ))}
                </>
                )}
        </div>
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager
