import React from "react";

const Todo = ({ todo, dispatch, index }) => {
  return (
    <div className="flex justify-between items-center border px-2 rounded shadow my-2 hover:shadow-md">
      <div
        className={`${
          todo.completed ? "text-slate-400 line-through" : "text-slate-900 "
        } my-2 font-semibold overflow-auto`}
      >
        {index + 1}. {todo.title}
      </div>
      <div className="flex items-center">
        <button
          onClick={() =>
            dispatch({ type: "deleteTodo", payload: { id: todo.id } })
          }
          className="w-[4rem]"
        >
          🗑
        </button>
        <input
          onClick={() =>
            dispatch({ type: "toggleTodo", payload: { id: todo.id } })
          }
          className="cursor-pointer w-[3rem] h-[1rem]"
          type="checkbox"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default Todo;
