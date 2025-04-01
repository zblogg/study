import Konva from "konva";

export class EditView {
  private _stage!: Konva.Stage;
  private _editable: boolean = true;
  private _transformer = new Konva.Transformer();

  constructor(stage: Konva.Stage) {
    this._stage = stage;
  }

  setEditable(editable: boolean) {
    this._editable = editable;
    this._stage.getLayers().forEach((layer) => {
      layer.getChildren().forEach((node) => {
        node.setDraggable(editable);
      });
    });
  }
  addLayer(layer: Konva.Layer) {
    this._stage.add(layer);
    layer.add(this._transformer);
  }
  add(shape: Konva.Shape, layer?: Konva.Layer) {
    if (this._stage.getLayers().length === 0) {
      const layer1 = new Konva.Layer();
      this.addLayer(layer1);
    }
    layer = layer ? layer : this._stage.getLayers()[0];
    if (this._editable) {
      shape.setDraggable(true);
    }
    layer.add(shape);
  }
  getStage() {
    return this._stage;
  }
}
