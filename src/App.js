import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const data = await response.json();
      const formattedTasks = data.map((task) => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
        dateTime: new Date().toLocaleString(),
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          title: task.text,
          completed: false,
          dateTime: new Date().toLocaleString(),
        }),
      });
      const data = await response.json();
      setTasks([
        ...tasks,
        {
          id: data.id,
          title: task.text,
          ...task,
          completed: false,
        },
      ]);
    } catch (error) {
      console.log("error adding task", error);
    }
  };

  const editTask = async (id, newText) => {
    try {
      await fetch(`http://localhost:8000/todos/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: newText,
        }),
      });
      const updatedTask = tasks.map((task) =>
        task.id === id ? { ...task, title: newText } : task
      );
      setTasks(updatedTask);
    } catch (error) {
      console.log("error editing task", error);
    }
  };

  const toggleTask = async (id) => {
    const toggledTask = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(toggledTask);

    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        completed: !tasks.completed,
      }),
    });
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });

      setTasks(tasks.filter((task) => task.id !== id));
      console.log(tasks);
    } catch (error) {
      console.log("error deleting task", error);
    }
  };

  const filterTask = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);

      case "incomplete":
        return tasks.filter((task) => !task.completed);

      default:
        return tasks;
    }
  };

  return (
    <div className=" container bg-blue-700 mx-auto  text-center border-2 border-grey  w-3/6 rounded-md">
      <header className="text-center text-white text-xl font-sans font-bold p-3">
        TO-DO-LIST APP
      </header>
      <NewTask onAdd={addTask} />
      <Filter setFilter={setFilter} filteredTask={filter} />
      <TaskList
        tasks={filterTask()}
        onEdit={editTask}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default App;
