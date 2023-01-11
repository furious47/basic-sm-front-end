import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../axios";

const AppContext = React.createContext();

const ContextProvider = ({ children }) => {
  const intialState = {
    user: null,
    posts: [],
    isloading: false,
    alert: false,
    editItem: null,
  };

  const [state, setState] = useState(intialState);

  const register = async (input) => {
    try {
      const { data } = await axios.post("/auth/register", { ...input });
      // console.log(data.name);
      setState({ ...state, user: data.name });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (input) => {
    try {
      const { data } = await axios.post("/auth/login", { ...input });
      console.log(data.name);
      setState({ ...state, user: data.name });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.name, token: data.token })
      );
    } catch (error) {
      setState({ ...state, alert: true });
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    setState(intialState);
  };

  const createPost = async (post) => {
    try {
      console.log(post);
      const { data } = await axios.post("/posts", { ...post });

      setState({ ...state, posts: [data.posts, ...state.posts] });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPost = async () => {
    try {
      const { data } = await axios.get("/posts");
      setState({ ...state, posts: data.posts });
    } catch (error) {
      console.log(error);
    }
  };

  const getOnePost = async (id) => {
    try {
      const { data } = await axios.get(`posts/${id}`);
      setState({ ...state, editItem: data });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id, input) => {
    try {
      const { data } = await axios.patch(`/posts/${id}`, { ...input });
      setState({ ...state, posts: [...state.posts, data] });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      getAllPost();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const newUser = JSON.parse(user);
      setState({ ...state, user: newUser });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,

        register,
        login,
        logout,
        createPost,
        getAllPost,
        getOnePost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { ContextProvider };
