import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//import Logo from "../assets/logo.png";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000, 
    pauseOnHover:true,
    draggable:true,
    theme: "dark"
  };

  // useEffect(() => {
  //   if (localStorage.getItem('chat-app-user')) {
  //     navigate('/');
  //   }
  // }, [navigate]); // Include navigate in the dependency array
  

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(handleValidation()){
      console.log("In validation",registerRoute);
      const {password, username, email} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password,
      });
      if(data.status===false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const {password,confirmPassword, username, email} = values;
    if (username.length<3) {
      toast.error("Username should be greater than 2 characters.", toastOptions);
      return false;
    }
    else if (email===""){
      toast.error("Email is required.", toastOptions);
      return false;
    }
    else if (password.length<6) {
      toast.error("Password should be greater than 5 characters.", toastOptions);
      return false;
    }
    else if(password!==confirmPassword){
      toast.error("Passwords do not match.", toastOptions);
      return false;
    }
    return true;
  };
  
  const handleChange = (event)=> {
    setValues({...values,[event.target.name]:event.target.value})
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
          <div className='brand'>
            
            <h1>Registration</h1>
          </div>
          <input
            type="text" 
            placeholder='Username' 
            name='username' 
            onChange={(e)=>handleChange(e)}
          />
          <input
            type='email' 
            placeholder='Email' 
            name='email' 
            onChange={(e)=>handleChange(e)}
          />
          <input
            type='password' 
            placeholder='Password' 
            name='password' 
            onChange={(e)=>handleChange(e)}
          />
          <input
            type='password'
            placeholder='Confirm password' 
            name='confirmPassword' 
            onChange={(e)=>handleChange(e)}
          />
          <button type='submit'>Create User</button>
          <span>
  Don't have an account? 
  <Link to={'/login'}>Login</Link>
</span>

        </form>
      </FormContainer>
      <ToastContainer>

      </ToastContainer>
    </>
  );
}
const FormContainer = styled.div`

  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0D1A19;
  .brand {
    display:flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
    }
  }
  form{
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    background-color: #638282;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
      color: white;
      background-color: black;
      border-radius: 0.75rem;
      padding: 0.5rem;
      &:focus {
        border: 0.25rem solid #C2CFCD;
        outline: none;
      }
    }
    button {
      color: black;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
      border-radius: 1.5rem;
      transition: 0.5s ease-in-out;
      &:hover{
        background-color:#9EAAA2;
      }
    }
    span {
      a{
        text-decoration: none;
      }
    }
  }
`;
export default Register;