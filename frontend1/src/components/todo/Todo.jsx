// import React, { useEffect, useState } from "react";
// import "./todo.css";
// import TodoCards from "./TodoCards";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Update from "./Update";
// import axios from "axios";
// let id = sessionStorage.getItem("id");
// let toUpdateArray = [];
// const Todo = () => {
//   const [Inputs, setInputs] = useState({
//     title: "",
//     body: "",
//   });
//   const [Array, setArray] = useState([]);

//   const show = () => {
//     document.getElementById("textarea").style.display = "block";
//   };
//   const change = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...Inputs, [name]: value });
//   };
//   const submit = async () => {
//     if (Inputs.title === "" || Inputs.body === "") {
//       toast.error("Title Or Body Can't Be Empty");
//     } else {
//       if (id) {
//         try {
//           // Point to the back-end server explicitly
//           const response = await axios.post(
//             `${window.location.origin}/api/v2/addTask`,
//             {
//               title: Inputs.title,
//               body: Inputs.body,
//               id: id,
//             }
//           );

//           console.log(response);
//           setArray([...Array, response.data]); // Optionally update with server's response data
//           setInputs({ title: "", body: "" });
//           toast.success("Your Task Is Added");
//         } catch (error) {
//           console.error("Error adding task:", error);
//           toast.error("Failed to add task. Please try again.");
//         }
//       } else {
//         // Handle when the user is not signed in
//         setArray([...Array, Inputs]);
//         setInputs({ title: "", body: "" });
//         toast.success("Your Task Is Added Locally");
//         toast.error("Your Task Is Not Saved on Server! Please Sign Up");
//       }
//     }
//   };

//   const del = async (Cardid) => {
//     if (id) {
//       try {
//         await axios
//           .delete(`${window.location.origin}/api/v2/deleteTask/${Cardid}`, {
//             data: { id: id },
//           })
//           .then(() => {
//             // Remove the task from the front-end state after successful deletion
//             setArray((prevArray) =>
//               prevArray.filter((item) => item._id !== Cardid)
//             );
//             toast.success("Your Task Is Deleted");
//           });
//       } catch (error) {
//         console.error("Error deleting task:", error);
//         toast.error("Failed to delete task.");
//       }
//     } else {
//       toast.error("Please Sign Up First");
//     }
//   };

//   const dis = (value) => {
//     document.getElementById("todo-update").style.display = value;
//   };
//   const update = (value) => {
//     toUpdateArray = Array[value];
//   };
//   useEffect(() => {
//     if (id) {
//       const fetch = async () => {
//         await axios
//           .get(`${window.location.origin}/api/v2/getTasks/${id}`)
//           .then((response) => {
//             setArray(response.data.list);
//           });
//       };
//       fetch();
//     }
//   }, [submit]);

//   return (
//     <>
//       <div className="todo">
//         <ToastContainer />
//         <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
//           <div className="d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1">
//             <input
//               type="text"
//               placeholder="TITLE"
//               className="my-2 p-2 todo-inputs"
//               onClick={show}
//               name="title"
//               value={Inputs.title}
//               onChange={change}
//             />
//             <textarea
//               id="textarea"
//               type="text"
//               placeholder="BODY"
//               name="body"
//               className=" p-2 todo-inputs"
//               value={Inputs.body}
//               onChange={change}
//             />
//           </div>
//           <div className=" w-50 w-100 d-flex justify-content-end my-3">
//             <button className="home-btn px-2 py-1" onClick={submit}>
//               Add
//             </button>
//           </div>
//         </div>
//         <div className="todo-body">
//           <div className="container-fluid">
//             <div className="row ">
//               {Array &&
//                 Array.map((item, index) => (
//                   <div
//                     className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
//                     key={index}
//                   >
//                     <TodoCards
//                       title={item.title}
//                       body={item.body}
//                       id={item._id}
//                       delid={del}
//                       display={dis}
//                       updateId={index}
//                       toBeUpdate={update}
//                     />
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="todo-update " id="todo-update">
//         <div className="container update">
//           <Update display={dis} update={toUpdateArray} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Todo;
import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

// Retrieve user ID from session storage
let id = sessionStorage.getItem("id");
let toUpdateArray = [];

const Todo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  const [array, setArray] = useState([]);

  const handleShowTextarea = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleAddTask = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or body can't be empty");
      return;
    }

    if (id) {
      try {
        const response = await axios.post(`/api/v2/addTask`, {
          title: inputs.title,
          body: inputs.body,
          id: id,
        });

        setArray([...array, response.data]);
        setInputs({ title: "", body: "" });
        toast.success("Task added successfully");
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task. Please try again.");
      }
    } else {
      setArray([...array, inputs]);
      setInputs({ title: "", body: "" });
      toast.warn("Task added locally. Please sign in to save tasks on server.");
    }
  };

  const handleDeleteTask = async (cardId) => {
    if (!id) {
      toast.error("Please sign in first.");
      return;
    }

    try {
      await axios.delete(`/api/v2/deleteTask/${cardId}`, { data: { id: id } });
      setArray(array.filter((item) => item._id !== cardId));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleUpdateTask = (index) => {
    toUpdateArray = array[index];
  };

  useEffect(() => {
    if (id) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(`/api/v2/getTasks/${id}`);
          setArray(response.data.list || []);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to fetch tasks from the server.");
        }
      };

      fetchTasks();
    }
  }, [id]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={handleShowTextarea}
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
            />
            <textarea
              id="textarea"
              placeholder="BODY"
              name="body"
              className="p-2 todo-inputs"
              value={inputs.body}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={handleAddTask}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {array.map((item, index) => (
                <div
                  className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                  key={item._id}
                >
                  <TodoCards
                    title={item.title}
                    body={item.body}
                    id={item._id}
                    delid={handleDeleteTask}
                    updateId={index}
                    toBeUpdate={handleUpdateTask}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update
            display={(val) =>
              (document.getElementById("todo-update").style.display = val)
            }
            update={toUpdateArray}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
