import { BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExercisesList } from "./components/ExercisesList";
import { EditExercise } from "./components/EditExercise";
import { CreateExercise } from "./components/CreateExercise";
import { CreateUser } from "./components/CreateUser";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/" exact component={ExercisesList}/>
      <Route path="/edit/:id" component={EditExercise}/>
      <Route path="/create" component={CreateExercise}/>
      <Route path="/user" component={CreateUser}/>
    </Router>
  );
}

export default App;
