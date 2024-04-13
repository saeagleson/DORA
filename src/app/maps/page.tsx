'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { firestore, app} from '../firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

const Maps = () => {

    const [user, setUser] = useState({});
    const auth = getAuth(app);
    const router = useRouter();

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

    const handleLogout=(e)=>{
        e.preventDefault();
        signOut(auth).then(()=>{
            router.push('/login');
            //setLoggedIn(true);
            console.log("successful");
        }).catch((err)=>{
            console.log("Error");
        })
    }

    return(
        <div>
            <p>
                MAP GOES HERE
            </p>
            <p>
                Username:
                {
                    user ? user.username : "???"
                }
            </p>
            <button onClick={handleLogout}>
                Log Out!
            </button>
        </div>
    )
}

export default Maps;