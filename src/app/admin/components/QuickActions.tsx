'use client';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
  orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
  red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
};

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`p-6 bg-gradient-to-br ${colorClasses[action.color]} text-white rounded-2xl hover:shadow-xl hover:shadow-${action.color}-500/25 transition-all duration-300 transform hover:-translate-y-1 group`}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
              {action.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
