import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, BarChart2, PieChart, Database, ArrowRight } from "lucide-react";

export const HeroVisual = () => {
  const [activeTab, setActiveTab] = useState<"global" | "analytics" | "data">("global");

  return (
    <div className="relative h-full w-full">
      {/* Floating 3D sphere with connections */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-64 h-64">
          {/* Main sphere */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl"
            animate={{
              rotateY: activeTab === "global" ? 360 : 0,
              scale: activeTab === "global" ? 1.2 : 1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/80 w-16 h-16" />
          </motion.div>

          {/* Floating nodes */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center"
              style={{
                top: `${Math.sin(i * Math.PI / 2) * 100 + 50}px`,
                left: `${Math.cos(i * Math.PI / 2) * 100 + 50}px`,
              }}
              animate={{
                y: activeTab === "global" ? [0, -10, 0] : 0,
                scale: activeTab === "global" ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
            </motion.div>
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[0, 1, 2, 3].map((i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${Math.cos(i * Math.PI / 2) * 100 + 50}%`}
                y2={`${Math.sin(i * Math.PI / 2) * 100 + 50}%`}
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="2"
                strokeDasharray="4 2"
                animate={{
                  opacity: activeTab === "global" ? [0.2, 0.8, 0.2] : 0.2,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.2,
                }}
              />
            ))}
          </svg>
        </div>
      </motion.div>

      {/* Floating analytics cards */}
      <motion.div
        className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 w-40"
        initial={{ x: -50, opacity: 0 }}
        animate={{ 
          x: activeTab === "analytics" ? 0 : -50,
          opacity: activeTab === "analytics" ? 1 : 0,
          scale: activeTab === "analytics" ? 1 : 0.8
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 text-primary mb-2">
          <BarChart2 className="w-4 h-4" />
          <span className="text-xs font-medium">Revenue</span>
        </div>
        <div className="text-xl font-bold">$24.5K</div>
        <div className="text-xs text-green-500 mt-1">↑ 12.5%</div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 w-40"
        initial={{ x: 50, opacity: 0 }}
        animate={{ 
          x: activeTab === "analytics" ? 0 : 50,
          opacity: activeTab === "analytics" ? 1 : 0,
          scale: activeTab === "analytics" ? 1 : 0.8
        }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center space-x-2 text-primary mb-2">
          <PieChart className="w-4 h-4" />
          <span className="text-xs font-medium">Users</span>
        </div>
        <div className="text-xl font-bold">1.2K</div>
        <div className="text-xs text-green-500 mt-1">↑ 8.2%</div>
      </motion.div>

      {/* Data flow visualization */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-b-xl "
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: activeTab === "data" ? 1 : 0,
          height: activeTab === "data" ? 800 : 0
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 flex items-center">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 bg-primary rounded-full mx-2"
              style={{ width: `${Math.random() * 40 + 20}px` }}
              animate={{
                y: [0, -5, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Interactive tabs */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        <button
          onClick={() => setActiveTab("global")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center ${activeTab === "global" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          <Globe className="w-3 h-3 mr-1" />
          Global
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center ${activeTab === "analytics" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          <BarChart2 className="w-3 h-3 mr-1" />
          Analytics
        </button>
        <button
          onClick={() => setActiveTab("data")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center ${activeTab === "data" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          <Database className="w-3 h-3 mr-1" />
          Data Flow
        </button>
      </div>
    </div>
  );
};