import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Secure server-side key
);

export async function POST(req: Request) {
  const { accessId } = await req.json();

  if (!accessId) {
    return NextResponse.json({ error: "Access ID is required" }, { status: 400 });
  }

  // Database mein check karo ki ye ID exist karti hai?
  const { data, error } = await supabase
    .from('groups')
    .select('id, group_name, org_id')
    .eq('access_id', accessId.toUpperCase()) // Case insensitive check
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Invalid Access ID. Please check again." }, { status: 404 });
  }

  // Agar ID sahi hai, toh Group ID return karo taki feed load ho sake
  return NextResponse.json({ 
    success: true, 
    groupId: data.id, 
    groupName: data.group_name 
  });
}
