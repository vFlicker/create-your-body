import React from 'react'
import './TrainContainer.css'

export default function TrainContainer({ data, onClick }) {
  return (
    <div 
      className="container" 
      onClick={() => onClick(data)}
    >
      <div className="nameContainer">
        <img src={data.icon} alt={data.name} />
        <h2>{data.name}</h2>
      </div>
    </div>
  )
} 