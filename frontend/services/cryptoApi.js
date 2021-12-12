import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const cryptoApiHeaders = {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.NEXT_PUBLIC_CRYPTO_RAPIDAPI_HOST,
        
    
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
            
        }),
        getCryptoDetails: builder.query({
            query: (id) => createRequest(`/coin/${id}`)
        })
    })
})


export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery
} = cryptoApi;