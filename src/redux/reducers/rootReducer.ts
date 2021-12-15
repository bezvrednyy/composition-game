import {combineReducers} from 'redux'
import {shapeIdType, shapeReducer, ShapesRefType} from "./shapesReducer";
import {Shape} from "./shapesReducer";

export interface State {
  shapesStore: { shapes: Shape[], selectedShapeID: shapeIdType, shapeRefs: ShapesRefType }
}

export const rootReducer = combineReducers({
  shapesStore: shapeReducer
})
