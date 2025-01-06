"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const [activeFilter, setActiveFilter] = useState("all");
  // const [taskCompleted, setTaskCompleted] = useState("");
  // const [clearCompleted, setClearCompleted] = useState("Clear completed");

  const addTodoHandler = (event) => {
    if (
      event.type === "click" ||
      (event.type === "keydown" && event.key === "Enter")
    ) {
      if (newTodo !== "") {
        setTodos([...todos, { title: newTodo, isCompleted: false }]);
        setNewTodo("");
      } else {
        alert("Please enter a task!");
      }
    }
  };

  // const checkBoxHandler = () => {};
  // [1,2,3,4,5]
  const deleteHandler = (index) => {
    if (confirm("are you sure to delete ?")) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  };

  const completedTasksLength = todos.filter((todo) => todo.isCompleted).length;

  const toggleIsCompleted = (incomingTodo) => {
    let changedTodos = todos.map((t) => {
      if (t.title === incomingTodo.title) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });

    setTodos(changedTodos);
  };

  const clearCompletedHandler = () => {
    if (todos.filter((todo) => todo.isCompleted).length === 0) {
      alert("There are no completed tasks");
    } else if (confirm("Are you sure you want to clear all completed tasks?")) {
      const reamainingTodos = todos.filter((todo) => !todo.isCompleted);
      setTodos([...reamainingTodos]);
    }
  };

  // const sortTasks = () => {
  const sortTasks = todos.filter((todo) => {
    if (activeFilter == "active") return !todo.isCompleted;
    if (activeFilter == "completed") return todo.isCompleted;
    return true;
  });
  // };

  return (
    <div className={styles.bdy}>
      <div className={styles[`todo-container`]}>
        <h1>To-Do list</h1>
        <div className={`${styles.flex} ${styles["task"]}`}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={addTodoHandler}
          />
          <button onClick={addTodoHandler}>Add</button>
        </div>
        <div className={`${styles.flex} ${styles["sorts"]}`}>
          <div className={styles.all}>
            <button
              className={`${activeFilter == "all" && styles.activeStyle}`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
          </div>
          <div>
            <button
              className={`${activeFilter == "active" && styles.activeStyle}`}
              onClick={() => setActiveFilter("active")}
            >
              Active
            </button>
          </div>
          <div>
            <button
              className={`${activeFilter == "completed" && styles.activeStyle}`}
              onClick={() => setActiveFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        <div>
          {sortTasks.map((todo, index) => (
            <div key={index} className={styles.tasks}>
              <div className={`${styles.flex} ${styles.tasksleft}`}>
                <input
                  type="checkbox"
                  onChange={() => toggleIsCompleted(todo)}
                  checked={todo.isCompleted}
                />
                <p>{todo.title}</p>
              </div>
              <div>
                <button onClick={() => deleteHandler(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {todos.length > 0 ? (
          <div className={styles.parag}>
            <p>
              {completedTasksLength} of {todos.length} tasks completed
            </p>
            <button onClick={() => clearCompletedHandler()}>
              Clear Completed
            </button>
          </div>
        ) : (
          <div className={styles.emptyTask}>
            <p>No tasks yet. Add one above!</p>
          </div>
        )}

        <div className={styles.pineconeLink}>
          <h4>
            Powered by{" "}
            <span style={{ color: "#3c82f6" }}>
              <a href="https://pinecone.mn/">Pinecone academy </a>
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
