import { ReactNode } from 'react'
import { TaskType } from './enums'

export interface ContentProps {
  children: ReactNode
  className?: string
}

export interface TaskContentProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export interface Task {
  id: number
  name: string
  description: string
  type: TaskType
}

export interface TaskProps {
  task: Task
}
