import { PurchaseHistoryMigration_20250521 } from "./purchaseHistoryMigration_20250521";
import { LocalStoragePurchaseHistoryRepository } from "@/repositories/LocalStoragePurchaseHistoryRepository";

const purchaseHistoryRepository = new LocalStoragePurchaseHistoryRepository();

const migrations: {
  migrationFlagKey: string;
  migrate: () => void;
}[] = [
  {
    migrationFlagKey: 'is_purchase_history_migrated_20250521',
    migrate: () => new PurchaseHistoryMigration_20250521(purchaseHistoryRepository)
  }
];

export function runMigrations() {
  migrations.forEach(({ migrationFlagKey, migrate }) => {
    if (!localStorage.getItem(migrationFlagKey)) {
      migrate();
      localStorage.setItem(migrationFlagKey, 'true');
    }
  });
}