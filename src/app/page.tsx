"use client";

import { UploadButton } from "@/utils/uploadthing";

export default function Home() {
  return (
    <div>
      <p>Home page</p>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
          appearance={{
            button:
              "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
            container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
            allowedContent:
              "flex h-8 flex-col items-center justify-center px-2 text-white",
          }}
        />
      </main>
    </div>
  );
}
