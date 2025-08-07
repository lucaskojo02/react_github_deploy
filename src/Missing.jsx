import React from 'react'
import { NavLink } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found</h2>
      <p>Well, that's dissappointing.</p>
      <p>
        <NavLink to="/">Visit Our Homepage</NavLink>
      </p>
    </main>
  )
}

export default Missing