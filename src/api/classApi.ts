export interface ClassSchema {
  id: string;
  thumbnail: string;
  title: string;
  tags: string[];
  display: boolean;
  published: boolean;
  recommend: boolean;
  created: number;
}

export async function getClassList(
  pageParam: string | null,
  queryObj: {
    search: string | null;
    order: string | null;
    type: string | null;
    level: string | null;
    recommend: string | null;
    display: string | null;
  }
): Promise<ClassSchema[]> {
  console.log(queryObj);
  let query = pageParam ? `&af=${pageParam}` : "";

  if (queryObj.search) {
    query += `&ct=${queryObj.search}`;
  }

  if (queryObj.order) {
    const parsed = queryObj.order.split("_");
    query += `&ob${parsed[0]}=&od=${parsed[1]}`;
  }

  if (queryObj.type) {
    query += `&pub=${queryObj.type === "오픈형" ? "Y" : "N"}`;
  }

  if (queryObj.recommend) {
    query += `&rcnd=${queryObj.recommend === "추천" ? "Y" : "N"}`;
  }

  if (queryObj.display) {
    query += `&dp=${queryObj.display === "노출중" ? "Y" : "N"}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/class/list?t=class&lmt=8${query}`
  );

  if (!response.ok) {
    const error = new Error("클래스 리스트 조회 실패");
    throw error;
  }

  const { data } = await response.json();

  return data.data;
}
