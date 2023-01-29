const UserStats = ({ user }) => {
  return (
    <div>
      <div>
        Friends: {Math.floor(Math.random() * 100)}
        Likes: {Math.floor(Math.random() * 100)}
        Badges: {Math.floor(Math.random() * 100)}
      </div>
    </div>
  );
};
export default UserStats;