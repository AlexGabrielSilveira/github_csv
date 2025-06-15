-- CreateTable
CREATE TABLE "Repositories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "repo_name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "stars" INTEGER NOT NULL
);
