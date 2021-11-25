import styles from '../styles/footer.module.css';

const Footer = () => {

    return (
        <footer className={`page-footer font-small teal pt-4 ${styles.upper_row}`}>
            <div className={`container text-center text-md-left`}>
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3 p-5">

                        <h5 className="text-uppercase font-weight-bold">Our Vision</h5>

                        <p>
                        Our vision is to be the leading real estate service provider in the region and the preferred place of employment for real estate professionals.
                        </p>

                    </div>

                    <hr className="clearfix w-100 d-md-none pb-3" />

                    <div className="col-md-6 mb-md-0 mb-3 p-5">

                        <h5 className="text-uppercase font-weight-bold">Our Mission</h5>

                        <p>
                        We’re dedicated to achieving our vision by creating an energetic, positive, results-driven work environment focused on the investment and development of long-term relationships. We measure our success by the results delivered to clients.
                        </p>

                    </div>
                </div>
            </div>

            <div className={`footer-copyright text-center py-3 ${styles.lower_row}`}>
                © {new Date().getFullYear()} Copyright &nbsp; | &nbsp; <i className="fas fa-home"></i> &nbsp; Acres
            </div>

        </footer>
    )
}

export default Footer;