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
    <div className="modern-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-medical-primary/20 to-medical-primary/10">
          <Settings className="h-5 w-5 text-medical-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Actuator Control Center
        </h2>
      </div>
      
      <div className="space-y-6">
        {actuators.map((actuator, index) => (
          <div
            key={actuator.id}
            className="glass p-5 rounded-xl border border-white/10 hover:border-medical-primary/30 transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">{actuator.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {actuator.id} • {actuator.location}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`${getStatusColor(actuator.status)} border-0`}>
                  {actuator.status}
                </Badge>
                <div className="glass px-3 py-1 rounded-lg">
                  <span className="text-sm font-mono font-bold text-medical-primary">
                    {actuator.position}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
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

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEmergencyStop(actuator.id)}
                  className="glass border-status-critical/30 text-status-critical hover:bg-status-critical/10 hover:border-status-critical/50 transition-all duration-300"
                >
                  <Power className="h-3 w-3 mr-1" />
                  Stop
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePositionChange(actuator.id, [100])}
                  className="glass border-medical-primary/30 text-medical-primary hover:bg-medical-primary/10 hover:border-medical-primary/50 transition-all duration-300"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Full Open
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};