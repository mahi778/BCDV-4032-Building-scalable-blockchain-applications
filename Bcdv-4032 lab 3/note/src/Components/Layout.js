import React, { useEffect } from "react";
import { FaGithub, FaMoon } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  function changeColor() {
    document.body.classList.toggle("dark-theme");
  }

  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navMenuMobile = document.querySelector(".nav-menu-mobile");

    hamburger.addEventListener("click", mobileMenu);

    function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenuMobile.classList.toggle("active");
    }
  }, []);

  return (
    <>
      <header className="header">
        <nav className="header-nav">
          <button
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", background: "none", border: "none" }}
            className="header-title"
          >
            note.
          </button>
          <ul className="nav-menu-desktop">
            <li>
              <button
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none"
                }}
                onClick={() => navigate("/assignments")}
              >
                Assignments
              </button>
            </li>
            <li>
              <button
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}
                onClick={() => navigate("/assignments/new")}
              >
                Add Assignment
              </button>
            </li>
            <li>
              <button
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}
                onClick={() => navigate("/notes")}
              >
                Notes
              </button>
            </li>
            <li>
              <button
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}
                onClick={() => navigate("/notes/new")}
              >
                Add Note
              </button>
            </li>
            <li>
              <button
                id="switchmode"
                onClick={() => changeColor()}
                className="mode-icon"
              >
                <FaMoon />
              </button>
            </li>
          </ul>

          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
      <ul className="nav-menu-mobile">
        <li className="nav-item">
          <button
            style={{ cursor: "pointer", background: "none", border: "none" }}
            onClick={() => navigate("/assignments")}
          >
            Assignments
          </button>
        </li>
        <li className="nav-item">
          <button
            style={{ cursor: "pointer", background: "none", border: "none" }}
            onClick={() => navigate("/assignments/new")}
          >
            Add Assignment
          </button>
        </li>
        <li className="nav-item">
          <button
            style={{ cursor: "pointer", background: "none", border: "none" }}
            onClick={() => navigate("/notes")}
          >
            Notes
          </button>
        </li>
        <li className="nav-item">
          <button
            style={{ cursor: "pointer", background: "none", border: "none" }}
            onClick={() => navigate("/notes/new")}
          >
            Add Note
          </button>
        </li>
        <li className="nav-item">
          <button
            id="switchmode"
            onClick={() => changeColor()}
            className="mode-icon"
          >
            <FaMoon />
          </button>
        </li>
      </ul>

      <Outlet />

      <footer>
        <div
          className="social"
          style={{
            fontFamily: "Roboto Mono, monospace",
            fontSize: "13px",
            color: "var(--font-color)",
          }}
        >
          <a
            href="https://www.github.com/Ananya2001-an/note"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </footer>
    </>
  );
}
