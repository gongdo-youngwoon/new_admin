import { BannerSchema } from "@/api/bannerApi";
import BannerListItem from "./BannerListItem";

interface BannerListProps {
  data: BannerSchema[][];
  checkList: string[];
  handleCheck: (targetId: string) => void;
}

export default function BannerList({
  data,
  checkList,
  handleCheck,
}: BannerListProps) {
  return (
    <>
      {data.map((page, idx) => {
        return (
          <ul key={idx}>
            {page.map((el) => {
              return (
                <BannerListItem
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
