-- CreateTable
CREATE TABLE "GamblingSession" (
    "deposit" INTEGER NOT NULL,
    "withdraw" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userid" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "GamblingSession_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
