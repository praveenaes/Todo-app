import { useState,useRef,useEffect } from "react";
import { notifyError } from "../utils/notify";

export const TodoForm = ({ addTodo, todos }) => {
  const [value, setValue] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();


    if (!trimmedValue) {
      notifyError("Task cannot be empty or just spaces!");
      return;
    }


    const validPattern = /^[a-zA-Z0-9\s]+$/;
    if (!validPattern.test(trimmedValue)) {
      notifyError("Task can only contain letters and numbers (no special characters)!");
      return;
    }

  
    if (/^\d+$/.test(trimmedValue)) {
      notifyError("Task cannot contain only numbers!");
      return;
    }

   
    const isDuplicate = todos.some(
      (todo) => todo.task.toLowerCase() === trimmedValue.toLowerCase()
    );
    if (isDuplicate) {
      notifyError("This task already exists!");
      return;
    }


    if (!deadline) {
      notifyError("Please select a date/time!");
      return;
    }


    addTodo(trimmedValue, deadline);
    setValue("");
    setDeadline("");
  };

const inputRef = useRef(null);   // ✅ new line
useEffect(() => {
  inputRef.current.focus();      // ✅ new line
}, []);

const getMinDateTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};


  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={inputRef}    
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        min={getMinDateTime()}   // ✅ disables past date and time

      />
      <button type="submit">Add Task</button>
    </form>
  );
};
