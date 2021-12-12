import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import styled from 'styled-components'
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi'


import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Navbar from '../../components/Navbar'


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
    margin-top: 150px;
    margin-bottom: 100px;
    padding: 20px;
    background: #070729a4;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;

`

const WrapperTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

`

const LeftTop = styled.div`
    flex: 0.4;
    display: flex;
    justify-content: flex-start;
`

const RightTop = styled.div`
    flex: 0.6;
    display: flex;
    justify-content: flex-end;
`

const WrapperMiddle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

`

const Stats = styled.div` 
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 18px;


`
const IconContainer = styled.div` 
    margin-right: 10px;
    
`

const StatsCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`

const Description = styled.div`
    

    p {
        font-size: 18px;
        color: lightgray;
    }

`
const Linking = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

`

const Redirect = styled.div` 
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
`

const ImgContainer = styled.div`
    flex: 0.3;
    margin-right: 5px;
   
`



const CoinDetailContainer = styled.div` 

`



const cryptodetails = () => {
    const router = useRouter()
    const { id } = router.query
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(id)
    const cryptoDetails = data?.data?.coin;

    console.log(cryptoDetails?.price)

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> }, 
        { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        // { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        // { title: 'Total Supply', value: `$ ${millify(cryptoDetails?.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        // { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails?.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <>
            <Navbar />
            <Container>
                
                <Wrapper>
                <CoinDetailContainer>
                    <WrapperTop>
                        <LeftTop>
                            <h1 style={{color: '#7257d1'}}>{cryptoDetails?.name} ({cryptoDetails?.slug})</h1> 
                            </LeftTop>
                    
                            {/* <p>{cryptoDetails?.name} live price in US dollars. View value stats, market cap and supply.</p> */}
                            
                        <RightTop>
                            <select 
                                defaultValue="7d" 
                                placeholder="Select time period"
                                onChange={(value) => setTimePeriod(value)}
                            >
                                {time.map((date) => <option key={date}>{date}</option>)}
                            </select>
                        </RightTop>
                        
                    </WrapperTop>
                    <WrapperMiddle>
                    <>
                            {stats.map(({ icon, title, value }) => (
                                <Stats>
                                    <StatsCard>
                                        <IconContainer>{icon}</IconContainer>
                                    </StatsCard>
                                    <StatsCard>
                                        <h4>{title} <span style={{opacity:'0'}}>1</span></h4>
                                    </StatsCard>
                                    <StatsCard>
                                        <h4 style={{fontWeight: '300'}}>{value}</h4>
                                    </StatsCard>   
                                </Stats> 
                            ))}
                        </>
                        <Description>
                            {HTMLReactParser(`${cryptoDetails?.description}`)}
                        </Description>
                        
                        
                        <Linking>
                            <h3>Links:</h3>
                                {cryptoDetails?.links.map((link) => (
                                    <>
                                        {/* <Redirect >
                                            <p>{link.type} </p>
                                            
                                        </Redirect> */}
                                        <Redirect key={link.name}>
                                            <a href={link.url} target="_blank" rel="noreferrer">
                                                {link.name}
                                            </a>
                                        </Redirect>
                                    </>
                            ))}
                        </Linking>
                        </WrapperMiddle>
                </CoinDetailContainer>
                </Wrapper>
            </Container>
        </>
    )
}

export default cryptodetails
