import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const App = () => {
  const base_url = "http://localhost:3000";
  const [todos, setTodos] = useState([]);
  const [inptodo, setInptodo] = useState();
  const getTodo = async () => {
    try {
      const res = await axios(`${base_url}/getTodos`);
      let todoData = res?.data.data;
      console.log(todoData);
    } catch (error) {
      console.log(error);
      setTodos(todoData);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);
  const inpvalue = (e) => {
    try {
      
      e.preventDefault();
      let todo = e.target[0].value;
      console.log(todo);
      setInptodo(todo)
      todo = e.target[0].value = "";
    } catch (error) {}
  };
  useEffect(()=>{
    inpvalue()
  },[])

  return (
    <>
      <div className="App flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1>Todo App</h1>
        <form onSubmit={inpvalue}  className="w-1/2">
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded mt-2">
            Add Todo
          </button>
          <div className="bg-amber-700  text-black">
{inptodo}

</div>
        </form>
       
      </div>
    </>
  );
};

export default App;
