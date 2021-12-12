import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import millify from 'millify'
import Link from 'next/link'
import { useGetCryptosQuery } from '../services/cryptoApi'


const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    
`

const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 200px;
    height: 3000px;
    background-color: white;
    color: black;
    margin: 10px;
`

const CardCrypto = styled.div`
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 200px;
    margin: 10px;
    padding: 20px;
    padding-right: 0;
    color: white;
    /* border: 1px solid white; */
    border-radius: 10px;
    cursor: pointer;
    background: #070729a4;

    &:hover {
        background-color: #292992a3;
        transform: scale(1.1);
        transition: 0.5s ease-in;
    }


    p {
        margin-top: 5px;
        font-size: 16px;
    }
    @media only screen and (max-width: 400px) {
            height: 180px;
            width: 100px;
            margin: 5px;
            padding: 5px;

            p {
                font-size: 12px;
            }
        }

    
    
`
const TopInCardCrypto = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  

`
const BottomInCardCrypto = styled.div`
    flex: 9;
    display: flex;
    flex-direction: column;
`

const ImgContainer = styled.div`
    flex: 0.3;
    margin-right: 5px;
   
`



const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;


    const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos ] = useState(cryptoList?.data?.coins);


    if(isFetching) return 'Loading...';
    

    return (
        <>
            <CardContainer>
                {cryptos?.map((currency) => (
                    <div key={currency.id}>
                        <Link href={`/crypto/${currency.id}`}>
                            <CardCrypto>
                                <TopInCardCrypto>
                                    <p style={{fontWeight: 'bold'}}>{currency.rank}. {currency.name} </p>
                                    <ImgContainer>
                                        <Image 
                                            src={currency.iconUrl} 
                                            width={30} 
                                            height={30} 
                                            layout='responsive'
                                        />
                                    </ImgContainer>
                                    
                                </TopInCardCrypto>
                                
                                <BottomInCardCrypto>
                                    <p>Price: {millify(currency.price)} USD</p>
                                    <p>Market Cap: {millify(currency.marketCap)}</p>
                                    
                                       {currency.change >= 0 ? <p style={{fontWeight: 'bold', color: 'lightgreen'}}>{millify(currency.change)} %</p> : <p style={{fontWeight: 'bold', color: 'red'}}>{millify(currency.change)} %</p>}
                                        {/* Daily Change: {millify(currency.change)}% */}
                                        
                                   
                                </BottomInCardCrypto>
                            </CardCrypto>
                        </Link>
                    </div>
                ))}
            </CardContainer>
            
        </>
    )
}

export default Cryptocurrencies
