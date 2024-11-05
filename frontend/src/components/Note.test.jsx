import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from './Note'
import { expect, vi } from "vitest";


test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

   //const { container } = render(<Note note={note} />)

    //const element = screen.getByText('Component testing is done with react-testing-library')
    // expect(element).toBeDefined()

    // const div = container.querySelector('.note')
    // expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    //render(<Note note={note} />)
    //screen.debug() // prinst components in html to the console
    render(<Note note={note} />)
    const element = screen.getByText('Component testing is done with react-testing-library')
    screen.debug(element)
    expect(element).toBeDefined() //print the wanted element to the console
})

test('clicking the button calls the event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = vi.fn()

    render(<Note note={note} toggleImportance={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
})