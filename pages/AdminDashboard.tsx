import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { REVENUE_DATA, VEHICLE_DISTRIBUTION_DATA, MOCK_VEHICLES } from '../constants';
import { DollarSign, ShoppingBag, Users, Activity, Settings, Plus } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">Overview of fleet performance and revenue</p>
          </div>
          <button className="bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors text-xs sm:text-sm">
            <Settings className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Settings</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg text-blue-600">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-green-500 text-xs sm:text-sm font-bold">+12.5%</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">Total Revenue</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">45.2M ₫</h3>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-purple-100 p-2 sm:p-3 rounded-lg text-purple-600">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-green-500 text-xs sm:text-sm font-bold">+5.2%</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">Total Bookings</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">128</h3>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg text-yellow-600">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-red-500 text-xs sm:text-sm font-bold">-2.1%</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">Active Fleet</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">85%</h3>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-pink-100 p-2 sm:p-3 rounded-lg text-pink-600">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-green-500 text-xs sm:text-sm font-bold">+8.4%</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">New Users</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">1,420</h3>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Weekly Revenue</h3>
            <div className="h-64 sm:h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000000}M`} />
                  <Tooltip 
                    formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Fleet Distribution</h3>
            <div className="h-64 sm:h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={VEHICLE_DISTRIBUTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {VEHICLE_DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Vehicle Management Table */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-3 sm:p-4 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Vehicle Management</h3>
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-center">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> <span>Add Vehicle</span>
            </button>
          </div>
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">Vehicle Name</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium hidden sm:table-cell">Type</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium hidden md:table-cell">Location</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">Price/Day</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">Status</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium hidden lg:table-cell">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_VEHICLES.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <img src={vehicle.imageUrl} alt="" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <span className="font-medium text-gray-900 text-sm sm:text-base block truncate">{vehicle.name}</span>
                            <span className="text-xs sm:text-sm text-gray-600 sm:hidden">{vehicle.type}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden sm:table-cell">{vehicle.type}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 max-w-xs truncate hidden md:table-cell">{vehicle.address}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vehicle.pricePerDay)}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                        <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                          vehicle.status === 'Rented' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-blue-600 font-medium cursor-pointer hover:underline hidden lg:table-cell">
                        Edit
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};