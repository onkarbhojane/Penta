export interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changePositive: boolean;
}

export interface Transaction {
  _id: Key | null | undefined;
  status: string;
  user_name: string;
  user_id: string;
  user_profile: string;
  id: number;
  name: string;
  date: string;
  amount: number;
  time: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface FinancialOverviewProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  chartData: any;
}

export interface RecentTransactionsProps {
  transactions: Transaction[];
}

export interface SidebarProps {
  activeNav: string;
  navItems: NavItem[];
  sidebarRef: React.RefObject<HTMLDivElement>;
  onNavClick: (label: string) => void;
}

export interface HeaderProps {
  activeNav: string;
  user: any;
  onSignOut: () => void;
}