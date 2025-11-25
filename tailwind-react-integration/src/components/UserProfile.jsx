function UserProfile() {
  return (
    <div className="bg-gray-100 p-4 max-w-xs mx-auto my-8 rounded-lg shadow-lg 
                    sm:p-4 sm:max-w-sm sm:my-12
                    md:p-8 md:max-w-sm md:my-20
                    hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full w-24 h-24 mx-auto
                   sm:w-24 sm:h-24
                   md:w-36 md:h-36
                   hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <h1 className="text-lg text-blue-800 my-3
                     sm:text-xl sm:my-4
                     md:text-xl
                     hover:text-blue-500 transition-colors duration-300 ease-in-out">
        John Doe
      </h1>
      <p className="text-gray-600 text-sm
                    sm:text-base
                    md:text-base">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;