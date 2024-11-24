import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getNotes, createNote, updateNote } from "./request"

const App = () => {
  const queryClinet = useQueryClient()


  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      // queryClinet.invalidateQueries({ queryKey: ['notes'] })
      const notes = queryClinet.getQueriesData(['notes'])
      queryClinet.setQueryData(['notes'], notes.concat(newNote))
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const updateNoteMutation = useMutation({ 
    mutationFn: updateNote,
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isLoading){
    return <div>loading data...</div>
  }

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App