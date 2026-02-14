import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { accessId } = await req.json();

    if (!accessId) {
      return NextResponse.json(
        { error: "Access ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("groups")
      .select("id, group_name, org_id")
      .eq("access_id", accessId.toUpperCase())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Invalid Access ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      groupId: data.id,
      groupName: data.group_name,
    });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}


