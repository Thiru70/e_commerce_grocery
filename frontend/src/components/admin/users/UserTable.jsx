const UserTable = ({ users = [] }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="3" className="p-4 text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
