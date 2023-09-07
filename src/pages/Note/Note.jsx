import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NoteForm } from "../../components/NoteForm/NoteForm";
import { useState } from "react";
import { NoteAPI } from "../../api/note-api";
import { deleteNote, updateNote } from "../../store/notes/notes-slice";

export function Note(props) {
  const { noteId } = useParams();
  const note = useSelector((store) =>
    store.notes.notesList.find((note) => note.id === noteId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

  const submit = async (formValues) => {
    const updatedNote = await NoteAPI.updateById(note.id, formValues);
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
  };

  const deleteNote_ = async () => {
    if (window.confirm("Do you want to delete note?")) {
      await NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
      navigate("/");
    }
  };

  return (
    <>
      {note && (
        <NoteForm
          title={isEditable ? "Edit Note" : note.title}
          isEditable={isEditable}
          note={note}
          onClickEdit={() => setIsEditable(!isEditable)}
          onClickDelete={deleteNote_}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
}
