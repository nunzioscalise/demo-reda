import { useState, useEffect } from "react";

const localCache = { users: [] };

export default function useUserList(size: number) {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if(size <= 20) {
      requestUserList();
    }

    async function requestUserList() {
      setUserList([]);
      setLoading(true);
      const res = await fetch(
        `https://random-data-api.com/api/users/random_user?size=${size}`
      );
      const json = await res.json();
      localCache.users = json || [];
      setUserList(localCache.users);
      setLoading(false);
    }
  }, [size]);

  return [userList, loading] as const;
}