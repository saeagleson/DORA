'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    // Added name, email, and password to errors (may cause errors)
    const[errors, setErrors] = useState({});
    const[loading, setLoading] = useState(false);
    const[loggedIn, setLoggedIn] = useState(false);
    const[avatarUrl,setAvatar] = useState('');
    const router = useRouter();

    const validateForm=()=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors={};

        if(!email.trim() || !emailRegex.test(email)){
            newErrors.email = 'Email is invalid!';
        }
        if(password.length<6){
            newErrors.password = "Password must be at least 6 characters!";
        }

        setErrors(newErrors)
        {
            return Object.keys(newErrors).length===0;
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            if(!validateForm())
            {
                setLoading(false);
                return;
            }
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;

            if(user){
                router.push('/maps');
            }
            setErrors({});

            alert("Logged In Sucessfully :)");
        }catch(error){
            console.log("Error Logging In:", error);
        }
        setLoading(false);
    }

    return (
        <div>
            <div className=''>
                
                <span>Log In</span>
                <form onSubmit={handleSubmit} className="w-[200px] flex flex-col gap-5">

                {/* Email */}
                <div>
                <label>
                    <span>Email</span>
                </label>
                <input type="email" placeholder="Enter Email" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
                </div>

                {/* Password */}
                <div>
                <label>
                    <span>Password</span>
                </label>
                <input type="password" placeholder="Enter Password" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                {errors.password && <span className='text-sm text-red-500'>{errors.password}</span>}
                </div>

                {/* Sign Up Button */}
                <button type="submit">
                    {
                        loading ? "Loading..." : "Login"
                    }
                    </button>

                <span>Don't have an Account?{' '}
                    <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Register
                    </Link>

                </span>
                </form>
            </div>            
        </div>
    )
}

export default Login