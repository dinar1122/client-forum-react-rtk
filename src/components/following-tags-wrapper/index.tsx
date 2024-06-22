import { Card, CardBody } from "@nextui-org/react";
import TagItem from "../tag-item";

const FollowingTagsWrapper = ({ followingTags }: any) => {
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
