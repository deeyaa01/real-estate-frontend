import styles from '../../styles/forms.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link'
import React, { useCallback, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import useToaster from '../../context/toaster';
import useAuth from '../../context/auth';
import API_URL, { API_OPTIONS } from '../../api/api';

const ReviewBootcampForm = props => {
    const { name } = props.bootcamp;
    const { user } = useAuth();
    const { query } = useRouter();
    const { error, info, success, dismiss } = useToaster();
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    const handleChange = useCallback(({ target }) => {
        const { name, value } = target;

        switch (name) {
            case 'title': setTitle(value); break;
            case 'review': setReview(value); break;
            case 'rating': setRating(parseInt(value)); break;
            default: null;
        }
    })

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const infoId = info('Please wait ...')

        API_OPTIONS.headers['Authorization'] = `Bearer ${user.token}`;

        const options = {
            ...API_OPTIONS,
            body: JSON.stringify({ title, text: review, rating })
        }

        const raw = await fetch(`${API_URL}/api/v1/bootcamps/${query.id}/reviews`, options)
        const parsed = await raw.json();
        dismiss(infoId)

        if (!parsed.success) {
            return error(parsed.msg)
        }

        setTitle(''); setReview(''); setRating(0)
        success('Review succesfully created!')
    })

    return (
        <section className={`container mt-5 ${styles.custom_mt}`}>

            <ToastContainer />

            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card bg-white py-2 px-4">
                        <div className="card-body">

                            <Link href={`/bootcamp/${query.id}`}>
                                <a className="btn btn-link text-secondary my-3">
                                    &nbsp; Property Info
                                </a>
                            </Link>

                            <h1 className="mb-2">{name}</h1>

                            <h3 className="text-primary mb-4">Write a Review</h3>

                            <p>
                                You must have rented or visited the property to release a reveiw.
							</p>

                            <form onSubmit={handleSubmit} method="POST">

                                <div className="form-group">
                                    <label htmlFor="rating">
                                        Rating: &nbsp;
                                        <span className="text-primary">
                                            {rating}
                                        </span>
                                    </label>

                                    <input
                                        type="range"
                                        className="custom-range"
                                        name='rating'
                                        min="1"
                                        max="10"
                                        step="1"
                                        id="rating"
                                        value={rating}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="Review title"
                                        onChange={handleChange}
                                        value={title}
                                    />
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="review"
                                        rows="10"
                                        className="form-control"
                                        placeholder="Your review"
                                        onChange={handleChange}
                                        value={review}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Submit Review"
                                        className="btn btn-dark btn-block"
                                    />
                                </div>

                                <p className="text-muted my-4">
                                    * Only users can leave a review for a real estate property
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ReviewBootcampForm;