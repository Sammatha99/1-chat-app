import { useState, useEffect } from "react";

const PREFIX = "1-chat-app-";

export default function useLocalStorage(key, initValue) {
  const prefixKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixKey);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    if (typeof initValue === "function") {
      return initValue();
    } else {
      return initValue;
    }
  });

  /**
   * khi value thay đổi/ local storage key thay đổi
   * thì auto chạy lại useEffect => lưu dô lại localStorage
   */
  useEffect(() => {
    localStorage.setItem(prefixKey, JSON.stringify(value));
  }, [value, prefixKey]);

  return [value, setValue];
}
