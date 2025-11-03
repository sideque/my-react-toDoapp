import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [toDos, setToDos] = useState(() => {
    const savedTodos = sessionStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  })
  const [toDo, setToDo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    sessionStorage.setItem("todos",JSON.stringify(toDos));
  }, [toDos])
  

  const addToDo = () => {
    const trimmedToDo = toDo.trim();

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
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editId !== null) {
        saveEdit();
      } else {
        addToDo();
      }
    }
  };

  const toggleStatus = (id) => {
    setToDos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const deleteToDo = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this...?"
    );
    if (confirmDelete) {
      setToDos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const startEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const saveEdit = () => {
    const trimmedText = editText.trim();

    if (trimmedText === "") {
      alert("Task cannot be empty");
      return;
    }

    if (/^\d+$/.test(trimmedText)) {
      alert("Numbers are not allowed");
      return;
    }

    const isDuplicate = toDos.some(
      (item) =>
        item.text.toLowerCase() === trimmedText.toLowerCase() &&
        item.id !== editId
    );

    if (isDuplicate) {
      alert("You have already added this Task");
      return;
    }

    setToDos((prev) =>
      prev.map((todo) =>
        todo.id === editId ? { ...todo, text: trimmedText } : todo
      )
    );

    setEditId(null);
    setEditText("");
  };

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
          disabled={editId !== null}
        />
        <i
          onClick={addToDo}
          className="fas fa-plus"
          style={{
            pointerEvents: editId !== null ? "none" : "auto",
            opacity: editId !== null ? 0.5 : 1,
          }}
        ></i>
      </div>

      <div className="todos">
        {toDos.length === 0 ? (
          <div className="empty-state">
            {toDos.length === 0 && <p>No tasks yet. Add one!</p>}
          </div>
        ) : (
          toDos.map((todo) => (
            <div className="todo" key={todo.id}>
              <div className="left">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleStatus(todo.id)}
                  disabled={editId !== null}
                />
                {editId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      else if (e.key === "Escape") cancelEdit();
                    }}
                    autoFocus
                  />
                ) : (
                  <p
                    style={{
                      textDecoration: todo.status ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                    onDoubleClick={() => startEdit(todo.id, todo.text)}
                    title="Double click to edit"
                  >
                    {todo.text}
                  </p>
                )}
              </div>

              <div className="right">
                {editId === todo.id ? (
                  <>
                    <button onClick={saveEdit} style={{ marginRight: 5 }}>
                      Save
                    </button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <i
                    className="fas fa-times"
                    onClick={() => deleteToDo(todo.id)}
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
