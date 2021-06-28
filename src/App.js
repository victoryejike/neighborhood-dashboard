import "./styles.css";
import Tables from "./components/Tables";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import db from "./firebase";

export default function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    const docRef = db.collection("Access Pass");
    docRef.get().then((querySnapshot) => {
      const collections = querySnapshot.docs.map(
        (doc) => doc.data().requestDetails
      );
      let collection = collections.filter((col) => col.length !== 0);
      //console.log(collection);
      setData(collection);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  //console.log(data);
  return (
    <div className="App">
      <h1 style={{ marginBottom: "30px" }}>
        Neighborhood Access Pass Dashboard
      </h1>

      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/"
          render={(props) =>
            sessionStorage.getItem("user") ? (
              <Tables {...props} tableData={data} />
            ) : (
              <Redirect to="/signup" />
            )
          }
        />
      </Switch>
    </div>
  );
}
