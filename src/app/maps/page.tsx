'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { firestore, app} from '../firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation';
import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import GoogleMaps from '../components/GoogleMaps';

const Maps = () => {

    const [user, setUser] = useState<any>({});
    const [missions, setMissions] = useState<any[]>([]);

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


    
    useEffect(() => {
        // Fetch all missions from Firestore
        const fetchMissions = async () => {
            const missionsCollectionRef = collection(firestore, 'missions');
            const missionsSnap = await getDocs(missionsCollectionRef);
            const missionsData = missionsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setMissions(missionsData);
        };

        fetchMissions(); // Call fetchMissions on component mount
    }, []);

    const CashOut = async(e) => {
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
    <div className="flex flex-col h-screen font-['Comic Sans']">
        <nav className="grid grid-cols-2 border-b-2 border-black h-auto pr-1">
            <div className="text-xl font-bold p-4 py-4">
                {user ? user.username : "???"}
            </div>
                             
            <div className="text-end pt-8 pr-1">
                Currency: {user ? user.currency : "???"}
            </div>            
        </nav>
        <main className="flex flex-col text-center bg-blue-300 flex-auto">
            
            <div className="mt-5 grid place-items-center h-[50px] text-xl">
                Click Below to Start a Mission!
            </div>

            
            <div className="h-5/6 flex justify-center items-center">
                <div className="h-full w-full px-5">
                    {/* Map Goes Here*/}
                    <div className="h-full grid place-items-center">
                        <GoogleMaps missions={missions}/>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <form onSubmit={CashOut}>
                    <input value={publicID} onChange ={(e)=>setPublicID(e.target.value)}></input>
                    <button>Cash Out!</button>
                </form>
                

            </div>

        </main>
        <footer className="border-t-2 border-black grid place-items-center py-1 bg-gray-100">
                <button className="text-s bg-white border w-[100px] h-[30px] border-black rounded-[15px] border-white" onClick={handleLogout}>
                Log Out
                </button>
        </footer>
    </div>
)
}

export default Maps;