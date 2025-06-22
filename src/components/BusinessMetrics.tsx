import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { TrendingUp, Users, PieChart as PieChartIcon, ArrowUp } from 'lucide-react';
import HolographicCard from './HolographicCard';

const initialData = {
  revenue: [
    { month: 'Jan', value: 4000, previousYear: 3500 },
    { month: 'Feb', value: 3000, previousYear: 2800 },
    { month: 'Mar', value: 5000, previousYear: 4200 },
    { month: 'Apr', value: 4500, previousYear: 4000 },
    { month: 'May', value: 6000, previousYear: 5000 },
    { month: 'Jun', value: 5500, previousYear: 4800 }
  ],
  customers: [
    { month: 'Jan', value: 100, newCustomers: 20 },
    { month: 'Feb', value: 120, newCustomers: 25 },
    { month: 'Mar', value: 150, newCustomers: 35 },
    { month: 'Apr', value: 180, newCustomers: 40 },
    { month: 'May', value: 220, newCustomers: 50 },
    { month: 'Jun', value: 250, newCustomers: 45 }
  ],
  marketShare: [
    { name: 'Enterprise', value: 400, growth: '+15%' },
    { name: 'SMB', value: 300, growth: '+22%' },
    { name: 'Startups', value: 200, growth: '+28%' },
    { name: 'Others', value: 100, growth: '+10%' }
  ]
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1'];

export default function BusinessMetrics() {
  const [data, setData] = useState(initialData);
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        revenue: prevData.revenue.map(item => ({
          ...item,
          value: Math.max(2000, item.value * (1 + (Math.random() - 0.5) * 0.1))
        })),
        customers: prevData.customers.map(item => ({
          ...item,
          value: Math.max(50, item.value * (1 + (Math.random() - 0.5) * 0.05))
        }))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative overflow-hidden py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-pink-50/20 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Real-Time Business Intelligence
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Monitor key performance indicators and market trends with live data updates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Revenue Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HolographicCard className="p-6 h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Growth</h3>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">12.5%</span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.revenue}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Customer Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HolographicCard className="p-6 h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-emerald-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Customer Growth</h3>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">18.2%</span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.customers}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Market Share Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HolographicCard className="p-6 h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <PieChartIcon className="h-6 w-6 text-purple-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Market Share</h3>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.marketShare}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      onMouseEnter={(_, index) => setHoveredSector(index)}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      {data.marketShare.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          opacity={hoveredSector === index ? 1 : 0.8}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}