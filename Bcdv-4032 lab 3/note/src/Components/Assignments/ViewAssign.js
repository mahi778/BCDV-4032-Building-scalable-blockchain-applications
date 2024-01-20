import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewAssign() {
  const { state } = useLocation();
  const { assign } = state;
  const navigate = useNavigate();

  const editAssign = () => {
    navigate("/assignments/edit", { state: { assign } });
  };

  const deleteAssign = (e) => {
    e.preventDefault();
    axios
      .delete(`/assignments/${assign._id}`)
      .then((res) => {
        if (res.data.data === "Assignment deleted successfully!") {
          navigate("/assignments");
        } else {
          console.error(res.data.data);
        }
      });
  };
  return (
    <div className="container">
      <h2 className="page-header">{assign.name}</h2>

      <div className="inner-container">
        <img
          alt="assignment"
          width="100%"
          height="500px"
          style={{ objectFit: "contain" }}
          src={assign.assignImg}
        />
        <p
          style={{
            fontFamily: "Roboto Mono, monospace",
            color: "var(--font-color)",
          }}
        >
          <span
            style={{
              fontFamily: "Roboto Mono, monospace",
              color: "var(--font-color)",
            }}
          >
            Deadline: {assign.deadline.split("T")[0]}
          </span>
        </p>
        <p
          style={{
            fontFamily: "Roboto Mono, monospace",
            color: "var(--font-color)",
          }}
        >
          <span
            style={{
              fontFamily: "Roboto Mono, monospace",
              color: "var(--font-color)",
            }}
          >
            Subject: {assign.subject}
          </span>
        </p>
        <span
          style={{
            fontFamily: "Roboto Mono, monospace",
            color: "var(--font-color)",
          }}
        >
          {assign.priority ? "**Important**" : ""}
        </span>
        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => editAssign()}>
            Edit
          </button>
          <form onSubmit={(e) => deleteAssign(e)}>
            <button className="btn btn-primary">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
}
