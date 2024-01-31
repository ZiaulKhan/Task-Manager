import React, { useState, useContext, useEffect, memo } from "react";

import { RxCross2 } from "react-icons/rx";
import { TaskContext } from "../Store/TaskContextProvider";

const EditTaskPopup = ({
  setShowEditPopup,
  showEditPopup,
  task,
  getTasksData,
}) => {
  const { updateTask } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const editTaskData = async (e) => {
    e.preventDefault();
    await updateTask(
      {
        title: title,
        category: category,
        priority: priority,
      },
      task._id
    );

    setTitle("");
    setCategory("");
    setPriority("");
    setShowEditPopup(!showEditPopup);
    getTasksData();
    alert("Task Edited Successfully");
  };

  useEffect(() => {
    setTitle(task.title);
    setCategory(task.category);
    setPriority(task.priority);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  return (
    <form
      onSubmit={(e) => editTaskData(e)}
      className="w-10/12 md:w-1/3 bg-white p-4 flex flex-col gap-4 rounded-lg [&>div]:grid [&>div]:gap-1 [&>div>input]:bg-gray-500 [&>div>input]:p-1 [&>div>input]:rounded [&>div>input]:text-white [&>div>input]:border-none [&>div>input]:outline-none drop-shadow-lg"
    >
      <p className="flex justify-between">
        <span className="text-xl font-medium">EDIT TASK</span>
        <button
          type="button"
          className="text-3xl"
          onClick={() => setShowEditPopup(!showEditPopup)}
        >
          <RxCross2 />
        </button>
      </p>
      <div>
        <label htmlFor="">Title</label>
        <input
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Task Title"
          required
        />
      </div>
      <div>
        <label htmlFor="">Category</label>
        <input
          value={category || ""}
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
          value={priority || ""}
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

export default memo(EditTaskPopup);
