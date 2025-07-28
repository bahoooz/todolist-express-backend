-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "color" TEXT DEFAULT '#e2e2e2',
    "completed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Item" ("color", "completed", "id", "quantity", "title") SELECT "color", "completed", "id", "quantity", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
