import React, { useState, useEffect } from "react";
import { Alert } from "../components/Alert";

const url = "http://localhost:5000/";

export const CreateExercise = () => {
  const [exercise, SetExercise] = useState({
    username: "",
    description: "",
    duration: "",
    date: "",
  });
  const [users, SetUsers] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  //Fetch users from users db
  const getUsers = async () => {
    const response = await fetch(url + "users/");
    const users = await response.json();

    SetUsers(users);
    SetIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const saveExerciseDB = () => {
    SetExercise({ ...exercise, date: new Date() });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exercise),
    };

    fetch(url + "exercises/add", requestOptions)
      .then((response) => {
        if (response.ok) {
          response.json();
        } else {
          showAlert(true, "Error adding exercise", "danger");
          throw new Error("Error adding exercise");
        }
      })
      .then((data) => {
        showAlert(true, "Exercise added", "success");
      })
      .catch((error) => {
        showAlert(true, "Error adding exercise", "danger");
      });
  };

  const saveExercise = (e) => {
    e.preventDefault();
    if (
      exercise.username === "" ||
      exercise.description === "" ||
      exercise.duration === ""
    ) {
      showAlert(true, "Please Fill out all fields!!", "danger");
    } else {
      saveExerciseDB();
    }
  };

  if (isLoading) {
    return <section> Loading Content... </section>;
  }

  return (
    <section>
      {alert.show && <Alert action={alert} removeAlert={showAlert} />}
      <form className="form-container" onSubmit={saveExercise}>
        <div className="mb-3">
          <label for="username" className="form-label">
            Username
          </label>
          <select
            className="form-control"
            onChange={(e) => {
              SetExercise({ ...exercise, username: e.target.value });
            }}
          >
            <option value=""></option>
            {users.map((user, i) => {
              return (
                <option key={i} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label for="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={exercise.description}
            onChange={(e) =>
              SetExercise({ ...exercise, description: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label for="duration" className="form-label">
            Duration
          </label>
          <input
            type="number"
            className="form-control"
            id="duration"
            value={exercise.duration}
            onChange={(e) =>
              SetExercise({ ...exercise, duration: e.target.value })
            }
          />
        </div>

        <button className="btn btn-success" type="submit">
          Guardar Usuario
        </button>
      </form>
    </section>
  );
};
