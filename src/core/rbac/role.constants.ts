import { AdminDashboardAction, BookingAction } from "./role.model";

export const ROLE_BASED_ACCESS_CONTROL = {
  ADMIN: {
    adminDashboard: [
      "create",
      "update",
      "delete",
      "view",
    ] as AdminDashboardAction[],
    bookings: ["create", "update", "delete", "view"] as BookingAction[],
  },
  MEMBER: {
    bookings: [
      "create",
      "update",
      "delete",
      "view",
      "deleteOwn",
      "updateOwn",
    ] as BookingAction[],
  },
} as const;
export const ROUTES = {
  LOGIN: "/login",
  INDEX: "/",
  UNAUTHORIZED: "/unauthorized",
} as const;
