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
      {/* Modern Header with Glass Effect */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-medical-primary via-medical-primary-light to-medical-accent opacity-90"></div>
        <div className="relative backdrop-blur-sm">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  IoMT Medical Gas Monitor
                </h1>
                <p className="text-white/80 text-lg font-medium">
                  Real-time monitoring & AI-powered anomaly detection
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                  {isConnected ? (
                    <Wifi className="h-5 w-5 text-status-safe animate-pulse" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-status-critical animate-pulse" />
                  )}
                  <span className="text-sm font-medium text-white">
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <div className="glass px-4 py-2 rounded-xl">
                  <span className="text-sm font-mono font-bold text-medical-primary-light">
                    HSP-001 • OXI-A
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* KPI Dashboard */}
        <div className="animate-fade-in">
          <KPIDashboard kpis={kpis} isConnected={isConnected} />
        </div>

        {/* Real-time Sensor Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up">
          <div className="transform transition-all duration-500 hover:scale-105">
            <SensorChart
              readings={readings}
              metric="pressure_kpa"
              title="Gas Pressure"
              unit="kPa"
              color="hsl(var(--chart-pressure))"
            />
          </div>
          <div className="transform transition-all duration-500 hover:scale-105 animation-delay-150">
            <SensorChart
              readings={readings}
              metric="flow_lpm"
              title="Flow Rate"
              unit="L/min"
              color="hsl(var(--chart-flow))"
            />
          </div>
          <div className="transform transition-all duration-500 hover:scale-105 animation-delay-300">
            <SensorChart
              readings={readings}
              metric="temperature_c"
              title="Temperature"
              unit="°C"
              color="hsl(var(--chart-temperature))"
            />
          </div>
        </div>

        {/* Alerts & Controls */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in">
          <div className="animate-float">
            <AlertPanel alerts={alerts} />
          </div>
          <div className="animate-float animation-delay-500">
            <ActuatorControl />
          </div>
        </div>

        {/* Modern Footer */}
        <footer className="glass rounded-2xl p-6 text-center mt-12">
          <div className="text-foreground/80 font-medium">
            IoMT Medical Gas Monitoring System
          </div>
          <div className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
            <span>Real-time ETL Pipeline</span>
            <span className="w-1 h-1 bg-medical-primary rounded-full"></span>
            <span>ML Anomaly Detection</span>
            <span className="w-1 h-1 bg-medical-primary rounded-full"></span>
            <span>Prescriptive Analytics</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
