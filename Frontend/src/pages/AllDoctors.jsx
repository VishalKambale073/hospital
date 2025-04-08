import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Doctor from '../components/Doctor';
import Filter from '../components/Filter';

import '../CSS/AllDoctors.css';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]); // Initialize as empty array

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/alldoctors'); // Ensure the backend is running
        const data = await response.json();
        setDoctors(data); // Set the state with fetched data
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="AllDoctors-container">
        <div className="filter-div">
          <Filter />
        </div>
        <div className="doctors-div">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => <Doctor key={index} doctor={doctor} />)
          ) : (
            <p>No Doctor Found</p> // Show loading text if no data
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;
