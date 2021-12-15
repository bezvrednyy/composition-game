import React from "react";
import {useDispatch} from "react-redux";
import {createShape} from "../redux/actions";
import {ShapeForm} from "../redux/reducers/shapesReducer";

export const RectForm: ShapeForm = 'rectangle';
export const TriangleForm: ShapeForm = 'triangle';

export const ShapeForms: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className='shapes_header'>Shapes</h1>
      <div className='shapes'>
        <img
          className='rectangle_style'
          src='img/rectStyle.svg'
          alt='прямоугольник'
          onClick={() => dispatch( createShape(RectForm) )}
        />
        <img
          className='triangle_style'
          src='img/triangleStyle.svg'
          alt='треугольник'
          onClick={() => dispatch( createShape(TriangleForm) )}
        />
      </div>
    </div>
  );
}