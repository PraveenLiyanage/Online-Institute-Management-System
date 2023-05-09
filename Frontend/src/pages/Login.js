import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import login_img from '../images/login.jpg'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className="card">
      <img src={login_img} className="card-img-top" alt="...">
      </img>
    <div className="card-body">
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button className="btn btn-outline-primary" disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      <br></br>
      <br></br>
      <a href='/signup'>New here? Sign up</a>
    </form>
    </div>
    </div>
  )
}

export default Login