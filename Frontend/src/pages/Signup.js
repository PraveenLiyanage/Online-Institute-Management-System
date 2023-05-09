import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import sign_img from '../images/signup.jpg'


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div className="card">
      <img src={sign_img} class="card-img-top" alt="...">
      </img>
      <div className="card-body">
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
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

      <button class="btn btn-outline-primary" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      <br></br>
      <br></br>
      <a href='/login'>Already have an acoount? login</a>
    </form>
    </div>
    </div>
  )
}

export default Signup