import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { AnomalyAlert } from '@/hooks/useSensorData';

interface AlertPanelProps {
  alerts: AnomalyAlert[];
}

const severityConfig = {
  low: { color: 'bg-status-info', icon: Info, label: 'Low' },
  medium: { color: 'bg-status-warning', icon: AlertTriangle, label: 'Medium' },
  high: { color: 'bg-status-warning', icon: AlertTriangle, label: 'High' },
  critical: { color: 'bg-status-critical', icon: XCircle, label: 'Critical' },
};

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <AlertTriangle className="h-5 w-5 text-status-warning" />
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <div className="flex items-center gap-2 p-4 text-center text-muted-foreground">
            <CheckCircle className="h-5 w-5 text-status-safe" />
            All systems operating normally
          </div>
        ) : (
          alerts.slice(0, 5).map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;
            
            return (
              <div
                key={alert.id}
                className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Icon className={`h-4 w-4 mt-0.5 text-white p-0.5 rounded ${config.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {alert.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {alert.context.nodeId}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {alert.prescription?.rationale || 'Anomaly detected in sensor data'}
                      </p>
                      {alert.prescription && (
                        <div className="text-xs bg-blue-50 text-blue-700 p-2 rounded">
                          <strong>Prescription:</strong> {alert.prescription.action.replace(/_/g, ' ')}
                          {' '} → {alert.prescription.actuatorId}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={config.color}>
                      {config.label}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};