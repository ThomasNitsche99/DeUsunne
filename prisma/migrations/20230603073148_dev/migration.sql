/*
  Warnings:

  - The primary key for the `GamblingSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `GamblingSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "image" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GamblingSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deposit" INTEGER NOT NULL,
    "withdraw" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "message" TEXT,
    "feedable" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT NOT NULL,
    CONSTRAINT "GamblingSession_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GamblingSession" ("createdAt", "deposit", "feedable", "message", "updatedAt", "userid", "withdraw") SELECT "createdAt", "deposit", "feedable", "message", "updatedAt", "userid", "withdraw" FROM "GamblingSession";
DROP TABLE "GamblingSession";
ALTER TABLE "new_GamblingSession" RENAME TO "GamblingSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
