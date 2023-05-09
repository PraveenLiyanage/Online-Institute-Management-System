import { Link } from 'react-router-dom'
import { useState } from 'react';

const Upper = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Redirect to search results page with searchTerm as query parameter
        window.location.href = `/search?q=${searchTerm}`;
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>upperbound</h1>
                </Link> 
                <form onSubmit={handleSubmit}>
                    <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search" />
                    <button type="submit">Search</button>
                </form>
            </div>
        </header>
    )
}

export default Upper;
