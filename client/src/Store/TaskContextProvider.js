import React, { createContext } from "react";
import axios from "axios";

export const TaskContext = createContext();

const TaskContextProvider = (props) => {
  const apiURL = "http://127.0.0.1:8000/tasks";

  //   const [filteredTask, setFilteredTask] = useState("");

  const addTask = async (data) => {
    try {
      await axios.post(`${apiURL}/addTask`, data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAllTasks = async () => {
    try {
      const res = await axios.get(`${apiURL}/getAllTasks`);
      if (res) return { result: "Done", data: res };
      else return { result: "Failed", message: "Internal Server Error" };
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTasksByPriority = async (data) => {
    try {
      const res = await axios.get(`${apiURL}/getTasksByPriority/${data}`);
      if (res) return { result: "Done", data: res };
      else return { result: "Failed", message: "Internal Server Error" };
    } catch (error) {
      console.log(error.message);
    }
  };

  //   const getFilteredTask = async (data) => {
  //     try {
  //       const res = await axios.post(`${apiURL}/getfilteredTask`, data);
  //       setFilterTask(res.data);
  //       if (res) return { result: "Done", data: res };
  //       else return { result: "Failed", message: "Internal Server Error" };
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  const getTask = async (taskId) => {
    try {
      const res = await axios.get(`${apiURL}/getTask/${taskId}`);
      if (res) return { result: "Done", data: res };
      else return { result: "Failed", message: "Internal Server Error" };
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTask = async (data, taskId) => {
    try {
      await axios.put(`${apiURL}/updateTask/${taskId}`, data);
      console.log("Task Updated");
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiURL}/deleteTask/${id}`);
      console.log("Task Deleted");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        addTask: addTask,
        getAllTasks: getAllTasks,
        deleteTask: deleteTask,
        getTask: getTask,
        updateTask: updateTask,
        getTasksByPriority: getTasksByPriority,
        // getTaskByCategory: getTaskByCategory,
        // filterTask: filterTask,
        // getFilteredTask: getFilteredTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
