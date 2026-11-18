import { useContext } from "react"
import { AppContext } from "../context/App_Context"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Home = () => {
  const { recipe, savedRecipeById } = useContext(AppContext)
  const navigate = useNavigate()

  const saved = async (id) => {
    const result = await savedRecipeById(id);
    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  return (
    <>
      <ToastContainer />
      <header className="container app-container page-header">
        <p className="eyebrow">Made for sharing</p>
        <h1 className="page-title">
          Find your next <span className="text-warning">favorite.</span>
        </h1>
        <p className="page-description">
          Explore recipes from the community and save the ones you want to make.
        </p>
      </header>
      <main className="container app-container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 recipe-grid">
          {recipe.map((data) => (
            <div key={data._id} className="col">
              <article className="recipe-card">
                <div className="recipe-card-image-wrap">
                  <img
                    src={data.imgUrl}
                    className="recipe-card-image"
                    alt={data.title}
                  />
                </div>
                <div className="recipe-card-body">
                  <h2 className="recipe-card-title">{data.title}</h2>
                  <div className="recipe-card-actions">
                    <button className="btn-quiet" onClick={() => saved(data._id)}>Save</button>
                    <button
                      className="btn-accent"
                      onClick={() => navigate(`/${data._id}`)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Home