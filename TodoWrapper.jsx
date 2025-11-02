import { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import {v4 as uuidv4} from "uuid";
import { notifyError, notifySuccess } from "../utils/notify"; 
import Swal from "sweetalert2";


const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const addTodo = (taskText, deadline) => {
    setTodos([...todos, {
      id: uuidv4(),
      task: taskText,
      completed: false,
      deadline: deadline,
      overdue: false,
      notified: false
    }]);
    notifySuccess('Task added successfully')
  };



  useEffect(() => {
    const interval = setInterval(() => {
      setTodos(currentTodos =>
        currentTodos.map(todo => {
          if (todo.deadline && !todo.completed && !todo.notified) {
            const now = new Date();
            const deadlineTime = new Date(todo.deadline);
            if (now > deadlineTime) {
              notifyError(`Task overdue: ${todo.task}`);
              return {...todo, overdue: true, notified: true};
            }
          }
          return todo;
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const completeTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};


  const editTask = (task, deadline, id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, task, deadline, overdue: false, notified: false} : todo
    ));
    notifySuccess("Updated Successfully")
    setEditingId(null);
  };

  const deleteTodo = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to delete this task?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
    
      setEditingId((prev) => (prev === id ? null : prev));

  
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

      Swal.fire(
        'Deleted!',
        'Your task has been deleted.',
        'success'
      );
    }
  });
};


return (
  <div className="App">
    <TodoForm addTodo={addTodo} todos={todos} />
    <div className="task-list">
      {todos.length === 0 && <p style={{color:"black"}} className="empty-text">No tasks yet!</p>}
      {todos.map((todo) =>
        editingId === todo.id ? (
          <EditTodoForm
            editTodo={editTask}
            task={todo}
            todos={todos}  
            key={todo.id}
          />
        ) : (
          <Todo
            todo={todo}
            key={todo.id}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            setEditingId={setEditingId}
          />
        )
      )}
    </div>
  </div>
);

};

export default TodoWrapper;
