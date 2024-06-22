import { useSelector } from "react-redux";
import { selectCurrentSubscribedTopicsNCategories, selectCurrentTagsSubs, selectCurrentUserFollows } from "../features/UserSlice";

export const subscribedData = () => {
    const dataUserTagsSubs = useSelector(selectCurrentTagsSubs)
    const subscribedTagIds = new Set(dataUserTagsSubs?.map((sub: any) => sub.tagId));
    

    return {subscribedTagIds}
}
export const subscribedCategoryNTopics = () => {
    const subscribedCategoryNTopicsData = useSelector(selectCurrentSubscribedTopicsNCategories)

    return {subscribedCategoryNTopicsData}
}
export const userFollows = () => {
    const currentUserFollows = useSelector(selectCurrentUserFollows)

    return {currentUserFollows}
}