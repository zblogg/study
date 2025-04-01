import "./style.css";
import Konva from "konva";
import { KonvaSerializer } from "./serializer/serialize";
import { Logger } from "./debug";
import { EditView } from "./edit/edit";

const stage = new Konva.Stage({
  container: "container",
  width: 500,
  height: 500,
});

const view = new EditView(stage);

const rect = new Konva.Rect({
  x: 20,
  y: 20,
  width: 100,
  height: 50,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
});

view.add(rect);

rect.setDraggable(true);

const circle = new Konva.Circle({
  x: 50,
  y: 100,
  width: 50,
  height: 50,
  fill: "green",
});

view.add(circle);

rect.on("click", (e) => {
  console.log(e);
});

// console.log(KonvaSerializer.stringify(stage));
// console.log(rect.eventListeners)
Logger.log(KonvaSerializer.stringify(stage));

const stage2 = KonvaSerializer.parse(KonvaSerializer.stringify(stage));
console.error(stage2);
