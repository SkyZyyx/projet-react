import { Trash } from "lucide-react";

type Priority = "basse" | "moyenne" | "urgente";

type Todo = {
  id : number, 
  text : string,
  priority : Priority
}
type Props = {
  todo : Todo
  onDelete() : void
  isSelected? : boolean
  onToggleSelect:(id: number) => void
}

const TodoItem = ({todo, onDelete, isSelected, onToggleSelect} : Props )=> {
  return (
    <li className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={isSelected} onChange={() => onToggleSelect(todo.id)} />
          <span className="text-md font-bold">
            <span >
              {todo.text}
            </span>
            <span className={`badge badge-sm badge-soft m-2.5 ${todo.priority === "basse" ? "badge-warning" : todo.priority === "moyenne" ? "badge-success" : "badge-error"}`}>
              {todo.priority}
            </span>
          </span>

        </div>
        <button className="btn btn-soft btn-error">
          <Trash className="w-4 h-4" onClick={() => onDelete()}/>
        </button>
      </div>
      </li>
  )
}

export default TodoItem