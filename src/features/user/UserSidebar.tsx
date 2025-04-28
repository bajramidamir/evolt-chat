"use client";
import { useActiveUsers } from "./hooks/useActiveUsers";

export function UserSidebar() {
  const users = useActiveUsers();

  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md md:sticky md:top-4 h-fit">
      <h2 className="text-center text-blue-500 font-bold text-lg md:text-2xl mb-4">
        Active Users
      </h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-2 py-2 text-gray-700 text-sm md:text-base font-semibold border-b border-gray-200 last:border-none"
          >
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
