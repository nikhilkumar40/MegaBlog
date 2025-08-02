import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login } from '../store/AuthSlice'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Input, { Button } from './index'

function Signup() {

    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formSignup = (formData) => {
        setError('')
        try {
            const data = authService.signUp(formData)
            if (data) {
                const userData = authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(formSignup)}>
                    <div>
                        <Input type="email"
                            placeholder="Enter your name"
                            {...register("email", {
                                required: true
                            })}
                        />
                        <Input type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Input type="name"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Button
                            type='submit'
                            className="w-full"
                        >
                            Signup
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup