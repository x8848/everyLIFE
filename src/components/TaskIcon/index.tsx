import { TaskType } from '../../utils/enums'

const TaskIcon = ({ type = TaskType.general }) => {
  return <img src={`/icons/${type}.png`} alt={type} />
}

export default TaskIcon
