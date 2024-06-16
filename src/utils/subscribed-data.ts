import { useSelector } from "react-redux";
import { selectCurrentSubscribedTopicsNCategories, selectCurrentTagsSubs } from "../features/UserSlice";

export const subscribedData = () => {
    const dataUserTagsSubs = useSelector(selectCurrentTagsSubs)
    const subscribedTagIds = new Set(dataUserTagsSubs?.map((sub: any) => sub.tagId));

    return {subscribedTagIds}
}
export const subscribedCategoryNTopics = () => {
    const subscribedCategoryNTopicsData = useSelector(selectCurrentSubscribedTopicsNCategories)

    return {subscribedCategoryNTopicsData}
}
