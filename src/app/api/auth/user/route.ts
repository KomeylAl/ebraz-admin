import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/user-info`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error getting user" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
