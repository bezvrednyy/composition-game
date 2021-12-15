import {Shape, shapeIdType, ShapesRefType} from "./redux/reducers/shapesReducer";
import React from "react";

export function getShapeById(shapes: Shape[], id: string): Shape | null {
  for (let shape of shapes) {
    if (shape.id === id) {
      return shape;
    }
  }
  return null;
}

export function getShapeRef(shapeRefs: ShapesRefType, id: shapeIdType): React.RefObject<HTMLDivElement> | null {
  for (let keyID in shapeRefs) {
    if (keyID === id) {
      return shapeRefs[id];
    }
  }
  return null;
}