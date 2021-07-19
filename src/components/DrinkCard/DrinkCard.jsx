import { Link } from 'react-router-dom';
import './DrinkCard.css'
import React, { useState, useEffect } from 'react'

function DrinkCard({ drink }) {

    const [love, setLove] = useState(false);

    useEffect(() => {
        console.log('oke')
        let favdrink = JSON.parse(localStorage.getItem('favs'))
        if (favdrink != null) {
            console.log(favdrink)
            if (favdrink.some(d => d.idDrink === drink.idDrink)) {
                console.log('isfavorite')
                setLove(true)
            }
        }
    }, [])

    function updateLove() {
        let favdrinks = localStorage.getItem('favs')
        let favors = []
        if (favdrinks) {
            favors = JSON.parse(favdrinks)
        }

        if (favors.length == 0) {
            setLove(true)
            favors.push(drink)
            localStorage.setItem('favs', JSON.stringify(favors))
        }
        else {
            if (favors.some(d => d.idDrink === drink.idDrink)) {
                setLove(false)
                favors.pop(drink)
                localStorage.setItem('favs', JSON.stringify(favors))
            } else {
                setLove(true)
                favors.push(drink)
                localStorage.setItem('favs', JSON.stringify(favors))
            }
        }

    }

    return (

        <Link to={`/drink/${drink.idDrink}`} key={drink.idDrink} className="relative m-2 sm:m-3 card p-3 rounded-xl w-44 sm:w-56 justify-center align-middle">
            <img src={drink.strDrinkThumb} alt="" className="w-44 sm:w-56 h-auto" />
            <p className="text-xl break-words drinkname">{drink.strDrink}</p>
            <div className="absolute top-0 right-0 rounded-full bg-white p-1" onClick={updateLove}>
                {
                    love ?
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current heartFilled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-current heartFilled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>

                }
            </div>
        </Link>
    )
}

export default DrinkCard