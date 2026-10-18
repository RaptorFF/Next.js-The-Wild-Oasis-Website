import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Inicijalizacija Supabase klijenta
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

export async function GET(request) {
  const authHeader = request.headers.get("authorization");

  // Bezbednosna provera: Dozvoli pristup samo Vercel Cron servisu
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Da ne biste zavisili od drugih tabela, čitamo direktno sistemsko vreme iz baze.
    // Ovo garantovano pokreće aktivnost nad PostgreSQL-om.
    const { data, error } = await supabase.rpc("version");

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Supabase baza je uspešno pingovana!",
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 },
    );
  }
}
