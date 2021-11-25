import Link from 'next/link';
import useAuth from '../../context/auth';

const ManageCoursesNone = props => {
    const { user } = useAuth();
    const { bootcamps } = props;

    return (
        <div className="card-body">

            <Link href={`/user/${user.currentUser._id}/manage/bootcamps`}>
                <a className="btn btn-link text-secondary my-3">
                    <i className="fas fa-chevron-left"></i>
                    &nbsp; Manage Property
                </a>
            </Link>

            <h1 className="mb-2">
                Manage Listings
            </h1>

            <p className="lead">
                You have not yet added any listings
            </p>

            {
                bootcamps && bootcamps.data.length > 0
                    ? bootcamps.data.map((bootcamp, ind) => (
                        <Link key={ind} href={`/bootcamp/${bootcamp._id}/courses/add`}>
                            <a className="btn btn-primary btn-block"
                            >Add Your first listing for '{bootcamp.name}'</a>
                        </Link>
                    ))
                    : null
            }

        </div>
    )
}

export default ManageCoursesNone;