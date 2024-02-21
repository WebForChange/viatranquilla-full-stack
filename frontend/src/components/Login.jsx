export default function Login() {
    
    return (
        <div>
            <h3>Welcome back!</h3>
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <p>Don't have an account? <a href="">Register</a></p>
                <button type="submit">Log in</button>
                <p><a href="">Forgot Password</a></p>
            </form>
        </div>
    )
}