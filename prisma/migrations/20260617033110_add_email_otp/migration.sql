-- AlterTable
ALTER TABLE "users" ADD COLUMN     "twoFactorCode" TEXT,
ADD COLUMN     "twoFactorCodeExpires" TIMESTAMP(3);
