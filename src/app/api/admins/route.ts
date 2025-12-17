import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const search = params.get("search") || "";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins?search=${search}`,
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
        { message: "Error getting admins" },
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

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");

  const { name, phone, role, birth_date, password } = await req.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({
          name,
          phone,
          role,
          birth_date,
          password,
        }),
      }
    );
    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: `Error adding admins: ${data}` },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Admin added successfuly" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
