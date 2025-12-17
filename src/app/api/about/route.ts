import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/about`,
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

  const formDataInput = await req.formData();

  // برای دیباگ
  for (let pair of formDataInput.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/about/upsert`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.value}`,
          Accept: "application/json",
        },
        body: formDataInput,
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(
        { message: "Error sending data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
