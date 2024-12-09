// 函数

type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

/* 调用签名 */
// 带有属性的函数
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";

doSomething(myFunc);

/* 构造签名 */
type SomeConstructor = {
  new (s: string): { msg: string };
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
// 调用签名和构造签名组合
interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}
function fn2(ctor: CallOrConstruct) {
  console.log(ctor(10));

  console.log(new ctor("10"));
}

fn2(Date);

/* 泛型函数 */

function firstElement(arr: any[]) {
  return arr[0];
}

function firstElement2<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
const s = firstElement2(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement2([1, 2, 3]);
// u is of type undefined
const u = firstElement2([]);

// 推理
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// 约束
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length > b.length) {
    return a;
  }
  return b;
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100);

// 约束值
// function minimumLength<Type extends { length: number }>(
//     obj: Type,
//     minimum: number
//   ): Type {
//     if (obj.length >= minimum) {
//       return obj;
//     } else {
//       return { length: minimum };
//     }
// }

// 指定类型参数
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
const arr = combine<string | number>([1, 2, 3], ["hello"]);

// 泛型规范
// ....参数类型
function firstElement31<Type>(arr: Type[]) {
  return arr[0];
}
function firstElement32<Type extends any>(arr: Type[]) {
  return arr[0];
}

// 较少类型参数
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

// 回调中的可选参数（为回调编写函数类型时，切勿编写可选参数）
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // I don't feel like providing the index today
    callback(arr[i]);
  }
}

/* 函数重载 */
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);

// never
function fn_never(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}

// Function
function doSomething_Function(f: Function) {
  return f(1, 2, 3);
}

// 参数解构
function doSomething_2(f: Function) {
  return f(1, 2, 3);
}

// 函数可分配性
type voidFunc = () => void;
 
const f1: voidFunc = () => {
  return true;
};
 
const f2: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};