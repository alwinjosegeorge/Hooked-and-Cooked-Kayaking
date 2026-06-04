export interface Booking {
  id: string; // HC-YYYY-XXXX
  date: string; // YYYY-MM-DD
  route: string; // 'kadambrayar' | 'vembanad' | 'kadamakudy'
  slot: string; // e.g., '8:00 AM'
  kayakType: 'single' | 'double';
  guests: number;
  name: string;
  email: string;
  phone: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Checked In';
  paymentStatus: 'Paid' | 'Unpaid' | 'Refunded';
  source: 'Online' | 'WhatsApp' | 'Phone Call' | 'Walk-in';
  amount: number;
  createdAt: string;
  securityToken: string; // Secure token to prevent ticket tampering/hijacking
  checkInTime?: string; // e.g., '09:12 AM'
  checkInDate?: string; // e.g., '29 Jun 2026'
}

export interface BlockedDate {
  date: string; // YYYY-MM-DD
  reason?: string;
}

export interface ClosedSlot {
  date: string; // YYYY-MM-DD
  slot: string; // e.g., '8:00 AM'
  reason?: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  source: 'Online' | 'WhatsApp' | 'Phone Call' | 'Walk-in';
}
