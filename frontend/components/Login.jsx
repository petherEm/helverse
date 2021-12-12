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
        background-color: lightblue;
        font-size: 18px;
        cursor: pointer;
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

const Login = ({setShowLogin, myStorage, setCurrentUser}) => {
    const [error, setError] = useState(false)
    const nameRef = useRef()
    
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        };

        try {

            const res = await axios.post('/api/users/login', user);
            setCurrentUser(res.data.username)
            setShowLogin(false)
            if (typeof window !== 'undefined') {
                myStorage.setItem('user', res.data.username)
            }
            
            setError(false)

        } catch {
            setError(true)
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}/>
                
                <input type="password" placeholder="password" ref={passwordRef}/>
                <ButtonReg>Login</ButtonReg>
                
                {error && <Failure>Something went wrong!</Failure>}
                
            </Form>
            <CancelIcon style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                cursor: 'pointer'

            }}
                onClick={() => setShowLogin(false)}
            />
            
        </Container>
    )
}

export default Login
