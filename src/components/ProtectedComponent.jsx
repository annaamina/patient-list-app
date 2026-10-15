import React, { useState, useEffect } from 'react';

function ProtectedComponent() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Use the exact credentials from your PDF instructions
        const username = "doctosmarttest";
        const password = "$2y$12$9Za7UtNOljRUWVmVrq8yv.ZpuzEhK6yzI.gdKRCxw2EtUfvxySV3S";

        // 2. Encode them to Base64 using btoa()
        const encodedCredentials = btoa(`${username}:${password}`);

        // 3. Use the exact API URL from your PDF instructions
        const response = await fetch(
          "/api/patients?user_id=1&clinic_id=1&page_no=0",
          {
            method: "GET",
            headers: {
              "Authorization": `Basic ${encodedCredentials}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        
        // Safely extract the array of patients from the response
        const patientList = Array.isArray(result) ? result : result.patients || result.data || [];
        setPatients(patientList);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h3>Patient List</h3>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Reg. ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <tr key={patient.id || index}>
                <td>{patient.reg_id || patient.id || "-"}</td>
                <td>{patient.name || "-"}</td>
                <td>{patient.gender || "-"}</td>
                <td>{patient.age || "-"}</td>
                <td>{patient.mobile || patient.phone || "-"}</td>
                <td>{patient.address || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No patients found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProtectedComponent;