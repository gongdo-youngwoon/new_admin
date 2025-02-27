import { ClassSchema } from "@/api/classApi";
import EndClassListItem from "./EndClassListItem";

interface EndClassListProps {
  data: ClassSchema[][];
  checkList: string[];
}

export default function EndClassList({ data, checkList }: EndClassListProps) {
  return (
    <div>
      <div className="w-16 h-10 border-b border-l border-gray-200"></div>
      <div>
        {data.map((page, idx) => {
          return (
            <ul key={idx}>
              {page.map((el) => {
                return (
                  <EndClassListItem
                    key={el.id}
                    data={el}
                    checked={checkList.includes(el.id)}
                  />
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
}
