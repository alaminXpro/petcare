/*
  Warnings:

  - Added the required column `payment_method` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CreditCard', 'CashOnDelivery', 'GiftCard');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL,
ADD COLUMN     "status_history" JSONB,
ADD COLUMN     "total_amount" DOUBLE PRECISION NOT NULL;
