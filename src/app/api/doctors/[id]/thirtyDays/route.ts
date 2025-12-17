import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || 0;
  const pageSize = searchParams.get("pageSize") || 10;
  const search = searchParams.get("search") || "";
  const { id } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${id}/panel/30-days?page=${page}&per_page=${pageSize}&search=${search}`,
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
        { message: "Error getting apps" },
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
