import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProfileBtn.css'

import avatar from '../../Assets/nav/user.svg'
import Loader from '../Loader/Loader'

export default function ProfileBtn({ level, user_photo }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user_photo) {
      const img = new Image()
      img.src = user_photo
      img.onload = () => {
        setIsLoading(false)
      }
      img.onerror = () => {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [user_photo])

  return (
    <button
      className='profileBtn'
      onClick={() => navigate('/profile')}
      style={{ borderColor: level === 'Профи' ? '#A799FF' : '' }}
    >
      {isLoading ? (
        <Loader width={20} />
      ) : (
        <img src={user_photo ? user_photo : avatar} alt="аватар" style={{ transform: user_photo ? '' : 'scale(0.7)' }} />
      )}
      <div className="profileEllips"
        style={{ background: level === 'Профи' ? '#A799FF' : '' }}
      ></div>
    </button>
  )
}
