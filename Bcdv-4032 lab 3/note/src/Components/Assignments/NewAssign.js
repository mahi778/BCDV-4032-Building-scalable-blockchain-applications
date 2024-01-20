import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewAssign() {
  const nameRef = useRef();
  const deadlineRef = useRef();
  const priorityRef = useRef();
  const subjectRef = useRef();
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
  const addAssignment = async (e) => {
    e.preventDefault();
    const assignment = {
      name: nameRef.current.value,
      deadline: deadlineRef.current.value,
      img: image,
      subject: subjectRef.current.value,
      priority: priorityRef.current.value,
    };

    axios
      .post(`/assignments`, assignment)
      .then((res) => {
        if (res.data.data === "Assignment saved successfully!") {
          navigate("/assignments");
        } else {
          console.error(res.data.data);
        }
      });
  };

  return (
    <div className="container">
      <h2 className="page-header">New Assignment</h2>
      <div className="inner-container">
        <form onSubmit={(e) => addAssignment(e)}>
          <div className="form-row">
            <div className="form-item">
              <label>Name:</label>
              <input type="text" ref={nameRef} />
            </div>
            <div className="form-item">
              <label>Deadline:</label>
              <input type="date" ref={deadlineRef} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <label>Subject:</label>
              <input type="text" ref={subjectRef} />
            </div>
            <div className="form-item">
              <label>Priority:</label>
              <select ref={priorityRef}>
                <option value="true">Important</option>
                <option value="false">Not Important</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-item">
              <label for="file" className="file-label">
                Attach image of assignment
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
          <div className="btn-row">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/assignments")}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
