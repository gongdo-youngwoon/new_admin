export const getBreadcrumb = (pathname: string, detailId: string) => {
  const depthList: { id: number; label: string; href?: string }[] = [];
  if (pathname === "/") {
    depthList.push({ id: 1, label: "대시보드" });
  } else if (pathname === "/banner") {
    depthList.push({ id: 1, label: "배너 관리" });
    depthList.push({ id: 2, label: ">" });
    depthList.push({ id: 3, label: "배너 조회", href: "/banner" });
  } else if (pathname === "/banner/create") {
    depthList.push({ id: 1, label: "배너 관리" });
    depthList.push({ id: 2, label: ">" });
    depthList.push({ id: 3, label: "배너 등록", href: "/banner/create" });
  } else if (pathname.startsWith("/banner/") && detailId) {
    depthList.push({ id: 1, label: "배너 관리" });
    depthList.push({ id: 2, label: ">" });
    depthList.push({ id: 3, label: "배너 조회", href: "/banner" });
    depthList.push({ id: 4, label: ">" });
    depthList.push({
      id: 5,
      label: "배너 수정",
      href: `/banner/${detailId}/update`,
    });
  } else if (pathname === "/class") {
    depthList.push({ id: 1, label: "클래스 관리" });
    depthList.push({ id: 2, label: ">" });
    depthList.push({ id: 3, label: "클래스 조회", href: "/class" });
  } else if (pathname === "/class/create") {
    depthList.push({ id: 1, label: "클래스 관리" });
    depthList.push({ id: 2, label: ">" });
    depthList.push({ id: 3, label: "클래스 등록", href: "/class/create" });
  } else if (pathname.startsWith("/class/") && detailId) {
    depthList.push({ id: 1, label: "클래스 관리" });
    depthList.push({ id: 2, label: ">" });
    depthList.push({ id: 3, label: "클래스 조회", href: "/class" });
    depthList.push({ id: 4, label: ">" });
    depthList.push({
      id: 5,
      label: "클래스 수정",
      href: `/class/${detailId}/update`,
    });
  }
  return depthList;
};
