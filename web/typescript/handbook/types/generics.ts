function identity<Type>(arg: Type): Type {
  return arg;
}
let output = identity<string>("myString");
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity2<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity2;

// 泛型类
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity2<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

// 泛型中使用类类型
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

interface Container<T extends HTMLElement, U extends HTMLElement[]> {}
// 泛型参数默认值
declare function createEl<
  T extends HTMLElement = HTMLDivElement,
  U extends HTMLElement[] = T[]
>(element?: T, children?: U): Container<T, U>;

// 逆变和协变
interface Cat extends Animal {}
interface AnimalProducer {
  make(): Animal;
}
// A CatProducer can be used anywhere an
// Animal producer is expected
interface CatProducer {
  make(): Cat;
}
// Contravariant annotation
interface Consumer<in T> {
  consume: (arg: T) => void;
}
// Covariant annotation
interface Producer<out T> {
  make(): T;
}
// Invariant annotation
interface ProducerConsumer<in out T> {
  consume: (arg: T) => void;
  make(): T;
}
