import { verifyJwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // const payload = (await verifyJwt(token)) as { id: string } | null;
    // if (!payload?.id)
    //   return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    const { password } = await req.json();
    if (!password)
      return NextResponse.json({ message: "Missing fileds" }, { status: 400 });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${id}/password`,
      {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "aplication/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log(error)
      return NextResponse.json(
        { message: `${error ?? "خطا در ایحاد رمز عبور"}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
