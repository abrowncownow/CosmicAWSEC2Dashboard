export interface AlertStatus {
  type: 'critical' | 'warning' | 'info';
  message: string;
}

export interface EC2Tags {
  [key: string]: string;
}

export interface EC2Instance {
  id: string;
  name: string;
  type: string;
  state: 'running' | 'stopped' | 'pending' | 'terminated';
  region: string;
  uptime: number;
  cpu: number;
  memory: number;
  cost: number;
  account: string;
  alerts: AlertStatus[];
  tags: EC2Tags;
}