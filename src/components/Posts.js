import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/appContext";

const Posts = () => {
  const { posts, deletePost, isloading } = useGlobalContext();

  if (isloading) {
    return <div className="loading"></div>;
  }

  if (posts.length < 1) {
    return (
      <>
        <EmptyContainer>
          <h5>Currently, there's no Posts</h5>
        </EmptyContainer>
      </>
    );
  }

  return (
    <Wrapper>
      <div>
        {posts.map((e) => {
          const { _id, post } = e;
          return (
            <div key={_id} className="post">
              <div className="content">{post}</div>
              <div className="btn-con">
                <Link to={`/edit/${_id}`}>
                  <button className="btn">edit</button>{" "}
                </Link>
                <button
                  className="btn"
                  onClick={() => {
                    deletePost(_id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  /* min-height: 100vh; */

  .content {
    border: 1px solid rebeccapurple;
    /* background-color: rgb(240, 225, 225); */
    min-width: 50vw;
    max-width: 50vw;
    min-height: 15vh;
    max-height: 20vh;
    padding: 5px;
  }

  .btn-con {
    margin-right: 2px;
  }

  .btn {
    margin-right: 4px;
  }

  .post {
    margin-top: 5px;
  }

  @media screen and (max-width: 400px) {
    .post {
      min-width: 80vw;
      max-width: 80vw;
      max-height: 20vh;
      overflow: scroll;
    }
  }
`;

const EmptyContainer = styled.section`
  text-align: center;
  h5 {
    text-transform: none;
  }
  span {
    color: var(--primary-500);
  }
`;

export default Posts;
