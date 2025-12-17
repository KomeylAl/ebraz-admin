import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const token = req.cookies.get("token");
    const formData = await req.json();
    // console.log(JSON.stringify(formData))
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(
      { message: "Doctor editted successfuly" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(
      { message: "OK" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
