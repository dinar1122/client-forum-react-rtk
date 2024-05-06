import { categoryApi, useLazyGetCategoryByIdQuery } from "../app/services/categoryApi";
import { topicApi } from "../app/services/topicApi";

const useSubscriptionActions = () => {
    const [triggerCategoryData] = useLazyGetCategoryByIdQuery();
    const [topicUnSubscribe] = topicApi.useDeleteSubcriptionMutation();
    const [topicSubscribe] = topicApi.useCreateSubcriptionMutation();
    const [categorySubscribe] = categoryApi.useCreateSubscriptionCategoryMutation();
    const [categoryUnSubscribe] = categoryApi.useDeleteSubscriptionCategoryMutation();
    
    const handleSubscribeTopic = ({isSubscribed, id}: any) => {
        if (!isSubscribed) {
            topicSubscribe(id).unwrap();
        } else {
            topicUnSubscribe(id).unwrap();
        }
        triggerCategoryData(id);
    };

    const handleUnSubscribeCategory = ({isSubscribed, categoryId}:any) => {
        if (!isSubscribed) {

            categorySubscribe(categoryId).unwrap();
        } else {
            categoryUnSubscribe(categoryId).unwrap();
        }
        triggerCategoryData(categoryId);
    };

    return { handleSubscribeTopic, handleUnSubscribeCategory };
};

export default useSubscriptionActions;