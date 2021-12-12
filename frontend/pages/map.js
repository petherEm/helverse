import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import styled from 'styled-components'
import { Room, Star } from '@material-ui/icons'
import axios from 'axios'
import { format } from 'timeago.js'
import Register from '../components/Register'
import Login from '../components/Login'


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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
   
`

const PopupContent = styled.div`
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    label {
        color: tomato;
        font-size: 13px;
        border-bottom: 0.5px solid tomato;
        margin: 3px 0;
    }

    p {
        font-size: 14px;
    }
    span {
        font-size: 14px;
    }

`
const Rating = styled.div` 
    color: 'gold';
`
const SubmitButton = styled.button` 
    border: none;
    padding: 5px;
    border-radius: 5px;
    color: white;
    background-color: tomato;

`

const Form = styled.form`
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    input, textarea {
        border: none;
        border-bottom: 1px solid gray;

    }
    input::placeholder, textarea::placeholder {
        font-size: 12px;
        color: gray;
    }

`

const Logout = styled.button` 
    border: none;
    padding: 5px;
    border-radius: 5px;
    color: white;
    background-color: tomato;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

`
const LoginButton = styled.button` 
    border: none;
    margin-right: 10px;
    padding: 5px;
    border-radius: 5px;
    color: white;
    background-color: teal;
    cursor: pointer;
    
`
const RegisterButton = styled.button` 
    border: none;
    padding: 5px;
    border-radius: 5px;
    color: white;
    background-color: slateblue;
    cursor: pointer;
`

const Buttons = styled.div` 
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

`
 

const map = () => {
    
    if(typeof window !== 'undefined') {
        const myStorage = window.localStorage
    }
    
    
    const [currentUser, setCurrentUser] = useState()
    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null)
    const [newPlace, setNewPlace] = useState(null)

    const[title, setTitle] = useState(null)
    const[desc, setDesc] = useState(null)
    const[rating, setRating] = useState(0)
    const[showRegister, setShowRegister] = useState(false)
    const[showLogin, setShowLogin] = useState(false)

    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 46,
        longitude: 17,
        zoom: 4

    });

    useEffect(() => { 
        setCurrentUser(localStorage.getItem('user'))
    },[])


    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get('/api/pins')
                setPins(res.data)

            } catch(err) {
                console.log(err)
            }
        };
        getPins()
    },[])

    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id)
        setViewport({...viewport, latitude: lat, longitude: long })
    }

    const handleAddClick = (e) => {
        const [long, lat] = e.lngLat;
        setNewPlace({
            lat, 
            long
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
            username: currentUser,
            title,
            desc,
            rating,
            lat: newPlace.lat,
            long: newPlace.long

        }
        try {
            const res = await axios.post('/api/pins', newPin);
            setPins([...pins, res.data]);
            setNewPlace(null);
        } catch(err) {
            console.log(err)
        }
    }

    const handleLogout = () => {
        myStorage.removeItem('user')
        setCurrentUser(null)
    }

    return (
        <Container>
            
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
                    onViewportChange = {nextViewport => setViewport(nextViewport)}
                    mapStyle='mapbox://styles/petherem/ckru6rvn91kcp17qscy6c62rn'
                    onDblClick = {handleAddClick}
                    transitionDuration="200"
                >
                    {pins.map((p) => (
                        
                    <>
                        <Marker
                            latitude={p.lat}
                            longitude={p.long}
                            offsetLeft={-viewport.zoom * 3.5}
                            offsetTop={-viewport.zoom * 7}
                        >
                            <Room 
                                style={{ 
                                    fontSize: viewport.zoom * 7, 
                                    color: p.username === currentUser ? 'tomato' : 'slateblue', 
                                    cursor: 'pointer' 
                                    }}
                                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                            
                            >
                                You are here
                            
                            </Room>

                        </Marker>
                        {p._id === currentPlaceId &&
                        <Popup
                            latitude={p.lat}
                            longitude={p.long}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setCurrentPlaceId(null)}
                            anchor="left"
                        
                        
                        >
                            <PopupContent>
                                <label>Place</label>
                                <h4>{p.title}</h4>
                                <label>Review</label>
                                <p>{p.desc}</p>
                                <label>Rating</label>
                                    <Rating>
                                        {Array(p.rating).fill(<Star />)}
                                    </Rating>
                                <label>Info</label>
                                <span>Created by <b>{p.username}</b> || Added <b>{format(p.createdAt)}</b></span>
                            </PopupContent>

                        </Popup>
                        }
                    </>
                ))}
                {newPlace && ( 
                    <Popup
                        latitude={newPlace.lat}
                        longitude={newPlace.long}
                        closeButton={true}
                        closeOnClick={false}
                        anchor="left"
                        onClose={() => setNewPlace(null)}
                
                    >
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <label>Title</label>
                            <input 
                                placeholder="Enter a title" 
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                            <label>Review</label>
                            <textarea 
                                placeholder="Say something about this palce" 
                                onChange={(e)=>setDesc(e.target.value)}
                            />
                            <label>Rating</label>
                            <select onChange={(e)=>setRating(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <SubmitButton type="submit">Add pin</SubmitButton>
                        </Form>
                    </div>
                    </Popup>

                )}

                {currentUser ? (<Logout onClick={handleLogout}>Log out</Logout>) : 
                    (
                        <Buttons>
                            <LoginButton onClick={() => setShowLogin(true)}>Login</LoginButton>
                            <RegisterButton onClick={() => setShowRegister(true)}>Register</RegisterButton>
                        </Buttons>
                    )}
                {showRegister && <Register setShowRegister={setShowRegister} />}
                {showLogin && (
                    <Login 
                        setShowLogin={setShowLogin} 
                        myStorage={myStorage}
                        setCurrentUser={setCurrentUser}
                />)}
                
                </ReactMapGL>
                
                
        </Container>
    )
}



export default map
