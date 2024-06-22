
import { likesApi } from "../app/services/likesApi";


export const useVotesActions = () => {
    const [likeTopic] = likesApi.useCreateLikeOnTopicMutation()

    const handleLikeTopic = async ( id: string) => {
        likeTopic(id).unwrap() 
    };

    return {handleLikeTopic}
}
export default useVotesActions