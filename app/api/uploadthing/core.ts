import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUpload: f({
    pdf: {maxFileSize: "1MB",maxFileCount: 1},
  }).onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url, metadata);
      return { uploadedBy: "saima" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
