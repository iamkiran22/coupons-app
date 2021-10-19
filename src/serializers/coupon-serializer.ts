import moment from "moment";

const Serializer = () => {
  const setRuleExpression = (objArr: Array<{ [key: string]: any }>) => {
    let expression = "";
    let booleanStrings = ["true", "false"];
    const encodeInQuotes = (value: string | number | boolean) => {
      if (typeof value === "string" && !booleanStrings.includes(value)) {
        return '"' + value + '"';
      }
      return value;
    };
    objArr.forEach((obj) => {
      expression = `${expression} ${obj.type}${obj.operator}${encodeInQuotes(
        obj.value
      )} ${obj.logical_operator || ""}`;
    });
    return expression.trim();
  };

  const requestPayload = (data: { [key: string]: any }) => {
    const payload: { [key: string]: any } = { has_rule: false };
    for (let [key, value] of Object.entries(data)) {
      if (value) {
        if (key === "rules" && value.length) {
          payload["rule_expr"] = setRuleExpression(value);
          payload["has_rule"] = true;
        } else if (["valid_from", "valid_until"].includes(key)) {
          payload[key] = moment(value).toISOString();
        } else {
          payload[key] = value;
        }
      }
    }
    return payload;
  };
  return {
    requestPayload,
  };
};

const CouponSerializer = Object.freeze(Serializer());
export default CouponSerializer;
