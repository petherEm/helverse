import axios from 'axios'
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import CancelIcon from '@mui/icons-material/Cancel';


const Container = styled.div`  
    width: 300px;
    height: 250px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
   

`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    input {
        padding: 2px;
        border: none;
        border-bottom: 1px solid gray;
        font-size: 16px;
        margin-bottom: 5px;

    }
`

const ButtonReg = styled.button`
        width: 200px;
        height: 40px;
        margin-top: 10px;
        border: none;
        border-radius: 10px;
        color: white;
        background-color: teal;
        font-size: 18px;
`

const Success = styled.span` 
        color: green;
        font-size: 12px;
        text-align: center;
`
const Failure = styled.span` 
        color: red;
        font-size: 12px;
        text-align: center;
`

const Register = ({setShowRegister}) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        try {

            await axios.post('/api/users/register', newUser);
            setError(false)
            setSuccess(true)


        } catch {
            setError(true)
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={passwordRef}/>
                <ButtonReg>Register</ButtonReg>
                {success && <Success>Successfull, you can login now!</Success>}
                {error && <Failure>Something went wrong!</Failure>}
                
            </Form>
            <CancelIcon style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                cursor: 'pointer'

            }}
                onClick={() => setShowRegister(false)}
            />
            
        </Container>
    )
}

export default Register
