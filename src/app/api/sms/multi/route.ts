import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phones, text } = await req.json();
  try {
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const raw = JSON.stringify({
      lineNumber: 9982005424,
      messageText: text,
      mobiles: phones,
      sendDateTime: null,
    });

    const response = await fetch("https://api.sms.ir/v1/send/bulk", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.SMSIR_API_KEY!,
        "Content-Type": "application/json",
      },
      body: raw,
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("SMS API error:", data);
      return NextResponse.json({ message: data }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("POST /api/sms/single error:", error.message);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
