import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "noteSlice",
  initialState: {
    notesList: [],
  },
  reducers: {
    setNoteList: (state, action) => {
      state.notesList = action.payload;
    },
    addNote: (state, action) => {
      state.notesList.push(action.payload);
    },
    updateNote: (state, action) => {
      const indexToUpdate = state.notesList.findIndex(
        (note) => note.id === action.payload.id
      );
      state.notesList[indexToUpdate] = action.payload;
    },
    deleteNote: (state, action) => {
      const filteredlist = state.notesList.filter(
        (note) => note.id !== action.payload.id
      );
      state.notesList = filteredlist;
    },
  },
});

export const notesReducer = notesSlice.reducer;
export const { setNoteList, addNote, updateNote, deleteNote } =
  notesSlice.actions;
