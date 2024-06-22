import UserItem from "../user-item.tsx";




const FollowingWrapper = ({ followingList }: any) => {

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
