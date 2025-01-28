import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Nav from "./components/Nav";
import Priority from "./components/Priority";
import { useState } from "react";
function App() {
  const [newTask, setnewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const handleTask = (e) => {
    setnewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please enter a task");
      return;
    }
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks((prevTask) => [...prevTask, task]);
    setnewTask("");
  };
  const removeTask = (id) => {
    setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
  };
  return (
    <>
      <Nav />
      <div
        className="bg-gradient-to-tl
    from-blue-900 to-red-900 h-screen w-full flex justify-center place-content-center
    place-items-center "
      >
        <div className="bg-gradient-to-br from-purple-800 to-blue-700 h-150 w-180 rounded-xl text-center py-[25px] px-3">
          <div className="font-bold text-xl text-white opacity-60">
            {/* //this is just an icon */}
            <FontAwesomeIcon icon={faCircleCheck} size="2xl" />

            <h2>My Task</h2>
          </div>

          {/* //this is my input feild where user can enter the task */}
          <input
            type="text"
            className="bg-white mt-3 w-2/3 rounded-md h-1/20 text-gray-700 px-3 mx-4"
            placeholder="Add your task"
            value={newTask}
            onChange={handleTask}
          />

          {/* //This button will add tasks  */}
          <button
            className="bg-gray-600 font-medium px-5 py-1 rounded-3xl cursor-pointer hover:bg-orange-600"
            onClick={addTask}
          >
            Add
          </button>
          {/* //And there is task adding when user enter any task on the input feild and press the add button */}
          <div className="mt-4 bg-gray-800 h-8/10 rounded-md text-white opacity-85">
            {tasks.length > 0 ? (
              <ul className="p-4">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between place-items-center px-4 py-2 bg-gray-800 rounded-md mt-2 text-white break-words "
                  >
                    <div className="flex">
                      <div className="flex mr-6">{task.text}</div>
                      <Priority/>
                    </div>
                    {/* //this is remove button where user can remove the task */}
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
              // if the tasks are not there this will be shown in the tasks area
              <p className="text-center text-gray-400 mt-4">No tasks yet!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
