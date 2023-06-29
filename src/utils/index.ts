import { createContext } from 'react'
import { TaskContentProps } from './types'

// eslint-disable-next-line
export const emptyFunction = () => {}

export const TasksContext = createContext<TaskContentProps>({
  tasks: [],
  setTasks: emptyFunction
})
