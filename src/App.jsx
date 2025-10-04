import { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');

  function setlist() {
    const trimmedToDo = toDo.trim();
    if (trimmedToDo === "") return;

    const duplicates = toDos.some((item) => {
      return item.text.toLowerCase() === trimmedToDo.toLowerCase();
    })
    if (duplicates) {
      alert('You have already added this Task')
      return;
    }
    setToDos([...toDos, {id: Date.now(), text:trimmedToDo, status: false}])
    setToDo("")
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setlist();
    }
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Saturday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(event) => setToDo(event.target.value)} onKeyPress={handleKeyPress} type="text" placeholder="🖊️ Add item..." />
        <i onClick={setlist} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.length === 0 ? (
            <div className='empty-state'>
              <i className='fas fa-clipboard-list'></i>
              <p>No tasks yet. Add one above!</p>
            </div>
          ) 
          : 
          (
          toDos.map((obj) => {
          return (  
          <div className="todo" key={obj.id}>
          <div className="left">
            <input type="checkbox"
            checked={obj.status}
             onChange={(event) => {
              const updatedToDos = toDos.map((obj2) => {
                if (obj2.id === obj.id) {
                  return { ...obj2, status: event.target.checked };
                }
                return obj2;
              });

              setToDos(updatedToDos);
              console.log("Checkbox changed: ", event.target.checked);
            }}
            />
            <p style={{
              textDecoration: obj.status ? 'line-through' : 'none'
            }}>{obj.text}</p>
          </div>
          <div className="right">
            <i className="fas fa-times" onClick={() => {
              const confimrDelete = window.confirm("Are you sure, you want to delete this..?")
              if (confimrDelete) {
                setToDos(toDos.filter((todo) => todo.id !== obj.id));
              }
            }}></i>
          </div>
        </div>
          )
        })
      )}
      </div>
    </div>
  );
}

export default App;