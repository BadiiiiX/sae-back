-- CreateTable
CREATE TABLE "Adress" (
    "id" SERIAL NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "zip" TEXT,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "adressId" INTEGER NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aliment" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alimentCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Aliment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sondage" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "alimentId" INTEGER NOT NULL,

    CONSTRAINT "Sondage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aliment_Category" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Aliment_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aliment_SubCategory" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alimentCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Aliment_SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aliment_SubSubCategory" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alimentSubCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Aliment_SubSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aliment_code_key" ON "Aliment"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Sondage_userId_alimentId_key" ON "Sondage"("userId", "alimentId");

-- CreateIndex
CREATE UNIQUE INDEX "Aliment_Category_code_key" ON "Aliment_Category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Aliment_SubCategory_code_key" ON "Aliment_SubCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Aliment_SubSubCategory_code_key" ON "Aliment_SubSubCategory"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aliment" ADD CONSTRAINT "Aliment_alimentCategoryId_fkey" FOREIGN KEY ("alimentCategoryId") REFERENCES "Aliment_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sondage" ADD CONSTRAINT "Sondage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sondage" ADD CONSTRAINT "Sondage_alimentId_fkey" FOREIGN KEY ("alimentId") REFERENCES "Aliment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aliment_SubCategory" ADD CONSTRAINT "Aliment_SubCategory_alimentCategoryId_fkey" FOREIGN KEY ("alimentCategoryId") REFERENCES "Aliment_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aliment_SubSubCategory" ADD CONSTRAINT "Aliment_SubSubCategory_alimentSubCategoryId_fkey" FOREIGN KEY ("alimentSubCategoryId") REFERENCES "Aliment_SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
