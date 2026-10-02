-- CreateEnum
CREATE TYPE "public"."CollectionKind" AS ENUM ('WISHLIST', 'LIBRARY');

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_userId_fkey";

-- DropTable
DROP TABLE "public"."Game";

-- CreateTable
CREATE TABLE "public"."CollectionItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kind" "public"."CollectionKind" NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CollectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectionItem_userId_kind_gameId_key" ON "public"."CollectionItem"("userId", "kind", "gameId");

-- AddForeignKey
ALTER TABLE "public"."CollectionItem" ADD CONSTRAINT "CollectionItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

