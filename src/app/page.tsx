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

    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const[confirmPassword, setConfirmPassword] = useState<string>('');
    const[publicID,setPublicID] = useState<string>('');
    const[currency,setCurrency] = useState(0)
    // Added name, email, and password to errors (may cause errors)
    const[errors, setErrors] = useState<{username:string; email:string; password:string; confirmPassword:string}>({username:'',email:'',password:'',confirmPassword:''});
    const[loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const validateForm=()=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors:any = {};

        if(!username.trim()){
          newErrors.username='Username is required!';
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

    const handleSubmit=async(e:any)=>{
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
                email,
                publicID,
                currency,
            })
            router.push('/maps');
            setErrors({username:'', email:'', password:'', confirmPassword:''});

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
        <div className="h-screen grid place-items-center bg-[url('/hd-nature.jpg')] bg-cover bg-no-repeat">
            <div className="flex flex-col w-full overflow-x-hidden mx-auto p-6 text-center font-['Comic Sans'] md:text-xl">
                
                {/* DORA (title) */}
                <div className="text-white font-bold text-5xl md:text-8xl mb-32">DORA</div>
                
                {/* Sign Up (header)) */}
                <div className="bg-white rounded-lg p-8">

                <header className="text-blue-500 font-bold text- text-xl">Sign Up Now</header>
                <form onSubmit={handleSubmit} className="">
                
                <div className="flex flex-col gap-6">

                  {/* Username */}
                  <div className="mt-7 text-black">                
                      <input type="text" placeholder="Enter Username" className="bg-white border-b-2 border-gray-500 pl-1 focus:outline-none focus:border-blue-500" value={username} onChange={(e)=>setUsername(capitalizeFirstLetter(e.target.value.trim()))}/>
                      {errors.username && <div className='mt-1 text-sm text-red-500'>{errors.username}</div>}
                  </div>

          
                  {/* Email */}
                  <div>
                      <input type="email" placeholder="Enter Email" className="bg-white border-b-2 border-gray-500 pl-1 focus:outline-none focus:border-blue-500" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                      {errors.email && <div className='mt-1 text-sm text-red-500'>{errors.email}</div>}
                  </div>

                  {/* Password */}
                  <div>
                      <input type="password" placeholder="Enter Password" className="bg-white border-b-2 border-gray-500 pl-1 focus:outline-none focus:border-blue-500" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                      {errors.password && <div className='mt-1 text-sm text-red-500'>{errors.password}</div>}
                  </div>

                  {/* Confirm Password */}
                  <div>  
                      <input type="password" placeholder="Confirm Password" className="bg-white border-b-2 border-gray-500 pl-1 focus:outline-none focus:border-blue-500" value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                      {errors.confirmPassword && <span className='text-sm text-red-500'>{errors.confirmPassword}</span>}
                  </div>

                </div>
                
                {/* Sign Up Button */}
                <div className="text-white">
                    <button type="submit" className="w-[200px] h-[40px] m-6 leading-[40px] bg-blue-500 rounded-[15px] border border-blue-500 hover:bg-blue-950 transition ease-out duration-400 shadow-lg shadow-blue-500/50">
                    {
                        loading ? <span className="Loading..."></span> : "SIGN UP"
                    }
                    </button>
                </div>

                {/* Log In Button */}
                <div className="mt-3">Already have an account?{' '}</div>
                
                    <button href="/login" className="w-[200px] h-[40px] m-3 leading-[40px] bg-white rounded-[15px] border border-black hover:bg-gray-100 transition ease-out duration-400 shadow-lg shadow-gray-500/50">
                        LOGIN
                    </button>
                
                </form>

                </div>
                
            </div>
            
        </div>
    )
}

export default Register