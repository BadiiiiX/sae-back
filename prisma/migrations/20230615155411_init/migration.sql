-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "zip" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "addressId" INTEGER NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aliment" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alimentCategoryCode" TEXT NOT NULL,
    "alimentSubCategoryCode" TEXT,
    "alimentSubSubCategoryCode" TEXT,

    CONSTRAINT "Aliment_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "alimentCode" TEXT NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aliment_Category" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Aliment_Category_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Aliment_SubCategory" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alimentCategoryCode" TEXT NOT NULL,

    CONSTRAINT "Aliment_SubCategory_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Aliment_SubSubCategory" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alimentSubCategoryCode" TEXT NOT NULL,

    CONSTRAINT "Aliment_SubSubCategory_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aliment_code_key" ON "Aliment"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Survey_userId_alimentCode_key" ON "Survey"("userId", "alimentCode");

-- CreateIndex
CREATE UNIQUE INDEX "Aliment_Category_code_key" ON "Aliment_Category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Aliment_SubCategory_code_key" ON "Aliment_SubCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Aliment_SubSubCategory_code_key" ON "Aliment_SubSubCategory"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aliment" ADD CONSTRAINT "Aliment_alimentCategoryCode_fkey" FOREIGN KEY ("alimentCategoryCode") REFERENCES "Aliment_Category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aliment" ADD CONSTRAINT "Aliment_alimentSubCategoryCode_fkey" FOREIGN KEY ("alimentSubCategoryCode") REFERENCES "Aliment_SubCategory"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aliment" ADD CONSTRAINT "Aliment_alimentSubSubCategoryCode_fkey" FOREIGN KEY ("alimentSubSubCategoryCode") REFERENCES "Aliment_SubSubCategory"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_alimentCode_fkey" FOREIGN KEY ("alimentCode") REFERENCES "Aliment"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aliment_SubCategory" ADD CONSTRAINT "Aliment_SubCategory_alimentCategoryCode_fkey" FOREIGN KEY ("alimentCategoryCode") REFERENCES "Aliment_Category"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aliment_SubSubCategory" ADD CONSTRAINT "Aliment_SubSubCategory_alimentSubCategoryCode_fkey" FOREIGN KEY ("alimentSubCategoryCode") REFERENCES "Aliment_SubCategory"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
