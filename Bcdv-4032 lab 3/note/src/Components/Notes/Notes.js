import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const searchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/notes`)
      .then((res) => setNotes(res.data));
  }, []);

  const search = (e) => {
    e.preventDefault();
    axios
      .get(
        `/notes?search=${searchRef.current.value}`
      )
      .then((res) => setNotes(res.data));
  };

  return (
    <div className="container">
      <h2 className="page-header">Search Notes</h2>
      <div className="inner-container">
        <form onSubmit={(e) => search(e)}>
          <div className="form-row">
            <div className="form-item">
              <label>Name:</label>
              <input type="text" ref={searchRef} />
            </div>
          </div>
          <div className="form-row form-row-end">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>

        <br />
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {Array.isArray(notes) && notes.length !== 0 &&
            notes.map((note) => {
              return (
                <button
                  onClick={() => navigate("/notes/view", { state: { note } })}
                  style={{
                    background: "none",
                    border: "none",
                    textDecoration: "none",
                    padding: "10px",
                    cursor: "pointer",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "var(--font-color)",
                    fontFamily: "Roboto Mono, monospace",
                  }}
                >
                  {note.name}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
