import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import moment from 'moment'


const Container = styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    background: rgb(56,68,75);
    background: radial-gradient(circle, rgba(56,68,75,1) 0%, rgba(35,43,48,1) 100%); 

    h1 {
        color: white;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    p {
        color: white;
        font-size: 16px;
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 80%;
    padding: 0 10px;

    @media only screen and (max-width: 400px) {
            width: 90%;
            padding: 0 5px;
        }
`

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const HeliumIntro = () => {

    return (
        <Container>
            <Wrapper>
                    <h1>People Powered Network.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cumque sunt accusantium recusandae repellendus vitae non cupiditate autem ab quo?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti at quaerat sint est tenetur animi eligendi accusamus optio voluptatibus provident facilis eos, vel numquam sunt fugit nisi doloribus! Autem, reiciendis ratione. Ducimus perferendis sunt dicta, autem obcaecati quae excepturi.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti at quaerat sint est tenetur animi eligendi accusamus optio voluptatibus provident facilis eos, vel numquam sunt fugit nisi doloribus! Autem, reiciendis ratione. Ducimus perferendis sunt dicta, autem obcaecati quae excepturi.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti at quaerat sint est tenetur animi eligendi accusamus optio voluptatibus provident facilis eos, vel numquam sunt fugit nisi doloribus! Autem, reiciendis ratione. Ducimus perferendis sunt dicta, autem obcaecati quae excepturi.</p>
                    
               
            </Wrapper>
        </Container>
    )
}

export default HeliumIntro
