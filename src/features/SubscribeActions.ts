import { useParams } from "react-router-dom";
import { categoryApi, useLazyGetCategoryByIdQuery, useLazyGetCategoryListQuery } from "../app/services/categoryApi";
import { topicApi } from "../app/services/topicApi";
import { useLazyGetUserByIdQuery } from "../app/services/userApi";

const useSubscriptionActions = () => {
    
    const [topicUnSubscribe] = topicApi.useDeleteSubcriptionMutation();
    const [topicSubscribe] = topicApi.useCreateSubcriptionMutation();
    const [categorySubscribe] = categoryApi.useCreateSubscriptionCategoryMutation();
    const [categoryUnSubscribe] = categoryApi.useDeleteSubscriptionCategoryMutation();

    const handleSubscribeTopic = async (isSubscribed: boolean, id: string) => {
        try {
            if (!isSubscribed) {
                await topicSubscribe(id).unwrap();
            } else {
                await topicUnSubscribe(id).unwrap();
            }
        } catch (error) {
            console.error("Subscription action failed", error);
        }
    };

    const handleSubscribeCategory = async (isSubscribed: boolean, categoryId: string) => {
        try {
            if (!isSubscribed) {
                await categorySubscribe(categoryId).unwrap();
            } else {
                await categoryUnSubscribe(categoryId).unwrap();
            }
        } catch (error) {
            console.error("Category unsubscription action failed", error);
        }
    };

    return { handleSubscribeTopic, handleSubscribeCategory };
};

export default useSubscriptionActions;
