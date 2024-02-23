export default function Login() {
    const [mailError, setMailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [postLogin, setPostLogin] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setPostLogin({
            ...postLogin,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        
    };
    
    return (
        <div>
            <h3>Welcome back!</h3>
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={postLogin.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={postLogin.password} onChange={handleChange} />
                </div>
                <p>Don't have an account? <a href="">Register</a></p>
                <button type="submit">Log in</button>
                <p><a href="">Forgot Password</a></p>
            </form>
        </div>
    )
}