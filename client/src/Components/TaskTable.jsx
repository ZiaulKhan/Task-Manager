import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../Store/TaskContextProvider";
import { FaPlus } from "react-icons/fa6";
import AddTaskPopup from "./AddTaskPopup";
import EditTaskPopup from "./editTaskPopup";

import { MdDelete, MdEditSquare } from "react-icons/md";

const TaskTable = () => {
  const { getTasksByPriority, deleteTask, getTask } = useContext(TaskContext);

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);
  const [priority, setPriority] = useState("All");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [sortOrder, setSortOrder] = useState("ascending");

  const getTasksData = async () => {
    const res = await getTasksByPriority(priority);
    if (!res?.data?.data?.tasks) setTasks([]);
    else setTasks(res?.data?.data?.tasks);
  };

  const getTaskData = async (taskId) => {
    const res = await getTask(taskId);
    if (!res.data.data.task) setTask([]);
    else setTask(res.data.data.task);
    setShowEditPopup(!showAddPopup);
  };

  const deleteTaskData = async (id) => {
    await deleteTask(id);
    alert("Task Deleted Successfully");
    getTasksData();
  };

  const sortByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      if (sortOrder === "ascending") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });
    setTasks(sortedTasks);
    // Toggle sort order for the next click
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  useEffect(() => {
    getTasksData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority]);

  return (
    <div className="relative">
      <div className="relative overflow-x-auto p-4 border min-h-[80vh] md:p-8">
        <div className=" flex flex-col">
          <p className="text-md font-medium">Filter Tasks</p>
          <div className=" flex flex-column sm:flex-row flex-wrap items-center justify-between pb-4">
            <div className="relative group">
              <button
                id="dropdownRadioButton"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                Priority
                <svg
                  className={`w-2.5 h-2.5 ms-2.5 transition-all 
                  group-hover:rotate-180
                `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdownRadio"
                className={`z-10 hidden group-hover:block absolute top-9 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600`}
              >
                <ul
                  className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownRadioButton"
                >
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="allPriority"
                        type="radio"
                        checked={priority === "All"}
                        name="filter-radio"
                        onChange={() => setPriority("All")}
                        //   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 outline-none"
                      />
                      <label
                        htmlFor="allPriority"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        All
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="highPriority"
                        type="radio"
                        checked={priority === "High"}
                        name="filter-radio"
                        onChange={() => setPriority("High")}
                        //   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 outline-none"
                      />
                      <label
                        htmlFor="highPriority"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        High
                      </label>
                    </div>
                  </li>

                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="mediumPriority"
                        type="radio"
                        checked={priority === "Medium"}
                        name="filter-radio"
                        onChange={() => setPriority("Medium")}
                        //   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 outline-none"
                      />
                      <label
                        htmlFor="mediumPriority"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Medium
                      </label>
                    </div>
                  </li>

                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="lowPriority"
                        type="radio"
                        checked={priority === "Low"}
                        name="filter-radio"
                        onChange={() => setPriority("Low")}
                        //   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 outline-none"
                      />
                      <label
                        htmlFor="lowPriority"
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Low
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <button
              id="dropdownRadioButton"
              className="flex gap-2 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setShowAddPopup(!showAddPopup)}
            >
              Add Task
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="rounded-lg relative overflow-auto h-[calc(100vh-200px)]">
          <div className="rounded-lg  overflow-auto ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="ps-4 py-3">
                    Sno.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div
                      onClick={() => sortByPriority()}
                      className="flex items-center cursor-pointer w-fit"
                    >
                      Priority
                      <svg
                        className="w-3 h-3 ms-1.5 mb-auto"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task, i) => (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      <th
                        scope="row"
                        className="ps-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {i + 1}.
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {task.title}
                      </th>
                      <td className="px-6 py-4">{task.priority}</td>
                      <td className="px-6 py-4">{task.category}</td>
                      <td className="px-3 py-4 flex gap-8">
                        <button
                          onClick={() => getTaskData(task._id)}
                          className="text-lg font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <MdEditSquare />
                        </button>
                        <button
                          onClick={() => deleteTaskData(task._id)}
                          className="text-lg font-medium text-red-500 dark:text-red-600 hover:underline"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center border absolute mx-auto left-0 right-0 border-none p-4">
                      No Task Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`${
            showAddPopup ? "block" : "hidden"
          } absolute top-0 backdrop-blur-sm h-[100%] w-[100%] flex justify-center items-center`}
        >
          <AddTaskPopup
            setShowAddPopup={setShowAddPopup}
            showAddPopup={showAddPopup}
            getTasksData={getTasksData}
          />
        </div>
        <div
          className={`${
            showEditPopup ? "block" : "hidden"
          } absolute top-0 backdrop-blur-sm h-[100%] w-[100%] flex justify-center items-center`}
        >
          <EditTaskPopup
            setShowEditPopup={setShowEditPopup}
            showEditPopup={showEditPopup}
            task={task}
            getTasksData={getTasksData}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
