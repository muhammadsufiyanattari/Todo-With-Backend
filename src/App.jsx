import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import toast from "react-hot-toast";
const getUrl = () => {
  const isProduction = window.location.href.includes("https");
  const baseUrl = isProduction
    ? "https://todos-backend-5kwp.vercel.app"
    : "http://localhost:3000";
    return baseUrl
};
const App = () => {
 
  const [todos, setTodos] = useState([]);
  const [isEditText, setIsEditText] = useState(false);
  // const [inptodo, setInptodo] = useState(null);

  const getTodo = async () => {
    try {
      const res = await axios(`${getUrl()}/getTodos`);
      // let todoData = res?.data?.data.map((todo) => ({
      //   ...todo,
      //   todoContent: todo.todoContent || "No Content",
      //   id: todo.id || "No id",

      // }));
      let todoData = res?.data?.data;
      // todoData.map((todo) => (
      //  console.log("todo", todo.todoContent , todo.id)

      // ));
      const myState = todoData.map((todos) => {
        // return { ...todos, isEditing: false };
      });
      console.log("todoData", todoData);
      setTodos(todoData); //data ko set karne k liye use hota hai
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

      if (inpValue.trim() === "") {
        toast.dismiss();
        // toast.error("Please Enter Todo !");
        return;
      }
      const res = await axios.post(`${getUrl()}/addTodo`, {
        todoContent: inpValue,
      });
      // console.log(res);
      getTodo(); //page refresh karne par value mil rhi thi is lye hume function ko call krna para
      event.target.reset(); //ye form ko clear krne k liye use hota hai
    } catch (error) {
      console.log(error);
    }
  };
  // Edit todo
  let editTodo = async (todoId, event) => {
    event.preventDefault();
    try {
      const inpvalue = event.target[0].value;
      await axios.patch(`${getUrl()}/editTodo/${todoId}`, {
        todoContent: inpvalue,
      });

      console.log("inpvalueced", isEditText);
      console.log("editTodo");

      // setEditTodos(true);
      getTodo();
    } catch (error) {
      console.log(error || "unknown error");
    }
  };

  // delete requset
  const deleteTodo = async (todoId) => {
    // console.log("todoId", todoId);
    try {
      const { data } = await axios.delete(`${getUrl()}/deletTodo/${todoId}`);
      console.log("datas", data.message);
      toast.dismiss();
      toast.success(data.message);
      getTodo();
    } catch (error) {
      // console.log(error.response.data);
      toast.dismiss(); //toast message ko dismiss karne k liye use hota hai
      toast.error(error.response.data); //error message ko show karne k liye use hota hai
    }
  };
  return (
    <>
      <div className="bg-gray-900 w-full p-4 shadow-lg">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-white font-bold text-2xl">
            Todo App With Persnal Back-End
          </div>
        </div>
      </div>
      <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-800 py-10">
        <h1 className="font-extrabold text-5xl py-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Todo App
        </h1>
        <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg">
          <form onSubmit={addTodo}>
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
          </form>
          <div className="mt-6 h-[30vh] w-[400px] scrollbar overflow-auto">
            {!todos?.length && (
              <div className="flex justify-center items-center bg-gray-600 p-3  font-bold text-gray-400">
                No Todos
              </div>
            )}
            {todos?.map((value, index) => (
              <div
                key={value?._id}
                className="flex justify-between  items-center p-3 border border-gray-600 rounded mt-2 bg-gray-700  shadow-sm"
              >
                {!value.isEditing ? (
                  <div className="flex justify-between items-center w-full">
                    <div className="text-white ">
                      {
                        // console.log(value?.isEditing)
                      }

                      <span className="bg-gray-800 p-2 rounded-md ">
                        {value.todoContent}
                      </span>

                      {/* {value.todoContent} */}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          const newTodo = todos.map((todos, i) => {
                            if (i === index) {
                              todos.isEditing = true;
                            } else {
                              todos.isEditing = false;
                            }
                            return todos;
                          });

                          console.log("edit ho gaya");

                          // todos[index].isEditing = true;
                          setTodos([...newTodo]); //sprit opareter new arr me valve set kar de ga
                        }}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(value?._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>

                    {/* isEditing true ui me show karna hai */}
                  </div>
                ) : (
                  <form
                    onSubmit={(event) => editTodo(value._id, event)}
                    className="text-white flex justify-between items-center w-full"
                  >
                    <input
                      className="bg-gray-600 focus:outline-gray-900 outline-none   p-2 rounded-md "
                      type="text"
                      onChange={(e) => {
                        setIsEditText(e.target.value);
                        console.log(e.target.value);
                      }}
                      defaultValue={value.todoContent}
                      name=""
                      id=""
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          const newTodo = todos.map((todos, i) => {
                            if (i === index) {
                              todos.isEditing = false;
                            }
                            // } else {
                            //   todos.isEditing = true;
                            // }
                            return todos;
                          });
                          setTodos([...newTodo]);
                        }}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        // onClick={() => editTodo(value?.id)}
                        // type="submit"
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
