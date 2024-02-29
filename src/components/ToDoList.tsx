import { db } from "../config/firebase";
import {
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  addDoc,
} from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";


interface Task {
  task: string;
  userId: string | undefined;
  id?: string;
}

export function ToDoList() {
    const [newTask, setNewTask] = useState("");
    const [updatedTask, setUpdatedTask] = useState("");
    const [listOfTasks, setListOfTasks] = useState<Task[]>([]);

  // show tasks
  const showTasks = async () => {
    try {
      const data = await getDocs(collection(db, "my-tasks"));
      const filteredData: Task[] = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Task;
      });
      setListOfTasks(filteredData);
    } catch (error) {
      console.log(error);
    }
    };
    


  //add Task
  const addTask = async () => {
    try {
      await addDoc(collection(db, "my-tasks"), {
        task: newTask,
        userId: "none",
      });
      showTasks();
    } catch (error) {
      console.log(error);
    }
  };
  // delete Task

  const deleteTask = async (id: string,item:string) => {
    try {
      await deleteDoc(doc(db, "my-tasks", id));
      alert(`${item} deleted`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
    };
    
    // update Task

    const updateTask = async (id:string) => {
        try {
            
            await updateDoc(doc(db,"my-tasks",id),{task:updatedTask})
            showTasks()
            setUpdatedTask("")
        } catch (error) {
            console.log(error);
            
        }

    }
  useEffect(() => {
    showTasks();
  }, []);

  return (
    <div className="container">
     
      {/* To-Do-List */}
      <article className="to-do-list">
        <div className="add-task">
          <input
            type="text"
            placeholder="new task"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTask(e.target.value)
            }
          />

          <button className="add-task-btn btn" onClick={addTask}>
            Add
          </button>
        </div>
      </article>

      <section className="task-list">
        {listOfTasks?.map((item) => {
          return (
            <div className="task-item" key={Math.floor(Math.random() * 20)}>
              {/* <input type="text" /> */}
              {/* <p>{ item.task}</p> */}
              <div className="task">
                <input
                  type="text"
                  value={updatedTask}
                  placeholder={item.task}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUpdatedTask(e.target.value);
                  }}
                />
              </div>
                  <div className="task-btns">
                     
                <button
                  className="task-btn "
                  onClick={() => updateTask(item.id || "")}
                >
                  Edit
                </button>
                <button
                  className="task-btn "
                  onClick={() => deleteTask(item.id || "",item.task )}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
