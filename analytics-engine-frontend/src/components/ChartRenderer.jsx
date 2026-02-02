import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  const ChartRenderer = ({ chartType, data, metric }) => {
    const COLORS = {
      primary: ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"],
      gradient: {
        blue: "#3B82F6",
        purple: "#8B5CF6",
        pink: "#EC4899",
      }
    };
  
    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
            <p className="font-semibold text-gray-900 mb-1">{label}</p>
            <p className="text-sm text-blue-600 font-medium">
              {payload[0].name}: {typeof payload[0].value === 'number' ? payload[0].value.toLocaleString() : payload[0].value}
            </p>
          </div>
        );
      }
      return null;
    };
  
    const getChartTitle = () => {
      if (metric === "revenue") return "Revenue Analytics";
      if (metric === "top-products") return "Top Products Performance";
      if (metric === "customers") return "Customer Segmentation";
      if (metric === "peak-hours") return "Peak Hours Analysis";
      return "Analytics Overview";
    };
  
    const getChartIcon = () => {
      if (chartType === "line") {
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      }
      if (chartType === "bar") {
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      }
      if (chartType === "pie") {
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        );
      }
    };
  
    const renderLineChart = () => (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.gradient.blue} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={COLORS.gradient.blue} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="_id" 
            stroke="#6B7280"
            style={{ fontSize: '12px', fontWeight: '500' }}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '12px', fontWeight: '500' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={COLORS.gradient.blue}
            strokeWidth={3}
            dot={{ fill: COLORS.gradient.blue, r: 5 }}
            activeDot={{ r: 7, fill: COLORS.gradient.purple }}
            fill="url(#colorValue)"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  
    const renderBarChart = () => (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.gradient.purple} stopOpacity={0.9}/>
              <stop offset="95%" stopColor={COLORS.gradient.pink} stopOpacity={0.8}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="_id" 
            stroke="#6B7280"
            style={{ fontSize: '12px', fontWeight: '500' }}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '12px', fontWeight: '500' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  
    const renderPieChart = () => {
      const pieData = [
        { name: "New Customers", value: data[0]?.new || 0 },
        { name: "Returning Customers", value: data[0]?.returning || 0 },
      ];
  
      const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
        return (
          <text 
            x={x} 
            y={y} 
            fill="white" 
            textAnchor={x > cx ? 'start' : 'end'} 
            dominantBaseline="central"
            className="font-bold text-sm"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };
  
      return (
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={140}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? COLORS.gradient.blue : COLORS.gradient.purple}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="ml-8 space-y-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ 
                    backgroundColor: index === 0 ? COLORS.gradient.blue : COLORS.gradient.purple 
                  }}
                ></div>
                <div>
                  <p className="font-semibold text-gray-900">{entry.name}</p>
                  <p className="text-sm text-gray-600">{entry.value.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
  
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white">
              {getChartIcon()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{getChartTitle()}</h2>
              <p className="text-blue-100 text-sm">
                {data?.length || 0} data point{(data?.length || 0) !== 1 ? 's' : ''} visualized
              </p>
            </div>
          </div>
        </div>
  
        {/* Chart Content */}
        <div className="p-8">
          {chartType === "line" && renderLineChart()}
          {chartType === "bar" && renderBarChart()}
          {chartType === "pie" && renderPieChart()}
        </div>
  
        {/* Footer Stats */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{data?.length || 0}</p>
            </div>
            <div className="text-center border-l border-r border-gray-300">
              <p className="text-sm text-gray-600 mb-1">Chart Type</p>
              <p className="text-2xl font-bold text-gray-900 capitalize">{chartType}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Last Updated</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChartRenderer;