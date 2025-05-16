export interface Content {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
}

export interface Hardware {
  id: string;
  name: string;
  quantity: number;
  specifications: string;
  status: 'installed' | 'pending' | 'maintenance';
}

export interface Project {
  id: string;
  siteName: string;
  contents: Content[];
  hardware: Hardware[];
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'on_hold';
} 