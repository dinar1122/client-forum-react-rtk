import { selectCurrent } from '../../features/UserSlice'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { MdAlternateEmail } from "react-icons/md"
import { BASE_URL } from "../../constants"
import { Link } from "react-router-dom"

const Profile = () => {
  const currentData = useSelector(selectCurrent)

  if(!currentData) {
    return null
  }
  const { username, avatarUrl, email, id } = currentData
  return (
   <>
    <Card className="py-4 w-[202px] shadow-md">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`${BASE_URL}${avatarUrl}`}
          width={170}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{username}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail />
          {email}
        </p>
      </CardBody>
    </Card>
    </>
  )
}

export default Profile