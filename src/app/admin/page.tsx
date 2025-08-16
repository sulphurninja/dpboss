'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Activity,
  Settings,
  Plus,
  Search,
  Bell,
  Menu,
  ChevronDown,
  BarChart3,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  MoreHorizontal,
  Zap,
  Shield,
  Globe,
  Clock
} from 'lucide-react';

interface DashboardStats {
  totalMarkets: number;
  activeMarkets: number;
  todayResults: number;
  totalResults: number;
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalMarkets: 24,
    activeMarkets: 18,
    todayResults: 12,
    totalResults: 1847,
    totalRevenue: 125420,
    activeUsers: 1847,
    conversionRate: 68.5,
  });

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: true },
    { icon: BarChart3, label: 'Markets', href: '/admin/markets' },
    { icon: Activity, label: 'Results', href: '/admin/results' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const StatCard = ({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    trend
  }: {
    title: string;
    value: string | number;
    change: string;
    changeType: 'positive' | 'negative';
    icon: any;
    trend?: number[];
  }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        {changeType === 'positive' ? (
          <div className="flex items-center space-x-1 text-green-400">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm font-medium">{change}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 text-red-400">
            <ArrowDownRight className="w-4 h-4" />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p className="text-sm text-slate-400">{title}</p>
      </div>
      {trend && (
        <div className="mt-4 h-8">
          <svg className="w-full h-full" viewBox="0 0 100 30">
            <polyline
              points={trend.map((point, i) => `${i * (100 / (trend.length - 1))},${30 - point}`).join(' ')}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );

  const QuickAction = ({ icon: Icon, title, description, onClick, color = "blue" }: {
    icon: any;
    title: string;
    description: string;
    onClick: () => void;
    color?: string;
  }) => (
    <button
      onClick={onClick}
      className="w-full p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group text-left"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 rounded-xl group-hover:from-${color}-500/30 group-hover:to-${color}-600/30 transition-all`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
          <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
      </div>
    </button>
  );

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-300 bg-white/5 backdrop-blur-xl border-r border-white/10`}>
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-white">DPBoss</h1>
                <p className="text-xs text-slate-400">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <nav className="px-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-slate-400">Welcome back, Admin</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <button className="relative p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value={`₹${stats.totalRevenue.toLocaleString()}`}
              change="+12.5%"
              changeType="positive"
              icon={DollarSign}
              trend={[10, 15, 12, 20, 18, 25, 22]}
            />
            <StatCard
              title="Active Users"
              value={stats.activeUsers}
              change="+8.2%"
              changeType="positive"
              icon={Users}
              trend={[8, 12, 10, 18, 15, 22, 20]}
            />
            <StatCard
              title="Total Markets"
              value={stats.totalMarkets}
              change="+5.1%"
              changeType="positive"
              icon={BarChart3}
              trend={[5, 8, 12, 15, 18, 20, 24]}
            />
            <StatCard
              title="Conversion Rate"
              value={`${stats.conversionRate}%`}
              change="-2.1%"
              changeType="negative"
              icon={TrendingUp}
              trend={[25, 22, 20, 18, 15, 17, 19]}
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                <p className="text-sm text-slate-400">Manage your platform efficiently</p>
              </div>
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickAction
                icon={Plus}
                title="Add New Market"
                description="Create and configure a new market"
                onClick={() => router.push('/admin/markets?action=add')}
                color="blue"
              />
              <QuickAction
                icon={Activity}
                title="Publish Results"
                description="Add latest market results"
                onClick={() => router.push('/admin/results?action=add')}
                color="green"
              />
              <QuickAction
                icon={Users}
                title="Manage Users"
                description="View and manage user accounts"
                onClick={() => router.push('/admin/users')}
                color="purple"
              />
              <QuickAction
                icon={BarChart3}
                title="Analytics Report"
                description="Generate detailed reports"
                onClick={() => router.push('/admin/analytics')}
                color="orange"
              />
              <QuickAction
                icon={Settings}
                title="System Settings"
                description="Configure platform settings"
                onClick={() => router.push('/admin/settings')}
                color="red"
              />
              <QuickAction
                icon={Download}
                title="Export Data"
                description="Download platform data"
                onClick={() => {}}
                color="cyan"
              />
            </div>
          </div>

          {/* Recent Activity & Live Markets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    action: 'New result published',
                    market: 'Milan Morning',
                    time: '2 min ago',
                    type: 'result',
                    result: '380-16-178'
                  },
                  {
                    action: 'Market opened',
                    market: 'Rajdhani Day',
                    time: '15 min ago',
                    type: 'market'
                  },
                  {
                    action: 'User registered',
                    market: 'System',
                    time: '1 hour ago',
                    type: 'user'
                  },
                  {
                    action: 'Payment processed',
                    market: 'Time Bazar',
                    time: '2 hours ago',
                    type: 'payment',
                    amount: '₹2,500'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.type === 'result' ? 'bg-green-500/20 text-green-400' :
                      activity.type === 'market' ? 'bg-blue-500/20 text-blue-400' :
                      activity.type === 'user' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {activity.type === 'result' && <Activity className="w-5 h-5" />}
                      {activity.type === 'market' && <BarChart3 className="w-5 h-5" />}
                      {activity.type === 'user' && <Users className="w-5 h-5" />}
                      {activity.type === 'payment' && <DollarSign className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <span>{activity.market}</span>
                        {activity.result && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-green-400">{activity.result}</span>
                          </>
                        )}
                        {activity.amount && (
                          <>
                            <span>•</span>
                            <span className="text-yellow-400">{activity.amount}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Markets */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Live Markets</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: 'Milan Morning',
                    status: 'open',
                    time: '10:00 - 11:00',
                    participants: 234,
                    volume: '₹45,600'
                  },
                  {
                    name: 'Rajdhani Day',
                    status: 'betting',
                    time: '15:00 - 16:00',
                    participants: 187,
                    volume: '₹32,400'
                  },
                  {
                    name: 'Time Bazar',
                    status: 'result_pending',
                    time: '12:00 - 13:00',
                    participants: 156,
                    volume: '₹28,900'
                  },
                  {
                    name: 'Main Bazar',
                    status: 'closed',
                    time: '21:00 - 22:00',
                    participants: 98,
                    volume: '₹18,500'
                  }
                ].map((market, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        market.status === 'open' ? 'bg-green-500 animate-pulse' :
                        market.status === 'betting' ? 'bg-yellow-500 animate-pulse' :
                        market.status === 'result_pending' ? 'bg-orange-500 animate-pulse' :
                        'bg-slate-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-white">{market.name}</p>
                        <p className="text-sm text-slate-400">{market.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white font-medium">{market.volume}</p>
                      <p className="text-xs text-slate-400">{market.participants} users</p>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
