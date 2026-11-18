import { useContext } from "react"
import { AppContext } from "../context/App_Context"
import FetchRecipeById from "./FetchRecipeById"

const Saved = () => {
  const { savedRecipe } = useContext(AppContext)
  console.log(savedRecipe)
  return (
    <>
      <header className="container app-container page-header">
        <p className="eyebrow">Keep close</p>
        <h1 className="page-title">Saved recipes</h1>
        <p className="page-description">
          Your bookmarked dishes, ready whenever you are.
        </p>
      </header>
      <main className="container app-container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 recipe-grid">
          {savedRecipe?.map((data) => (
            <div className="col" key={data.recipe}>
              <article className="recipe-card p-3">
                <FetchRecipeById id={data.recipe} />
              </article>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Saved