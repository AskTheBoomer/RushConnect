
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Photo = {
  id: string;
  title: string;
  service: string | null;
  before_path: string | null;
  after_path: string | null;
};

export default async function PhotoGallery() {
  await connection();

  const supabase = await createClient();

  const { data: photos, error } = await supabase
    .from("photos")
    .select("id, title, service, before_path, after_path")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Unable to retrieve gallery photos:", error);
    return null;
  }

  const publishedPhotos = (photos ?? []) as Photo[];

  if (publishedPhotos.length === 0) {
    return null;
  }

  function getPhotoUrl(path: string | null) {
    if (!path) return null;

    const { data } = supabase.storage
      .from("photos")
      .getPublicUrl(path);

    return data.publicUrl;
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a4824e]">
            Our Work
          </p>

          <h2
            id="gallery-heading"
            className="text-3xl font-semibold leading-tight text-[#172b46] sm:text-4xl lg:text-5xl"
          >
            See the difference{" "}
            <span className="block text-[#a4824e]">
              care and attention make.
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-[#687386]">
            Explore examples of our cleaning and organization
            services and the care we bring to every space.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {publishedPhotos.map((photo) => {
            const beforeUrl = getPhotoUrl(photo.before_path);
            const afterUrl = getPhotoUrl(photo.after_path);

            return (
              <article
                key={photo.id}
                className="overflow-hidden rounded-2xl border border-[#e8e2d7] bg-[#faf8f3] shadow-sm"
              >
                <div className="grid grid-cols-2 gap-2 p-3">
                  {beforeUrl && (
                    <div>
                      <img
                        src={beforeUrl}
                        alt={`Before: ${photo.title}`}
                        loading="lazy"
                        className="aspect-[4/5] w-full rounded-lg object-cover"
                      />
                      <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wider text-[#687386]">
                        Before
                      </p>
                    </div>
                  )}

                  {afterUrl && (
                    <div>
                      <img
                        src={afterUrl}
                        alt={`After: ${photo.title}`}
                        loading="lazy"
                        className="aspect-[4/5] w-full rounded-lg object-cover"
                      />
                      <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wider text-[#a4824e]">
                        After
                      </p>
                    </div>
                  )}
                </div>

                <div className="px-5 pb-6 pt-3">
                  <h3 className="text-lg font-semibold text-[#172b46]">
                    {photo.title}
                  </h3>

                  {photo.service && (
                    <p className="mt-2 text-sm text-[#687386]">
                      {photo.service}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
