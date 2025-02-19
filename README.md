# Pokémon index
Playground app using React and `graphQL`, lists Pokémons from the PokéAPI

## Installation
1. Clone the repository
1. Install the dependencies (`yarn` or `npm install`)
1. Run the application `yarn dev` or `npm run dev` (development mode) or `yarn build && yarn preview` or `npm run build && npm run preview` (production mode)

## Decisions
- Native `CSS` instead of any `CSS-in-JS` solution: although missing greatly the modularity aspect of it, following a semi-BEM approach helped keeping the class names unique
- Custom styles instead of a third party UI library: I preferred to go for custom styles as the topic gave a lot of design freedom
- Not using a table library: started implementing one, however I soon realised that it was easier to implement the "table" as a `CSS` grid for better mobile responsiveness
- Not using state management (or context): I didn't find it necessary for an application of this size, however it would be interesting in order to keep the cache on memory rather than on disk
- `graphQL`: when I saw that PokéAPI offered it I decided to give it a go as I haven't had many opportunities to tinker around with it in the past
- `yarn create vite`: it just works, also, I find `vite` more welcoming than many other alternatives
- No `CSS` pre-processor: even though I like the ability to better nest classes on `SCSS`, having runtime variables on `CSS` is very neat
- No `TypeScript`: seemed an overkill for such a small and contained application

## Challenges
- PokéAPI's `graphQL`: although it ended up working out, the documentation is mosty an interactive console and it took a bit to get the hang of it
- `usePagination.js`: might have gone a bit too wild on this custom hook, just wanted to have an example around, however ended up being a bit challenging to expose its state
- Folder structure: not super happy with the whole `File.jsx`/`File.css` duplication for each view/component

## Next steps
- Error handling: something fancier than a `window.alert` and a redirect, ideally a retry-system, checking whether the user is online, etc
- Persisting list state: both the filters and pagination can live on the URL, but also can be cached to enhance navigation
- Accessibility: aimed to do as many things natively as possible, however some elements could use of descriptors and behaviour indicators
- Testing: would be great to cover at least the `utils` folder
- Investigate `Suspense`: might be a great approach for loading states
