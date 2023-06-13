/*
  Warnings:

  - You are about to drop the column `date` on the `GamblingSession` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Follows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    PRIMARY KEY ("followerId", "followingId"),
    CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GamblingSession" (
    "deposit" INTEGER NOT NULL,
    "withdraw" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "message" TEXT,
    "feedable" BOOLEAN NOT NULL DEFAULT false,
    "userid" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "GamblingSession_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GamblingSession" ("createdAt", "deposit", "updatedAt", "userid", "withdraw") SELECT "createdAt", "deposit", "updatedAt", "userid", "withdraw" FROM "GamblingSession";
DROP TABLE "GamblingSession";
ALTER TABLE "new_GamblingSession" RENAME TO "GamblingSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
