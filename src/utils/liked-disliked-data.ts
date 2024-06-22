import { useSelector } from "react-redux";
import { selectUserLike } from "../features/UserSlice";

export const likedData = (topics:any) => {
    const likedData = useSelector(selectUserLike)
    console.log(topics)
    topics = topics.map((topicItem: any) => {
        const isliked = likedData?.some((el: any) => el.topicId == topicItem.id);
        return {
            ...topicItem,
            isliked
        };
    });

}