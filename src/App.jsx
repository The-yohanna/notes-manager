import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { NoteAPI } from "./api/note-api";
import { useDispatch } from "react-redux";
import { setNoteList } from "./store/notes/notes-slice";
import { useEffect } from "react";
import { withAuthRequired } from "./hoc/withAuthRequired";
import { ButtonPrimary } from "./components/ButtonPrimary/ButtonPrimary";
import s from "./style.module.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const notesList = await NoteAPI.fetchAll();
    dispatch(setNoteList(notesList));
  };

  useEffect(() => {
    const unsub = NoteAPI.onShouldSyncNotes(fetchNotes);
    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      <Header />
      <ButtonPrimary
        className={s.buttonAdd}
        onClick={() => navigate("/note/new")}
      >
        +
      </ButtonPrimary>
      <div style={{ padding: 50 }}>
        <Outlet />
      </div>
    </div>
  );
}

export const ProtectedApp = withAuthRequired(App);
