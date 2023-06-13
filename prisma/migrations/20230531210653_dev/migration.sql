-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GamblingSession" (
    "deposit" INTEGER NOT NULL,
    "withdraw" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userid" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "GamblingSession_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GamblingSession" ("createdAt", "deposit", "updatedAt", "userid", "withdraw") SELECT "createdAt", "deposit", "updatedAt", "userid", "withdraw" FROM "GamblingSession";
DROP TABLE "GamblingSession";
ALTER TABLE "new_GamblingSession" RENAME TO "GamblingSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
