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
    <div className="modern-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-status-warning/20 to-status-warning/10">
          <AlertTriangle className="h-5 w-5 text-status-warning" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Recent Alerts
        </h2>
      </div>
      
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="flex items-center justify-center p-8 text-center">
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-status-safe/20 to-status-safe/10">
                <CheckCircle className="h-8 w-8 text-status-safe mx-auto" />
              </div>
              <div>
                <div className="font-medium text-foreground">All Systems Normal</div>
                <div className="text-sm text-muted-foreground">No anomalies detected</div>
              </div>
            </div>
          </div>
        ) : (
          alerts.slice(0, 5).map((alert, index) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;
            
            return (
              <div
                key={alert.id}
                className="glass p-4 rounded-xl border border-white/10 hover:border-medical-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${
                      alert.severity === 'low' ? 'from-status-info/20 to-status-info/10' :
                      alert.severity === 'medium' ? 'from-status-warning/20 to-status-warning/10' :
                      alert.severity === 'high' ? 'from-status-warning/20 to-status-warning/10' :
                      'from-status-critical/20 to-status-critical/10'
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        alert.severity === 'low' ? 'text-status-info' :
                        alert.severity === 'medium' ? 'text-status-warning' :
                        alert.severity === 'high' ? 'text-status-warning' :
                        'text-status-critical'
                      }`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {alert.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <Badge variant="outline" className="text-xs glass border-medical-primary/30">
                          {alert.context.nodeId}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {alert.prescription?.rationale || 'Anomaly detected in sensor data'}
                      </p>
                      {alert.prescription && (
                        <div className="glass p-3 rounded-lg border border-medical-primary/20">
                          <div className="text-xs text-medical-primary font-medium">
                            <strong>Prescription:</strong> {alert.prescription.action.replace(/_/g, ' ')} → {alert.prescription.actuatorId}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={`${
                      alert.severity === 'low' ? 'bg-status-info/20 text-status-info' :
                      alert.severity === 'medium' ? 'bg-status-warning/20 text-status-warning' :
                      alert.severity === 'high' ? 'bg-status-warning/20 text-status-warning' :
                      'bg-status-critical/20 text-status-critical'
                    } border-0`}>
                      {config.label}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};