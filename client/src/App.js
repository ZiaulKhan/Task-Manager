import React from "react";
import Navbar from "./Components/Navbar";
import TaskTable from "./Components/TaskTable";

const App = () => {
  return (
    <div className="border border-red-500 h-[100vh] bg-slate-300 overflow-hidden">
      <Navbar />
      <TaskTable />
    </div>
  );
};

export default App;
