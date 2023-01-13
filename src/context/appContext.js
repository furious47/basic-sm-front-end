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
    onePostErr: false,
    errMsg: null,
    editComplete: false,
    editItem: null,
  };

  const [state, setState] = useState(intialState);

  const loading = () => {
    setState({ ...state, isloading: true, errMsg: null, alert: false });
  };

  const register = async (input) => {
    loading();
    try {
      const { data } = await axios.post("/auth/register", { ...input });
      setState({ ...state, isloading: false, user: data.user.name });
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          isloading: false,
          token: data.token,
        })
      );
    } catch (error) {
      const err = error.response.data.msg;
      setState({
        ...state,
        user: null,
        alert: true,
        errMsg: err,
        isloading: false,
      });
    }
  };

  const login = async (input) => {
    loading();
    try {
      const { data } = await axios.post("/auth/login", { ...input });
      console.log(data);
      setState({ ...state, isloading: false, user: data.name });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.name, isloading: false, token: data.token })
      );
    } catch (error) {
      const err = error.response.data.msg;
      setState({
        ...state,
        user: null,
        alert: true,
        errMsg: err,
        isloading: false,
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    setState(intialState);
  };

  const createPost = async (post) => {
    loading();
    try {
      const { data } = await axios.post("/posts", { ...post });

      setState({
        ...state,
        isloading: false,
        posts: [data.posts, ...state.posts],
      });
    } catch (error) {
      setState({ ...state, alert: true, isloading: false });
    }
  };

  const getAllPost = async () => {
    loading();
    try {
      const { data } = await axios.get("/posts");
      setState({
        ...state,
        isloading: false,
        editComplete: false,
        posts: data.posts,
      });
    } catch (error) {
      setState({ ...state, alert: true, isloading: false });
    }
  };

  const getOnePost = async (id) => {
    loading();
    try {
      const { data } = await axios.get(`/posts/${id}`);
      setState({ ...state, isloading: false, editItem: data.posts.post });
    } catch (error) {
      setState({
        ...state,
        onePostErr: true,
        isloading: false,
        editItem: null,
      });
    }
  };

  const updatePost = async (id, input) => {
    loading();
    try {
      const { data } = await axios.patch(`/posts/${id}`, { ...input });
      setState({
        ...state,
        isloading: false,
        editComplete: true,
        posts: [...state.posts, data],
      });
    } catch (error) {
      setState({ ...state, isloading: false, editItem: null });
    }
  };

  const deletePost = async (id) => {
    loading();
    try {
      await axios.delete(`/posts/${id}`);
      getAllPost();
    } catch (error) {
      setState({ ...state, isloading: false });
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
