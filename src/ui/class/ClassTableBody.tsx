"use client";

import { ClassSchema } from "@/api/classApi";
import ClassListItem from "./ClassListItem";

interface ClassTableBodyProps {
  data: ClassSchema[][];
  checkList: string[];
  handleCheck: (targetId: string) => void;
}

export default function ClassTableBody({
  data,
  checkList,
  handleCheck,
}: ClassTableBodyProps) {
  return (
    <>
      {data.map((page, idx) => {
        return (
          <ul key={idx}>
            {page.map((el) => {
              return (
                <ClassListItem
                  key={el.id}
                  checked={checkList.includes(el.id)}
                  data={el}
                  handleCheck={handleCheck}
                />
              );
            })}
          </ul>
        );
      })}
    </>
  );
}
