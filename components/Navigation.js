import Link from 'next/link'
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../context/auth'
import Cookies from 'js-cookie'

const Navigation = () => {
    const router = useRouter();
    const { user, handleSetUser } = useAuth();

    const handleLogout = useCallback(() => {
        Cookies.remove('token')
        router.push('/')
        handleSetUser(null)
    })

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand">
                        <i className="fas fa-home"></i>
                        &nbsp; Acres
                    </a>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link href="/bootcamps">
                                <a className="nav-link">
                                    <i className="fas fa-search"></i>
                                    &nbsp; Browse Adverts
                                </a>
                            </Link>
                        </li>

                        {
                            user && user.success && user.currentUser
                                ? <React.Fragment>
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            id="navbarDropdown"
                                            role="button"
                                            data-toggle="dropdown"
                                        >
                                            <i className="fas fa-user"></i>
                                            &nbsp;  Account
							            </a>
                                        <div className="dropdown-menu">

                                            <Link href="#">
                                                <a className="dropdown-item">
                                                    Logged in: {user.currentUser.name}
                                                </a>
                                            </Link>

                                            <Link href="#">
                                                <a className="dropdown-item">
                                                    Role: {user.currentUser.role}
                                                </a>
                                            </Link>

                                            <Link href={`/user/${user.currentUser._id}/manage/bootcamps`}>
                                                <a className="dropdown-item">
                                                    Manage Property
                                                </a>
                                            </Link>


                                            <Link href={`/user/${user.currentUser._id}/manage/courses`}>
                                                <a className="dropdown-item"
                                                >Manage Listing</a>
                                            </Link>

                                            <Link href={`/user/${user.currentUser._id}/manage/reviews`}>
                                                <a className="dropdown-item">
                                                    Manage Reviews
                                                </a>
                                            </Link>

                                            <Link href={`/user/${user.currentUser._id}/manage/account`}>
                                                <a className="dropdown-item">
                                                    Manage Account
                                                </a>
                                            </Link>

                                            <div className="dropdown-divider"></div>

                                            <Link href='/'>
                                                <a className="dropdown-item" onClick={handleLogout}>
                                                    Logout
                                                </a>
                                            </Link>
                                        </div>
                                    </li>
                                </React.Fragment>
                                : <React.Fragment>
                                    <li className="nav-item">
                                        <Link href="/auth/login">
                                            <a className="nav-link">
                                                <i className="fas fa-sign-in-alt"></i>
                                                &nbsp; Login
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/auth/register">
                                            <a className="nav-link">
                                                <i className="fas fa-user-plus"></i>
                                                &nbsp; Register
                                            </a>
                                        </Link>
                                    </li>
                                </React.Fragment>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;