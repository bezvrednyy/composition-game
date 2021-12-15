import React from 'react';
import {ShapeForms} from "./ShapeForms";
import {FillStyle} from "./FillStyle";

type ToolbarProps = {
  toolbarRef: React.MutableRefObject<HTMLDivElement | null>
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>((props, ref): JSX.Element => {
  return (
    <div ref={ref} className='toolbar'>
      <ShapeForms />
      <FillStyle />
    </div>
  )
})