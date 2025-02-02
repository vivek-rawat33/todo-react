import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Nav from "./components/Nav";
import Priority from "./components/Priority";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setDate(now.toLocaleDateString("en-US", { day: "numeric", month: "long" }));
  }, []);

  const handleTask = useCallback((e) => {
    setNewTask(e.target.value);
  }, []);

  const addTask = useCallback(() => {
    if (newTask.trim() === "") {
      alert("Please enter a task");
      return;
    }
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask("");
  }, [newTask]);

  const removeTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const toggleTaskCompletion = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTasks(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <>
      <Nav />
      <div className="bg-gradient-to-tl from-blue-900 to-red-900 h-screen w-full flex justify-center place-content-center place-items-center overflow-hidden">
        <div className="bg-gradient-to-br from-purple-800 to-blue-700 h-160 pb-13 w-180 rounded-xl text-center py-[25px] px-3 mx-4">
          <div className="font-bold text-xl text-white opacity-60">
            <FontAwesomeIcon icon={faCircleCheck} size="2xl" />
            <h2>My Tasks</h2>
            <h2>{date}</h2>
          </div>

          <input
            type="text"
            className="bg-white mt-3 w-2/3 rounded-md h-[32px] text-gray-700 px-3 mx-4 border-0 outline-0"
            placeholder="Add your task"
            value={newTask}
            onChange={handleTask}
          />

          <button
            className="bg-gray-600 font-medium px-5 py-[7px] rounded-3xl cursor-pointer hover:bg-orange-600"
            onClick={addTask}
          >
            Add
          </button>

          <div className="mt-4 bg-gray-800 h-8/10 rounded-md text-white opacity-85">
            {tasks.length > 0 ? (
              <ul className="p-4">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between place-items-center px-4 py-1 bg-gray-800 rounded-md mt-2 text-white break-words"
                  >
                    <div className="flex">
                      <div
                        className={`flex mr-6 ${
                          task.completed ? "line-through" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mr-4"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                        />
                        {task.text}
                      </div>
                      <Priority />
                    </div>

                    <button
                      onClick={() => removeTask(task.id)}
                      className="bg-gray-400 px-2 py-1 rounded-md text-black cursor-pointer hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400 mt-4">No tasks yet!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
