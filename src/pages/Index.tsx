import { useSensorData } from '@/hooks/useSensorData';
import { SensorChart } from '@/components/SensorChart';
import { AlertPanel } from '@/components/AlertPanel';
import { KPIDashboard } from '@/components/KPIDashboard';
import { ActuatorControl } from '@/components/ActuatorControl';
import { Activity, Droplets, Thermometer, Wifi, WifiOff } from 'lucide-react';

const Index = () => {
  const { readings, alerts, isConnected, kpis } = useSensorData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-medical-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">IoMT Medical Gas Monitor</h1>
              <p className="text-blue-100">Real-time monitoring & anomaly detection system</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi className="h-5 w-5 text-green-300" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-300" />
                )}
                <span className="text-sm">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                HSP-001 • OXI-A
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Dashboard */}
        <KPIDashboard kpis={kpis} isConnected={isConnected} />

        {/* Real-time Sensor Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SensorChart
            readings={readings}
            metric="pressure_kpa"
            title="Gas Pressure"
            unit="kPa"
            color="#2563eb"
          />
          <SensorChart
            readings={readings}
            metric="flow_lpm"
            title="Flow Rate"
            unit="L/min"
            color="#16a34a"
          />
          <SensorChart
            readings={readings}
            metric="temperature_c"
            title="Temperature"
            unit="°C"
            color="#ea580c"
          />
        </div>

        {/* Alerts & Controls */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AlertPanel alerts={alerts} />
          <ActuatorControl />
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-8 pb-4">
          IoMT Medical Gas Monitoring System • Real-time ETL Pipeline • ML Anomaly Detection
        </footer>
      </main>
    </div>
  );
};

export default Index;
