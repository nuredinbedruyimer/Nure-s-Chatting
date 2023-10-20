 'use client'
 import {signOut} from 'next-auth/react'


const UserPage = () => {
    return (
        <div>
            <button onClick={()=>signOut()}>Logout</button>
        </div>
    )
 }
export default UserPage;