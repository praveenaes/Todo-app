import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ todo, completeTodo, deleteTodo, setEditingId }) => {
  const formattedDate = todo.deadline ? new Date(todo.deadline).toLocaleString() : "";

  return (
    <div className={`task-item ${todo.completed ? "completed" : ""}`}>
      <div className="task-content">
        <p className="task-text" style={{color: !todo.completed && todo.deadline && new Date(todo.deadline) < new Date() ? "red" : "#fff"}}>
          {todo.task}
        </p>
        {formattedDate && <p className="task-date">{formattedDate}</p>}
      </div>

      <div className="task-actions">
        {!todo.completed && (
          <>
            <button className="complete-btn" onClick={() => completeTodo(todo.id)}>
              <FontAwesomeIcon icon={faSquareCheck} />
            </button>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="edit-btn" onClick={() => setEditingId(todo.id)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
