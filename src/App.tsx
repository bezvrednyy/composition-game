import React, {useEffect, useRef} from 'react';
import {useStore} from "react-redux";
import {Toolbar} from "./componets/Toolbar";
import {Workspace} from "./componets/Workspace";
import './component-styles/App.css';
import './component-styles/toolbar.css';
import './component-styles/shape_forms.css';
import './component-styles/fill_shapes.css';
import './component-styles/workspace.css';
import './component-styles/shapes.css';
import {Shape, shapeIdType} from "./redux/reducers/shapesReducer";

const App: React.FC = (): JSX.Element => {
  const store = useStore();

  function saveInLocalStorage() {
    let shapes: Shape[] = store.getState().shapesStore.shapes;
    const selectedShapeID: shapeIdType = store.getState().shapesStore.selectedShapeID;
    localStorage.setItem('shapes', JSON.stringify(shapes));
    localStorage.setItem('selectedShapeID', JSON.stringify(selectedShapeID));
  }

  useEffect(() => {
    window.addEventListener('beforeunload', saveInLocalStorage)
    return () => {
      window.removeEventListener('beforeunload', saveInLocalStorage)
    }});

  const toolbarRef = useRef(null);
  return (
    <div className="app">
      <Toolbar toolbarRef={toolbarRef} ref={toolbarRef} />
      <Workspace toolbarRef={toolbarRef} />
    </div>
  );
}

export default App;