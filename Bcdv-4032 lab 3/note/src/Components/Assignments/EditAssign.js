import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditAssign() {
  const { state } = useLocation();
  const { assign } = state;
  const nameRef = useRef();
  const deadlineRef = useRef();
  const priorityRef = useRef();
  const subjectRef = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState(assign.assignImg);

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

  const updateAssign = async (e) => {
    e.preventDefault();
    const newAssignment = {
      name: nameRef.current.value,
      deadline: deadlineRef.current.value,
      img: image,
      subject: subjectRef.current.value,
      priority: priorityRef.current.value,
    };

    axios
      .put(
        `/assignments/${assign._id}`,
        newAssignment
      )
      .then((res) => {
        if (res.data.data === "Assignment Updated successfully!") {
          navigate("/assignments");
        } else {
          console.error(res.data.data);
        }
      });
  };
  return (
    <div className="container">
      <h2 className="page-header">Edit Assignment</h2>
      <div className="inner-container">
        <form onSubmit={(e) => updateAssign(e)}>
          <div className="form-row">
            <div className="form-item">
              <label>Name:</label>
              <input type="text" ref={nameRef} defaultValue={assign.name} />
            </div>
            <div className="form-item">
              <label>Deadline:</label>
              <input
                type="date"
                ref={deadlineRef}
                defaultValue={assign.deadline}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <label>Subject:</label>
              <input
                type="text"
                ref={subjectRef}
                defaultValue={assign.subject}
              />
            </div>
            <div className="form-item">
              <label>Priority:</label>
              <select ref={priorityRef} defaultValue={assign.priority}>
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
              id="output"
              width="200px"
              height="200px"
              src={image}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="btn-row">
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/assignments/view", { state: { assign } })
              }
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
