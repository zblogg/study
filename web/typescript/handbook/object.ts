interface Shape {}
function getShape(): Shape {
  return {};
}
// 可选属性
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
  console.log("y coordinate at", yPos);
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// 索引签名
interface StringArray {
  [index: number]: string;
}
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

// 超额属性检查
interface SquareConfig {
  color?: string;
  width?: number;
}
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: unknown;
}

// 扩展类型

interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}

interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
// 交集类型
type ColorfulCircle2 = Colorful & Circle;

// 泛型对象类型
interface Box2 {
  contents: any;
}
interface Box3<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}
let boxA: Box3<string> = { contents: "hello" };
boxA.contents;
let boxB: StringBox = { contents: "world" };
boxB.contents;

function setContents<Type>(box: Box3<Type>, newContents: Type) {
  box.contents = newContents;
}

//
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

// Array
let myArray: string[] = ["hello", "world"];
// ReadonlyArray
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
}
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
function doStuff2(values: readonly string[]) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
}
// Tuple Types
function doSomething(pair: [string, number]) {
  const a = pair[0];
  const b = pair[1];
}
doSomething(["hello", 42]);
type Either2dOr3d = [number, number, number?];
function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  console.log(`Provided coordinates had ${coord.length} dimensions`);
}
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}
function doSomething(pair: readonly [string, number]) {
  // ...
}
let point = [3, 4] as const;