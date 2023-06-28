import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Content from '../../components/Content'
import TaskIcon from '../../components/TaskIcon'
import { TasksContext } from '../../utils'
import { Path } from '../../utils/enums'
import { Task } from '../../utils/types'

const TaskDetails = () => {
  const navigate = useNavigate()
  const { tasks, setTasks } = useContext(TasksContext)

  const id = Number(useParams().id)

  const [task, setTask] = useState<Task | undefined>(tasks.find(task => id === task.id))

  if (!task) return <div>Not Found</div>

  const saveTask = () => {
    setTasks(tasks.map(original => (original.id === id ? task : original)))
    navigate(Path.Root)
  }

  const deleteTask = () => {
    setTasks(tasks.filter(task => id !== task.id))
    navigate(Path.Root)
  }

  return (
    <Content className='task-details'>
      <h1>TASK DETAILS</h1>
      <div>
        <div>ID: {task.id}</div>
        <div>
          Type: {task.type} <TaskIcon type={task.type} />
        </div>
        <div>Name:</div>
        <textarea value={task.name} onChange={e => setTask({ ...task, name: e.target.value })}></textarea>
        <div>Description:</div>
        <textarea value={task.description} onChange={e => setTask({ ...task, description: e.target.value })}></textarea>
        <div>
          <button onClick={saveTask}>Save</button>
          <button onClick={deleteTask}>Delete</button>
        </div>
      </div>
    </Content>
  )
}

export default TaskDetails
