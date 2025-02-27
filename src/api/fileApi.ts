export async function UploadFile(file: File): Promise<{
  name: string;
  type: string;
  size: number;
  url: string;
}> {
  const contentType = file.type;

  const signedUrlResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/storage/generateSignedUrl`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contentType }),
    }
  );

  const {
    data: { writeUrl, readUrl },
  } = await signedUrlResponse.json();

  await fetch(writeUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
    },
    body: file,
  });

  return {
    name: file.name,
    type: file.type,
    size: file.size,
    url: readUrl,
  };
}
