import Head from 'next/head'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import PasswordResetForm from '../../components/auth/FormPasswordReset';

function PasswordReset() {
    return (
        <main>
            <Head>
                <title>Acres - Password Reset</title>
            </Head>

            <Navigation />

            <PasswordResetForm />

            <Footer />

        </main>
    )
}

export default PasswordReset;