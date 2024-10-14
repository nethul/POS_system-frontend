import axios from "axios";
import { ChangeEvent, useState } from "react"
import { Link, useHref} from "react-router-dom";
import UserLogin from "./UserLogin";


function UserSignup() {
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const[showPopup, setShowPopup]=useState(false);

    function handleFullName(event: ChangeEvent<HTMLInputElement>): void {
        setFullName(event.target.value)
    }

    function handleBirthDate(event: ChangeEvent<HTMLInputElement>): void {
        setBirthDate(event.target.value)
    }

    function handleGender(event: ChangeEvent<HTMLSelectElement>): void {
        setGender(event.target.value)
    }

    function handleAddress(event: ChangeEvent<HTMLTextAreaElement>): void {
        setAddress(event.target.value)
    }

    function HandleMobileNumber(event: any) {
        setMobileNumber(event.target.value)
    }


    async function createUser() {
        const data = {
            fullName: fullName,
            birthDate: birthDate,
            gender: gender,
            address: address,
            mobileNumber: mobileNumber,
            username: username,
            password: password
        }
        try {
            const response = await axios.post("http://localhost:8081/user", data);
            console.log(response)
            await setShowPopup(true)
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
                <h2 className="text-3xl text-center mb-4">Signup</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Full Name:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullName"
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={handleFullName}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
                        Birthdate:
                    </label>
                    <input id="birthDate" type="date" value={birthDate} onChange={handleBirthDate} required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender:</label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="gender"
                        value={gender}
                        onChange={handleGender}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address:</label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        placeholder="Address"
                        value={address}
                        onChange={handleAddress}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">Mobile Number:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="mobileNumber"
                        type="text"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={HandleMobileNumber}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={createUser}
                >
                    Signup
                </button>
                {showPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-300 rounded-lg shadow-md">
                    <p className="text-lg text-green-600 font-bold mb-4">Signup Successful!</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <Link to={"/"} className="text-white">Login</Link>
                    </button>
                </div>
            )}
            </form>
            
        </div>

    )
}

export default UserSignup