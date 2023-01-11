import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import FormRow from "../components/FormRow";
// import DashBoard from "./Dashboard";
import { useGlobalContext } from "../context/appContext";

function Register() {
  const [users, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isMember: true,
  });

  const { user, login, register, alert } = useGlobalContext();
  // loading();

  const toggleMember = () => {
    setUser({ ...users, isMember: !users.isMember });
  };

  const handleChange = (e) => {
    setUser({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = users;
    if (isMember) {
      login({ email, password });
    } else {
      register({ name, email, password });
    }
  };
  // console.log(user);

  return (
    <>
      {user && <Redirect to="/dashboard" />}
      <Wrapper className="page full-page">
        <div className="container">
          {alert && (
            <div className="alert alert-danger">Invalid Credentials</div>
          )}

          <form className="form" onSubmit={handleSubmit}>
            <h4>{users.isMember ? "Login" : "Register"}</h4>

            {!users.isMember && (
              <FormRow
                type="name"
                name="name"
                value={users.name}
                handleChange={handleChange}
              />
            )}

            <FormRow
              type="email"
              name="email"
              value={users.email}
              handleChange={handleChange}
            />

            <FormRow
              type="password"
              name="password"
              value={users.password}
              handleChange={handleChange}
            />

            <button type="submit" className="btn btn-block">
              {!users.isMember ? "Sign Up" : "Sign In"}
            </button>

            <p>
              {users.isMember ? "Not a member yet?" : "Already a member?"}

              <button
                type="button"
                onClick={toggleMember}
                className="member-btn"
              >
                {users.isMember ? "Register" : "Login"}
              </button>
              <Link to="/dashboard" className="btn">
                dashboard
              </Link>
            </p>
          </form>
        </div>
      </Wrapper>
    </>
  );
}

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
`;

export default Register;
