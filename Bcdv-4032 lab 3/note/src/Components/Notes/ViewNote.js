import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewNote() {
  const { state } = useLocation();
  const { note } = state;
  const navigate = useNavigate();
  console.log(process.env);
  const editNote = () => {
    navigate("/notes/edit", { state: { note } });
  };

  const deleteNote = () => {
    axios
      .delete(`/notes/${note._id}`)
      .then((res) => {
        if (res.data.data === "Note deleted successfully!") {
          navigate("/notes");
        } else {
          console.error(res.data.data);
        }
      });
  };

  return (
    <>
      <div className="cover-image">
        <img width="100%" height="100%" alt="cover" src={note.cover} />
      </div>
      {/* <div className="emoji-input">emoji picker</div> */}
      <div className="container">
        <h2 className="page-header">{note.name}</h2>
        <div className="inner-container">
          <p
            style={{
              color: "var(--font-color)",
              fontFamily: "Roboto Mono, monospace",
            }}
          >
            {note.note}
          </p>

          <div class="btn-row">
            <button className="btn btn-primary" onClick={() => editNote()}>
              Edit
            </button>
            <button className="btn btn-primary" onClick={() => deleteNote()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
