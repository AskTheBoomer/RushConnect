
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

type PhotoUploadProps = {
  onSuccess?: () => void;
};

export default function AdminPhotoUpload({
  onSuccess,
}: PhotoUploadProps) {
  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function validateFile(file: File | null) {
    if (!file) return null;

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only JPEG, PNG, and WebP images are allowed.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "Each image must be 5 MB or smaller.";
    }

    return null;
  }

  async function uploadPhoto(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setMessage("");

    if (!title.trim()) {
      setMessage("Please enter a photo title.");
      return;
    }

    if (!beforeFile && !afterFile) {
      setMessage("Please select at least one image.");
      return;
    }

    const beforeError = validateFile(beforeFile);
    const afterError = validateFile(afterFile);

    if (beforeError || afterError) {
      setMessage(beforeError || afterError || "Invalid image.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const photoId = crypto.randomUUID();
    const uploadedPaths: string[] = [];

    async function uploadImage(file: File, label: string) {
      const extension = EXTENSION_BY_TYPE[file.type];

      if (!extension) {
        throw new Error("Unsupported image format.");
      }

      const path = `${photoId}/${label}-${crypto.randomUUID()}.${extension}`;

      const { error } = await supabase.storage
        .from("photos")
        .upload(path, file, {
          contentType: file.type,
          upsert: false,
        });

      if (error) throw error;

      uploadedPaths.push(path);

      return path;
    }

    try {
      const beforePath = beforeFile
        ? await uploadImage(beforeFile, "before")
        : null;

      const afterPath = afterFile
        ? await uploadImage(afterFile, "after")
        : null;

      const { error: databaseError } = await supabase
        .from("photos")
        .insert({
          id: photoId,
          title: title.trim(),
          service: service.trim(),
          before_path: beforePath,
          after_path: afterPath,
        });

      if (databaseError) throw databaseError;

      setTitle("");
      setService("");
      setBeforeFile(null);
      setAfterFile(null);

      setMessage("Photo entry uploaded successfully.");

      onSuccess?.();
    } catch (error) {
      if (uploadedPaths.length > 0) {
        try {
          const { error: cleanupError } = await supabase.storage
            .from("photos")
            .remove(uploadedPaths);

          if (cleanupError) {
            console.error("Photo cleanup failed:", cleanupError);
          }
        } catch (cleanupError) {
          console.error("Photo cleanup failed:", cleanupError);
        }
      }

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to upload photos. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={uploadPhoto}
      className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5"
    >
      <div>
        <h3 className="text-lg font-semibold">
          Add before-and-after photos
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          Upload JPEG, PNG, or WebP images. Maximum 5 MB per image.
        </p>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Photo title

        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={100}
          required
          className="rounded border border-gray-300 px-3 py-2"
          placeholder="Example: Kitchen deep clean"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Service

        <input
          value={service}
          onChange={(event) => setService(event.target.value)}
          className="rounded border border-gray-300 px-3 py-2"
          placeholder="Example: Cleaning"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Before image

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) =>
            setBeforeFile(event.target.files?.[0] ?? null)
          }
          className="text-sm"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        After image

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) =>
            setAfterFile(event.target.files?.[0] ?? null)
          }
          className="text-sm"
        />
      </label>

      {message && (
        <p role="status" className="text-sm text-gray-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-fit rounded-lg bg-[#172b46] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload photos"}
      </button>
    </form>
  );
}
