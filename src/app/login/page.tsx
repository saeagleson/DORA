'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {

    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    // Added name, email, and password to errors (may cause errors)
    const[errors, setErrors] = useState<{email:string;password:string}>({email:'',password:''});
    const[loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const validateForm=()=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors:any={};

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

    const handleSubmit=async(e:any)=>{
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
            setErrors({email:'', password:''});

            alert("Logged In Sucessfully :)");
        }catch(error){
            console.log("Error Logging In:", error);
        }
        setLoading(false);
    }

    return (
        <div className="h-screen grid place-items-center bg-[url('/hd-nature.jpg')] bg-cover bg-no-repeat">
            <div className="flex flex-col w-full overflow-x-hidden mx-auto p-6 text-center font-['Comic Sans'] md:text-xl">
                
                {/* DORA (title) */}
                <div className="text-white  font-bold text-5xl md:text-7xl mb-32">DORA</div>

                {/* Sign Up (header)) */}

                <div className="bg-white rounded-lg p-8">

                <header className="text-blue-500 font-bold text- text-xl">Log In</header>
                <form onSubmit={handleSubmit} className="">

                <div className="flex flex-col gap-6">

                {/* Email */}
                <div>
                <input type="email" placeholder="Enter Email" className="mt-7 bg-white border-b-2 border-gray-500 pl-1 focus:outline-none focus:border-blue-500" value={email} onChange ={(e)=>setEmail(e.target.value)}/>
                {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
                </div>

                {/* Password */}
                <div>
                <input type="password" placeholder="Enter Password" className="bg-white border-b-2 border-gray-500 pl-1 focus:outline-none focus:border-blue-500" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                {errors.password && <span className='text-sm text-red-500'>{errors.password}</span>}
                </div>

                </div>

                {/* Sign Up Button */}
                <div className="text-white">
                <button type="submit" className="w-[200px] h-[40px] leading-[40px] m-6 bg-blue-500 rounded-[15px] border border-blue-500 hover:bg-blue-950 transition ease-out duration-400 shadow-lg shadow-blue-500/50">
                    {
                        loading ? "Loading..." : "LOGIN"
                    }
                    </button>
                </div>
                
                <div className="">Don&apos;t have an Account?{' '}</div>
                    <Link href="/" className="mx-auto w-[200px] h-[40px] leading-[40px] bg-white rounded-[15px] border border-white hover:bg-gray-100 transition ease-out duration-400 ">
                        REGISTER
                    </Link>

                </form>

                </div>
            </div>            
        </div>
    )
}

export default Login