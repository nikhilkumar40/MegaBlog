import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth';
import { Input, Select, Button, Logo } from './index'
import { useForm } from 'react-hook-form';
import { login as AuthLogin } from '../store/AuthSlice';


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const loginForm = async (formData) => {
    try {
      setError('')
      const session = await authService.login(formData)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(AuthLogin(userData));
        navigate('/')
      }
    } catch (error) {
      setError(error.message);
      throw error
    }
  }

  return (
    <div
      className='flex items-center justify-center w-full'
    >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* Form started */}
        <form onSubmit={handleSubmit(loginForm)}>
          <div className='space-y-5'>
            <Input
              label="email"
              type="email"
              placeholder="Enter you email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />

            <Input label="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })} />

            <Button type='submit'>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login