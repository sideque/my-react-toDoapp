import { useState, useCallback } from "react";
import "./App.css";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");

  const addToDo = useCallback(() => {
    const trimmedToDo = toDo.trim();
    if (trimmedToDo === "") return;

    const isDuplicate = toDos.some(
      (item) => item.text.toLowerCase() === trimmedToDo.toLowerCase()
    );

    if (isDuplicate) {
      alert("You have already added this Task");
      return;
    }

    setToDos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmedToDo, status: false },
    ]);
    setToDo("");
  }, [toDo, toDos]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addToDo();
    }
  };

  const toggleStatus = useCallback((id) => {
    setToDos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  }, []);

  const deleteToDo = useCallback((id) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this..?"
    );
    if (confirmDelete) {
      setToDos((prev) => prev.filter((todo) => todo.id !== id));
    }
  }, []);

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Saturday</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Add item..."
        />
        <i onClick={addToDo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add one above!</p>
          </div>
        ) : (
          toDos.map((todo) => (
            <div className="todo" key={todo.id}>
              <div className="left">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleStatus(todo.id)}
                />
                <p
                  style={{
                    textDecoration: todo.status ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </p>
              </div>
              <div className="right">
                <i
                  className="fas fa-times"
                  onClick={() => deleteToDo(todo.id)}
                ></i>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
