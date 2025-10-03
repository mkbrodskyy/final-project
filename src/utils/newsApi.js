const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export function fetchNews({ query, from, to }) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
    query
  )}&from=${from}&to=${to}&pageSize=100&apiKey=${apiKey}`;
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });
}
