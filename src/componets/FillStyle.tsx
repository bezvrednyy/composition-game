import React, {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ColorResult, HuePicker} from 'react-color';
import {changeShapeColor} from "../redux/actions";
import {State} from "../redux/reducers/rootReducer";
import {getShapeById} from "../utils";
import {hexType, Shape} from "../redux/reducers/shapesReducer";

export const FillStyle: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const colorPicker = createRef<HTMLDivElement>();
  const shapes: Shape[] = useSelector((state: State) => state.shapesStore.shapes);
  const selectedShapeID = useSelector((state: State) => state.shapesStore.selectedShapeID);
  const selectedShape = getShapeById(shapes, selectedShapeID);
  const initialState: hexType = (selectedShape) ? selectedShape.color : '#ff8400';
  const [color, setColor] = useState(initialState);

  useEffect(() => {
    if (selectedShape) {
      setColor(selectedShape.color)
    }
  }, [selectedShapeID, selectedShape])

  const handlerChange = (updatedColor: ColorResult) => {
    if (selectedShapeID) {
      dispatch( changeShapeColor(selectedShapeID, updatedColor.hex) );
    }
    setColor(updatedColor.hex);
  }

  return (
    <div>
      <h2 className='style_header'>Style</h2>
      <div className='fill_style'>
        <span className='fill_text'>Fill</span>
        <div
          className='fill_color'
          style={{background: color}}
          onClick={() => colorPicker.current!.classList.toggle('active')}>
        </div>
      </div>
      <div className='color-picker' ref={colorPicker}>
        <HuePicker
          color={color}
          onChange={updatedColor => handlerChange(updatedColor)}/>
      </div>
    </div>
  );
}