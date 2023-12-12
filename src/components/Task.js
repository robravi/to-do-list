import { useState } from "react";

const Task = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditTask, setIsEditTask] = useState(false);
  const [editedTask, setEditedTask] = useState(task.text);

  const saveEditTask = () => {
    onEdit(task.id, editedTask);
    setIsEditTask(false);
  };

  const handleEdit = () => {
    setIsEditTask(true);
  };

  const cancelEdit = () => {
    setEditedTask(task.text);
    setIsEditTask(false);
  };

  return (
    <div className=" text-black text-black  p-2 mb-4  border-current shadow-2xl  capitalize   rounded-md       ">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="m-2"
      />
      {isEditTask ? (
        <>
          <input
            type="text"
            value={editedTask || ""}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button
            className="ml-2 ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-2xl"
            onClick={saveEditTask}
          >
            Save
          </button>
          <button
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-2xl"
            onClick={cancelEdit}
          >
            cancel
          </button>
        </>
      ) : (
        <>
          <span className={`text-lg ${task.completed ? "line-through" : ""}`}>
            {task.title}
          </span>
          <button
            onClick={handleEdit}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-2xl mb-2"
          >
            Edit
          </button>
          <button
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-2xl"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
          <p className="text-sm text-gray-500">{task.dateTime}</p>
        </>
      )}
    </div>
  );
};

export default Task;
