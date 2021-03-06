import styles from '../../styles/forms.module.css';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS } from '../../api/api';

const RegisterForm = () => {
    const router = useRouter();
    const { error, info, dismiss } = useToaster();
    const { handleSetUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [role, setRole] = useState('');

    const handleChange = useCallback(event => {
        const { name, value } = event.target;

        switch (name) {
            case 'name': setName(value); break;
            case 'email': setEmail(value); break;
            case 'password': setPassword(value); break;
            case 'passwordConfirm': setPasswordConfirm(value); break;
            case 'role': setRole(value); break;
            default: null;
        }
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const infoId = info('Please wait ...')

        if (password.length < 8) {
            return error('Passwords should be at least 8 characters in length')
        }

        const options = {
            ...API_OPTIONS,
            body: JSON.stringify({ name, email, password, passwordConfirm, role })
        }

        const raw = await fetch(`${API_URL}/api/v1/auth/signup`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        setName(''); setEmail(''); setPassword('');
        setPasswordConfirm(''); setRole('');
        handleSetUser(parsed)
        router.push('/auth/login')
    })

    return (
        <section className={`form mt-5 ${styles.custom_mt}`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <div className="card bg-white p-4 mb-4">
                            <div className="card-body">

                                <ToastContainer />

                                <h1>Register</h1>
                                <p>
                                    Register to buy, sell and rent your homes in the #1 Real Estate Platform in India
								</p>
                                <form onSubmit={handleSubmit} method="POST">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter full name"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                            onChange={handleChange}
                                            required
                                        />
                                        <small>Password should be at least 8 characters</small>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password2">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="passwordConfirm"
                                            className="form-control"
                                            placeholder="Confirm password"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="card card-body mb-1">
                                        <h5>User Role</h5>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="role"
                                                value="user"
                                                onChange={handleChange}
                                                checked={role === 'user'}
                                            />
                                            <label className="form-check-label">
                                                To Buy/Rent
											</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="role"
                                                value="publisher"
                                                onChange={handleChange}
                                                checked={role === 'publisher'}
                                            />
                                            <label className="form-check-label">
                                                To Sell
											</label>
                                        </div>
                                    </div>
                                    <small className="text-form text-danger">
                                        *By clicking you will be agreeing to the Terms and Conditions
									</small> <br />  <br />
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            value="Register"
                                            className="btn btn-primary btn-block"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterForm;