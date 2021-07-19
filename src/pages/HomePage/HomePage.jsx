import Navbar from '../../components/Navbar/Navbar'
import React, { useState, useEffect } from 'react'
import './HomePage.css'
import DrinkCard from '../../components/DrinkCard/DrinkCard'
import { Link, Redirect } from 'react-router-dom';

function HomePage() {

    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`)
            .then(res => res.json())
            .then(data => {
                setDrinks(data.drinks)
                console.log(data.drinks.strDrinks)
            })
    }, [])

    return (
        <div>
            <nav className="sticky top-0 z-20">
                <Navbar />
            </nav>
            <div className="body p-4">
                <p className="text-2xl sm:text-4xl">Cocktail Lists</p>
                <div className="flex flex-wrap justify-center">
                    {drinks?.map(drink => {
                        return (
                            <DrinkCard drink={drink} key={drink.idDrink} />
                        )
                    })}

                </div>
            </div>
            <Link to={`/favorites`}>
                <div className="w-40 fixed bottom-10 right-10 bg-red-400 rounded-full py-2 px-4 p-2 flex content-center">
                    <p className="text-black">Your Favorites</p>
                    <svg className="h-7 w-7 heartOutlined fill-current" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                </div>
            </Link>
        </div>
    )

}

export default HomePage;