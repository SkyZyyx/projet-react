import { useEffect, useState } from "react";

type Priority = "basse" | "moyenne" | "urgente";

type Todo = {
  id : number, 
  text : string,
  priority : Priority
}

function App() {
  function AddTodo(){
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
const [todos , setTodos] = useState<Todo[]>([initialTodos]);
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
  
}, [todos])

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
          <button className="btn btn-primary" onClick={AddTodo}>Ajouter</button>
        </div>
      </div>
      
    </div>
    
  )
}

export default App
