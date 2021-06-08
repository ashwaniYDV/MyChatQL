import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Navbar, Nav, Button, Modal, Form, Spinner, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../context/auth'

const UPDATE_PROFILE = gql`
  mutation updateProfile($url: String!) {
    updateProfile(url: $url) {
      imageUrl
    }
  }
`

const MyModal = ({ show, handleClose }) => {
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState()
    const dispatch = useAuthDispatch()

    const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
        onError: (err) => {
            setErrors(err.message)
        },
        onCompleted: (data) => {
            console.log(data)
            dispatch({ type: 'UPDATE_PROFILE', payload: { imageUrl: url } })
            setUrl('')
            handleClose()
        }
      })

    const submitProfileForm = (e) => {
        e.preventDefault()
        if (!url || !url.trim()) {
            return;
        }
        // mutation for profileUpdate
        updateProfile({ variables: { url } })
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
                            required
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitProfileForm}>
                        {loading && <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        }
                        Save Profile
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const NavBar = () => {
    const authDispatch = useAuthDispatch()

    const { user } = useAuthState()

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
                    { user && (
                        <>
                            <Nav.Link onClick={handleShow}>Profile</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                            <Image src={user.imageUrl} width={'40px'} height={'40px'} roundedCircle />
                        </>
                        )
                    }
                    { !user && (
                        <>
                            <Nav.Link>
                                <Link to="/login" style={{color: '#fff', textDecoration: 'none'}}>Login</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/register" style={{color: '#fff', textDecoration: 'none'}}>Register</Link>
                            </Nav.Link>
                        </>
                        )
                    }
                </Nav>
            </Navbar>
        </>
    )
}

export default NavBar;