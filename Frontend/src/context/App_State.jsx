import { useCallback, useEffect, useState } from "react";
import { AppContext } from "./App_Context";
import axios from "axios";

const App_State = (props) => {
  const url = "http://localhost:3000/api";
  // Fixed: restore auth from localStorage once and keep token state synced without effect loops.
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [recipe, setrecipe] = useState([]);
  const [savedRecipe, setsavedRecipe] = useState([]);
  const [userId, setuserId] = useState("");
  const [user, setuser] = useState([]);
  const [isAuthenticated, setisAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const [userRecipe, setuserRecipe] = useState([]);
  const [reload, setreload] = useState(true);

  const getSavedRecipeById = useCallback(async () => {
    const api = await axios.get(`${url}/saved`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setsavedRecipe(api.data.recipe || []);
  }, [url]);

  const profile = useCallback(async () => {
    if (!token) return;
    const api = await axios.get(`${url}/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    if (api.data.user) {
      setuserId(api.data.user._id);
      setuser(api.data.user);
    }
  }, [token, url]);

  const recipeByUser = useCallback(async (id) => {
    if (!id) return;
    const api = await axios.get(`${url}/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setuserRecipe(api.data.recipe || []);
  }, [url]);

  useEffect(() => {
    let ignore = false;

    const fetchRecipe = async () => {
      const api = await axios.get(`${url}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (!ignore) {
        setrecipe(api.data.recipe || api.data || []);
      }
    };

    const loadSavedRecipes = async () => {
      const api = await axios.get(`${url}/saved`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (!ignore) {
        setsavedRecipe(api.data.recipe || []);
      }
    };

    const loadProfile = async () => {
      if (!token) return;
      const api = await axios.get(`${url}/profile`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      if (!ignore && api.data.user) {
        setuserId(api.data.user._id);
        setuser(api.data.user);
      }
    };

    const loadUserRecipes = async (currentUserId) => {
      if (!currentUserId) return;
      const api = await axios.get(`${url}/user/${currentUserId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (!ignore) {
        setuserRecipe(api.data.recipe || []);
      }
    };

    fetchRecipe();
    loadSavedRecipes();
    if (token) {
      loadProfile();
      loadUserRecipes(userId);
    }

    return () => {
      ignore = true;
    };
  }, [token, userId, reload, url]);

  // register
  const register = useCallback(async (name, gmail, password) => {
    const api = await axios.post(
      `${url}/register`,
      { name, gmail, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    return api;
  }, [url]);

  // login
  const login = useCallback(async (gmail, password) => {
    const api = await axios.post(
      `${url}/login`,
      {
        gmail,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    if (api.data.token) {
      setToken(api.data.token);
      localStorage.setItem("token", api.data.token);
      setisAuthenticated(true);
    }
    return api;
  }, [url]);

  //add Recipe
  const addRecipe = useCallback(async (title,
    instruction,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgUrl) => {
    const api = await axios.post(
      `${url}/add`,
      {
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
      },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    return api;
  }, [token, url]);

  // recipeById
  const getRecipeById = useCallback(async (id) => {
    const api = await axios.get(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return api;
  }, [url]);

  // save Recipe by id
  const savedRecipeById = useCallback(async (id) => {
    const api = await axios.post(
      `${url}/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setreload((current) => !current);
    return api;
  }, [token, url]);

  // logout
  const logOut = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
    setisAuthenticated(false);
  }, []);

  return (
    <AppContext.Provider value={{ login, register, addRecipe, recipe, getRecipeById, savedRecipeById, getSavedRecipeById, profile, recipeByUser, savedRecipe, userRecipe, user, logOut, isAuthenticated, setisAuthenticated }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default App_State;