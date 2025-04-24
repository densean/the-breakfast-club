import { useAuthContext } from "../hooks/useAuthContext";
import { ROLE_BASED_ACCESS_CONTROL } from "./role.constants";
import { Action, Component, PermissionGateProps, Role } from "./role.model";

const checkPermission = (
  role: Role,
  component: Component,
  action: Action
): boolean => {
  const rolePermissions = ROLE_BASED_ACCESS_CONTROL[role];
  if (!rolePermissions) return false;

  const componentPermissions =
    rolePermissions[component as keyof typeof rolePermissions];
  if (!componentPermissions) return false;

  return componentPermissions.includes(action as never);
};

export function PermissionGate({
  component,
  action,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { user } = useAuthContext();
  const allowed = checkPermission(user?.role as Role, component, action);
  return <>{allowed ? children : fallback}</>;
}
