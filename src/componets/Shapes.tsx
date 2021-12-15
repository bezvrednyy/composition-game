import React from "react";
import {ShapeStyleAtr} from "./Workspace";

interface ShapeProps {
  class: string,
  style: ShapeStyleAtr,
  handleClick(e: React.MouseEvent): void,
  handleMouseDown(e: React.MouseEvent): void,
  handleMouseUp(): void
}

export const Rectangle = React.forwardRef<HTMLDivElement, ShapeProps>((props, ref): JSX.Element => {
  return (
    <div
      ref={ref}
      className={'rect' + props.class}
      style={props.style}
      onClick={props.handleClick}
      onMouseDown={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}
    />
  );
})

export const Triangle = React.forwardRef<HTMLDivElement, ShapeProps>((props, ref): JSX.Element => {
  return (
    <div
      ref={ref}
      className={'triangle'  + props.class}
      style={props.style}
      onClick={props.handleClick}
      onMouseDown={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}
    />
  );
})