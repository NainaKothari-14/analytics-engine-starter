const SearchBar = ({ onRun, loading }) => {
    const queries = [
      {
        id: "revenue-daily",
        title: "Revenue Daily",
        description: "Daily revenue trends",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ),
        color: "from-green-500 to-emerald-600",
        bgColor: "bg-green-50 hover:bg-green-100",
        borderColor: "border-green-200",
        onClick: () => onRun({ metric: "revenue", groupBy: "day" }),
      },
      {
        id: "revenue-monthly",
        title: "Revenue Monthly",
        description: "Monthly revenue analysis",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        color: "from-blue-500 to-indigo-600",
        bgColor: "bg-blue-50 hover:bg-blue-100",
        borderColor: "border-blue-200",
        onClick: () => onRun({ metric: "revenue", groupBy: "month" }),
      },
      {
        id: "top-products",
        title: "Top Products",
        description: "Best selling items",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        color: "from-purple-500 to-pink-600",
        bgColor: "bg-purple-50 hover:bg-purple-100",
        borderColor: "border-purple-200",
        onClick: () => onRun({ metric: "top-products" }),
      },
      {
        id: "customers",
        title: "Customers",
        description: "Customer segmentation",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        color: "from-orange-500 to-red-600",
        bgColor: "bg-orange-50 hover:bg-orange-100",
        borderColor: "border-orange-200",
        onClick: () => onRun({ metric: "customers" }),
      },
      {
        id: "peak-hours",
        title: "Peak Hours",
        description: "Busiest time periods",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        color: "from-teal-500 to-cyan-600",
        bgColor: "bg-teal-50 hover:bg-teal-100",
        borderColor: "border-teal-200",
        onClick: () => onRun({ metric: "peak-hours" }),
      },
    ];
  
    return (
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Select Analytics Query
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {queries.map((query) => (
            <button
              key={query.id}
              onClick={query.onClick}
              disabled={loading}
              className={`
                group relative overflow-hidden
                ${query.bgColor} ${query.borderColor}
                border-2 rounded-xl p-5
                transition-all duration-300 ease-out
                hover:shadow-lg hover:scale-105 hover:-translate-y-1
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0
                text-left
              `}
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${query.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${query.color} text-white mb-3 shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                {query.icon}
              </div>
  
              {/* Content */}
              <div className="relative">
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">
                  {query.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                  {query.description}
                </p>
              </div>
  
              {/* Arrow Icon */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
  
              {/* Loading Spinner Overlay */}
              {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default SearchBar;