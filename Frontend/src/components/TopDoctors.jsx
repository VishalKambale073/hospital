import React, { useEffect, useState } from 'react'
import Doctor from './Doctor'
import '../CSS/TopDoctors.css'

const TopDoctors = () => {
  const [doctors,setDoctors] = useState([]);

  useEffect(()=>{
    const fetchDoctors = async ()=>{
      try {
        const response = await fetch('http://localhost:3000/api/alldoctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchDoctors();
  },[])
  return (
    <div className='TopDoctors-container'>
        <div className='TopDoctors-heading'>
            <h1>Our Top Doctors</h1>
        </div>
        <div className="Doctors">
          {
            doctors.map((doctor,index)=>{
             return <Doctor key={index} doctor={doctor}/>
            })
          }
            
        </div>
    </div>
  )
}

export default TopDoctors