import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, BarChart2, PieChart as PieChartIcon } from "lucide-react";

const lineData = [
  { month: "Jan", revenue: 2400, users: 1400 },
  { month: "Feb", revenue: 1398, users: 1800 },
  { month: "Mar", revenue: 9800, users: 2200 },
  { month: "Apr", revenue: 3908, users: 2500 },
  { month: "May", revenue: 4800, users: 2800 },
  { month: "Jun", revenue: 3800, users: 3200 },
  { month: "Jul", revenue: 4300, users: 3500 },
];

const barData = [
  { category: "Analytics", efficiency: 85, satisfaction: 90 },
  { category: "Integration", efficiency: 75, satisfaction: 80 },
  { category: "Security", efficiency: 95, satisfaction: 88 },
  { category: "Automation", efficiency: 80, satisfaction: 92 }
];

const pieData = [
  { name: "Enterprise", value: 400 },
  { name: "SMB", value: 300 },
  { name: "Startup", value: 200 },
  { name: "Government", value: 100 },
];

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={lineData}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#6366F1"
          fillOpacity={1}
          fill="url(#revenueGradient)"
          strokeWidth={3}
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#10B981"
          fillOpacity={1}
          fill="url(#usersGradient)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="efficiency" fill="#6366F1" radius={[6, 6, 0, 0]} />
        <Bar dataKey="satisfaction" fill="#10B981" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const PieChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default function DataVisualization() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section 
      id="analytics" 
      ref={ref}
      className="section-padding bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Data Insights
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          >
            Transform Data Into Business Growth
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground">
            Powerful analytics that reveal hidden opportunities and drive strategic decisions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Growth Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <LineChartComponent />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <BarChartComponent />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                  Market Share
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <PieChartComponent />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}