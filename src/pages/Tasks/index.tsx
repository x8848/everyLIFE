import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import Content from '../../components/Content'
import TaskIcon from '../../components/TaskIcon'
import { TasksContext, getUrlSearchParam, setUrlSearchParam } from '../../utils'
import { SEARCH_URL_PARAM } from '../../utils/constants'
import { TaskType } from '../../utils/enums'
import { Task } from '../../utils/types'
import TaskItem from './TaskItem'

const Tasks = () => {
  const { tasks } = useContext(TasksContext)

  const [searchInput, setSearchInput] = useState('')
  const [typeSelected, setTypeSelected] = useState<TaskType>()
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)

  useEffect(() => {
    const input = getUrlSearchParam(SEARCH_URL_PARAM)
    if (input) {
      setSearchInput(input)
      setFilteredTasks(searchTasks(input))
    }
  }, [])

  const searchTasks = (input: string) => {
    const lowerCase = input.toLocaleLowerCase().trim()
    return tasks.filter(
      ({ name, description }) =>
        name.toLocaleLowerCase().includes(lowerCase) || description.toLocaleLowerCase().includes(lowerCase)
    )
  }

  const search = () => {
    if (searchInput) {
      if (typeSelected) setTypeSelected(undefined)
      setUrlSearchParam(SEARCH_URL_PARAM, searchInput)
      setFilteredTasks(searchTasks(searchInput))
    }
  }

  const searchOnEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') search()
  }

  const types = Object.values(TaskType)

  const filterTasks = (type: TaskType) => {
    setSearchInput('')
    setUrlSearchParam(SEARCH_URL_PARAM, '')
    setTypeSelected(type)
    setFilteredTasks(tasks.filter(task => task.type === type))
  }

  const resetFilters = () => {
    setSearchInput('')
    setTypeSelected(undefined)
    setUrlSearchParam(SEARCH_URL_PARAM, '')
    setFilteredTasks(tasks)
  }

  return (
    <Content className='tasks'>
      <h1>ALL TASKS</h1>
      <div className='search'>
        <h4>Search For: </h4>
        <input value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={searchOnEnter} />
        <button onClick={search}>Search</button>
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
      <div className='tasks'>
        {filteredTasks.length === 0 && <div>Nothing found</div>}
        {filteredTasks.map(task => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>
    </Content>
  )
}

export default Tasks
