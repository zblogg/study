import Konva from "konva";

/**
 * 函数字符串转换为函数
 * @param fnString
 * @returns
 */
function str2func(fnString: string) {
  fnString = fnString.trim();

  // 判断是否是箭头函数
  const arrowFunctionMatch = fnString.match(
    /^(?:\((.*?)\)|([a-zA-Z_$][0-9a-zA-Z_$]*))\s*=>\s*(.*)$/s
  );
  if (arrowFunctionMatch) {
    const params = arrowFunctionMatch[1] || arrowFunctionMatch[2] || "";
    const body = arrowFunctionMatch[3];

    // 判断是否需要 return（单行箭头函数隐式返回）
    const isExpression = !body.startsWith("{");
    const functionBody = isExpression ? `return ${body};` : body;

    return new Function(params, functionBody);
  }

  // 判断是否是普通函数
  const regularFunctionMatch = fnString.match(
    /^function.*?\((.*?)\)\s*{(.*)}$/s
  );
  if (regularFunctionMatch) {
    const params = regularFunctionMatch[1];
    const body = regularFunctionMatch[2];
    return new Function(params, body);
  }

  throw new Error("Unsupported function format");
}

/**
 * 用于序列化，事件转换为字符串
 */
Konva.Node.prototype.toObject = (function (toObject) {
  return function (this: Konva.Node) {
    const obj = toObject.apply(this) as any;
    for (const eventName in this.eventListeners) {
      this.eventListeners[eventName].forEach((evt) => {
        if (!evt.name.includes("konva")) {
          if (!obj["on"]) {
            obj["on"] = {};
          }
          if (!obj["on"][eventName]) {
            obj["on"][eventName] = [];
          }
          obj["on"][eventName].push({
            name: evt.name,
            handler: evt.handler.toString(),
          });
        }
      });
    }
    return obj;
  };
})(Konva.Node.prototype.toObject);

/**
 * 用于从数据提取事件
 */
Konva.Node._createNode = (function (createNode) {
  return function (this: any, obj: any, ...args: any[]) {
    const node = createNode.call(this, obj, ...args);
    if (obj["on"]) {
      for (const evt in obj["on"]) {
        const arr = obj["on"][evt];
        arr.forEach((item: any) => {
          node.on(
            evt + (item.name ? "." + item.name : ""),
            str2func(item.handler)
          );
        });
      }
    }
    return node;
  };
})(Konva.Node._createNode);

export const KonvaSerializer = {
  parse(content: string | object) {
    return Konva.Stage.create(content, "container");
  },
  stringify(stage: Konva.Stage) {
    return stage.toJSON();
  },
};
