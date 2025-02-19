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
  ).then((response) => response.json())
}
