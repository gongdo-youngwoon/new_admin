import { Dispatch, SetStateAction } from "react";
import { ClassSchema } from "@/api/classApi";
import StartClassList from "./StartClassList";
import CenterClassList from "./CenterClassList";
import EndClassList from "./EndClassList";

interface ClassTableBodyProps {
  data: ClassSchema[][];
  checkList: string[];
  setCheckList: Dispatch<SetStateAction<string[]>>;
}

export default function ClassTableBody({
  data,
  checkList,
  setCheckList,
}: ClassTableBodyProps) {
  return (
    <div className="flex">
      <StartClassList
        data={data}
        checkList={checkList}
        setCheckList={setCheckList}
      />
      <CenterClassList data={data} checkList={checkList} />
      <EndClassList data={data} checkList={checkList} />
    </div>
  );
}
