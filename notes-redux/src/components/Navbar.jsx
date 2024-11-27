import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import React from 'react'

const Navbar = () => {
  return (
    <AppBar position='static'>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">    
            </IconButton>
            <Button color='inherit'>
                home
            </Button>
            <Button color='inherit'>
                notes
            </Button>
            <Button color='inherit'>
                users
            </Button>
            <Button color='inherit'>
                login
            </Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
