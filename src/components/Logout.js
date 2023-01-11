import styled from "styled-components";
import { useGlobalContext } from "../context/appContext";

const Logout = () => {
  const { logout } = useGlobalContext();

  return (
    <Wrapped>
      <div>
        <button
          className="btn"
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
      </div>
    </Wrapped>
  );
};

const Wrapped = styled.section`
  width: 100%;
  margin-top: 3rem;
  div {
    margin-right: 2rem;
  }
  .btn {
    float: right;
  }
`;

export default Logout;
