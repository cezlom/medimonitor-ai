import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Cpu, AlertCircle, Wifi } from 'lucide-react';

interface KPIMetrics {
  activeNodes: number;
  avgPressure: number;
  alertRate: number;
  systemUptime: number;
}

interface KPIDashboardProps {
  kpis: KPIMetrics;
  isConnected: boolean;
}

export const KPIDashboard: React.FC<KPIDashboardProps> = ({ kpis, isConnected }) => {
  const metrics = [
    {
      title: 'Active Nodes',
      value: kpis.activeNodes,
      unit: 'ESP32',
      icon: Cpu,
      color: 'text-medical-primary',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Avg Pressure',
      value: kpis.avgPressure.toFixed(1),
      unit: 'kPa',
      icon: Activity,
      color: 'text-chart-pressure',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Alerts/Hour',
      value: kpis.alertRate,
      unit: 'alerts',
      icon: AlertCircle,
      color: kpis.alertRate > 5 ? 'text-status-warning' : 'text-status-safe',
      bgColor: kpis.alertRate > 5 ? 'bg-orange-50' : 'bg-green-50',
    },
    {
      title: 'System Uptime',
      value: kpis.systemUptime.toFixed(1),
      unit: '%',
      icon: Wifi,
      color: isConnected ? 'text-status-safe' : 'text-status-critical',
      bgColor: isConnected ? 'bg-green-50' : 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="bg-white shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {metric.unit}
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};