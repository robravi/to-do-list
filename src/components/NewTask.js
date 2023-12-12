import { useState } from "react";

const NewTask = ({ onAdd }) => {
  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!text) {
      alert("please Add Task");
      return;
    }
    onAdd({ text, dateTime: new Date().toLocaleString() });
    setText("");
  };

  return (
    <form onSubmit={submitHandler} className="mb-4">
      <input
        className="p-2 rounded-md border"
        type="text"
        placeholder="Add Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-2xl"
      >
        Add
      </button>
    </form>
  );
};

export default NewTask;
