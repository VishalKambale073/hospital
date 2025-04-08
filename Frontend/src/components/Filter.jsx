import React from 'react';
import "../CSS/Filter.css"

const Filter = () => {
  const filterArray = [
    { name: "Speciality", value: ["Cardiologist", "Dermatologist", "Endocrinologist", "Gastroenterologist", "Hematologist", "Nephrologist", "Neurologist", "Oncologist", "Ophthalmologist", "Pediatrician", "Psychiatrist",] },
    { name: "Degree", value: ["MBBS", "MD", "MS", "DM", "MCH", "BDS", "MDS", "BAMS", "BHMS", "BUMS", "BNYS", "BYNS", "BPT", "BOT", "BMLT"] },
    { name: "Experience", value: ["0-5 years", "5-10 years", "10-15 years", "15-20 years", "20-25 years", "25-30 years", "30-35 years",] }
  ];

  return (
   
<div className='Filter-container'>
  <p className='Filter-heading'>Search Using Filter</p>
  {
    filterArray.map((item,index)=>(

      <div key={index} className='Filter-div'>
        <h2>{item.name}</h2>
        {
          item.value.map((data,subIndex)=>(
            <div key={subIndex} className='Filter-values-div'>
              <input type="checkbox" name={item.name} id={data} />
              <label htmlFor={data}>{data}</label>
            </div>
          ))
        }
      </div>

    ))
  }
  <div className='Search-button-div'>
    <button type='submit'>Search</button>
  </div>
</div>
  );
};

export default Filter;
