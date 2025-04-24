export type Role = "MEMBER" | "ADMIN";
export type Component = "bookings" | "adminDashboard";
type BaseAction =
  | "create"
  | "update"
  | "updateOwn"
  | "delete"
  | "deleteOwn"
  | "view";
export type BookingAction = BaseAction;
export type AdminDashboardAction = BaseAction;
export type Action = BookingAction | AdminDashboardAction;
export interface PermissionGateProps {
  component: Component;
  action: Action;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
export interface RouteConfig {
  path: string;
  allowedRoles: string[];
  isPublic?: boolean;
}
