import React, {createRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RectForm, TriangleForm} from "./ShapeForms";
import {Rectangle, Triangle} from "./Shapes";
import {
  changeCoordinate,
  deleteShape,
  toggleSelected
} from "../redux/actions";
import {getShapeById, getShapeRef} from "../utils";
import {State} from "../redux/reducers/rootReducer";
import {shapeIdType} from "../redux/reducers/shapesReducer";

interface WorkspaceProps {
  toolbarRef: React.MutableRefObject<HTMLDivElement | null>
}
interface CurrentShape {
  target: HTMLDivElement | null,
  shiftX: number,
  shiftY: number,
  width: number,
  height: number
}
export interface ShapeStyleAtr {
  [key: string]: string
}

export const Workspace: React.FC<WorkspaceProps> = (props): JSX.Element => {
  const dispatch = useDispatch();
  const workspaceRef = createRef<HTMLDivElement>();
  const toolbarRef = props.toolbarRef;
  const deleteKey = 'Delete';
  const shapes = useSelector((state: State) => state.shapesStore.shapes);
  const selectedShapeID = useSelector((state: State) => state.shapesStore.selectedShapeID);
  const shapeRefs = useSelector((state: State) => state.shapesStore.shapeRefs);

  const currentShape: CurrentShape = {
    target: null,
    shiftX: 0,
    shiftY: 0,
    width: 0,
    height: 0
  }

  const resetSelected = (e: MouseEvent) => {
    if (selectedShapeID && e.target === e.currentTarget) {
      dispatch( toggleSelected(selectedShapeID) )
    }
  }

  useEffect(() => {
    const workspace = workspaceRef.current;
    workspace!.addEventListener('click', resetSelected);
    return () => {
      workspace!.removeEventListener('click', resetSelected);
    }})

  const selectShape = (e: React.MouseEvent<HTMLDivElement>, shapeID: shapeIdType) => {
    e.stopPropagation();
    const changedShape = getShapeById(shapes, shapeID);
    if (!changedShape) {
      return;
    }
    const toolbarWidth = toolbarRef.current!.offsetWidth;
    const currentX = e.currentTarget.getBoundingClientRect().left - toolbarWidth;
    const currentY = e.currentTarget.getBoundingClientRect().top;
    const isOffset = (changedShape.coordinateX !== currentX) || (changedShape.coordinateY !== currentY);
    if (!isOffset) {
      dispatch(toggleSelected(changedShape.id));
    } else {
      const isEmptyCoordinate = (!changedShape.coordinateX) || (!changedShape.coordinateX);
      if (isEmptyCoordinate) {
        dispatch(toggleSelected(changedShape.id))
      }
    }
    dispatch( changeCoordinate(changedShape.id, currentX, currentY) );
  }

  const startMove = (e: React.MouseEvent<HTMLDivElement>, shapeID: shapeIdType) => {
    e.preventDefault();
    const shape = getShapeById(shapes, shapeID);
    if (!shape || (shape.id !== selectedShapeID)) {
      return;
    }
    const shapeRef = getShapeRef(shapeRefs, shapeID);
    currentShape.target = shapeRef!.current;
    currentShape.width = e.currentTarget.offsetWidth;
    currentShape.height = e.currentTarget.offsetHeight;
    currentShape.shiftX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    currentShape.shiftY = e.clientY - e.currentTarget.getBoundingClientRect().top;
    currentShape.target!.classList.add('moving');
    workspaceRef.current!.addEventListener('mousemove', moveShape);
  }

  const moveShape = (e: MouseEvent) => {
    const toolbarWidth = toolbarRef.current!.offsetWidth;
    const workspaceWidth = workspaceRef.current!.offsetWidth;
    const workspaceHeight = workspaceRef.current!.offsetHeight;
    let offsetX = e.clientX - currentShape.shiftX - toolbarWidth;
    let offsetY = e.clientY - currentShape.shiftY;
    let isInsideWorkspace = (offsetX < workspaceWidth - currentShape.width) && (offsetX > 0)
      && (offsetY < workspaceHeight - currentShape.height) && (offsetY > 0)
    if (isInsideWorkspace && currentShape.target) {
      currentShape.target.style.left = `${offsetX}px`;
      currentShape.target.style.top = `${offsetY}px`;
    }
  }

  const endMove = () => {
    if (currentShape.target) {
      currentShape.target.classList.remove('moving');
    }
    workspaceRef.current!.removeEventListener('mousemove', moveShape);
  }

  const keyUpHandler = (e: KeyboardEvent) => {
    if (selectedShapeID) {
      if (e.key === deleteKey) {
        dispatch( deleteShape() );
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    }
  })

  return (
    <div ref={workspaceRef} className='workspace'>
      {shapes.map(shape => {
        let style: ShapeStyleAtr = {};
        if (shape.coordinateX && shape.coordinateY) {
          style = {...style,
            left: `${shape.coordinateX}px`,
            top: `${shape.coordinateY}px`
          }
        }
        if (shape.form === RectForm) {
          style = {...style, background: shape.color}
          return (
            <Rectangle
              key={shape.id}
              ref={shapeRefs[shape.id]}
              class={(shape.id === selectedShapeID) ? ' active' : ''}
              style={style}
              handleClick={(e: React.MouseEvent<HTMLDivElement>) => selectShape(e, shape.id)}
              handleMouseDown={(e: React.MouseEvent<HTMLDivElement>) => startMove(e, shape.id)}
              handleMouseUp={endMove}
            />
          )
        } else if (shape.form === TriangleForm) {
          style = {...style, borderBottomColor: shape.color};
          return (
            <Triangle
              key={shape.id}
              ref={shapeRefs[shape.id]}
              class={(shape.id === selectedShapeID) ? ' active' : ''}
              style={style}
              handleClick={(e:React.MouseEvent<HTMLDivElement>) => selectShape(e, shape.id)}
              handleMouseDown={(e:React.MouseEvent<HTMLDivElement>) => startMove(e, shape.id)}
              handleMouseUp={endMove}
            />
          )
        }
        return null;
      })}
    </div>
)};