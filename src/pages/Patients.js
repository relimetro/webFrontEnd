import React from "react";
import { backend_GetNews, backend_login } from "../backend.js";

function Patients() {

  // example usage (note danis code only sometimes responds to requests so until I fix that might need to call multiple times (will get 501 not implemented)
  // note: i dont think calling functions directly in function body is a best practise in react but that sounds like a frontend person problem
  backend_GetNews( e => console.log(e))
  backend_GetNews( e => console.log(e))
  backend_GetNews( e => console.log(e))
  backend_GetNews("Eoin","12345", e => console.log(e)) // last argument is callback that recieves response, all prev arguments are part of request

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Patient Dashboard</h1>
      <p>This page will show dementia risk scores for patients.</p>
    </div>
  );
}

export default Patients;
