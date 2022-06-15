<script setup lang="ts">
import { ref } from 'vue'
import { useDebounce } from '../composables/useDebounce.js'
import { useDataFetcher } from '../composables/useDataFetcher.js'

interface Props {
  label: string
  placeholder?: string
  dataProvider: Function
}

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Start typing ...'
  },
  dataProvider: {
    type: Function,
    default: null
  }
})

const { data, error, loading, fetchData, resetData } = useDataFetcher(
  props.dataProvider
)

const inputValue = ref<string>('')
const isAutoCompleteVisible = ref<boolean>(false)

const onInput = useDebounce(async (event: InputEvent) => {
  const value = (event.target as HTMLInputElement).value

  inputValue.value = value

  if (!value) {
    resetData()
    return
  }

  await fetchData(value)
  showAutoComplete()
}, 500)

const showAutoComplete = () =>
  data?.value?.length
    ? (isAutoCompleteVisible.value = true)
    : (isAutoCompleteVisible.value = false)

const hideAutoComplete = () => (isAutoCompleteVisible.value = false)

const select = (item) => {
  inputValue.value = item.value
  hideAutoComplete()
}
</script>

<template>
  <div class="relative w-96">
    <label
      v-if="props.label"
      for="input"
      class="form-label inline-block mb-2 text-gray-700"
    >
      {{ props.label }}
    </label>
    <input
      type="text"
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      :value="inputValue"
      :placeholder="props.placeholder"
      @input="onInput($event)"
      @focus="showAutoComplete"
    />

    <div
      v-if="isAutoCompleteVisible && data"
      class="absolute w-96 top-100 mt-1 border bg-white shadow-xl rounded max-h-32 overflow-y-auto"
    >
      <div class="p-2">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="cursor-pointer transition duration-150 border-b-2 border-transparent hover:border-blue-600"
        >
          <a @click.stop="select(item)">
            {{ item.description }}
          </a>
        </div>
      </div>
    </div>
  </div>

  <div v-if="error">Error encountered: {{ error.message }}</div>
  <div v-else-if="loading">Loading...</div>
</template>

<style scoped>
label {
  font-weight: bold;
}
</style>
