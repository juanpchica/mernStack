import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const url = "http://localhost:5000/";

export const ExercisesList = () => {
  const [exercises, SetExercises] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const deleteExercise = (id) => {
    fetch(url + "exercises/" + id, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          response.json();
        } else {
          alert("Error deleting exercise");
          throw new Error("Error deleting exercise");
        }
      })
      .then((data) => {
        console.log("Exercise deleted");
      })
      .catch((error) => {
        alert("Error deleting exercise");
      });

    SetExercises(exercises);
  };

  useEffect(() => {
    //Fetch users from users db
    const getExercises = async () => {
      const response = await fetch(url + "exercises/");
      const data = await response.json();

      SetExercises(data);
      SetIsLoading(false);
    };

    getExercises();
  }, [exercises]);

  if (isLoading) return <section> Loading Content... </section>;

  return (
    <>
      <ul className='list-group'>
        {exercises.map((exercise) => {
          console.log(exercise);
          return (
            <li key={exercise._id} className='list-group-item'>
              <div className='row'>
                <div className='col'>
                  <h3>{exercise.username}</h3>
                  <h4>{exercise.description}</h4>
                  <div>
                    <span>Duration: {exercise.duration}</span>
                    <span className='ml-5'>Date: {exercise.date}</span>
                  </div>
                </div>
                <div className='col'>
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      deleteExercise(exercise._id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    to={"/edit/" + exercise._id}
                    className='btn btn-primary'
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
