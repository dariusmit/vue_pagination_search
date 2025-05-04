import { watch, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export const usePagination = (
  pagesCount: Ref<number>,
  currentPage: Ref<number>,
  query: Ref<string>
) => {
  const route = useRoute();
  const router = useRouter();

  function validatePageQueryParam(page: number, maxPages: number): number {
    if (isNaN(page) || page < 1 || page > maxPages) {
      return 1;
    }
    return page;
  }

  watch(
    () => pagesCount.value,
    (newValue) => {
      const pageFromRoute = Number(route.query._page);
      currentPage.value = validatePageQueryParam(pageFromRoute, newValue);
      updateParams();
    }
  );

  function updateParams() {
    router.push({
      query: {
        _page: String(currentPage.value),
        q: String(query.value),
      },
    });
  }

  function syncFromRoute() {
    currentPage.value = Number(route.query._page);
    query.value = String(route.query.q);
  }

  return { updateParams, syncFromRoute };
};
