"use client";

import { ClassFormType } from "@/types/formType";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

interface TagInputProps {
  inputValue: ClassFormType;
  setInputValue: Dispatch<SetStateAction<ClassFormType>>;
}

export default function TagInput({ inputValue, setInputValue }: TagInputProps) {
  const [keyword, setKeyword] = useState("");
  const tagList = inputValue.tags;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tagList.length === 5) {
      return setKeyword("");
    }

    if (tagList.includes(keyword)) {
      return setKeyword("");
    } else {
      setInputValue({ ...inputValue, tags: [...inputValue.tags, keyword] });
      setKeyword("");
    }
  };

  const handleClick = () => {
    if (tagList.length === 5) {
      return setKeyword("");
    }

    if (tagList.includes(keyword)) {
      return setKeyword("");
    } else {
      setInputValue({ ...inputValue, tags: [...inputValue.tags, keyword] });
      setKeyword("");
    }
  };

  const handleDelete = (payload: string) => {
    const deletedList = tagList.filter((tag) => tag !== payload);
    setInputValue({ ...inputValue, tags: deletedList });
  };

  return (
    <>
      <form
        className="flex items-center gap-2 h-12 px-4 mb-3 border border-gray-200 rounded-md transition-default
        has-[:focus]:border-primary-500 has-[:focus]:ring has-[:focus]:ring-primary-50"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full h-full text-sm outline-none placeholder:text-sm"
          type="text"
          name="tag"
          id="tag"
          placeholder="태그를 입력해주세요"
          value={keyword}
          autoComplete="off"
          onChange={handleChange}
        />
        <FontAwesomeIcon
          className="text-gray-500 hover:cursor-pointer"
          icon={faArrowRight}
          onClick={handleClick}
        />
        <button className="invisible" />
      </form>
      {tagList.length > 0 && (
        <ul className="flex gap-3 mb-3">
          {tagList.map((tag, idx) => {
            return (
              <li
                className="flex gap-4 px-3 py-1 bg-gray-100 text-sm"
                key={idx}
              >
                <div className="text-gray-800 font-semibold"># {tag}</div>
                <div
                  className="text-gray-500 hover:cursor-pointer"
                  onClick={() => handleDelete(tag)}
                >
                  ✕
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex flex-col gap-1 pt-3 border-t border-t-gray-200 text-sm text-primary-500">
        <p>최대 5개까지 등록 가능합니다.</p>
        <p>
          클래스를 검색할 때 유용하게 사용되어 관련성이 높은 태그를
          등록해주세요.
        </p>
      </div>
    </>
  );
}
