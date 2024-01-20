import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Assigns() {
  const [assignments, setAssignments] = useState([]);
  const searchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/assignments`)
      .then((res) => setAssignments(res.data));
  }, []);

  const search = (e) => {
    e.preventDefault();
    axios
      .get(
        `/assignments?search=${searchRef.current.value}`
      )
      .then((res) => setAssignments(res.data));
  };

  return (
    <div className="container">
      <h2 className="page-header">Search Assignments</h2>
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
          {Array.isArray(assignments) && assignments.length !== 0 &&
            assignments.map((assign) => {
              return (
                <button
                  onClick={() =>
                    navigate("/assignments/view", { state: { assign } })
                  }
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
                  {assign.name}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
