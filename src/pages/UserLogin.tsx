import axios from "axios"
import { useState } from "react"
import UserType from "../Types/UserType"
import { Link } from "react-router-dom"

function UserLogin() {
    const[username, setUsername]=useState("")
    const[password, setPassword]=useState("")
    const[user, setUser]=useState<UserType>();
    const[showPopup, setShowPopup]=useState(false)

    async function handleLogin(){
        const data={
            username:username
        }

        const response = await axios.post("http://localhost:8081/userLogin", data)
        console.log(response)
        setUser(response.data)
        if (user?.username == username && user.password == password ){
            await setShowPopup(true)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleLogin}>
                <h2 className="text-3xl text-center mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={(e)=>{
                        setUsername(e.target.value)
                    }} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                    } } />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleLogin}>Login</button>
                <p className="text-center text-gray-700 text-xs mt-4">Don't have an account? <a className="text-blue-500" href="/signup">Sign up</a></p>
                {showPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-300 rounded-lg shadow-md">
                    <p className="block text-lg text-green-600 font-bold mb-4">Login Successful!</p>
                    <p className="text-sm text-slate-900 mb-4 font-semibold">Welcome {user?.fullName}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to={"/userHome"} className="text-white">Let's Go Shopping</Link>
                    </button>
                </div>
            )}
            </form>
            
        </div>
    )
}

export default UserLogin