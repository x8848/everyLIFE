import { createContext } from 'react'
import { TaskContentProps } from './types'

// eslint-disable-next-line
export const emptyFunction = () => {}

export const TasksContext = createContext<TaskContentProps>({
  tasks: [],
  setTasks: emptyFunction
})

export const setUrlSearchParam = (param: string, value: string) => {
  const url = new URL(window.location.href)
  if (value) {
    url.searchParams.set(param, value)
  } else {
    url.searchParams.delete(param)
  }
  window.history.replaceState({}, window.document.title, url)
}

export const getUrlSearchParam = (param: string) => {
  return new URLSearchParams(window.location.search).get(param)
}
