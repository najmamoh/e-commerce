-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "Category" TEXT DEFAULT 'Uncategorized',
ADD COLUMN     "Quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';
