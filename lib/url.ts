export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string;
}) {
  const searchParams = new URLSearchParams(params);
  searchParams.set(key, value);
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function removeKeysFromUrlQuery({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) {
  const searchParams = new URLSearchParams(params);
  keysToRemove.forEach((key) => {
    searchParams.delete(key);
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}


