export default function Register() {
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        birthday: '',
        password: '',
        password2: ''
    });
    const [pwMatch, setPwMatch] = useState(null);


    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            registerData.password !== registerData.password2 ||
            !registerData.name ||
            !registerData.email ||
            !registerData.birthday ||
            !registerData.password
            ) {
            setPwMatch(false);
        } else {
            setPwMatch(true);
            //Logic to send data to server
        }
    };


    return (
        <div>
            <h3>Create an Account</h3>
            <p>Enter your details below or <a href="">log in</a></p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={registerData.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={registerData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="birthday">Date of Birth</label>
                    <input type="date" id="birthday" value={registerData.birthday} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={registerData.password} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" id="password2" value={registerData.password2} onChange={handleChange}/>
                </div>
                <button type="submit">Register</button>
            </form>
            <p><a href="">Forgot Password</a></p>
        </div>
    )
}