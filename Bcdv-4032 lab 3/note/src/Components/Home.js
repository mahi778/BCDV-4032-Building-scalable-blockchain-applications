import React, { useState, useEffect } from "react";
import { FaFile } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(``)
      .then((res) => setAssignments(res.data));
  }, []);

  return (
    <div className="container">
      <h1 className="page-header">
        Important Assignments <FaFile />
      </h1>
      <div className="inner-container">
        <div className="grid">
          {Array.isArray(assignments) && assignments.length !== 0 && 
            assignments.map((assign) => {
              return (
                <>
                  <p
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() =>
                      navigate("/assignments/view", { state: { assign } })
                    }
                  >
                    {assign.name}
                  </p>
                  <p>{assign.subject}</p>
                  <p>{assign.deadline.split("T")[0]}</p>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}
