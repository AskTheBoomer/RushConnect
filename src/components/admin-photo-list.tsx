
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

type Photo = {
  id: string;
  title: string;
  service: string;
  before_path: string | null;
  after_path: string | null;
};

export default function AdminPhotoList({
  initialPhotos,
}: {
  initialPhotos: Photo[];
}) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function deletePhoto(photo: Photo) {
    // Protect complete before-and-after photo pairs.
    if (photo.before_path && photo.after_path) {
      setMessage("Complete photo records cannot be deleted.");
      return;
    }

    // Ask for confirmation before deleting.
    const confirmed = window.confirm(
      `Delete "${photo.title}"? This will permanently delete its record and associated images.`
    );

    if (!confirmed) return;

    setDeletingId(photo.id);
    setMessage("");

    const supabase = createClient();

    try {
      // Delete the database record first.
      const { data, error } = await supabase
        .from("photos")
        .delete()
        .eq("id", photo.id)
        .select("id")
        .single();

      if (error) throw error;

      if (!data) {
        throw new Error("The photo record could not be deleted.");
      }

      // Remove the deleted record from the displayed list.
      setPhotos((current) =>
        current.filter((item) => item.id !== photo.id)
      );

      // Remove associated files from Supabase Storage.
      const paths = [photo.before_path, photo.after_path].filter(
        (path): path is string => Boolean(path)
      );

      if (paths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("photos")
          .remove(paths);

        if (storageError) {
          setMessage(
            `The record "${photo.title}" was deleted, but its storage files could not be removed: ${storageError.message}`
          );
          return;
        }
      }

      setMessage(`"${photo.title}" was deleted successfully.`);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete the photo record."
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (photos.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No photo records yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {message && (
        <p role="status" className="text-sm text-gray-700">
          {message}
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {photos.map((photo) => {
          const complete = Boolean(
            photo.before_path && photo.after_path
          );

          return (
            <li
              key={photo.id}
              className="rounded border border-gray-200 p-4 text-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">
                    {photo.title}
                  </p>

                  <p className="text-gray-600">
                    {photo.service || "No service set"}
                  </p>

                  <p className="mt-1">
                    Before:{" "}
                    {photo.before_path
                      ? "uploaded"
                      : "not uploaded yet"}
                    {" · "}
                    After:{" "}
                    {photo.after_path
                      ? "uploaded"
                      : "not uploaded yet"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {complete
                      ? "Complete photo pair"
                      : "Incomplete photo record"}
                  </p>
                </div>

                {!complete && (
                  <button
                    type="button"
                    onClick={() => deletePhoto(photo)}
                    disabled={deletingId !== null}
                    className="w-fit rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === photo.id
                      ? "Deleting..."
                      : "Delete incomplete record"}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
