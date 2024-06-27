import UserItem from "../user-item.tsx";




const FollowingWrapper = ({ followingList }: any) => {
  if(followingList.length < 1 ) {
    return (<div className="text-2xl font-semibold text-gray-600 bg-gray-200 rounded-2xl justify-center flex m-3 p-3">Вы не подписаны ни на одного пользователя</div>)
  }

  return (
    <div className="gap-5 py-5 flex flex-col">
      {followingList.map((user:any) => (
        <UserItem 
        key={user.id} 
        username={user.following.username} 
        email={user.following.email} 
        avatarUrl={user.following.avatarUrl} 
        followingId={user.followingId} 
        bio={user.following.bio} />
      ))}
    </div>
  );
};

export default FollowingWrapper;
