import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  const bucketName = process.env.SUPABASE_BUCKET!;

  const { data, error } = await supabase.storage.from(bucketName).list();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const urls = data.map((file) => ({
    name: file.name,
    url: `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucketName}/${file.name}`,
  }));

  return NextResponse.json(urls);
}