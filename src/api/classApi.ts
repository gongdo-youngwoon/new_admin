export interface ClassSchema {
  id: string;
  thumbnail: string;
  title: string;
  tags: string[];
  by: string;
  display: boolean;
  published: boolean;
  recommend: boolean;
  created: number;
}

export async function getClassList(
  pageParam: string | null,
  queryObj: { [k: string]: string }
): Promise<ClassSchema[]> {
  console.log(queryObj);
  let query = pageParam ? `&af=${pageParam}` : "";

  if (queryObj.search) {
    query += `&ct=${queryObj.search}`;
  }

  if (queryObj.sort) {
    const parsed = queryObj.sort.split("_");
    query += `&ob=${parsed[0]}&od=${parsed[1]}`;
  }

  if (queryObj.type) {
    query += `&pub=${queryObj.type}`;
  }

  if (queryObj.recommend) {
    query += `&rcnd=${queryObj.recommend}`;
  }

  if (queryObj.display) {
    query += `&dp=${queryObj.display}`;
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

export async function getClassDetail(classId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/class/${classId}/detail`
  );

  if (!response.ok) {
    const error = new Error("클래스 상세 조회 실패");
    throw error;
  }

  const { data } = await response.json();

  return data;
}

export async function batchUpdateClass({
  checkList,
  updateData,
}: {
  checkList: string[];
  updateData: { [key: string]: boolean };
}) {
  const requestBody = {
    ids: checkList,
    form: updateData,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/class/update/batch`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const error = new Error("클래스 일괄 업데이트 실패");
    throw error;
  }

  const result = await response.json();

  return result;
}
