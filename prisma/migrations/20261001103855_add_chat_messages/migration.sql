/*
  Warnings:

  - You are about to drop the `_UserWishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."ChatRole" AS ENUM ('USER', 'ASSISTANT');

-- DropForeignKey
ALTER TABLE "public"."_UserWishlist" DROP CONSTRAINT "_UserWishlist_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserWishlist" DROP CONSTRAINT "_UserWishlist_B_fkey";

-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "public"."_UserWishlist";

-- CreateTable
CREATE TABLE "public"."ChatMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "public"."ChatRole" NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatMessage_userId_createdAt_idx" ON "public"."ChatMessage"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
