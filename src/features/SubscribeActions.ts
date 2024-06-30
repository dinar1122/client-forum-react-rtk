import { categoryApi } from '../app/services/categoryApi';
import { topicApi } from '../app/services/topicApi';
import {
  useDeleteFollowOnUserMutation,
  useFollowOnUserMutation,
} from '../app/services/followsApi';
import {
  useCreateSubMutation,
  useDeleteSubMutation,
} from '../app/services/tagsApi';

const useSubscriptionActions = () => {
  const [topicUnSubscribe] = topicApi.useDeleteSubcriptionMutation();
  const [topicSubscribe] = topicApi.useCreateSubcriptionMutation();
  const [categorySubscribe] =
    categoryApi.useCreateSubscriptionCategoryMutation();
  const [categoryUnSubscribe] =
    categoryApi.useDeleteSubscriptionCategoryMutation();
  const [userSubscribe] = useFollowOnUserMutation();
  const [userUnsubscribe] = useDeleteFollowOnUserMutation();
  const [subscribeTag] = useCreateSubMutation();
  const [unsubscribeTag] = useDeleteSubMutation();

  const handleSubscribeUser = async (isSubscribed: boolean, id: string) => {
    try {
      if (!isSubscribed) {
        await userSubscribe(id).unwrap();
      } else {
        await userUnsubscribe(id).unwrap();
      }
    } catch (error) {
      console.error('Subscription action failed', error);
    }
  };
  const handleSubscribeTags = async (isSubscribed: boolean, id: string) => {
    try {
      if (!isSubscribed) {
        await subscribeTag(id).unwrap();
      } else {
        await unsubscribeTag(id).unwrap();
      }
    } catch (error) {
      console.error('Subscription action failed', error);
    }
  };
  const handleSubscribeTopic = async (isSubscribed: boolean, id: string) => {
    try {
      if (!isSubscribed) {
        await topicSubscribe(id).unwrap();
      } else {
        await topicUnSubscribe(id).unwrap();
      }
    } catch (error) {
      console.error('Subscription action failed', error);
    }
  };

  const handleSubscribeCategory = async (
    isSubscribed: boolean,
    categoryId: string,
  ) => {
    try {
      if (!isSubscribed) {
        await categorySubscribe(categoryId).unwrap();
      } else {
        await categoryUnSubscribe(categoryId).unwrap();
      }
    } catch (error) {
      console.error('Category unsubscription action failed', error);
    }
  };

  return {
    handleSubscribeTopic,
    handleSubscribeCategory,
    handleSubscribeUser,
    handleSubscribeTags,
  };
};

export default useSubscriptionActions;
