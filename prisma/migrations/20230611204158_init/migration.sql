-- AlterTable
ALTER TABLE "Aliment" ADD COLUMN     "alimentSubCategoryCode" TEXT,
ADD COLUMN     "alimentSubSubCategoryCode" TEXT;

-- AddForeignKey
ALTER TABLE "Aliment" ADD CONSTRAINT "Aliment_alimentSubCategoryCode_fkey" FOREIGN KEY ("alimentSubCategoryCode") REFERENCES "Aliment_SubCategory"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aliment" ADD CONSTRAINT "Aliment_alimentSubSubCategoryCode_fkey" FOREIGN KEY ("alimentSubSubCategoryCode") REFERENCES "Aliment_SubSubCategory"("code") ON DELETE SET NULL ON UPDATE CASCADE;
