import Head from 'next/head'
import Image from 'next/image'
import Intro from '../components/Intro'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Services from '../components/Services'
import News from '../components/News'
import HeliumIntro from '../components/HeliumIntro'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`


export default function Index() {
  
  return (
    <>
      <Navbar />
      <Container>
          
          <Head>
            <title></title>
            <meta name="description" content="Helium Blog" />
            <link rel="icon" href="#" /> 
          </Head>
        <Intro />
        <HeliumIntro />
        <News />
        
      </Container>
    </>
  )
}
