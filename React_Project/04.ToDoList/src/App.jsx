import { useEffect, useState } from "react";
import "./App.css";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function App() {
  const [todoListState, setTodoListState] = useState({
    title: "",
    desc: "",
    isEditing: false,
    editIndex: null,
    error: "",
  });
  const [mainTask, setMainTask] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (todoListState.title.length > 0 && todoListState.desc.length > 0) {
      if (todoListState.isEditing) {
        const updatedTasks = mainTask.map((task, index) =>
          index === todoListState.editIndex
            ? { title: todoListState.title, desc: todoListState.desc }
            : task
        );
        setMainTask(updatedTasks);
        setTodoListState({
          title: "",
          desc: "",
          isEditing: false,
          editIndex: null,
          error: "",
        });
        saveToDoInLocalStore(updatedTasks)
      } else {
        setMainTask([
          ...mainTask,
          { title: todoListState.title, desc: todoListState.desc },
        ]);
        setTodoListState({ ...todoListState, title: "", desc: "" });
        saveToDoInLocalStore([
          ...mainTask,
          { title: todoListState.title, desc: todoListState.desc },
        ]);
      }
    } else {
      setTodoListState((prevState) => ({
        ...prevState,
        error: "Both title and description are required.",
      }));
    }
  };

  // Edit Handler
  const editHandler = (index) => {
    const taskToEdit = mainTask[index];
    setTodoListState({
      ...todoListState,
      title: taskToEdit.title,
      desc: taskToEdit.desc,
      isEditing: true,
      editIndex: index,
    });
  };

  // Delete Handler
  const deleteHandler = (index) => {
    const updatedTasks = mainTask.filter((_, i) => i !== index);
    setMainTask(updatedTasks);
    saveToDoInLocalStore(updatedTasks);
  };

  // Save ToDo List Data in Local Storage
  const saveToDoInLocalStore = (todo) => {
    localStorage.setItem("todos", JSON.stringify(todo));
  };

  // Get Save ToDo List Data From Local Storage & Set the Data in Main Task
  const getSaveToDoFromLocalStore = () => {
    let Data = JSON.parse(localStorage.getItem("todos")) || [];
    // console.log(Data);
    setMainTask(Data);
  };

  useEffect(() => {
    getSaveToDoFromLocalStore();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full h-screen">
      <h1 className="text-black text-4xl p-2 text-center tracking-widest underline">
        ToDoList
      </h1>

      <form onSubmit={submitHandler}>
        {/* Input bar */}
        <div className="Inputbar flex items-center justify-evenly h-16">
          {/* Title input */}
          <div className="title">
            <label className="font-extrabold">Title :</label>
            <input
              type="text"
              className="border-zinc-800 border-2 m-5 text-black font-bold px-2 py-2 shadow-lg"
              placeholder="Enter Title here"
              value={todoListState.title}
              onChange={(e) =>
                setTodoListState({ ...todoListState, title: e.target.value })
              }
            />
          </div>

          {/* Description input */}
          <div className="Description">
            <label className="font-extrabold">Description :</label>
            <input
              type="text"
              className="border-zinc-800 border-2 m-5 text-black font-bold px-2 py-2 shadow-lg"
              placeholder="Enter Description here"
              value={todoListState.desc}
              onChange={(e) =>
                setTodoListState({ ...todoListState, desc: e.target.value })
              }
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            className="rounded-lg py-2 px-4 font-extrabold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
          >
            {todoListState.isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>

        {/* Searching bar */}
        <div className="SearchBar flex items-center w-full h-16 relative">
          <div className="SearchInput absolute left-32">
            <label className="font-extrabold">Search :</label>
            <input
              type="text"
              className="border-zinc-800 border-2 m-5 w-[53.7vw] text-black font-bold px-2 py-2 shadow-lg"
              placeholder="Enter Title here"
              value={todoListState.title}
              onChange={(e) =>
                setTodoListState({ ...todoListState, title: e.target.value })
              }
            />
          </div>
          {/* Button */}
          <button type="search" className="absolute right-36 rounded-lg py-2 px-4 font-extrabold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
            Search
          </button>
        </div>
      </form>

      <hr />
      <div className="maintask p-8">
        <table className="table-auto min w-full bg-gradient-to-r from-[blue] to-[red] rounded-lg">
          <thead>
            <tr>
              <th className="border">Sr.</th>
              <th className="border">Title</th>
              <th className="border">Description</th>
              <th className="border p-2 w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {mainTask.length > 0
              ? mainTask.map((data, index) => (
                  <tr
                    key={index}
                    className="border font-extrabold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                  >
                    <td className="border">{index + 1}.</td>
                    <td className="border">{data.title}</td>
                    <td className="border">{data.desc}</td>
                    <td className="border flex items-center justify-center py-2 space-x-5 ">
                      <button
                        type="button"
                        className="rounded-lg py-2 px-4 font-extrabold bg-blue-400 hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 ... text-white"
                        onClick={() => editHandler(index)}
                      >
                        {" "}
                        <span>
                          <FaEdit className="" />
                        </span>
                      </button>
                      <button
                        type="button"
                        className="rounded-lg py-2 px-4 font-extrabold bg-blue-400 hover:bg-red-600 text-white"
                        onClick={() => deleteHandler(index)}
                      >
                        <span>
                          <RiDeleteBinFill />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              : todoListState.error.length === 0 && (
                  <div
                    className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 mr-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">No Task Available!</span>
                    </div>
                  </div>
                )}
          </tbody>
        </table>

        {todoListState.error.length > 0 && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{todoListState.error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
