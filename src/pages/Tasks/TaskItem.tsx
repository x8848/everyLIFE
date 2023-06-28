import { FC } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import TaskIcon from '../../components/TaskIcon'
import { Path } from '../../utils/enums'
import { TaskProps } from '../../utils/types'

const TaskItem: FC<TaskProps> = ({ task }) => {
  const navigate = useNavigate()

  const { id, type, name, description } = task

  const url = generatePath(Path.TaskEdit, { id: id.toString() })

  return (
    <div className='task-item' key={id}>
      <h3>{name}</h3>
      <div className='type'>
        Type: <TaskIcon type={type} /> {type}
      </div>
      <div className='description'>{description}</div>
      <button onClick={() => navigate(url)}>Edit</button>
    </div>
  )
}

export default TaskItem
