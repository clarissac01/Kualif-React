import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './DrinkDetail.css'

function DrinkDetail() {
    let { id } = useParams()
    const [menu, setMenu] = useState({});
    const [love, setLove] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const ing = [];

    useEffect(() => {
        let favdrink = JSON.parse(localStorage.getItem('favs'))
        if (favdrink != null) {
            if (favdrink.some(d => d.idDrink === menu.idDrink)) {
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
            favors.push(menu)
            localStorage.setItem('favs', JSON.stringify(favors))
        }
        else {
            if (favors.some(d => d.idDrink === menu.idDrink)) {
                setLove(false)
                favors.pop(menu)
                localStorage.setItem('favs', JSON.stringify(favors))
            } else {
                setLove(true)
                favors.push(menu)
                localStorage.setItem('favs', JSON.stringify(favors))
            }
        }

    }

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res => res.json())
            .then(data => {
                const drink = data.drinks[0];
                console.log(drink)
                setMenu(drink);
                for (let i = 1; i <= 15; i++) {
                    if (drink['strIngredient' + i])
                        ing.push(drink['strMeasure' + i] + drink['strIngredient' + i]);
                }
                setIngredients(ing);
                console.log(ing);
            });
    }, []);
    return (
        <div>
            <nav className="sticky top-0 navbar p-4">
                <Link to={`/`}>
                    <img className="h-10" src={logo} alt="" />
                </Link>
            </nav>
            <div className="flex flex-col justify-center body p-4 mx-auto">
                <div className="w-full sm:w-9/12 mx-auto">
                    <p className="font-mono uppercase titleCol">{menu.strAlcoholic}</p>
                    <p className="italic font-sans subtitleCol text-xl sm:text-2xl sm:text-center">{menu.strDrink}</p>
                    <div className="flex justify-evenly text-sm">
                        <p>{menu.strCategory}</p>
                        <p>{menu.strGlass}</p>
                    </div>
                    <div className="sm:flex flex-row p-2">
                        <div className="sm:w-1/2">
                            <img className="p-2" src={menu.strDrinkThumb} alt="" />
                        </div>
                        <div className="sm:p-5 w-1/2">
                            <p className="subtitleCol font-mono uppercase">INGREDIENTS</p>
                            {ingredients?.map((ingredient, idx) => {
                                return (
                                    <p key={idx}>{ingredient}</p>
                                )
                            })}
                            <p className="subtitleCol font-mono upper">PREPARATION</p>
                            <p>{menu.strInstructions}</p>

                        </div>

                    </div>
                </div>
            </div>
            <div className="fixed cursor-pointer" onClick={updateLove}>
                {love ?
                    <div className="w-58 fixed bottom-10 right-10 cursor-pointer bg-red-400 rounded-full py-2 px-4 p-2 hidden md:flex">
                        <p className="text-black">Added to your favorites</p>
                        <svg className="h-7 w-7 heartOutlined fill-current" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    :

                    <div className="w-44 fixed bottom-10 right-10 cursor-pointer bg-red-400 rounded-full py-2 px-4 p-2 hidden md:flex">
                        <p className="text-black">Add to Favorites</p>
                        <svg className="h-7 w-7 heartOutlined fill-current" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                    </div>
                }
                {
                    love ?
                        <div className="fixed bottom-5 right-5 cursor-pointer flex md:hidden ">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 heartOutlined fill-current" fill="none" viewBox="0 0 24 24" stroke="none">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>

                        :
                        <div className="fixed bottom-5 right-5 cursor-pointer flex md:hidden ">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 heartOutlined stroke-current" fill="none" viewBox="0 0 24 24" stroke="none">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                }
            </div>
        </div>
    )
}

export default DrinkDetail;