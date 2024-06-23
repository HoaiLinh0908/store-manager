export const enum StoreStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Locked = 'Locked',
}

export const enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum StorePermission {
  Admin = 'Admin',
  Staff = 'Staff',
  Reader = 'Reader',
}

export function storePermissions(): StorePermission[] {
  return Object.values(StorePermission);
}
