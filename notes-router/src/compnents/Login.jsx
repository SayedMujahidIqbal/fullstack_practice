import React from 'react'
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'


// const Button = styled.button`
//     background: Bsique;
//     font-size: 1em;
//     margin: 1em;
//     padding: 0.25em 1em;
//     border: 2px solid Chocolate;
//     border-radius: 3px;
// `

const Input = styled.input`
    margin:0.25em;
`

const Login = (props) => {
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mujahid')
        navigate('/')
    }
        
    return (
        <div>
            <h2>login</h2>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <FormLabel>username:</FormLabel>
                    <Form.Control
                        type='text'
                        name='username'
                    />
                    {/* <Input /> Styled component */} 
                </FormGroup>
                <FormGroup>
                    <FormLabel>password:</FormLabel>
                    <Form.Control
                        type='password'
                    />
                </FormGroup>
                <Button variant="primary" type='submit'>login</Button>
                {/* <Button type='submit'>Login</Button> styled component */}
            </Form>
        </div>
    )
}

export default Login
