import { FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { useGlobalContext } from "../context/appContext";

const Posts = () => {
  const { posts, deletePost } = useGlobalContext();

  if (posts.length < 1) {
    return (
      <>
        <p>No Posts</p>
      </>
    );
  }

  return (
    <Wrapper>
      {posts.map((list) => {
        const { _id, post } = list;
        return (
          <article key={_id} className="container">
            <p>
              {post}
              <button className="delete-btn " onClick={() => deletePost(_id)}>
                <FaTrash />
              </button>
            </p>
          </article>
        );
      })}
    </Wrapper>
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

export default Posts;
