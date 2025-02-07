const MENU_LIST = [
  {
    id: 1,
    menu: "대시보드",
  },
  {
    id: 2,
    menu: "배너 관리",
  },
  {
    id: 3,
    menu: "클래스 관리",
  },
];

export default function MenuList() {
  return (
    <ul>
      {MENU_LIST.map((el) => {
        return <li key={el.id}>{el.menu}</li>;
      })}
    </ul>
  );
}
