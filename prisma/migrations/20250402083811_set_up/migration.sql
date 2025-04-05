-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SkinConcern" AS ENUM ('DARK_CIRCLES', 'DRY_SKIN', 'FRECKLES', 'OILY_SKIN', 'REDNESS_ROSACEA', 'SCARS', 'WRINKLES');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255),
    "date_of_birth" TIMESTAMPTZ(6),
    "gender" "Gender" NOT NULL DEFAULT 'FEMALE',
    "role" "RoleType" NOT NULL DEFAULT 'USER',

    CONSTRAINT "pk_user" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skin_analysis" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "analysis_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acne_level" INTEGER NOT NULL DEFAULT 0,
    "dark_spots" INTEGER NOT NULL DEFAULT 0,
    "wrinkles" INTEGER NOT NULL DEFAULT 0,
    "redness_level" INTEGER NOT NULL DEFAULT 0,
    "hydration_level" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_skin_analysis" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skin_analysis_skin_concern" (
    "skin_analysis_id" UUID NOT NULL,
    "skin_concern" "SkinConcern" NOT NULL,

    CONSTRAINT "skin_analysis_skin_concern_pkey" PRIMARY KEY ("skin_analysis_id","skin_concern")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "skin_analysis" ADD CONSTRAINT "fk_skin_analysis_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skin_analysis_skin_concern" ADD CONSTRAINT "skin_analysis_skin_concern_skin_analysis_id_fkey" FOREIGN KEY ("skin_analysis_id") REFERENCES "skin_analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
