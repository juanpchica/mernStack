import React, { useState } from "react";
import { Alert } from "../components/Alert";

const url = "http://localhost:5000/";

export const CreateUser = () => {
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [user, SetUser] = useState({ username: "" });

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const saveUser = (e) => {
    e.preventDefault();
    if (user.username === "") {
      showAlert(true, "Please Fill out all fields!!", "danger");
    } else {
      saveUserDB();
    }
  };

  const saveUserDB = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    fetch(url + "users/add", requestOptions)
      .then((response) => {
        if (response.ok) {
          response.json();
        } else {
          showAlert(true, "Error adding User - verified now", "danger");
          throw new Error("Error adding User");
        }
      })
      .then((data) => {
        showAlert(true, "User added", "success");
      })
      .catch((error) => {
        showAlert(true, "Error adding User", "danger");
      });
  };

  return (
    <section>
      {alert.show && <Alert action={alert} removeAlert={showAlert} />}
      <form className='form-container' onSubmit={saveUser}>
        <div className='mb-3'>
          <label for='user' className='form-label'>
            Username
          </label>
          <input
            type='text'
            className='form-control'
            id='user'
            value={user.username}
            onChange={(e) => SetUser({ username: e.target.value })}
          />
        </div>

        <button className='btn btn-success' type='submit'>
          Guardar Usuario
        </button>
      </form>
    </section>
  );
};
