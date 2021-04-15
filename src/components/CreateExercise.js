import React, { useState } from "react";

export const CreateExercise = () => {
  const [exercise, SetExercise] = useState({
    username: "",
    description: "",
    duration: "",
    date: "",
  });

  return (
    <section>
      <form className="form-container">
        <div className="mb-3">
          <label for="username" className="form-label">
            Username
          </label>
          <select className="form-control">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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
        {exercise.duration}
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

        <button className="btn btn-success">Guardar Usuario</button>
      </form>
    </section>
  );
};
