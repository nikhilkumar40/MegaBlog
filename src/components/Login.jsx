import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth';
import {Input, Select, Button, Logo} from './index'
import { useForm } from 'react-hook-form';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  return (
    <div>Login</div>
  )
}

export default Login