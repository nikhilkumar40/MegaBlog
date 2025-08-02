import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({children, authentication=true}) {

    const authStatus = useSelector(state=>state.auth.isUserLoggedIn)
    const [loader, setLoader]= useState(true)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/')
        }
        else if(!authentication && authentication !== authStatus){
            navigate('/login')
        }
        setLoader(false)
    },
[authentication, authStatus, navigate])

  return loader? <h3>Loading...</h3>: (
    <div>{children}</div>
  )
}

export default AuthLayout