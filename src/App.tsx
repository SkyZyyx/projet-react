import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

type Priority = "basse" | "moyenne" | "urgente";

type Todo = {
  id : number, 
  text : string,
  priority : Priority
}

function App() {
  function addTodo(){
      if(input.trim() == ""){
  
        return;
      }
        const newTodo : Todo = {
          id : Date.now(),
          text : input.trim(),
          priority : priority
        }
        const newTodos = [newTodo , ...todos];
        setTodos(newTodos);
        setInput("");
        setPriority("moyenne");
        console.log(newTodos);
  }
const savedTodos = localStorage.getItem("todos");
const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
const  [input , setInput] = useState<string>("");
const  [priority , setPriority] = useState<Priority>("moyenne");
const [todos , setTodos] = useState<Todo[]>(initialTodos);
const [filter , setFilter] = useState<Priority | "tous">("tous");
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
  
}, [todos])
let filteredTodos : Todo[] = [];
if(filter === "tous"){
  filteredTodos = todos;
}else{
  filteredTodos = todos.filter(todo => todo.priority === filter);
}


  return (
    <div className='flex justify-center'>
      <div className='w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl '>
        <div className="flex gap-4 ">
          <input type="text" className="input w-full" placeholder="Ajouter une tache ..." value={input}
          onChange={(e) => setInput(e.target.value)}/>
          <select className="select w-full" value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="urgente">Urgente</option>
          </select>
          <button className="btn btn-primary" onClick={addTodo}>Ajouter</button>
              
            </div>
          <div className="space-y-2 flex-1 h-fit ">
            <div className="flex flex-wrap gap-4">
              <button className={`btn btn-soft ${filter==="tous" ? "btn btn-primary" : ""}`}
              onClick={() => setFilter("tous")}>Tous</button>
          </div>
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/50">{filteredTodos.map((todo) => (
              
              <TodoItem todo={todo}/>
            ))}</ul>
          ):(
          <div>Aucune tâche trouvée</div>
          )}
        </div>
      </div>
      
    </div>
    
  )
}

export default App
