import React, { useState } from 'react'
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthDispatch } from '../../context/auth'

const MyModal = ({ show, handleClose }) => {
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState({})

    const submitProfileForm = (e) => {
        e.preventDefault()
        console.log(url)
        // loginUser({ url })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={submitProfileForm}>
                    <Form.Group>
                        <Form.Label>Profile Url</Form.Label>
                        <Form.Control
                            type="text"
                            value={url}
                            onChange={(e) =>
                                setUrl(e.target.value)
                            }
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitProfileForm}>
                        Save Profile
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const NavBar = () => {
    const authDispatch = useAuthDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = () => {
        authDispatch({ type: 'LOGOUT' })
    }
    return (
        <>
            <MyModal show={show} handleClose={handleClose} />
            <Navbar bg="primary" variant="dark" style={{width: '100%'}}>
                <Navbar.Brand><Link to="/" style={{color: '#fff', textDecoration: 'none'}}>MyChatQL</Link></Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link onClick={handleShow}>Profile</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}

export default NavBar;