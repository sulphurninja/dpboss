interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorClasses = {
  blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
  green: 'from-green-50 to-green-100 border-green-200 text-green-600',
  purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600',
  orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-600',
  red: 'from-red-50 to-red-100 border-red-200 text-red-600',
};

export default function StatsCard({ title, value, change, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d={
                  change.type === 'increase'
                    ? "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    : "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                } clipRule="evenodd" />
              </svg>
              {change.value}%
            </div>
          )}
        </div>
        <div className={`p-4 bg-gradient-to-br ${colorClasses[color]} rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
