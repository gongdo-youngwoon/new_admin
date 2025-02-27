import { BannerFormType } from "@/types/formType";
import { createBannerZod } from "@/zod/createBannerZod";
import { UploadFile } from "./fileApi";
import { updateBannerFileZod, updateBannerZod } from "@/zod/updateBannerZod";

export interface BannerSchema {
  id: string;
  title: string;
  content: string;
  bgColor: string;
  textColor: string;
  action: {
    label: string;
    color: string;
    url: string;
  };
  image: string;
  order: number;
  display: boolean;
  startTime: number;
  endTime: number;
  created: number;
  modified: number;
}

export async function getBannerList(
  pageParam: string | null,
  queryObj: { [k: string]: string }
): Promise<BannerSchema[]> {
  let query = pageParam ? `&af=${pageParam}` : "";

  //   if (queryObj.search) {
  //     query += `&ct=${queryObj.search}`;
  //   }

  if (queryObj.sort) {
    const parsed = queryObj.sort.split("_");
    query += `&ob=${parsed[0]}&od=${parsed[1]}`;
  }

  if (queryObj.display) {
    query += `&dp=${queryObj.display}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/banner/list?t=class&lmt=8${query}`
  );

  if (!response.ok) {
    const error = new Error("클래스 리스트 조회 실패");
    throw error;
  }

  const { data } = await response.json();

  return data.data;
}

export async function getBanner(
  bannerId: string | string[] | undefined
): Promise<BannerSchema> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/banner/detail/${bannerId}`
  );

  if (!response.ok) {
    const error = new Error("배너 상세 조회 실패");
    throw error;
  }

  const { data } = await response.json();

  return data;
}

export async function batchUpdateBanner({
  checkList,
  updateData,
}: {
  checkList: string[];
  updateData: { [key: string]: number | boolean };
}) {
  const requestBody = {
    ids: checkList,
    form: updateData,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/banner/multi-update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const error = new Error("배너 일괄 업데이트 실패");
    throw error;
  }

  const result = await response.json();

  return result;
}

export async function createBanner(formData: BannerFormType) {
  const result = createBannerZod.safeParse(formData);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error.flatten().fieldErrors));
  }

  const { url } = await UploadFile(result.data.imageFile);

  const requestBody = {
    title: result.data.title,
    content: result.data.desc,
    bgColor: result.data.bgColor,
    textColor: result.data.textColor,
    actionText: result.data.cta,
    actionColor: result.data.textColor,
    image: url,
    linkUrl: result.data.link,
    order: formData.order ? Number(formData.order) : 99,
    display: formData.display === "Y" ? true : false,
  };

  await fetch(`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/banner/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
}

export async function updateBanner({
  bannerId,
  formData,
}: {
  bannerId: string | string[] | undefined;
  formData: BannerFormType;
}) {
  console.log(formData);
  const result =
    formData.previewImage && !formData.imageFile
      ? updateBannerZod.safeParse(formData)
      : updateBannerFileZod.safeParse(formData);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error.flatten().fieldErrors));
  }

  const requestBody = {
    id: bannerId,
    form: {
      title: result.data.title,
      content: result.data.desc,
      bgColor: result.data.bgColor,
      textColor: result.data.textColor,
      actionText: result.data.cta,
      actionColor: result.data.textColor,
      image: formData.previewImage,
      linkUrl: result.data.link,
      order: formData.order ? Number(formData.order) : 99,
      display: formData.display === "Y" ? true : false,
    },
  };

  if (formData.imageFile) {
    const { url } = await UploadFile(formData.imageFile);
    requestBody.form.image = url;
  }

  await fetch(`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/banner/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
}
