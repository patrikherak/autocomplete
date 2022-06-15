import { ref, unref } from 'vue'

export function useDataFetcher(dataProvider) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (query) => {
    loading.value = true
    data.value = null
    error.value = null

    try {
      data.value = await dataProvider(unref(query))
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const resetData = () => {
    loading.value = false
    data.value = null
    error.value = null
  }

  return {
    data,
    loading,
    error,
    fetchData,
    resetData
  }
}
