import { Card, CardBody } from "@nextui-org/react";
import TagItem from "../tag-item";


const FollowingTagsWrapper = ({ followingTags }: any) => {
  if(followingTags.length < 1) {
    return (<div className="text-2xl font-semibold text-gray-600 bg-gray-200 rounded-2xl justify-center flex m-3 p-3">Вы не подписаны ни на один тег</div>)
    
  }
  return (
    <Card className="mt-5 p-3 bg-gray-100">
      <CardBody className="flex-row flex-wrap p-4 gap-3 bg-white rounded-2xl ">
        {followingTags.map((tag: any) => (
          <TagItem key={tag.id} tag={tag.tag} />
        ))}
      </CardBody>
    </Card>
  );
}

export default FollowingTagsWrapper;
