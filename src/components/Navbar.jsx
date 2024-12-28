import React from 'react'

function Navbar() {
    return (
    <nav className='flex justify-between bg-blue-900 text-white py-2'>
        <div className='logo'>
        <span className='font-bold text-xl mx-8'>
        TaskTidy
        </span>
        </div>
        <ul className='flex mx-9 gap-6'>
            <li className='w-14 cursor-pointer hover:font-bold trabsition-all duration-100'>Home</li>
            <li className='w-24 cursor-pointer hover:font-bold trabsition-all duration-100'>Your Aims</li>
        </ul>
    </nav>
    )
}

export default Navbar
