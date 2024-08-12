import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Providers/AuthProviders'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {
    const [toggle, setToggle] = useState(false)
    const { user, loader, role, logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    if (loader) {
        <p>loading..</p>
    }

    return (
        <>
            <button onClick={() => setToggle(!toggle)} type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#ccf1ee] dark:bg-gray-800">
                    <a href='/' className="flex items-center">
                        <h1 className="logo self-center whitespace-nowrap text-[#00b8a8] ml-4">Protybeshi</h1>
                    </a>
                    <div className='my-8 flex flex-col items-center'>
                        <img className='rounded-full' src={user?.photoURL} alt="" />
                        <p className='text-xl font-semibold mt-4 dark:text-white'> {user?.displayName} </p>
                        <p className='capitalize bg-emerald-400 text-white px-2 rounded-full mt-2'> {role} </p>
                    </div>

                    {
                        user?.email === 'admin@protybeshi.com' ? <ul className="space-y-2 font-medium">
                        <div>
                            <li>
                                <Link to="/dashboard/admin/allusers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                    <span className="ml-3">All Users</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/admin/pendingposts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                    <span className="ml-3">Pending Posts</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/admin/giftcards" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                    <span className="ml-3">Gift Cards</span>
                                </Link>
                            </li>
                        </div>
                        <div className='absolute bottom-10'>
                            <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                <span className="ml-3 pr-24">Back to Home</span>
                            </Link>
                            <button onClick={() => {
                                logOut()
                                navigate("/")
                            }} to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                <span className="ml-3 pr-36">Logout</span>
                            </button>
                        </div>
                    </ul>:
                     <ul className="space-y-2 font-medium">
                        <div>
                            <li>
                                <Link to="/dashboard/user/mystuff" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                    <span className="ml-3">My Stuff</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/user/myborrowings" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                    <span className="ml-3">My Borrowings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/user/mylendings" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                    <span className="ml-3">My lendings</span>
                                </Link>
                            </li>
                        </div>
                        <div className='absolute bottom-10'>
                            <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                <span className="ml-3 pr-24">Back to Home</span>
                            </Link>
                            <button onClick={() => {
                                logOut()
                                navigate("/")
                            }} to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700">
                                <span className="ml-3 pr-36">Logout</span>
                            </button>
                        </div>
                    </ul>
                    }
                    
                </div>
            </aside>
        </>
    )

}

export default Sidebar

