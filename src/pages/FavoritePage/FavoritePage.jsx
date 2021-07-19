import React, { useState, useEffect } from 'react'
import './FavoritePage.css'
import DrinkCard from '../../components/DrinkCard/DrinkCard'
import { Link } from 'react-router-dom';
import logo from './logo.svg';

function FavoritePage() {
    const drinks = JSON.parse(localStorage.getItem('favs'))
    // useEffect(() => {
    //     let favdrinks = localStorage.getItem('favs')
    //     let favors
    //     let drink = []
    //     if (favdrinks != null) {
    //         favors = favdrinks.split(',')
    //         favors.forEach(function (favor) {
    //             fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favor}`)
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     // drink.push(data.drinks[0])
    //                     drink.push(data.drinks[0])
    //                     setDrinks(drink)
    //                     console.log(favor)
    //                 })
    //         })
    //     }
    // }, [])

    return (
        <div>
            <nav className="sticky top-0 navbar p-4">
                <Link to={`/`}>
                    <img className="h-10" src={logo} alt="" />
                </Link>
            </nav>
            <div className="body p-4">
                <p className="text-2xl sm:text-4xl">Your Favorites List</p>
                <div className="flex flex-wrap justify-center">
                    {drinks.map(function (drink) {
                        return (
                            <DrinkCard drink={drink} key={drink.idDrink} />
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default FavoritePage