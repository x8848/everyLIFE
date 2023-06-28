import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskEdit from './pages/TaskEdit'
import Tasks from './pages/Tasks'
import { TasksContext } from './utils'
import { API_TASKS_URL } from './utils/constants'
import { Path } from './utils/enums'
import { Task } from './utils/types'

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const { isPending, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch(API_TASKS_URL)
      if (response.statusText === 'OK') {
        const data = await response.json()
        setTasks(data)
        return data
      }
    }
  })

  if (isPending) return <div>Loading...</div>

  if (isError) return <div>Error: {error.message}</div>

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <BrowserRouter>
        <Routes>
          <Route path={Path.Root} element={<Tasks />} />
          <Route path={Path.TaskEdit} element={<TaskEdit />} />
        </Routes>
      </BrowserRouter>
    </TasksContext.Provider>
  )
}

export default App
