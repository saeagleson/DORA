'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { firestore, app} from '../firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import GoogleMaps from '../components/GoogleMaps';

const Maps = () => {

    const [user, setUser] = useState<any>({});
    const auth = getAuth(app);
    const router = useRouter();

    const [publicID, setPublicID] = useState('');

    useEffect(() => {
        // Use onAuthStateChanged to listen for changes in authentication state
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const docRef = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = ({ id: docSnap.id, ...docSnap.data() })
                setUser(data);
            } else {
              console.log('No such document!');
            }
          } else {
            setUser(null);
            //router.push('/login');
          }
        });
        return () => unsubscribe();
      }, [auth, router]); 

    const handleLogout=(e:any)=>{
        e.preventDefault();
        signOut(auth).then(()=>{
            router.push('/login');
            //setLoggedIn(true);
            console.log("successful");
        }).catch((err)=>{
            console.log("Error");
        })
    }

    const CashOut = async(e:any) => {
        e.preventDefault();
        onAuthStateChanged(auth, async (user) => {
            if(user)
            {
                // Changes User info
                const docRef = doc(firestore, "users", user.uid);
                updateDoc(docRef, {
                    publicID: publicID,
                })
                console.log("Profile Updated Successfully");
            }
            else {
                console.log("Error");
            }
        });
    }


    return(
        <div className="flex flex-col h-screen">
            <nav className="text-center border border-b-2 border-black h-auto p-5">
            <p className="text-[50px]">
                Welcome, {user ? user.username : "???"}
            </p>
            
            <button className="border border-black text-[20px]" onClick={handleLogout}>
                Log Out!
            </button>
            </nav>
            <main className="flex flex-col text-center bg-blue-300 flex-auto">
                
                <div className="text-end p-3">
                    Currency: {user ? user.currency : "???"}
                </div>
                <div className="grid place-items-center h-[50px] text-[25px]">
                    Click Below to Start a Mission!
                </div>

                {/* Map Goes Here*/}
                <div className="grid place-items-center">
                    <GoogleMaps/>
                </div>
                <div>
                    <form onSubmit={CashOut}>
                        <input value={publicID} onChange ={(e)=>setPublicID(e.target.value)}></input>
                        <button>Cash Out!</button>
                    </form>
                    

                </div>
            </main>
        </div>
    )
}

export default Maps;