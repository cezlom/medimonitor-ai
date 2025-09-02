import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    time: new Date(reading.timestamp).toLocaleTimeString(),
    value: reading.sensors[metric],
    index,
  }));

  const currentValue = readings.length > 0 ? readings[readings.length - 1].sensors[metric] : 0;

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ color }}>
              {currentValue.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">{unit}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              stroke="#888"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#888"
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)} ${unit}`, title]}
              labelStyle={{ color: '#333' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};