import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import toast from "react-hot-toast";
const App = () => {
  const base_url = "https://todos-backend-5kwp.vercel.app";
  const [todos, setTodos] = useState([]);
  // const [inptodo, setInptodo] = useState(null);
  const getTodo = async () => {
    try {
      const res = await axios(`${base_url}/getTodos`);
      // let todoData = res?.data?.data.map((todo) => ({
      //   ...todo,
      //   todoContent: todo.todoContent || "No Content",
      //   id: todo.id || "No id",
        
      // }));
      let todoData = res?.data?.data;
      // todoData.map((todo) => (
      //  console.log("todo", todo.todoContent , todo.id)
       
      // ));
      console.log("todoData", todoData);
      setTodos(todoData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);
  // const inpvalue = (e) => {
  //   try {

  //     let todo = e.target[0].value;
  //     console.log(todo);
  //     setInptodo(todo);
  //     todo = e.target[0].value = "";
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   inpvalue();
  // }, []);


  //post request
  
  const addTodo = async (event) => {
    try {
      event.preventDefault();

      let inpValue = event.target[0].value;
      const res = await axios.post(`${base_url}/addTodo`, {
        todo: inpValue,
      });
      // console.log(res);
      getTodo(); //page refresh karne par value mil rhi thi is lye hume function ko call krna para
      event.target.reset(); //ye form ko clear krne k liye use hota hai
    } catch (error) {
      console.log(error);
    }
  };
  // delete requset
  const deleteTodo = async (todoId) => {
    // console.log("todoId", todoId);
   try {
    const {data}= axios.delete(`${base_url}/deletTodo/${todoId}`)
console.log("data", data);
    toast.success(data.message);
    getTodo();
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <>
      <div className="bg-gray-900 w-full p-4 shadow-lg">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-white font-bold text-2xl">Todo App With Persnal Back-End</div>
        </div>
      </div>
      <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-800 py-10">
        <h1 className="font-extrabold text-5xl py-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Todo App</h1>
        <form onSubmit={addTodo} className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg">
          <input
            type="text"
            className="w-full border border-gray-600 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            placeholder="Enter your todo"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded hover:from-blue-600 hover:to-purple-700 transition duration-200"
          >
            Add Todo
          </button>
          <div className="mt-6">
            {!todos?.length && <div className="flex justify-center items-center font-bold text-gray-400">No Todos</div>}
            {todos?.map((value) => (
              <div
                key={value.id}
                className="flex justify-between items-center p-3 border border-gray-600 rounded mt-2 bg-gray-700 shadow-sm"
              >
                <div className="text-white">{value.todoContent}</div>
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200">
                    Edit
                  </button>
                  <button onClick={() => deleteTodo(value.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
