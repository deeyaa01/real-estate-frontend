import Link from 'next/link';

const ManageBootcampsNone = () => {

    return (
        <React.Fragment>
            <p className="lead">
                You have not yet added any real estate
            </p>
            <Link href={`/bootcamp/add`}>
                <a
                    className="btn btn-primary btn-block"
                >Add Real Estate</a>
            </Link>
        </React.Fragment>
    )
}

export default ManageBootcampsNone;