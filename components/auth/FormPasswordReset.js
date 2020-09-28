import styles from '../../styles/forms.module.css';
import Link from 'next/link'
import { useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import API_URL, { API_OPTIONS } from '../../api/api';
import toasterConfiguration from '../_toaster';

const PasswordResetForm = () => {
    const [email, setEmail] = useState('');

    const success = message => toast.success(message, toasterConfiguration);
    const error = message => toast.error(message, toasterConfiguration);
    const info = message => toast.info(message, toasterConfiguration);

    const handleChange = useCallback(event => setEmail(event.target.value))

    const handleSubmit = useCallback(async event => {
        event.preventDefault()
        const infoId = info('Please wait ...')

        const options = { ...API_OPTIONS, body: JSON.stringify({ email }) }

        const raw = await fetch(`${API_URL}/api/v1/auth/forgotPassword`, options)
        const parsed = await raw.json();
        toast.dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        setEmail('');
        success(parsed.data)
    })

    return (
        <section className={`form mt-5 ${styles.custom_mt}`}>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">

                            <ToastContainer />

                            <Link href="/auth/login"><a>Back to login</a></Link>
                            <h1 className="mb-2">Reset Password</h1>
                            <p>	Use this form to reset your password using the registered email address.</p>
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="form-group">
                                    <label>Enter Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Reset Password"
                                        className="btn btn-dark btn-block"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default PasswordResetForm;