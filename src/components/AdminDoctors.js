import { useEffect, useState } from "react";
import { getDoctors, addDoctor, removeDoctor } from "../backend";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors().then(setDoctors);
  }, []);

  return (
    <>
      <h2>Doctors</h2>
      <button onClick={() => addDoctor(prompt("Doctor email"))}>
        Add Doctor
      </button>

      <ul>
        {doctors.map(d => (
          <li key={d.id}>
            {d.email}
            <button onClick={() => removeDoctor(d.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminDoctors;
