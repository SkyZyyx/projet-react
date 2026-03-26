import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react";

type Priority = "basse" | "moyenne" | "urgente";

type Todo = {
  id: number,
  text: string,
  priority: Priority
}

function App() {
  function addTodo() {
    if (input.trim() == "") {

      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("moyenne");
    console.log(newTodos);
  }
  const savedTodos = localStorage.getItem("todos");

  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];

  const [input, setInput] = useState<string>("");

  const [priority, setPriority] = useState<Priority>("moyenne");

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [filter, setFilter] = useState<Priority | "tous">("tous");

  const lowCount = todos.filter(todo => todo.priority === "basse").length
  const urgentCount = todos.filter(todo => todo.priority === "urgente").length
  const mediumCount = todos.filter(todo => todo.priority === "moyenne").length

  const totalCount = todos.length

  const [selectedTodo, setSelectedTodo] = useState<Set<number>>(new Set());

  function toggleSelectTodo(id: number) {
    const newSelectedTodo = new Set(selectedTodo);
    if (newSelectedTodo.has(id))
      newSelectedTodo.delete(id);
    else
      newSelectedTodo.add(id);
    setSelectedTodo(newSelectedTodo);
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos);
  }

  function finishSelectedTodos() {
    const newTodos = todos.filter((todo) => {
      if (selectedTodo.has(todo.id)) {
        return false;
      }else
      return true;
    })
    setTodos(newTodos);
    setSelectedTodo(new Set());
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])

  let filteredTodos: Todo[] = [];

  if (filter === "tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter(todo => todo.priority === filter);
  }


  return (
    <div className='flex justify-center'>
      <div className='w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl '>
        <div className="flex gap-4 ">
          <input type="text" className="input w-full" placeholder="Ajouter une tache ..." value={input}
            onChange={(e) => setInput(e.target.value)} />
          <select className="select w-full" value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="urgente">Urgente</option>
          </select>
          <button className="btn btn-primary" onClick={addTodo}>Ajouter</button>

        </div>
        <div className="space-y-2 flex-1 h-fit ">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">
            <button className={`btn btn-soft ${filter === "tous" ? "btn btn-primary" : ""}`}
              onClick={() => setFilter("tous")}>Tous ({totalCount})</button>
            <button className={`btn btn-soft ${filter === "basse" ? "btn btn-warning" : ""}`}
              onClick={() => setFilter("basse")}>Basse ({lowCount})</button>
            <button className={`btn btn-soft ${filter === "moyenne" ? "btn btn-success" : ""}`}
              onClick={() => setFilter("moyenne")}>Moyenne ({mediumCount})</button>
            <button className={`btn btn-soft ${filter === "urgente" ? "btn btn-error" : ""}`}
              onClick={() => setFilter("urgente")}>Urgente ({urgentCount})</button>
              
          
          </div>
          <div className="flex justify-between">
            <button className="btn btn-primary "  onClick={finishSelectedTodos} disabled={selectedTodo.size === 0}>Finir la selection ({selectedTodo.size})</button>
          </div>
          </div>
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/50">{filteredTodos.map((todo) => (
              <li key={todo.id}>
                <TodoItem todo={todo} isSelected={selectedTodo.has(todo.id)} onDelete={() => deleteTodo(todo.id)} onToggleSelect={toggleSelectTodo}/>
              </li>
            ))}</ul>
          ) : (
            <div className="flex justify-center items-center flex-col gap-4">
              <div>
            <Construction strokeWidth={1} className="w-40 h-40 text-primary" />
            </div>
             <p className="text-sm">Aucune tâche trouvée pour ce filtre</p>

            </div>
          )}
        </div>
      </div>

    </div>

  )
}

export default App
