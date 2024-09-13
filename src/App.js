import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");

  function update() {
    fetch("http://localhost:1337/api/joblists", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer bc55770e85deaa8c54d32ff42d8df040a99d1327f43217fcabcce6f47845818cf366ddf18be562be4827a0dd2f02c47736231c734c6086a68d288eda44790aec8d303b2e67740ba070199c137b9b5d09087ce674de7a64f106b921fe62ffe6086fcf2156dd11f9e1879883933cf5412866134e7b14dac33a9fc8c6544aa4f5df",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((todo) => {
        //  setTodos(todo.data); to prevent crash when data is empty
        setTodos(todo.data ?? []);
      });
  }
  useEffect(() => {
    update();
  }, []);

  return (
    <div>
      <div className="header">
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <div>
          <div className="menu1">
            <Link to="/">Job Board</Link>
          </div>

          <div className="menu2">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <br></br>

      <div>
        <div className="margin">
          <br />
        </div>
        <div className="filter">
          <br />
          <div>
            <button className="filter2 btn btn-info">filter Job list</button>
            <br />
            <br />
            <form className="filter3" method="get">
              <input
                type="radio"
                onChange={(event) =>
                  setSearch(event.target.value.toLowerCase())
                }
                name="c"
                value=""
              />
              <label>All Jobs</label>
              <br />
              <input
                type="radio"
                name="c"
                value="Backend"
                onChange={(event) =>
                  setSearch(event.target.value.toLowerCase())
                }
              />
              <label>Part Time</label>
              <br />
              <input type="radio" name="c" value="Internship" />
              <label>Internship</label>
              <br />
              <input type="radio" name="c" />
              <label>Freelance</label>
            </form>
          </div>
        </div>

        <div className="job">
          <div>
            <br />
            <div className="form-group">
              <label>Search:</label>
              <input
                type="text"
                placeholder="Search Job Title..."
                value={search}
                className="form-control"
                onChange={(event) =>
                  setSearch(event.target.value.toLowerCase())
                }
              />
            </div>
          </div>
          <br />
          <br />
          {todos.map((todo, i) => {
            const link = "apply?jobid=" + todo.id;
            const filter = JSON.stringify(todo.attributes).toLowerCase();
            if (filter.includes(search)) {
              return (
                <div key={i}>
                  <div>
                    <div className="detaills">
                      <img
                        alt="logo"
                        src="https://super-static-assets.s3.amazonaws.com/e7c0f16c-8bd3-4c76-8075-4c86f986e1b2/uploads/favicon/9c68ae10-0a8a-4e3f-9084-3625b19df9cb.png"
                        className="logo"
                      />
                      <div className="description">
                        <span className="span1">
                          {todo.attributes.JobPosition}
                        </span>
                        <span className="right">
                          {" "}
                          {todo.attributes.Location}
                        </span>
                        <span className="span2">
                          {todo.attributes.JobStatus}
                        </span>
                        <br />
                        <br />
                        <span className="span1">{todo.attributes.Agency}</span>
                      </div>
                    </div>
                    <div className="apply">
                      <a href={link}>
                        <button className="ap1">Apply Now</button>
                      </a>
                      <div className="ap2">{todo.attributes.Experience}</div>
                    </div>
                  </div>{" "}
                  <br />
                </div>
              );
            } else {
            }
            return <></>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
