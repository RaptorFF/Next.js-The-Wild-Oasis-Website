import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const authHeader = request.headers.get("authorization");

  // 1. Provera bezbednosnog ključa
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 2. Automatsko pronalaženje ključa i URL-a (bilo kako da ste ih nazvali na Vercelu)
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Vercel ne vidi ključeve! Proverite nazive u Environment Variables na Vercelu.",
      },
      { status: 500 },
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Pingujemo bazu povlačenjem sistemske verzije PostgreSQL-a
    const { data, error } = await supabase.rpc("version");

    if (error) {
      // Ako rpc ne radi na vašoj bazi, probamo alternativni brzi upit nad bilo čim
      const { error: fallbackError } = await supabase
        .from("settings")
        .select("*")
        .limit(1);
      if (fallbackError)
        throw new Error(
          `Supabase odbija komunikaciju: ${error.message} || Fallback: ${fallbackError.message}`,
        );
    }

    return NextResponse.json({
      success: true,
      message: "Supabase baza je uspešno pingovana i aktivna!",
    });
  } catch (err) {
    // Ako se desi greška, poslaćemo njen TAČAN tekst nazad Vercelu da je vidimo na ekranu
    return NextResponse.json(
      {
        success: false,
        error_poruka: err.message,
      },
      { status: 500 },
    );
  }
}
