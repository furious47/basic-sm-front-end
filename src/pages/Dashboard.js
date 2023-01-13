import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Posts from "../components/Posts";
import Logout from "../components/Logout";
import { useGlobalContext } from "../context/appContext";

import styled from "styled-components";
import FormRow from "../components/FormRow";

const DashBoard = () => {
  const { user, getAllPost, createPost, isloading } = useGlobalContext();
  const [post, setPost] = useState({ post: "" });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(post);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      {!user && <Redirect to="/" />}
      <Logout />
      <Wrapper className="page full-page">
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <FormRow
              name="post"
              type="text"
              value={post.post}
              handleChange={handleChange}
            />
            <button className="btn btn-block" disabled={isloading}>
              {isloading ? "Loading" : "Post"}
            </button>
          </form>
          <Posts />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
  }

  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }

  .delete-btn {
    color: var(--red-dark);
    border-color: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    background: transparent;
  }
`;

export default DashBoard;
