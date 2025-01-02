import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };



  const submitHandler = (e) => {
    e.preventDefault();
    addTask();
  }
  return (
    <div className="min-h-screen bg-zinc-900 flex justify-center items-center p-8">
      <div className="w-full h-[500px] overflow-y-auto max-w-md bg-[#0F241D] rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-[#E6E6E6] text-center mb-4">Todo With BackEnd</h1>
        <form onSubmit={submitHandler} className="flex items-center mb-4">
          <input
            type="text"
            className="flex-1 border border-[#FFA700] rounded-l-md p-3 text-[#F4F1D0] bg-[#22312E] placeholder-[#F4F1D0] focus:outline-none focus:rin focus:ring-[#FFA700]"
            placeholder="What are your tasks for today?"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-[#FFA700] text-[#0F241D] px-5 py-3   border border-[#FFA700] rounded-l- rounded-r-md hover:bg-[#FFC34A]"
          >
            Add
          </button>
        </form>
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-3 border border-[#FFA700] rounded-md shadow transition-all ${
                task.completed ? "bg-[#22312E] line-through text-[#B1D182]" : "bg-[#0F241D] text-[#E6E6E6]"
              }`}
            >
              <span
                onClick={() => toggleTask(index)}
                className="flex-1 cursor-pointer text-lg"
              >
                {task.text}
              </span>
              <div className="flex items-center space-x-3">
                <button
                  className=" p-2 text-white rounded-md  bg-green-700 "
                  onClick={() => alert('Edit functionality is not implemented yet!')}
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleTask(index)}
                  className="bg-yellow-700 p-2 text-white rounded-md"
                >
                  {task.completed ? "Undo" : "Completed"}
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className=" p-2 text-white rounded-md bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;


