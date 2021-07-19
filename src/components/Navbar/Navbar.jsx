import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import './Navbar.css'

function Navbar() {

    const [isClicked, setClicked] = useState(false);
    const [value, setValue] = useState('');

    return (
        <div className="bg-gray-900 p-4 h-1/6 flex justify-between z-20">
            <Link to={`/`}>
                <img className="h-10" src={logo} alt="" />
            </Link>
            {value ? <Redirect push to={`/drink/search?name=` + value} /> : null}
            {isClicked ?

                <input value={value} onChange={e => setValue(e.target.value)} type="text" name="" id="" className="w-6/12 p-1 border-b-2 bg-transparent text-white" />
                :
                <svg onClick={() => setClicked(!isClicked)} xmlns="http://www.w3.org/2000/svg" className="w-8 searchIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

            }
        </div>
    )
}

export default Navbar;