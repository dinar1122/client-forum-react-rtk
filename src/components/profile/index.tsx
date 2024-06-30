import { selectCurrent } from '../../features/UserSlice';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { MdAlternateEmail } from 'react-icons/md';
import { BASE_URL } from '../../constants';
import { Link } from 'react-router-dom';

const Profile = () => {
  const currentData = useSelector(selectCurrent);

  if (!currentData) {
    return null;
  }
  const { username, avatarUrl, email, id } = currentData;
  return (
    <>
      <Card className="p-2 shadow-sm">
        <CardHeader className="pb-0  flex-col items-center">
          <Image
            alt="Card background"
            className="object-cover rounded-xl "
            src={`${BASE_URL}${avatarUrl}`}
            width={170}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2 items-center gap-1">
          <div className="bg-gray-200 rounded-lg w-full flex justify-center">
            <Link to={`/users/${id}`}>
              <h4 className="font-bold text-large mx-auto flex-row items-center">
                {' '}
                <MdAlternateEmail />
                {username}
              </h4>
            </Link>
          </div>
          <p className="text-blue-500 flex items-center ">{email}</p>
        </CardBody>
      </Card>
    </>
  );
};

export default Profile;
