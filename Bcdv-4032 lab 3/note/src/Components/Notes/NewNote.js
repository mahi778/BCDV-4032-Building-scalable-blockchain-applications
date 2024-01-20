import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewNote() {
  const nameRef = useRef();
  const noteRef = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
    let output = document.getElementById("output");
    output.hidden = false;
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

  const addNote = async (e) => {
    e.preventDefault();
    const note = {
      name: nameRef.current.value,
      note: noteRef.current.value,
      img: image,
    };

    axios
      .post(`/notes`, note)
      .then((res) => {
        if (res.data.data === "Note saved successfully!") {
          navigate("/notes");
        } else {
          console.error(res.data.data);
        }
      });
  };

  return (
    <div className="container">
      <h2 className="page-header">New Note</h2>
      <div className="inner-container">
        <form onSubmit={(e) => addNote(e)}>
          <div className="form-row">
            <div className="form-item">
              <label>Name:</label>
              <input type="text" ref={nameRef} />
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
              hidden
              id="output"
              width="200px"
              height="200px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="form-row">
            <div className="form-item">
              <label>Note:</label>
              <textarea style={{ fontSize: "20px" }} ref={noteRef} />
            </div>
          </div>
          <div className="btn-row">
            <a className="btn btn-primary" href="/notes">
              Cancel
            </a>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
