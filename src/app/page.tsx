'use client'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth, firestore } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'


const Register = () => {

    const[username, setUsername] = useState<string>('');
    const[firstName, setFirstName] = useState<string>('');
    const[lastName, setLastName] = useState('');

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    // Added name, email, and password to errors (may cause errors)
    const[errors, setErrors] = useState({});
    const[loading, setLoading] = useState(false);
    const[avatarUrl,setAvatar] = useState('');
    const router = useRouter();

    const validateForm=()=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors={};

        if(!username.trim()){
          newErrors.username='First name is required!';
      }
        if(!firstName.trim()){
            newErrors.firstName='First name is required!';
        }
        if(!lastName.trim()){
            newErrors.lastName="Last name is required"
        }
        if(!email.trim() || !emailRegex.test(email)){
            newErrors.email = 'Email is invalid!';
        }
        if(password.length<6){
            newErrors.password = "Password must be at least 6 characters!";
        }
        if(password!==confirmPassword){
            newErrors.confirmPassword = "Password does not match!";
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
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;

            const docRef = doc(firestore, 'users', user.uid);
            await setDoc(docRef,{
                username,
                firstName,
                lastName,
                email,
            })
            router.push('/');
            setErrors({});

            alert("Registered sucessfully :)");
        }catch(error){
            console.log("Error Registering: ", error);
        }
        setLoading(false);
    }

    function capitalizeFirstLetter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div>
            <div className="max-w-[400px] w-full mx-auto mt-10 bg-blue-100 p-6 text-center font-['Aptos (Body)']">
                
                <div className="mt-10 text-4xl">DORA</div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Username */}
                <div>
                    <div>
                        <span>Username</span>
                    </div>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(capitalizeFirstLetter(e.target.value.trim()))}/>
                    {errors.username && <span className='text-sm text-red-600'>{errors.username}</span>}
                </div>

        
                {/* Email */}
                <div>
                <div>
                    <span>Email</span>
                </div>
                <input type="email" placeholder="Enter Email" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
                </div>

                {/* Password */}
                <div>
                <div>
                    <span>Password</span>
                </div>
                <input type="password" placeholder="Enter Password" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                {errors.password && <span className='text-sm text-red-500'>{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div>
                <div>
                    <span>Confirm Password</span>
                </div>
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                {errors.confirmPassword && <span className='text-sm text-red-500'>{errors.confirmPassword}</span>}
                </div>
                

                {/* Sign Up Button */}
                <button type="submit">
                    {
                        loading ? <span className="loading loading-spinner loading-sm"></span> : "Register"
                    }
                    </button>

                <span>Already have an Account?{' '}
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Login
                    </Link>

                </span>
                </form>
            </div>            
        </div>
    )
}

export default Register
