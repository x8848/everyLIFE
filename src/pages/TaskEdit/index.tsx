import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Content from '../../components/Content'
import TaskIcon from '../../components/TaskIcon'
import { TasksContext } from '../../utils'
import { Path } from '../../utils/enums'

const TaskEdit = () => {
  const navigate = useNavigate()
  const { tasks, setTasks } = useContext(TasksContext)

  const id = Number(useParams().id)

  const [task, setTask] = useState(tasks.find(task => id === task.id))

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
    <Content className='task-edit'>
      <h1>EDIT TASK</h1>
      <div className='task'>
        <h3>Name:</h3>
        <textarea value={task.name} onChange={e => setTask({ ...task, name: e.target.value })}></textarea>
        <div className='type'>
          <h4>Type:</h4> <TaskIcon type={task.type} /> {task.type}
        </div>
        <h3>Description:</h3>
        <textarea
          value={task.description}
          onChange={e => setTask({ ...task, description: e.target.value })}
          rows={6}
        ></textarea>
        <button onClick={saveTask}>Save</button>
        <button onClick={deleteTask} className='delete'>
          Delete
        </button>
      </div>
    </Content>
  )
}

export default TaskEdit
