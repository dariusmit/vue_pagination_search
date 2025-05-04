import { ref } from "vue";
import type { Ref } from "vue";
import { apiRequest } from "../services/api";
import type { postsType } from "../types/postsType";
import type { pathsType } from "../types/pathsType";

export const paths: pathsType = {
  posts: "/posts",
  comments: "/comments",
};

export const usePostsData = (
  currentPage: Ref<number>,
  limit: Ref<number>,
  query: Ref<string>
) => {
  const posts = ref<postsType[]>([]);
  const error = ref<Error | null>(null);

  const totalItems = ref<number>(0);
  const pagesCount = ref<number>(0);

  const getUrl = () =>
    `${paths.posts}?_page=${currentPage.value}&_limit=${limit.value}&q=${query.value}`;

  async function fetchPosts() {
    error.value = null;

    const res = await apiRequest(getUrl(), "get");

    if (res instanceof Error) {
      error.value = res;
      return;
    }

    totalItems.value = Number(res.headers["x-total-count"]);
    pagesCount.value = Math.ceil(totalItems.value / limit.value);

    posts.value = res.data;
  }

  return {
    posts,
    error,
    fetchPosts,
    pagesCount
  };
};
