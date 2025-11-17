const UserCard = ({ user }) => {
  const formatNumber = (num) => {
    if (!num && num !== 0) return 'N/A';
    return new Intl.NumberFormat().format(num);
  };

  const getJoinDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Header with Avatar */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-16 h-16 rounded-full border-2 border-gray-200 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user.name || user.login}
            </h3>
            <p className="text-gray-600 text-sm mb-1">@{user.login}</p>
            {user.bio && (
              <p className="text-gray-700 text-sm line-clamp-2 mt-2">
                {user.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* User Stats */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="font-bold text-gray-900">{formatNumber(user.public_repos)}</div>
            <div className="text-xs text-gray-600">Repos</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="font-bold text-gray-900">{formatNumber(user.followers)}</div>
            <div className="text-xs text-gray-600">Followers</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="font-bold text-gray-900">{formatNumber(user.following)}</div>
            <div className="text-xs text-gray-600">Following</div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="px-6 pb-4 space-y-2">
        {user.location && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {user.location}
          </div>
        )}

        {user.company && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {user.company}
          </div>
        )}

        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Joined {getJoinDate(user.created_at)}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-github-blue text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors block"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;