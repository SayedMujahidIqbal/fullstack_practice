import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event';
import Note from './Note'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = vi.fn()
    const user = userEvent.setup()

    render(<NoteForm createNote={createNote} />)

    ////// if form has only one input /////////
    const input = screen.getByRole('textbox')
    
    //// If form has multiple inputs, then user below statement ///////////
    //const inputs = screen.getAllByRole('textbox')
    
    ///// If input field has placeholder text, then user below statement /////
    //const input = screen.getByPlaceholderText('write note content here')
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing a form...')
    //// If form has multiple inputs, then user below statement ///////////
    //await user.type(inputs[0], 'testing a form...')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')

    console.log(createNote.mock.calls)


    ///////////// If form input has id attribute //////////////
    // const { container } = render(<NoteForm createNote={createNote} />)
   // const input = container.querySelector('#note-input') /// this line will fetch the input with id=note-input using querySelector method

})

////// Let assume that a component would render text to an HTML element as <li>Your awesome note: {note.content} </li>

test('renders content', async () => {
    const note = {
        content: 'Does not work anymore :(',
        important: true
    }

    render(<Note note={note} />)

    //The getByText method looks for an element that has the same text that it has as a parameter, and nothing more. If we want to look for an element that contains the text, we could use an extra option
    //const element = screen.getByText('Does not work any more :(', {exact: false})

    // or we could use the findByText method:
    const element = await screen.findByText('Does not work anymore :(')
    // It is important to notice that, unlike the other ByText methods, findByText returns a promise!
    expect(element).toBeDefined()
})

// There are situations where yet another form of the queryByText method is useful. The method returns the element but it does not cause an exception if it is not found.
// We could eg. use the method to ensure that something is not rendered to the component:
test('does not render this', () => {
    const note = {
        content: 'This is a reminder',
        important: true
    }

    render(<Note note={note} />)

    const element = screen.queryByText('do not want this thing to be rendered')
    expect(element).toBeNull()
})