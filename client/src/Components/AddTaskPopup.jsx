import React, { useState, useContext } from "react";

import { RxCross2 } from "react-icons/rx";
import { TaskContext } from "../Store/TaskContextProvider";

const AddTaskPopup = ({ setShowAddPopup, showAddPopup, getTasksData }) => {
  const { addTask } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("High");

  const addTaskData = async (e) => {
    e.preventDefault();
    await addTask({
      title: title,
      category: category,
      priority: priority,
    });

    setTitle("");
    setCategory("");
    setPriority("");
    setShowAddPopup(!showAddPopup);
    getTasksData();
    alert("Task Added Successfully");
  };

  return (
    <form
      onSubmit={(e) => addTaskData(e)}
      className="w-10/12 md:w-1/3 bg-white p-4 flex flex-col gap-4 rounded-lg [&>div]:grid [&>div]:gap-1 [&>div>input]:bg-gray-500 [&>div>input]:p-1 [&>div>input]:rounded [&>div>input]:text-white [&>div>input]:border-none [&>div>input]:outline-none drop-shadow-lg"
    >
      <p className="flex justify-between">
        <span className="text-xl font-medium">ADD TASK</span>
        <button
          type="button"
          className="text-3xl"
          onClick={() => setShowAddPopup(!showAddPopup)}
        >
          <RxCross2 />
        </button>
      </p>
      <div>
        <label htmlFor="">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Task Title"
          required
        />
      </div>
      <div>
        <label htmlFor="">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Enter Task Category"
          required
        />
      </div>
      <div>
        <label htmlFor="">Priority</label>
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          className="bg-gray-500 text-white p-1 rounded border-none outline-none"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-gray-700 mx-auto px-6 py-1 text-white rounded hover:bg-gray-600"
      >
        Save
      </button>
    </form>
  );
};

export default AddTaskPopup;
