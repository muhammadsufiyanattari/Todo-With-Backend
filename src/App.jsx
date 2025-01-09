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
      <div className="App flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="font-extrabold text-3xl py-1">Todo App</h1>
        <form onSubmit={addTodo} className="w-1/2 overflow-auto">
          <input
          // required
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-2"
          >
            Add Todo
          </button>
          <div className="bg-amber-7  text-black">
            {!todos?.length && <div className="flex justify-center items-center font-bold">No Todos</div>}
            {todos?.map((value, index) => {
              return (
                <div
                  key={value.id}
                  className="flex justify-between items-center p-2 border border-gray-300 mt-2"
                >
                  <div>{value.todoContent}</div>
                  {/* {console.log(value.todoContent)} */}

                  <div>
                    <button className="bg-green-500 text-white p-2 rounded">
                      Edit
                    </button>
                    <button onClick={()=>deleteTodo(value.id)} className="bg-red-500 text-white p-2 rounded">
                      
                      Delete 
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
