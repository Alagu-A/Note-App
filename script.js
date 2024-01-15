const btnEl = document.getElementById("btn");
const app = document.getElementById("app");

getNotes().forEach(notes => {
  const noteEl = createNoteEl(notes.id, notes.content);
  app.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value); // Pass the updated content directly
  });

  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  app.removeChild(element);
}

function updateNote(id, content) {
  const notes = getNotes();
  const targetIndex = notes.findIndex((note) => note.id === id);

  if (targetIndex !== -1) { // Check if note exists before updating
    notes[targetIndex].content = content;
    saveNotes(notes);
  } else {
    console.error("Note not found:", id); // Handle the case where note is not found
  }
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  app.insertBefore(noteEl, btnEl);

  notes.push(noteObj);
  saveNotes(notes);
}

function saveNotes(notes) {
  try {
    localStorage.setItem("notes", JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes:", error); // Handle potential localStorage errors
  }
}

function getNotes() {
  try {
    return JSON.parse(localStorage.getItem("notes") || "[]");
  } catch (error) {
    console.error("Error retrieving notes:", error); // Handle potential parsing errors
    return [];
  }
}

btnEl.addEventListener("click", addNote);
