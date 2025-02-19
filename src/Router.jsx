import { BrowserRouter, Routes, Route } from 'react-router'

import List from '@/views/List.jsx'
import Detail from '@/views/Detail.jsx'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<List />} />
        <Route path="/:name" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}
