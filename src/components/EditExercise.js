import React, { useState, useEffect } from "react";
import { Alert } from "../components/Alert";
import { useParams } from "react-router-dom";

const url = "http://localhost:5000/";

export const EditExercise = () => {
  const { id } = useParams();

  const [exercise, SetExercise] = useState({});
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
  };
  const getExercise = async (id) => {
    console.log("id" + id);
    const response = await fetch(url + "exercises/" + id);
    const exercise = await response.json();
    SetExercise(exercise);
    SetIsLoading(false);
  };

  useEffect(() => {
    getUsers();
    getExercise(id);
  }, []);

  const editExerciseDB = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exercise),
    };

    fetch(url + "exercises/update/" + id, requestOptions)
      .then((response) => {
        if (response.ok) {
          response.json();
        } else {
          showAlert(true, "Error Editing exercise", "danger");
          throw new Error("Error Editing exercise");
        }
      })
      .then((data) => {
        showAlert(true, "Exercise Edited", "success");
      })
      .catch((error) => {
        showAlert(true, "Error Editing exercise", "danger");
      });
  };

  const editExercise = (e) => {
    e.preventDefault();
    if (
      exercise.username === "" ||
      exercise.description === "" ||
      exercise.duration === ""
    ) {
      showAlert(true, "Please Fill out all fields!!", "danger");
    } else {
      SetExercise({ ...exercise, date: new Date() });
      editExerciseDB();
    }
  };

  if (isLoading) {
    return <section> Loading Content... </section>;
  }

  return (
    <section>
      {alert.show && <Alert action={alert} removeAlert={showAlert} />}
      <form className="form-container" onSubmit={editExercise}>
        <div className="mb-3">
          <label for="username" className="form-label">
            Username
          </label>
          <select
            className="form-control"
            value={exercise.username}
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
          Edit Exercise
        </button>
      </form>
    </section>
  );
};
