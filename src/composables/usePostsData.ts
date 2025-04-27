import { ref } from "vue";
import { apiRequest } from "../services/api";
import type { postsType } from "../types/postsType";
import type { pathsType } from "../types/pathsType";

export const paths: pathsType = {
  posts: "/posts",
  comments: "/comments",
};

export const usePostsData = () => {
  const posts = ref<postsType[]>([]);
  const error = ref<Error | null>(null);

  const currentPage = ref<number>(1);
  const prevPage = ref<number | null>(null);
  const pagesCount = ref<number>(0);
  const totalItems = ref<number>(0);

  const nextPage = ref<number>(0);
  const limit = 5;

  const query = ref<string>("");

  const getUrl = () =>
    `${paths.posts}?_page=${currentPage.value}&_limit=${limit}&q=${query.value}`;

  async function fetchPosts() {
    error.value = null;

    const res = await apiRequest(getUrl(), "get");

    if (res instanceof Error) {
      error.value = res;
      return;
    }

    totalItems.value = Number(res.headers["x-total-count"]);
    pagesCount.value = Math.ceil(totalItems.value / limit);

    posts.value = res.data;
  }

  return {
    posts,
    error,
    fetchPosts,
    currentPage,
    pagesCount,
    totalItems,
    nextPage,
    prevPage,
    query,
  };
};
