import { useContext } from "react"
import { AppContext } from "../context/App_Context"

const Profile = () => {
  const { user, userRecipe } = useContext(AppContext);

  return (
    <>
      <div className="container app-container profile-header">
        <h1>Welcome, {user?.name || "User"}</h1>
        <h2 className="mt-2 h6 muted-copy">{user?.gmail || "No email available"}</h2>
      </div>
      <div className="container app-container pb-5">
        <div className="profile-section-heading">
          <div>
            <p className="eyebrow">Your collection</p>
            <h2 className="profile-section-title h4 mb-0">Recipes you created</h2>
          </div>
          <span className="small muted-copy">{userRecipe?.length || 0} recipes</span>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {userRecipe?.map((data) => (
            <div key={data._id} className="col">
              <article className="recipe-card p-3">
                <div className="overflow-hidden rounded-3">
                  <img
                    src={data.imgUrl}
                    className="recipe-card-image"
                    alt={data.title}
                  />
                </div>
                <div className="px-2 pt-3">
                  <h2 className="recipe-card-title">{data.title}</h2>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Profile