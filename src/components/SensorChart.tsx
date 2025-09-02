import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';
import { SensorReading } from '@/hooks/useSensorData';

interface SensorChartProps {
  readings: SensorReading[];
  metric: 'pressure_kpa' | 'flow_lpm' | 'temperature_c';
  title: string;
  unit: string;
  color: string;
}

export const SensorChart: React.FC<SensorChartProps> = ({
  readings,
  metric,
  title,
  unit,
  color,
}) => {
  const data = readings.slice(-20).map((reading, index) => ({
    timestamp: reading.timestamp,
    [metric]: reading.sensors[metric],
    index,
  }));

  return (
    <div className="modern-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-chart-pressure/20 to-chart-pressure/10">
          <Activity className="h-5 w-5 text-chart-pressure" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          {title}
        </h2>
        <div className="ml-auto">
          <Badge variant="outline" className="glass border-medical-primary/30 text-medical-primary animate-pulse">
            Live
          </Badge>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              opacity={0.3}
            />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-glass)'
              }}
              labelFormatter={(value) => new Date(value).toLocaleString()}
            />
            <Area 
              type="monotone" 
              dataKey={metric} 
              stroke={color}
              strokeWidth={3}
              fill={`url(#gradient-${metric})`}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'white' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            {readings[readings.length - 1]?.[metric] || readings[readings.length - 1]?.sensors[metric]?.toFixed(1) || '0.0'}
          </div>
          <div className="text-sm text-muted-foreground">
            {unit}
          </div>
        </div>
      </div>
    </div>
  );
};