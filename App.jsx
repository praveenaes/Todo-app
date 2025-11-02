
import './App.css'
import { Toaster } from "sonner";
import TodoWrapper from './components/TodoWrapper'


function App() {

  return (
    <div className='App'> 
      <h1>todo app</h1>
      
      <TodoWrapper/>
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default App
