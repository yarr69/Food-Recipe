import { useContext, useState } from "react";
import { AppContext } from "../context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useContext(AppContext);

  const [formData, setformData] = useState({
    title: "",
    instruction: "",
    ing1: "",
    ing2: "",
    ing3: "",
    ing4: "",
    qty1: "",
    qty2: "",
    qty3: "",
    qty4: "",
    imgUrl: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log("Form Submitted! Current form data: ", formData);
    const {
      title,
      instruction,
      ing1,
      ing2,
      ing3,
      ing4,
      qty1,
      qty2,
      qty3,
      qty4,
      imgUrl,
    } = formData;

    try {
      const result = await addRecipe(
        title,
        instruction,
        ing1,
        ing2,
        ing3,
        ing4,
        qty1,
        qty2,
        qty3,
        qty4,
        imgUrl,
      );
      console.log("API Response received:", result);
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
      // Fixed lag: route immediately after success instead of waiting 1.5s.
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="form-panel form-panel-wide">
        <h2 className="form-panel-title">ADD RECIPE</h2>
        <form
          onSubmit={onSubmitHandler}
          className="mt-4"
        >
          <div className="mb-3">
            <label htmlFor="titleInput" className="form-label">
              Title
            </label>
            <input
              value={formData.title}
              onChange={onChangeHandler}
              name="title"
              type="text"
              className="form-control"
              id="titleInput"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="instructionInput" className="form-label">
              Instruction
            </label>
            <input
              value={formData.instruction}
              onChange={onChangeHandler}
              name="instruction"
              type="text"
              className="form-control"
              id="instructionInput"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ing1Input" className="form-label">
              Ing1
            </label>
            <input
              value={formData.ing1}
              onChange={onChangeHandler}
              name="ing1"
              type="text"
              className="form-control"
              id="ing1Input"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ing2Input" className="form-label">
              Ing2
            </label>
            <input
              value={formData.ing2}
              onChange={onChangeHandler}
              name="ing2"
              type="text"
              className="form-control"
              id="ing2Input"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ing3Input" className="form-label">
              Ing3
            </label>
            <input
              value={formData.ing3}
              onChange={onChangeHandler}
              name="ing3"
              type="text"
              className="form-control"
              id="ing3Input"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ing4Input" className="form-label">
              Ing4
            </label>
            <input
              value={formData.ing4}
              onChange={onChangeHandler}
              name="ing4"
              type="text"
              className="form-control"
              id="ing4Input"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qty1Input" className="form-label">
              Qty1
            </label>
            <input
              value={formData.qty1}
              onChange={onChangeHandler}
              name="qty1"
              type="text"
              className="form-control"
              id="qty1Input"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qty2Input" className="form-label">
              Qty2
            </label>
            <input
              value={formData.qty2}
              onChange={onChangeHandler}
              name="qty2"
              type="text"
              className="form-control"
              id="qty2Input"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qty3Input" className="form-label">
              Qty3
            </label>
            <input
              value={formData.qty3}
              onChange={onChangeHandler}
              name="qty3"
              type="text"
              className="form-control"
              id="qty3Input"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qty4Input" className="form-label">
              Qty4
            </label>
            <input
              value={formData.qty4}
              onChange={onChangeHandler}
              name="qty4"
              type="text"
              className="form-control"
              id="qty4Input"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imgUrlInput" className="form-label">
              imgUrl
            </label>
            <input
              value={formData.imgUrl}
              onChange={onChangeHandler}
              name="imgUrl"
              type="text"
              className="form-control"
              id="imgUrlInput"
              required
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="btn btn-accent form-submit">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;