import axios from 'axios'

export async function geoDataProvider(query) {
  const result = await axios.get(
    `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${query}&hateoasMode=false&limit=10&offset=0`
  )

  // Mapping result data to more convenient form, e.g. [{name: <>, value: <>}]
  return result.data.data.map((item) => {
    return {
      description: `${item.name}, ${item.country}, ${item.countryCode}`,
      value: item.name
    }
  })
}
