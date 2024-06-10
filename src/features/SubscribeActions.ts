import { useParams } from "react-router-dom";
import { categoryApi, useLazyGetCategoryByIdQuery, useLazyGetCategoryListQuery } from "../app/services/categoryApi";
import { topicApi } from "../app/services/topicApi";
import { useLazyGetUserByIdQuery } from "../app/services/userApi";

const useSubscriptionActions = () => {
    const { id: userId } = useParams<{ id: any }>();
    const [triggerCategoryDataById] = useLazyGetCategoryByIdQuery();
    const [triggerCategoryData] = useLazyGetCategoryListQuery()

    const [triggerUserData] = useLazyGetUserByIdQuery();
    const [topicUnSubscribe] = topicApi.useDeleteSubcriptionMutation();
    const [topicSubscribe] = topicApi.useCreateSubcriptionMutation();
    const [categorySubscribe] = categoryApi.useCreateSubscriptionCategoryMutation();
    const [categoryUnSubscribe] = categoryApi.useDeleteSubscriptionCategoryMutation();

    const handleSubscribeTopic = async (isSubscribed: boolean, id: string, categoryId: string, subs = false) => {
        try {
            if (!isSubscribed) {
                await topicSubscribe(id).unwrap();
            } else {
                await topicUnSubscribe(id).unwrap();
            }
            
            if(subs) {
                await triggerUserData(userId);
            } else {
                await triggerCategoryDataById(categoryId);
                await triggerCategoryData()
            }
        } catch (error) {
            console.error("Subscription action failed", error);
        }
    };

    const handleUnSubscribeCategory = async (isSubscribed: boolean, categoryId: string) => {
        try {
            if (!isSubscribed) {
                await categorySubscribe(categoryId).unwrap();
            } else {
                await categoryUnSubscribe(categoryId).unwrap();
            }
            await triggerCategoryDataById(categoryId);
            await triggerCategoryData();
        } catch (error) {
            console.error("Category unsubscription action failed", error);
        }
    };

    return { handleSubscribeTopic, handleUnSubscribeCategory };
};

export default useSubscriptionActions;
