import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Login from "./login";
import Home from "./Home";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyB82XYAH9XtHfEK_f38RT4wR5RFKUg_ytM",
  authDomain: "bos-project.firebaseapp.com",
  databaseURL: "https://bos-project.firebaseio.com",
  projectId: "bos-project",
  storageBucket: "bos-project.appspot.com",
  messagingSenderId: "658979315847"
};
firebase.initializeApp(config);

ReactDOM.render(<Login />, document.getElementById("root"));

serviceWorker.unregister();
