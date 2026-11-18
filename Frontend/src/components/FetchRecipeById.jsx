import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/App_Context'
import { Link, useLocation } from 'react-router-dom'

const FetchRecipeById = ({ id }) => {
    const { getRecipeById } = useContext(AppContext)
    const [recipe, setrecipe] = useState({})
    const location = useLocation()

    useEffect(() => {
        const fetchRecipe = async () => {
            const result = await getRecipeById(id)
            setrecipe(result.data.recipe || {})
        }
        fetchRecipe();
    }, [id, getRecipeById])


    return (
        <div className="container recipe-detail">
            <div className="d-flex flex-column align-items-center text-center">
                <div className="recipe-detail-image-frame">
                    <img
                        src={recipe.imgUrl}
                        className={`recipe-detail-image ${location.pathname === "/saved" ? "recipe-detail-image-compact" : ""}`}
                        alt={recipe.title || "Recipe"}
                    />
                </div>
                <h3 className="recipe-detail-title">{recipe.title}</h3>
            </div>
            {location.pathname !== "/saved" && (
                <>
                    <div className="recipe-instructions">
                        <div className="recipe-ingredients">
                            <h4 className="detail-section-title">Ingredients</h4>
                            <p className="recipe-ingredient mb-0">
                                {recipe.ing1} - {recipe.qty1}
                            </p>
                            <p className="recipe-ingredient mb-0">
                                {recipe.ing2} - {recipe.qty2}
                            </p>
                            <p className="recipe-ingredient mb-0">
                                {recipe.ing3} - {recipe.qty3}
                            </p>
                            <p className="recipe-ingredient mb-0">
                                {recipe.ing4} - {recipe.qty4}
                            </p>
                        </div>
                        <div className="flex-grow-1">
                            <h4 className="detail-section-title">Method</h4>
                            <p className="recipe-method mb-0">{recipe.instruction}</p>
                        </div>
                    </div>
                    <Link to={"/"} className="btn btn-accent my-3">
                        Back to Home
                    </Link>
                </>
            )}
        </div>
    )
}

export default FetchRecipeById