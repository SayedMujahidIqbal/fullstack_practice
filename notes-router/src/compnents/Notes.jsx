import React from 'react'
import { Link } from 'react-router-dom'

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {
          notes.map(n => 
              <li key={n.id}>
                  <Link to={`/notes/${n.id}`}>{n.content}</Link>
              </li>
          )
      }
    </ul>
  </div>
)

export default Notes
