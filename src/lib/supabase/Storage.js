import { supabase } from "./Client";

export const BUCKET = "trip-photos";

export async function uploadActivityImage(file, opts = {}) {
  const isPublic = opts.isPublic ?? true;

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safe = (s) =>
    String(s ?? "anon").replace(/[^a-z0-9-_]/gi, "_").slice(0, 60);

  const fileName = `${safe(opts.activityKey)}-${crypto.randomUUID()}.${ext}`;
  const path = [
    "users", safe(opts.userId),
    "trips", safe(opts.tripId),
    "activities", fileName,
  ].join("/");

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type,
  });
  if (error) throw error;

  if (isPublic) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return { path, url: data.publicUrl };
  }

  // Private bucket: store only the path (sign later when needed)
  return { path, url: null };
}

export async function getSignedUrl(path, expiresInSec = 3600) {
  const { data, error } = await supabase
    .storage.from(BUCKET)
    .createSignedUrl(path, expiresInSec);
  if (error) throw error;
  return data.signedUrl;
}
