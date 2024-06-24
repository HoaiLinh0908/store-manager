export class CreateStoreDao {
  name: string;
  description?: string;
  status: string;
  users: StoreOnUserDao[];
}

export class StoreOnUserDao {
  assignedBy: string;
  permission: string;
  userId: number;
}
