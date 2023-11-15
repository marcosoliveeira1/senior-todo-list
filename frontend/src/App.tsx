import './App.css'
import { TodoView } from './components/todo-view'
import { TodoType } from './types'

function App() {
  const todos: TodoType[] = [
    {
      description: "Estudar Typescript",
      done: false
    },
    {
      description: "Lavar carro",
      done: false
    },
    {
      description: "Ler livro",
      done: true
    }
  ]

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">

      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium">Lista de tarefas</h1>
        </div>
      </div>
      <form className="w-full mx-auto py-2">
        <div className="flex items-center border-b-2 border-sky-600 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text" placeholder="Adicionar item" />
          <button
            className="flex-shrink-0 bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button">
            Adicionar
          </button>
        </div>
      </form >
      <TodoView todos={todos} />

    </div >
  )
}

export default App
