import React from 'react'
import styled from 'styled-components'
import millify from 'millify'
import Link from 'next/link'

import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'


const Container = styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(56,68,75);
    background: radial-gradient(circle, rgba(56,68,75,1) 0%, rgba(35,43,48,1) 100%); 

`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
   


`
const Top = styled.div`
    flex: 3;
    display: flex;
    
`

const Middle = styled.div`
    flex: 1;
    width: 80%;
    display: flex;
    justify-content: space-between;

    h2 {
        color: white;
        text-decoration: none;
    }

`
    

const Bottom = styled.div`
    flex: 7;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    overflow: hidden;
`



const Card = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 500px;
    margin: 30px;
    padding: 20px;
    padding-right: 0;
    color: white;
    /* border: 1px solid white; */
    border-radius: 10px;

    p {
        margin-top: 5px;
        font-size: 22px;
    }

    background: #070729a4;
    
`
const CardCrypto = styled.div`
    display: flex;
    flex-direction: column;
    height: 500px;
    width: 400px;
    margin: 30px;
    padding: 20px;
    padding-right: 0;
    color: white;
    /* border: 1px solid white; */
    border-radius: 10px;

    p {
        margin-top: 5px;
        font-size: 22px;
    }

    background: #070729a4;
    
`


const Title = styled.h1`
    position: absolute;
    transform: translateY(-100%);
    font-size: 50px;
    margin: 0;
    color: white;
    z-index: 999;

    span {
        color: #574b85;
    }
`
const Desc = styled.p`
    font-size: 20px;
    margin: 0;
`

const ButtonDiscover = styled.button`
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #7257d1;
    margin-top: 50px;
    color: white;
    font-weight: 300;
    font-size: 22px;
    text-decoration: none;
    width: 200px;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    z-index: 999;

    &:hover {
        background-color: #a18de9;
    }


`

const Services = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if(isFetching) return 'Loading...';

    return (
        <Container>
            <Wrapper>
                <Top>
                    <Card>
                        <p><span style={{color: '#7257d1', fontWeight: '500' }}>Total Cryptocurrencies:</span> {globalStats.total}</p>
                        <p><span style={{color: '#7257d1', fontWeight: '500' }}>Total Exchanges:</span> {millify(globalStats.totalExchanges)}</p>
                        <p><span style={{color: '#7257d1', fontWeight: '500' }}>Total Market Cap:</span> {millify(globalStats.totalMarketCap)}</p>
                        <p><span style={{color: '#7257d1', fontWeight: '500' }}>24h Volume:</span> {millify(globalStats.total24hVolume)}</p>
                        <p><span style={{color: '#7257d1', fontWeight: '500' }}>Total Markets:</span> {millify(globalStats.totalMarkets)}</p>
                    </Card>
                    <Card>
                        placeholder
                    </Card>
                </Top>
                <Middle>
                    <h2>Top 10 Cryptocurrencies</h2>
                    <h2><Link href="/cryptocurrencies">Show more...</Link></h2>
                </Middle>
                <Bottom>
                    
                    {/* <Link href="/cryptocurrencies">Show more...</Link> */}
                    <Cryptocurrencies simplified/>
                    
                    {/* <Link href="/news">latest crypto news</Link> */}
                    {/* <News simplified/> */}
                </Bottom>
                
            </Wrapper>

            
           
        </Container>
    )
}

export default Services
