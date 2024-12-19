import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ThirdSourceMetricsProps {
  status: string;
  lastUpdate: string;
  metrics: {
    cpu: number;
    memory: number;
  };
}

export const ThirdSourceMetrics = ({ status, lastUpdate, metrics }: ThirdSourceMetricsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Status</p>
          <p className={`text-lg font-bold ${status === 'healthy' ? 'text-success' : 'text-destructive'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Last Update</p>
          <p className="text-sm text-muted-foreground">
            {new Date(lastUpdate).toLocaleTimeString()}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24">
          <CircularProgressbar 
            value={metrics.cpu}
            text={`${metrics.cpu}%`}
            styles={buildStyles({
              pathColor: `#1e40af`,
              textColor: '#1e40af',
            })}
          />
          <p className="text-center mt-2 text-sm font-medium">CPU Usage</p>
        </div>
        <div className="h-24">
          <CircularProgressbar 
            value={metrics.memory}
            text={`${metrics.memory}%`}
            styles={buildStyles({
              pathColor: `#0d9488`,
              textColor: '#0d9488',
            })}
          />
          <p className="text-center mt-2 text-sm font-medium">Memory Usage</p>
        </div>
      </div>
    </div>
  );
};