import { useState, useEffect } from "react";

function TaskTracker() {
  // Load tasks from localStorage on first render (or start empty)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  // Whenever tasks changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  function toggleDone(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function startEdit(id, currentText) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, editing: true, draft: currentText } : task
      )
    );
  }

  function updateDraft(id, value) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, draft: value } : task
      )
    );
  }

  function saveEdit(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: task.draft, editing: false }
          : task
      )
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Task Tracker</h2>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-3 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 px-5 rounded-lg font-semibold"
          >
            Add
          </button>
        </form>

        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
          )}

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg"
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
                className="w-5 h-5 accent-purple-500"
              />

              {task.editing ? (
                <input
                  type="text"
                  value={task.draft}
                  onChange={(e) => updateDraft(task.id, e.target.value)}
                  onBlur={() => saveEdit(task.id)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                  autoFocus
                  className="flex-1 bg-gray-700 p-2 rounded outline-none"
                />
              ) : (
                <span
                  onDoubleClick={() => startEdit(task.id, task.text)}
                  className={`flex-1 cursor-pointer ${
                    task.done ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.text}
                </span>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-300 font-semibold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {tasks.length > 0 && (
          <p className="text-gray-500 text-sm text-center mt-6">
            {tasks.filter((t) => t.done).length} of {tasks.length} completed
          </p>
        )}
      </div>
    </div>
  );
}

export default TaskTracker;