import {
  CHANGE_COORDINATE,
  CREATE_SHAPE,
  DEL_SHAPE,
  CHANGE_SHAPE_COLOR,
  TOGGLE_SELECTED
} from './actionTypes';
import {hexType, ShapeForm, shapeIdType} from "./reducers/shapesReducer";

export interface Action {
  type: string,
  payload?: any
}

export function createShape(shape: ShapeForm): Action {
  return {
    type: CREATE_SHAPE,
    payload: shape
  }
}

export function deleteShape(): Action {
  return {
    type: DEL_SHAPE
  }
}

export function toggleSelected(shapeID: shapeIdType): Action {
  return {
    type: TOGGLE_SELECTED,
    payload: shapeID
  }
}

export function changeCoordinate(shapeID: shapeIdType, x: number, y: number): Action {
  return {
    type: CHANGE_COORDINATE,
    payload: {shapeID, x, y}
  }
}

export function changeShapeColor(shapeID: shapeIdType, updatedColor: hexType): Action {
  return {
    type: CHANGE_SHAPE_COLOR,
    payload: {shapeID, updatedColor}
  }
}