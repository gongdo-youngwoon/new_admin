"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { ClassSchema } from "@/api/classApi";
import StartClassListHeader from "./StartClassListHeader";
import StartClassListItem from "./StartClassListItem";

interface ClassTableBodyProps {
  data: ClassSchema[][];
  checkList: string[];
  setCheckList: Dispatch<SetStateAction<string[]>>;
}

export default function StartClassList({
  data,
  checkList,
  setCheckList,
}: ClassTableBodyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data]);

  const handleCheck = (targetId: string) => {
    if (checkList.includes(targetId)) {
      setCheckList(checkList.filter((id) => id !== targetId));
    } else {
      setCheckList([...checkList, targetId]);
    }
  };

  const handleAllCheck = (ids: string[]) => {
    setCheckList(ids);
  };

  return (
    <div>
      <StartClassListHeader data={data} handleAllCheck={handleAllCheck} />
      {data.map((page, idx) => {
        return (
          <ul className="border-r border-r-gr" key={idx}>
            {page.map((el) => {
              return (
                <StartClassListItem
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
    </div>
  );
}
