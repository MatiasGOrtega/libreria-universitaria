import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (
      !process.env.IMAGEKIT_PRIVATE_KEY ||
      !process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
    ) {
      throw new Error("ImageKit credentials are not properly configured");
    }

    const { token, expire, signature } = await getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });

    return NextResponse.json({
      token,
      expire,
      signature,
    });
  } catch (error) {
    console.error("Error generating upload auth params:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate auth params" },
      { status: 500 }
    );
  }
}
