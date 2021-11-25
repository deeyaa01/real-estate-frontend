import styles from '../../styles/index.module.css';

const Showcase = () => {

    return (
        <section className={styles.showcase}>
            <div className={styles.dark_overlay}>
                <div className={`${styles.showcase_inner} container`}>
                    <h1 className="display-4"><b>Perfect houses at the best prices</b></h1>
                    <p className="lead">
                        At Acres, we provide the best experience for both buyers and sellers.
				    </p>
                </div>
            </div>
        </section >
    )
}

export default Showcase