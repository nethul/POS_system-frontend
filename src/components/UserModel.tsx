import axios from "axios"
import { useEffect, useState } from "react"
import UserType from "../Types/UserType"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { Container } from '@mui/material';


function UserModel() {
    const [users, setUsers] = useState<UserType[]>([])
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showUserEditForm, setShowUserEditForm] = useState(false)

    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    async function loadUsers() {
        const response = await axios.get("http://localhost:8081/users")
        console.log(response)
        setUsers(response.data)
        setIsLoaded(true)
    }

    function handleRowClick(user: UserType) {
        setSelectedUser(user)
        console.log(user)
    }

    useEffect(() => {
        if (!isLoaded) {
            loadUsers()
        }

    }, [isLoaded])

    async function handleUserDeletion() {
        try {
            const response = await axios.delete(`http://localhost:8081/users/${selectedUser?.id}`)
            console.log(response)
            toast.success("User Deleted Sucessfully")
            loadUsers()
        } catch (error) {
            toast.error("User Deletion Failed")
        }

    }

    async function handleSubmit() {
        const data = {
            fullname: fullName,
            birthdate: birthDate,
            gender: gender,
            address: address,
            mobileNumber: mobileNumber,
            username: username,
            password: password  
        }

        const respose  = await axios.put(`http://localhost:8081/users/${selectedUser?.id}`, data)
        console.log(respose)
        toast.success("Successfully Edited")

    }

    return (
        <div className='mt-4'>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>

                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Birth Date
                        </th> */}
                        <th scope="col" className="px-6 py-3">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mobile Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Password
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}
                            className={selectedUser === user ? "bg-gray-200" : "hover:bg-slate-300 cursor-pointer"}

                            onClick={() => handleRowClick(user)}>

                            <td>{user.fullName}</td>
                            {/* <td>{user.birthDate?.toLocaleString}</td> */}
                            <td>{user.gender}</td>

                            <td>{user.address}</td>
                            <td>{user.mobileNumber}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600 mr-4 mt-3" onClick={() => { setShowUserEditForm(true) }}>Edit</button>
                
                {showUserEditForm && (
                    <div>
                        <Modal
                            isOpen={showUserEditForm}
                            onRequestClose={() => { setShowUserEditForm(false) }}
                            className="modal fade"
                            overlayClassName="fixed inset-2 bg-slate-700 bg-opacity-60 backdrop-blur-md"
                            contentLabel="Edit User"

                        ><Container className='justify-center items-center h-full'>
                                <div className="modal-dialog">
                                    <div className="modal-content bg-slate-100">
                                        <div className="modal-header bg-slate-400 text-white flex">
                                            <h5 className="modal-title">Edit User</h5>
                                            <div className='items-end'>
                                                <button type="button" className="close text-white  hover:bg-slate-700" onClick={() => (setShowUserEditForm(false))}>
                                                    <span>&times;</span>
                                                </button>
                                            </div>

                                        </div>

                                        <div className="modal-body p-4">

                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Full Name:</label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="fullName"
                                                    type="text"
                                                    placeholder="Full Name"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
                                                    Birthdate:
                                                </label>
                                                <input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender:</label>
                                                <select
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="gender"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
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
                                                    onChange={(e) => setAddress(e.target.value)}
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
                                                    onChange={(e) => setMobileNumber(e.target.value)}
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


                                        </div>
                                        <div className="modal-footer bg-slate-400 text-white">
                                            <button
                                                type="button"
                                                className="bg-blue-500 text-white px-4 py-2 rounded m-2"
                                                onClick={() => (setShowUserEditForm(false))}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-blue-500 text-white px-4 py-2 rounded m-2"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </Modal>
                    </div>
                )}

                <button type='button' className="bg-slate-400 text-white rounded-lg py-2 px-4 hover:bg-slate-600 mt-3" onClick={handleUserDeletion}>Delete</button>


            </div>

            <ToastContainer />
        </div>
    )
}

export default UserModel