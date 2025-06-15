import { GithubUser } from "../Search/SearchContainer";


interface UserCardProps {
  user: GithubUser;
  onClick: () => void;
}

function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-80 cursor-pointer flex items-center gap-4 bg-gray-800 p-2 m-4 rounded-xl hover:bg-gray-700 transition duration-300 shadow-lg"
    >
      <img src={user.avatar_url} alt="Avatar" className="w-14 h-14 rounded-full" />
      <div>
        <p className="text-lg font-semibold">{user.name || user.login}</p>
        <p className="text-sm text-gray-400">@{user.login}</p>
      </div>
    </div>
  );
}

export default UserCard;