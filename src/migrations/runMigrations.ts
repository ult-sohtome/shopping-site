import type{ PurchaseHistoryRepositoryInterface } from "@/interfaces/PurchaseHistoryRepositoryInterface";
import { PurchaseHistoryMigration_20250521 } from "./purchaseHistoryMigration_20250521";

const migrations: {
  migrationFlagKey: string;
  migrate: (purchaseHistoryRepository: PurchaseHistoryRepositoryInterface) => void;
}[] = [
  {
    migrationFlagKey: 'is_purchase_history_migrated_20250521',
    migrate: (purchaseHistoryRepository: PurchaseHistoryRepositoryInterface) => new PurchaseHistoryMigration_20250521(purchaseHistoryRepository),
  }
] as const;

export function runMigrations(purchaseHistoryRepository: PurchaseHistoryRepositoryInterface) {
  migrations.forEach(({ migrationFlagKey, migrate }) => {
    if (!localStorage.getItem(migrationFlagKey)) {
      migrate(purchaseHistoryRepository);
      localStorage.setItem(migrationFlagKey, 'true');
    }
  });
}