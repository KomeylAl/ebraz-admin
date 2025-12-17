import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phone, password } = await req.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/auth/admin/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `token=${data.access_token}; HttpOnly; Path=/; Max-Age=7200`
    );
    headers.append(
      "Set-Cookie",
      `role=${data.user.role}; HttpOnly; Path=/; Max-Age=7200`
    );

    return NextResponse.json(data, {
      headers,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
