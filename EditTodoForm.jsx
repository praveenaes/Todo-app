import { useState } from "react";
import { notifyError, notifySuccess } from "../utils/notify";

export const EditTodoForm = ({ editTodo, task, todos }) => {
  const [value, setValue] = useState(task.task);
  const [editDeadline, setEditDeadline] = useState(task.deadline || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      notifyError("Task cannot be empty or just spaces!");
      return;
    }

  
    const isDuplicate = todos.some(
      (todo) =>
        todo.id !== task.id &&
        todo.task.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (isDuplicate) {
      notifyError("This task already exists!");
      return;
    }

 
    const validPattern = /^[a-zA-Z0-9\s]+$/;
    if (!validPattern.test(trimmedValue)) {
      notifyError("Task can only contain letters and numbers!");
      return;
    }

    if (/^\d+$/.test(trimmedValue)) {
      notifyError("Task cannot contain only numbers!");
      return;
    }

   
    editTodo(trimmedValue, editDeadline, task.id);
    notifySuccess("Task updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        className="todo-input"
        onChange={(e) => setValue(e.target.value)}
      />{" "}
      <br />
      <input
        type="datetime-local"
        className="todo-input"
        value={editDeadline}
        onChange={(e) => setEditDeadline(e.target.value)}
      />
      <button className="todo-input-btn" type="submit">
        Update
      </button>
    </form>
  );
};
