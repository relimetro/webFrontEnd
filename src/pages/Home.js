import React, { useEffect } from 'react';
import {backend_request} from '../backend.js';

function Home() {
	useEffect( ()=> { backend_request("bob",(data)=>{console.log(data)}) }, []);
	return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to the NeuroMind Web Portal</h1>
      <p>This is a prototype demo created for the group project submission.</p>
      <p>
        The system will allow healthcare professionals to view dementia risk
        scores and reports for their patients.
      </p>
    </div>
  );
}

export default Home;
