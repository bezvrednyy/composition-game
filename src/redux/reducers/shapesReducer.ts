import {
  CHANGE_SHAPE_COLOR,
  CHANGE_COORDINATE,
  CREATE_SHAPE,
  DEL_SHAPE,
  TOGGLE_SELECTED
} from "../actionTypes";
import {Reducer} from "redux";
import {RectForm} from "../../componets/ShapeForms";
import {Action} from "../actions";
import React, {createRef} from "react";

export type ShapeForm = 'rectangle' | 'triangle';
export type hexType = string;
export type shapeIdType = string;
export interface Shape {
  id: shapeIdType,
  form: ShapeForm,
  color: hexType,
  coordinateX: number,
  coordinateY: number
}

export interface ShapesRefType {
  [key: string]: React.RefObject<HTMLDivElement>
}

const preloadedShapes: Shape[] | null = (localStorage.getItem('shapes')) ? JSON.parse(localStorage.getItem('shapes') as string) : null;
const preloadedSelectedShape: shapeIdType | null = (localStorage.getItem('selectedShapeID')) ? JSON.parse(localStorage.getItem('selectedShapeID') as string) : null;
const shapeRefs: ShapesRefType = {};
if (preloadedShapes) {
  for (let shape of preloadedShapes) {
    shapeRefs[shape.id] = createRef<HTMLDivElement>()
  }
}
const initialState = {
  shapes: (preloadedShapes) ? preloadedShapes : [],
  selectedShapeID: preloadedSelectedShape,
  shapeRefs: shapeRefs
}

export const shapeReducer: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_SHAPE:
      const ColorRect: string = '#00ff00';
      const ColorTriangle: string = '#ff8800';
      const newShape: Shape = {
        id: Date.now().toString(),
        form: action.payload,
        color: (action.payload === RectForm) ? ColorRect : ColorTriangle,
        coordinateX: 0,
        coordinateY: 0
      }
      const newShapeRef: ShapesRefType = {};
      newShapeRef[newShape.id] = createRef<HTMLDivElement>();
      return {...state, shapes: state.shapes.concat(newShape), shapeRefs: {...state.shapeRefs, ...newShapeRef}};
    case CHANGE_COORDINATE:
      const changedShape = action.payload;
      let isFound = false;
      const newShapes = state.shapes.map((shape: Shape) => {
        if (shape.id === changedShape.shapeID) {
          isFound = true;
          return {...shape, coordinateX: changedShape.x, coordinateY: changedShape.y};
        }
        return shape;
      });
      if (isFound) {
        return {...state, shapes: newShapes};
      }
      return state;
    case TOGGLE_SELECTED:
      if ( action.payload === state.selectedShapeID ) {
        return {...state, selectedShapeID: null};
      }
      return {...state, selectedShapeID: action.payload};
    case CHANGE_SHAPE_COLOR:
      const updatedShapes = state.shapes.map((shape: Shape) => {
        if (shape.id === action.payload.shapeID) {
          return {...shape, color: action.payload.updatedColor};
        }
        return shape;
      });
      return {...state, shapes: updatedShapes};
    case DEL_SHAPE:
      delete state.shapeRefs[state.selectedShapeID];
      return {...state,
        shapes: state.shapes.filter((shape: Shape) => (shape.id !== state.selectedShapeID)),
        selectedShapeID: null
      };
    default: return state;
  }
}