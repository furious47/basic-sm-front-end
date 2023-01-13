import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/appContext";
import styled from "styled-components";
import FormRow from "../components/FormRow";
import { useParams, Redirect, Link } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const {
    user,
    editItem,
    editComplete,
    getOnePost,
    onePostErr,
    updatePost,
    isloading,
  } = useGlobalContext();

  const [state, setState] = useState({ post: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost(id, { ...state });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      getOnePost(id);
    }
  }, [id]);

  useEffect(() => {
    if (editItem) {
      setState({ ...state, post: editItem });
    }
  }, [editItem]);

  if (isloading && !editItem) {
    return <div className="loading"></div>;
  }

  if (!editItem || onePostErr) {
    return (
      <>
        {!user && <Redirect to="/" />}

        <ErrorContainer>
          <h5>There was an error! Please go back to Dashboard</h5>
          <Link to="/dashboard" className="btn">
            Dashboard
          </Link>
        </ErrorContainer>
      </>
    );
  }

  return (
    <>
      {!user && <Redirect to="/" />}

      <Wrapper>
        <div className="container" onSubmit={handleSubmit}>
          <Link to="/dashboard" className="btn Dashboard">
            Dashboard
          </Link>
          <form className="form">
            {editComplete && <p>Success!Post Edited</p>}

            <FormRow
              name="post"
              value={state.post}
              handleChange={handleChange}
            />
            <button className="btn" disabled={isloading}>
              {isloading ? "Editing" : "Edit..."}
            </button>
          </form>
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

  .Dashboard {
    float: right;
    margin-right: 2rem;
  }
`;

const ErrorContainer = styled.section`
  text-align: center;
  padding-top: 6rem; ;
`;

export default Edit;
