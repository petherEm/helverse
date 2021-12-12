import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import millify from 'millify'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import BackgroundImage from '../public/img/background.jpg'

import { useGetCryptoDetailsQuery } from '../services/cryptoApi'


import { RightCircleOutlined, MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';




const Container = styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;

`

const Card = styled.div`
    position: absolute;
    /* transform: translateY();
    transform: translateX(-110%); */
    top: 150px;
    right: 20px;

    display: flex;
    flex-direction: column;
    height: 350px;
    width: 310px;
    margin: 10px;
    padding: 20px;
    padding-right: 0;
    color: white;
    /* border: 1px solid white; */
    border-radius: 10px;
    z-index: 10;

    @media only screen and (max-width: 400px) {
       top: 50px;
       left: 10px;
       height: 280px;
       width: 220px;
    
    }

    p {
        margin-top: 5px;
        font-size: 18px;

        @media only screen and (max-width: 400px) {
            margin-top: 3px;
            font-size: 14px;  
            line-height: 3px;
        }
    }

    h3 {
        font-size: 24px;
        display: inline;

        @media only screen and (max-width: 400px) {
            font-size: 18px;  

        }
    }

    background: #070729a4;

    
    
`

const Title = styled.h1`
    position: absolute;
    transform: translateY(-100%);
    font-size: 50px;
    margin: 0;
    color: white;
    z-index: 20;

    span {
        color: #7257d1;
    }

    @media only screen and (max-width: 400px) {
            top: 450px;
        }
`
const Desc = styled.p`
    font-size: 20px;
    margin: 0;
`

const ButtonDiscover = styled.button`
    border: none;
    position: absolute;
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
    z-index: 20;

    &:hover {
        background-color: #a18de9;
    }
    @media only screen and (max-width: 400px) {
            top: 450px;
        }

`


const Intro = () => {

    const { data, isFetching } = useGetCryptoDetailsQuery(62765)
    const cryptoDetails = data?.data?.coin;

    console.log(cryptoDetails?.change)

    if(isFetching) return 'Loading...';
   
    return (
        <Container>
            <Image 
                src={BackgroundImage} 
                objectFit="cover"
                layout="fill"
                
            />
            <Card>
                <h3>HNT today:</h3>
                <p>
                    <DollarCircleOutlined /> Price: <b>${millify(cryptoDetails?.price)}</b>  {cryptoDetails?.change > 0 ? <p style={{color: 'lightgreen', display: 'inline'}}>{millify(cryptoDetails?.change)} %</p> : <p style={{color: 'red', display: 'inline'}}>{millify(cryptoDetails?.change)} %</p>}
                </p>
                <p><ThunderboltOutlined /> Vol: <b>${millify(cryptoDetails?.volume)}</b></p>
                <p><DollarCircleOutlined /> Market Cap: <b>${millify(cryptoDetails?.volume)}</b></p>
                <p><TrophyOutlined /> All Time High: <b>${millify(cryptoDetails?.allTimeHigh.price)}</b></p>
                <br />
                <Link href="/cryptocurrencies">
                    <p style={{cursor: 'pointer', color: 'lightblue'}}>See other cryptocurrencies  <RightCircleOutlined /></p>
                </Link>   
            </Card>
            <Title>
                <span>helium</span>Verse
            </Title>
            <ButtonDiscover>
                EXPLORE
            </ButtonDiscover>

            {/* <Card>
               
                <Desc>
                    Your ultimate guide to Helium's People-Powered Networks.
                </Desc>
                <ButtonDiscover>
                    DISCOVER
                </ButtonDiscover>
            </Card>

            <Card>Second</Card>
             */}
            
        </Container>
        )
}

export default Intro
