import Head from 'next/head'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import LoginForm from '../../components/auth/FormLogin';

function Login() {
    return (
        <main>
            <Head>
                <title>Acres - Login</title>
            </Head>

            <Navigation />

            <LoginForm />

            <Footer />

        </main>
    )
}

export default Login;