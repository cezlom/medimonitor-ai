import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Settings, Power, RotateCcw } from 'lucide-react';

interface Actuator {
  id: string;
  name: string;
  type: 'valve' | 'pump' | 'fan';
  status: 'active' | 'idle' | 'error';
  position: number; // 0-100
  location: string;
}

const mockActuators: Actuator[] = [
  { id: 'VALV-01', name: 'Main O2 Valve', type: 'valve', status: 'active', position: 75, location: 'Zone A' },
  { id: 'VALV-02', name: 'Backup O2 Valve', type: 'valve', status: 'idle', position: 0, location: 'Zone A' },
  { id: 'PUMP-01', name: 'Circulation Pump', type: 'pump', status: 'active', position: 85, location: 'Central' },
  { id: 'FAN-01', name: 'Exhaust Fan', type: 'fan', status: 'active', position: 60, location: 'Zone B' },
];

export const ActuatorControl: React.FC = () => {
  const [actuators, setActuators] = useState(mockActuators);

  const handlePositionChange = (actuatorId: string, newPosition: number[]) => {
    setActuators(prev =>
      prev.map(act =>
        act.id === actuatorId
          ? { ...act, position: newPosition[0], status: newPosition[0] > 0 ? 'active' : 'idle' }
          : act
      )
    );
  };

  const handleEmergencyStop = (actuatorId: string) => {
    setActuators(prev =>
      prev.map(act =>
        act.id === actuatorId
          ? { ...act, position: 0, status: 'idle' }
          : act
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-status-safe text-white';
      case 'idle': return 'bg-gray-500 text-white';
      case 'error': return 'bg-status-critical text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Settings className="h-5 w-5 text-medical-primary" />
          Actuator Control Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actuators.map((actuator) => (
          <div
            key={actuator.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-medical-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground">{actuator.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {actuator.id} • {actuator.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(actuator.status)}>
                  {actuator.status}
                </Badge>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {actuator.position}%
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Position Control
                </label>
                <Slider
                  value={[actuator.position]}
                  onValueChange={(value) => handlePositionChange(actuator.id, value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEmergencyStop(actuator.id)}
                  className="flex items-center gap-1"
                >
                  <Power className="h-3 w-3" />
                  Stop
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePositionChange(actuator.id, [100])}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Full Open
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};