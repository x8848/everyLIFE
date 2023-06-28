import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import Content from '../../components/Content'
import TaskIcon from '../../components/TaskIcon'
import { TasksContext, getUrlSearchParam, setUrlSearchParam } from '../../utils'
import { FILTER_URL_PARAM } from '../../utils/constants'
import { TaskType } from '../../utils/enums'
import { Task } from '../../utils/types'
import TaskItem from './TaskItem'

const Tasks = () => {
  const { tasks } = useContext(TasksContext)

  const [input, setInput] = useState('')
  const [typeSelected, setTypeSelected] = useState<TaskType>()
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)

  useEffect(() => {
    const filter = getUrlSearchParam(FILTER_URL_PARAM)
    if (filter) {
      setInput(filter)
      setFilteredTasks(getFilteredTasks(filter))
    }
  }, [])

  const getFilteredTasks = (value: string) => {
    const lowerCase = value.toLocaleLowerCase()
    return tasks.filter(
      ({ name, description }) =>
        name.toLocaleLowerCase().includes(lowerCase) || description.toLocaleLowerCase().includes(lowerCase)
    )
  }

  const searchTasks = () => {
    if (input) {
      setTypeSelected(undefined)
      setUrlSearchParam(FILTER_URL_PARAM, input)
      setFilteredTasks(getFilteredTasks(input))
    }
  }

  const searchOnEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') searchTasks()
  }

  const types = Object.values(TaskType)

  const filterTasks = (type: TaskType) => {
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
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={searchOnEnter} />
        <button onClick={searchTasks}>Search</button>
        <button onClick={resetFilters}>Reset All Filters</button>
      </div>
      <div className='filter'>
        <h4>Filter by Type:</h4>
        {types.map(type => (
          <div key={type} className='type' onClick={() => filterTasks(type)}>
            <input type='radio' id={type} value={type} name='type' checked={type === typeSelected} readOnly />
            <TaskIcon type={type} />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
      {filteredTasks.length === 0 && (
        <div>
          <i>Nothing found</i>
        </div>
      )}
      <div className='tasks'>
        {filteredTasks.map(task => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>
    </Content>
  )
}

export default Tasks
