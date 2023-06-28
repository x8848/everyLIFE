import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import Content from '../../components/Content'
import TaskIcon from '../../components/TaskIcon'
import { TasksContext, getUrlSearchParam, setUrlSearchParam } from '../../utils'
import { FILTER_URL_PARAM } from '../../utils/constants'
import { Path, TaskType } from '../../utils/enums'
import { Task } from '../../utils/types'

const Tasks = () => {
  const navigate = useNavigate()
  const { tasks } = useContext(TasksContext)

  const [input, setInput] = useState('')
  const [taskType, setTypeSelected] = useState<TaskType>()
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)

  useEffect(() => {
    const filter = getUrlSearchParam(FILTER_URL_PARAM)
    if (filter) {
      setInput(filter)
      setFilteredTasks(getFilteredTasks(filter))
    }
  }, [])

  const getFilteredTasks = (value: string) =>
    tasks.filter(({ name, description }) => name.includes(value) || description.includes(value))

  const searchTasks = () => {
    if (input) {
      setTypeSelected(undefined)
      setUrlSearchParam(FILTER_URL_PARAM, input)
      setFilteredTasks(getFilteredTasks(input))
    }
  }

  const filterOnEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') searchTasks()
  }

  const types = Object.values(TaskType)

  const filterTasks = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as TaskType
    setInput('')
    setUrlSearchParam(FILTER_URL_PARAM, '')
    setTypeSelected(type)
    setFilteredTasks(tasks.filter(task => task.type === type))
  }

  const resetFilters = () => {
    setInput('')
    setTypeSelected(undefined)
    setUrlSearchParam(FILTER_URL_PARAM, '')
    setFilteredTasks(tasks)
  }

  return (
    <Content className='tasks'>
      <h1>ALL TASKS</h1>
      <div className='search'>
        <h4>Search For: </h4>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={filterOnEnter} />
        <button onClick={searchTasks}>Search</button>
        <button onClick={resetFilters}>Reset All Filters</button>
      </div>
      <div className='type-radios'>
        <h4>Filter by Type:</h4>
        {types.map(type => (
          <div key={type} className='type-radio'>
            <input type='radio' id={type} value={type} name='type' onChange={filterTasks} checked={type === taskType} />
            <TaskIcon type={type} />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
      {input && tasks.length !== filteredTasks.length && <div>Found: {filteredTasks.length}</div>}
      <div className='tasks'>
        {filteredTasks.map(({ id, type, name, description }) => (
          <div className='task' key={id}>
            <div>ID: {id}</div>
            <div>
              Type: <TaskIcon type={type} /> {type}
            </div>
            <div>{name}</div>
            <div>{description}</div>
            <button onClick={() => navigate(generatePath(Path.Task, { id: id.toString() }))}>Task Details</button>
          </div>
        ))}
      </div>
    </Content>
  )
}

export default Tasks
