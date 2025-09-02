import { useState, useEffect } from 'react';

export interface SensorReading {
  timestamp: string;
  hospitalId: string;
  plantaId: string;
  nodeId: string;
  sensors: {
    pressure_kpa: number;
    flow_lpm: number;
    temperature_c: number;
  };
  meta: {
    fwVersion: string;
    rssi: number;
    battery_v: number;
  };
}

export interface AnomalyAlert {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  context: {
    hospitalId: string;
    plantaId: string;
    nodeId: string;
  };
  evidence: {
    score: number;
    window_s: number;
    features: Record<string, number>;
  };
  prescription?: {
    action: string;
    actuatorId: string;
    rationale: string;
  };
}

export const useSensorData = () => {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Simulate real-time sensor data
    const generateReading = (): SensorReading => {
      const now = new Date().toISOString();
      const baseTime = Date.now();
      
      // Add some realistic variation and occasional anomalies
      const pressureBase = 480;
      const pressureVariation = Math.random() * 20 - 10;
      const anomalyChance = Math.random();
      
      let pressure = pressureBase + pressureVariation;
      if (anomalyChance < 0.05) { // 5% chance of anomaly
        pressure -= Math.random() * 50; // Pressure drop
      }

      return {
        timestamp: now,
        hospitalId: "HSP-001",
        plantaId: "OXI-A",
        nodeId: `ESP32-${Math.floor(Math.random() * 20) + 1}`,
        sensors: {
          pressure_kpa: Math.max(0, pressure),
          flow_lpm: 15 + Math.random() * 10,
          temperature_c: 20 + Math.random() * 8,
        },
        meta: {
          fwVersion: "1.2.0",
          rssi: -60 - Math.random() * 40,
          battery_v: 3.2 + Math.random() * 0.8,
        },
      };
    };

    // Generate anomaly alert
    const generateAlert = (reading: SensorReading): AnomalyAlert | null => {
      if (reading.sensors.pressure_kpa < 450) {
        return {
          id: `ALT-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: reading.timestamp,
          severity: reading.sensors.pressure_kpa < 400 ? 'critical' : 'high',
          type: 'pressure_drop_anomaly',
          context: {
            hospitalId: reading.hospitalId,
            plantaId: reading.plantaId,
            nodeId: reading.nodeId,
          },
          evidence: {
            score: 0.85 + Math.random() * 0.15,
            window_s: 30,
            features: {
              zscore_pressure: -2.5 - Math.random() * 2,
              dP_dt: -8 - Math.random() * 10,
            },
          },
          prescription: {
            action: "close_valve_partial",
            actuatorId: `VALV-${Math.floor(Math.random() * 10) + 1}`,
            rationale: "Sustained pressure drop with constant flow detected",
          },
        };
      }
      return null;
    };

    const interval = setInterval(() => {
      const newReading = generateReading();
      
      setReadings(prev => {
        const updated = [...prev, newReading];
        return updated.slice(-50); // Keep last 50 readings
      });

      // Check for anomalies
      const alert = generateAlert(newReading);
      if (alert) {
        setAlerts(prev => {
          const updated = [alert, ...prev];
          return updated.slice(0, 20); // Keep last 20 alerts
        });
      }

      // Simulate occasional connection issues
      setIsConnected(Math.random() > 0.02); // 2% chance of disconnection
    }, 2000); // New reading every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const kpis = {
    activeNodes: new Set(readings.slice(-10).map(r => r.nodeId)).size,
    avgPressure: readings.slice(-10).reduce((acc, r) => acc + r.sensors.pressure_kpa, 0) / Math.max(readings.slice(-10).length, 1),
    alertRate: alerts.filter(a => Date.now() - new Date(a.timestamp).getTime() < 3600000).length, // Last hour
    systemUptime: isConnected ? 99.8 : 98.5,
  };

  return {
    readings,
    alerts,
    isConnected,
    kpis,
  };
};