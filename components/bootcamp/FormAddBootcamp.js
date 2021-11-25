import styles from '../../styles/forms.module.css';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import Select from 'react-select'
import { ToastContainer } from 'react-toastify';
import useAuth from '../../context/auth';
import useToaster from '../../context/toaster';
import API_URL, { API_OPTIONS } from '../../api/api';

const AddBootcampForm = () => {
    const { user } = useAuth();
    const { error, success, info, dismiss } = useToaster();
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [careers, setCareers] = useState([]);
    const [careersRef, setCareersRef] = useState([]);
    const [offers, setOffer] = useState({
        housing: false,
        jobAssistance: false,
        jobGuarantee: false,
        acceptGi: false
    })

    useEffect(() => {
        setUserId(user.currentUser._id);
    }, [user])

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        switch (name) {
            case 'name': setName(value); break;
            case 'address': setAddress(value); break;
            case 'phone': setPhone(value); break;
            case 'email': setEmail(value); break;
            case 'website': setWebsite(value); break;
            case 'description': setDescription(value); break;
            default: null;
        }
    })

    const handleChangeCheckBox = useCallback(({ target }) => {
        setOffer({ ...offers, [target.name]: !offers[target.name] });
    })

    const handleChangeSelect = useCallback(event => {
        setCareers([...event.map(input => input.value)])
        setCareersRef([...event])
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault()
        const infoId = info('Please wait ...')

        API_OPTIONS.headers['Authorization'] = `Bearer ${user.token}`;

        const options = {
            ...API_OPTIONS,
            body: JSON.stringify({
                name, address, phone,
                email, website, description,
                careers, ...offers
            })
        }

        const raw = await fetch(`${API_URL}/api/v1/bootcamps`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        setCareers([]); setCareersRef([]);
        setName(''); setAddress(''); setPhone(''); setEmail('');
        setWebsite(''); setDescription(''); setOffer({
            housing: false,
            jobAssistance: false,
            jobGuarantee: false,
            acceptGi: false
        })

        success('Bootcamp succesfully created!')
    })

    const careerOptions = [
        { value: 'Web Development', label: 'House' },
        { value: 'Mobile Development', label: 'Duplex' },
        { value: 'UI/UX', label: 'Bunglow' },
        { value: 'Data Science', label: 'Apartment' },
        { value: 'Business', label: 'Studio Apartment' },
        { value: 'Others', label: 'Others' }
    ]

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <h1 className="mb-2">Add Property</h1>
            <p>
                Important: You must be affiliated with Acres or a real-estate broker to continue.
			</p>

            <form method="POST" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <h3>Location & Contact Details</h3>
                                <div className="form-group">
                                    <label>Property Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Property Name"
                                        onChange={handleChange}
                                        value={name}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        placeholder="Full Address"
                                        onChange={handleChange}
                                        value={address}
                                        required
                                    />
                                    <small className="form-text text-muted"
                                    >Street, city, state, etc</small
                                    >
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Phone"
                                        onChange={handleChange}
                                        value={phone}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Contact Email"
                                        onChange={handleChange}
                                        value={email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>LinkedIn</label>
                                    <input
                                        type="text"
                                        name="website"
                                        className="form-control"
                                        placeholder="LinkedIn URL"
                                        onChange={handleChange}
                                        value={website}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card bg-white py-2 px-4">
                            <div className="card-body">
                                <h3>Other Info</h3>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        rows="5"
                                        className="form-control"
                                        placeholder="Description (basic details of your property)"
                                        maxLength="500"
                                        onChange={handleChange}
                                        value={description}
                                    ></textarea>
                                    <small className="form-text text-muted"
                                    >No more than 500 characters</small>
                                </div>
                                <div className="form-group">
                                    <label>Type of Property</label>
                                    <Select
                                        name="careers"
                                        onChange={handleChangeSelect}
                                        isMulti={true}
                                        options={careerOptions}
                                        value={careersRef}
                                    />
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="housing"
                                        id="housing"
                                        onChange={handleChangeCheckBox}
                                        checked={offers['housing']}
                                    />
                                    <label className="form-check-label" htmlFor="housing">
                                        Furnished
									</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jobAssistance"
                                        id="jobAssistance"
                                        onChange={handleChangeCheckBox}
                                        checked={offers['jobAssistance']}
                                    />
                                    <label className="form-check-label" htmlFor="jobAssistance">
                                        Running Water
									</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jobGuarantee"
                                        id="jobGuarantee"
                                        onChange={handleChangeCheckBox}
                                        checked={offers['jobGuarantee']}
                                    />
                                    <label className="form-check-label" htmlFor="jobGuarantee">
                                        Running Electricity
									</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="acceptGi"
                                        id="acceptGi"
                                        onChange={handleChangeCheckBox}
                                        checked={offers['acceptGi']}
                                    />
                                    <label className="form-check-label" htmlFor="acceptGi">
                                        Accepts Cash
									</label>
                                </div>
                                <p className="text-muted my-4">
                                    * After you add the real estate, you can add the specific listings offered
								</p>
                                <p className="text-muted my-4">
                                    * Publishers can only add one real estate property
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Submit Property"
                        className="btn btn-primary btn-block my-4"
                    />
                    <Link href={`/user/${userId}/manage/bootcamps`}>
                        <a className="btn btn-danger btn-block mb-4"
                        >Cancel</a>
                    </Link>
                </div>
            </form>
        </section>
    )
}

export default AddBootcampForm;