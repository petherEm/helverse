import React from 'react'
import styled from 'styled-components'
import Link from 'next/link';
import { Mail, LinkedIn, GitHub, Instagram } from '@material-ui/icons'

const Wrapper = styled.div`
    overflow: hidden;
    background-color: black;
    color: white;
    width: 100%;
    height: 80px;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 480px) {
        padding: 5px 10px;
       

    }
    
`
const RightWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 480px) {
        font-size: 15px;
    }
`
const LeftWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 480px) {
        font-size: 15px;
    }
    
`
const Signature = styled.div`
    float: left;
    font-size: 22px;
    font-weight: 200;

    @media only screen and (max-width: 480px) {
        font-size: 15px;
    }
`

const MenuItem = styled.li`
    margin-right: 30px;
    font-size: 22px;
    font-weight: bold;
    color: white;
    list-style: none;
    cursor: pointer;

`

const Footer = () => {
    return (
        <Wrapper>
            <LeftWrapper>
            
                <Signature>
                    Created by 
                    <Link href="http://www.piotrmaciejewski.com" >
                        <b style={{cursor: 'pointer'}}> Piotr.</b>
                    </Link>
                </Signature>
            
            </LeftWrapper>
            <RightWrapper>
                    <Link href="https://www.linkedin.com/in/piotrek-maciejewski" target="_blank">
                        <MenuItem><LinkedIn style={{color: '#0f20b3'}, {fontSize: '30px'}}/></MenuItem>
                    </Link>
                    <Link href="https://github.com/petherEm" target="_blank">
                        <MenuItem><GitHub style={{color: '#0f20b3'}, {fontSize: '30px'}}/></MenuItem>
                    </Link>
            </RightWrapper>
                    
            
        </Wrapper>
    )
}

export default Footer
