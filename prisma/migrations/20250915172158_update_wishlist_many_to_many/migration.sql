/*
  Warnings:

  - You are about to drop the column `userId` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "public"."_UserWishlist" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserWishlist_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserWishlist_B_index" ON "public"."_UserWishlist"("B");

-- AddForeignKey
ALTER TABLE "public"."_UserWishlist" ADD CONSTRAINT "_UserWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserWishlist" ADD CONSTRAINT "_UserWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
