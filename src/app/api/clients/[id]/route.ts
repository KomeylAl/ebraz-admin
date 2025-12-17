import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const token = req.cookies.get("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(data, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}
