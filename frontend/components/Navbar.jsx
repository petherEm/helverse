import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Burger from './Burger'

const Container = styled.div`
    position: fixed;
    height: 50px;
    width: 100%;
    background-color: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    font-size: 18px;
    text-decoration: none;
    z-index: 888;

    @media only screen and (max-width: 400px) {
        padding: 10px;
        
    }
    

`

const Logo = styled.div`
    text-decoration: none;
    cursor: pointer;
    font-size: 26px;
`
const UnorderedList = styled.ul`
    /* display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    margin-right: 30px; */

    @media only screen and (max-width: 400px) {
        display: none;
        
    }
`
const NavItem = styled.li`
    display: inline;
    margin-right: 30px;
    font-size: 18px;
    color: white;
    cursor: pointer;

    &:hover {
        color: lightgray;
    }
`

const Navbar = () => {
    return (

        <Container>
            <Link href="/"><Logo><span style={{color: '#7257d1', fontWeight: 'bold'}}>helium</span><span style={{fontWeight: 'bold'}}>Verse</span></Logo></Link>
            {/* <span style={{color: 'red'}}>MAP - UNDER CONSTRUCTION || MOBILE NOT READY</span> */}
            <UnorderedList>
                <Link href="#">
                    <NavItem>
                        Helium
                    </NavItem>
                </Link>
                <Link href="#">
                    <NavItem>
                        News
                    </NavItem>
                </Link>
                <Link href="/cryptocurrencies">
                    <NavItem>
                        Crypto
                    </NavItem>
                </Link>
                <Link href="/map">
                    <NavItem>
                        Map
                    </NavItem>
                </Link>
                <Link href="/map">
                    <NavItem>
                        FAQ
                    </NavItem>
                </Link>
                <Link href="#">
                    <NavItem>
                        Contact
                    </NavItem>
                </Link>
               
            </UnorderedList>
            <Burger />
            
        </Container>
    )
}

export default Navbar
