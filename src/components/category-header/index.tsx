import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";
import useSubscriptionActions from "../../features/SubscribeActions";

export default function CategoryHeader({description, avatarUrl ='', name, isSubscribed = false, categoryId, followers }: any) {

    const { handleUnSubscribeCategory } = useSubscriptionActions();
    console.log(categoryId)
  return (
    <Card>
      <CardHeader className="flex gap-3 pl-0 pt-0 pb-0">
        <Image
        className="rounded-tl-lg"
          alt="logo"
          height={150}
          radius="none"
          src={`${avatarUrl}`}
          width={150}
        />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-small text-default-500">{followers} подписчиков</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        
        <Button  onClick={() => handleUnSubscribeCategory(isSubscribed,categoryId)}>
            {isSubscribed ? 'Отписаться' : 'Подписаться'}
        </Button>
      </CardFooter>
    </Card>
  );
}
