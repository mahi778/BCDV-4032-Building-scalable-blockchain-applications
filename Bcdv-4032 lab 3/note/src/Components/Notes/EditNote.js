import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditNote() {
  const { state } = useLocation();
  const { note } = state;
  const nameRef = useRef();
  const noteRef = useRef();
  const [image, setImage] = useState(note.cover);
  const navigate = useNavigate();

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
    let output = document.getElementById("output");
    output.src = base64;
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const updateNote = (e) => {
    e.preventDefault();
    const newNote = {
      name: nameRef.current.value,
      note: noteRef.current.value,
      img: image,
    };
    axios
      .put(`/notes/${note._id}`, newNote)
      .then((res) => {
        if (res.data.data === "Note updated successfully!") {
          navigate("/notes");
        } else {
          console.error(res.data.data);
        }
      });
  };
  return (
    <div className="container">
      <h2 className="page-header">Edit Note</h2>
      <div className="inner-container">
        <form onSubmit={(e) => updateNote(e)}>
          <div className="form-row">
            <div className="form-item">
              <label>Name:</label>
              <input type="text" ref={nameRef} defaultValue={note.name} />
            </div>
            <div className="form-item">
              <label for="file" className="file-label">
                Choose cover image
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => uploadFile(e)}
              />
            </div>
          </div>
          <div
            className="form-row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="preview"
              id="output"
              width="200px"
              height="200px"
              src={image}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="form-row">
            <div className="form-item">
              <label>Note:</label>
              <textarea
                style={{ fontSize: "20px" }}
                ref={noteRef}
                defaultValue={note.note}
              />
            </div>
          </div>
          <div className="btn-row">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/notes/view", { state: { note } })}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
