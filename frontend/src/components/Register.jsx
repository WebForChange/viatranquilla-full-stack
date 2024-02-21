export default function Register() {
    return (
        <div>
            <h2>Create an Account</h2>
            <p>Enter your details below or <a href="">log in</a></p>
            <form action="">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="birthdaz">Date of Birth</label>
                    <input type="date" id="birthday" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" id="password2" />
                </div>
                <button type="submit">Register</button>
            </form>
            <p><a href="">Forgot Password</a></p>
        </div>
    )
}