import { Activity, Cpu, AlertCircle, Wifi, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface KPI {
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: string;
}

interface KPIMetrics {
  pressure: KPI;
  flow: KPI;
  temperature: KPI;
  uptime: KPI;
}

interface KPIDashboardProps {
  kpis: KPIMetrics;
  isConnected: boolean;
}

const iconMap = {
  pressure: Activity,
  flow: Cpu,
  temperature: AlertCircle,
  uptime: Wifi,
};

export const KPIDashboard: React.FC<KPIDashboardProps> = (props) => {
  const { kpis } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(kpis).map(([key, kpi], index) => {
        const Icon = iconMap[key as keyof typeof iconMap];
        const isConnected = props.isConnected;
        
        return (
          <div
            key={key}
            className="modern-card p-6 group cursor-pointer relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${
                key === 'pressure' ? 'from-chart-pressure/20 to-chart-pressure/10' :
                key === 'flow' ? 'from-chart-flow/20 to-chart-flow/10' :
                key === 'temperature' ? 'from-chart-temperature/20 to-chart-temperature/10' :
                'from-medical-primary/20 to-medical-primary/10'
              } group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-6 w-6 ${
                  key === 'pressure' ? 'text-chart-pressure' :
                  key === 'flow' ? 'text-chart-flow' :
                  key === 'temperature' ? 'text-chart-temperature' :
                  'text-medical-primary'
                }`} />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                kpi.status === 'normal' ? 'bg-status-safe/20 text-status-safe' :
                kpi.status === 'warning' ? 'bg-status-warning/20 text-status-warning' :
                'bg-status-critical/20 text-status-critical'
              }`}>
                {kpi.status}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {kpi.label}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  {kpi.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {kpi.unit}
                </span>
              </div>
              <div className={`flex items-center gap-1 text-xs ${
                kpi.trend === 'up' ? 'text-status-safe' :
                kpi.trend === 'down' ? 'text-status-critical' :
                'text-muted-foreground'
              }`}>
                {kpi.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                {kpi.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                {kpi.trend === 'stable' && <Minus className="h-3 w-3" />}
                <span>{kpi.change}</span>
              </div>
            </div>
            
            {/* Subtle glow effect */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              key === 'pressure' ? 'bg-chart-pressure/5' :
              key === 'flow' ? 'bg-chart-flow/5' :
              key === 'temperature' ? 'bg-chart-temperature/5' :
              'bg-medical-primary/5'
            }`}></div>
          </div>
        );
      })}
    </div>
  );
};