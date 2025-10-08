import { QueryClient } from "@tanstack/react-query";

const API_URL = "https://68d4fcd7e29051d1c0accca4.mockapi.io/blog";
const AUTHOR_URL = "https://68d4fcd7e29051d1c0accca4.mockapi.io/author";

export const queryClient = new QueryClient();

export async function getArticles({ page = 1, limit = 8, searchTerm, filter }) {
  let url = `${API_URL}?page=${page}&limit=${limit}`;

  if (searchTerm) {
    url += `&title=${encodeURIComponent(searchTerm)}`;
  }

  if (filter) {
    url += `&category=${encodeURIComponent(filter)}`;
  }

  const res = await fetch(url);

  if (res.status === 404) return [];
  if (!res.ok) throw new Error("Error fetching articles");
  let articles = await res.json();

  return articles;
}

export async function getArticleById({ id }) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error fetching article");
  return await res.json();
}

export async function addComment({ id, comment }) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error fetching article");

    const article = await res.json();

    const updatedComments = {
      ...article,
      comments: [...(article.comments || []), comment],
    };

    const updateRes = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedComments),
    });

    if (!updateRes.ok) {
      throw new Error("Error updating comments");
    }

    return await updateRes.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addArticle(article) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });

    if (!res.ok) {
      throw new Error("Add Artcle failed");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArticlesByUserId({ userId }) {
  try {
    const res = await fetch(`${API_URL}?userId=${userId}`);
    if (!res.ok) {
      throw new Error("failed to get articles userId");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// author

export async function fetchAuthors() {
  try {
    const res = await fetch(AUTHOR_URL);
    if (!res.ok) {
      throw new Error("failed to get author");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
