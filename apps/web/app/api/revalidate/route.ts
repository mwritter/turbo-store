import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export function GET() {
  return NextResponse.json({ message: "UnAuthorized" });
}

export async function POST(request: NextRequest) {
  const signatureHeader = request.headers.get(SIGNATURE_HEADER_NAME) || "";
  const signature = Array.isArray(signatureHeader)
    ? signatureHeader[0]
    : signatureHeader;

  const body = request.body && (await streamToString(request.body));

  if (!body) {
    console.log("Bad body payload");
    return new NextResponse("Bad Input", { status: 400 });
  }

  console.log("received a potential webhook request");

  // Validate signature
  if (!isValidSignature(body, signature, secret)) {
    console.log("unauthorized webhook attempt thwarted");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse out the body for us to work with.
  const delta = webhookPayloadSchema.parse(JSON.parse(body));
  console.log("The delta is: ", delta);

  // Use 'delta' to find the tags that actually need to be updated
  // For all operations, try to invalidate based on type. Better safe than sorry here.
  if (["product"].includes(delta._type)) {
    try {
      await revalidateTag(delta._type);
    } catch (e) {
      console.log(e);
    }
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    delta: JSON.stringify(delta),
  });
}

const secret = process.env.SANITY_WEBHOOK_SECRET ?? "";

/**
 * Based off of the projection configured in Sanity webhook section.
 */
const webhookPayloadSchema = z.object({
  _id: z.string(),
  _type: z.string(),
});

const streamToString = async (stream: ReadableStream<Uint8Array>) => {
  const chunks = [];
  const reader = stream.getReader();

  let { done, value } = await reader.read();
  do {
    if (value !== undefined) chunks.push(value);
    ({ done, value } = await reader.read());
  } while (!done);

  return Buffer.concat(chunks).toString("utf8");
};
