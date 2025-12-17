import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const date = params.get("date");
  const page = params.get("page") || 0;
  const pageSize = params.get("pageSize") || 10;
  const search = params.get("search") || "";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients?page=${page}&per_page=${pageSize}&search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { message: await response.json() },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
