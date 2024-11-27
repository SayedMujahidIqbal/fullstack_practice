import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <Table striped>
      <tbody>
        {notes.map(n =>
          <tr key={n.id}>
            <td>
              <Link to={`/notes/${n.id}`}>{n.content}</Link>
            </td>
            <td>{n.user}</td>
          </tr> 
          )
        }
      </tbody>
    </Table>
  </div>
)

export default Notes
