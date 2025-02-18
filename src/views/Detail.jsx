import Button from '@/components/Button.jsx'
import Wrapper from '@/components/Wrapper.jsx'

import './Detail.css'

export default function Detail ({ children }) {
  const Header = (
    <Button to="/">
      Back
    </Button>
  );

  return (
    <Wrapper header={Header}>
      <div className="detail">
        Detail
      </div>
    </Wrapper>
  )
}
