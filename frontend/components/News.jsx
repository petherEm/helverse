import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'



const Container = styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(56,68,75);
    background: radial-gradient(circle, rgba(56,68,75,1) 0%, rgba(35,43,48,1) 100%); 

    h1 {
        color: white;
        margin-top: 30px;
        margin-bottom: 30px;

        @media only screen and (max-width: 400px) {
            padding: 5px;
        }
    }
    
    
`
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
   


`

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
    height: auto;
    min-height: 400px;
    width: 400px;
    margin: 13px;
    padding: 20px;
    padding-right: 0;
    color: white;
    /* border: 1px solid white; */
    border-radius: 10px;
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

    
    
`

const SelectCard = styled.select`
        width: 200px;
        height: 30px;
        border: none;



`
const TopInCardCrypto = styled.div`
    flex: 3;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 0;
    margin-bottom: 0;
    
  

`

const TitleCard = styled.h4` 
    margin-top: 0;
    flex: 2;
    margin-bottom: 0;

`
const ImgContainer = styled.div`
    flex: 0.7;
    margin: 0 8px 0 8px;

   
`


const MainInCardCrypto = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    width: 80%;

    p {
        font-size: 14px;
        color: lightgray;
    }
`
const BottomInCardCrypto = styled.div` 
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

`



const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data } = useGetCryptosQuery(100) 
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 })
    

    if(!cryptoNews?.value) return 'Loading...';

    return (
        <Container>
            <h1>Latest News from Crypto World</h1>

            {/* -------------I DO NOT KNOW HOW TO FIX IT ---------------*/}
            {/* NAMELY: SEARCH VALUE NEEDED TO SEARCH FOR RESPECTIVE CRYPTOCURRENCY NAME */}
            {/* {!simplified && (
                    <SelectCard 
                        showsearch
                        placeholder="Select a Crypto"
                        optionfilterprop="children"
                        onChange={(value) => setNewsCategory(value)}
                        filteroption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                     >
                        <option value="Cryptocurrency">Cryptocurrency</option>
                        {data?.data?.coins.map((coin) => <option value={coin.name}>{coin.name}</option>)}
                    </SelectCard>
                    
            )} */}
                
                
            <Wrapper>
                {cryptoNews.value.map((news, i) => (
                    
                        <CardCrypto key={i}>
                            <TopInCardCrypto>
                                <TitleCard>{news.name}</TitleCard>
                                <ImgContainer>
                                    <Image src={news?.image?.thumbnail?.contentUrl || demoImage} width={130} height={130} alt="news"/>
                                </ImgContainer>
                            </TopInCardCrypto>
                            <MainInCardCrypto>
                                    <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
                                    <p>
                                        {news.description > 100 
                                        ? `${news.description.substring(0, 100)}...`
                                        : news.description}
                                    </p>
                                
                            </MainInCardCrypto>
                            <BottomInCardCrypto>
                                <a href={news.url} rel="noreferrer" target="_blank"><h4 style={{cursor: 'pointer', paddingRight: '190px'}}>Read more...</h4></a>
                                <ImgContainer>
                                    <Image src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} width={40} height={40} alt="news"/>
                                </ImgContainer>
                            </BottomInCardCrypto>
                        </CardCrypto>
                ))}
            </Wrapper>
        </Container>
    )
}

export default News
