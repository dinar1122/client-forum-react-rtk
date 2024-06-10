import { useParams } from "react-router-dom";
import { useLazyGetCategoryByIdQuery, useLazyGetCategoryListQuery } from "../app/services/categoryApi";
import { likesApi } from "../app/services/likesApi";
import { useLazyGetUserByIdQuery } from "../app/services/userApi";

export const useVotesActions = () => {
    const { id: userId } = useParams<{ id: any }>();
    const [triggerCategoryDataById] = useLazyGetCategoryByIdQuery();
    const [triggerUserData] = useLazyGetUserByIdQuery();
    const [triggerCategoryData] = useLazyGetCategoryListQuery();
    const [likeTopic] = likesApi.useCreateLikeOnTopicMutation()

    const handleLikeTopic = async (isLiked: boolean, id: string, categoryId: string, isSubsPage = false) => {
        if (!isLiked) {
            likeTopic(id).unwrap()
        } else {
        }
        if(isSubsPage) {
            await triggerUserData(userId);
        } else {
            await triggerCategoryDataById(categoryId);
            await triggerCategoryData()
        }
        await triggerCategoryData()
        await triggerCategoryDataById(categoryId);
    };

    return {handleLikeTopic}
}
export default useVotesActions