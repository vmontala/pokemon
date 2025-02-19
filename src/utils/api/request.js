export default function request (query) {
  return fetch(
    'https://beta.pokeapi.co/graphql/v1beta',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    },
  )
    .then((response) => response.json())
    .then((data) => new Promise((resolve, reject) => {
      // Enforces a failed request as the `graphQL` implementation always returns a `200 OK`
      if (data.errors?.length) {
        reject(data)

        return
      }

      resolve(data)
    }))
}
