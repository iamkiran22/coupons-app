export const CouponTypesOptions = [
  {
    value: "100000003",
    label: "Coupon 1",
  },
  {
    value: "100000000",
    label: "Coupon 2",
  },
];

export const StatusOptions = [
  {
    value: "ACTIVE",
    label: "Active",
  },
  {
    value: "EXPIRED",
    label: "Expired",
  },
  {
    value: "DELETED",
    label: "Deleted",
  },
];

export const DurationTypesOptions = [
  {
    value: "FOREVER",
    label: "Forever",
  },
  {
    value: "ONE_TIME",
    label: "One Time",
  },
  {
    value: "LIMITED_PERIOD",
    label: "Limited Period",
  },
];

export const DiscountTypesOptions = [
  {
    value: "PERCENTAGE",
    label: "Percentage",
  },
  {
    value: "FIXED",
    label: "Fixed",
  },
];

export const CurrencyOptions = [
  {
    value: "EUR",
    label: "EUR",
  },
  {
    value: "INR",
    label: "INR",
  },
  {
    value: "USD",
    label: "USD",
  },
];

export const CaseTypesOptions = [
  {
    value: "plan_id",
    label: "Plan",
    type: "String",
    component: "Textbox",
  },
  {
    value: "plan_qty",
    label: "User License",
    type: "Int",
    component: "Number",
  },
  {
    value: "is_referred",
    label: "Is Referred?",
    type: "Boolean",
    component: "Select",
  },
  {
    value: "workflow_addon_qty",
    label: "Workflow Addon Qty",
    type: "Int",
    component: "Number",
  },
  {
    value: "cpq_addon_qty",
    label: "CPQ Addon Qty",
    type: "Int",
    component: "Number",
  },
  {
    value: "muv_addon_qty",
    label: "MUV Addon Qty",
    type: "Int",
    component: "Number",
  },
  {
    value: "ipaddress_addon_qty",
    label: "Dedicated IP Address Qty",
    type: "Int",
    component: "Number",
  },
  {
    value: "emailcontacts_addon_qty",
    label: "Email Contacts Qty",
    type: "Int",
    component: "Number",
  },
];

export const OperatorOptions = [
  {
    value: "&&",
    label: "AND",
  },
  {
    value: "||",
    label: "OR",
  },
];

export const CaseOperatorOptions = [
  {
    value: "==",
    label: "Equals To",
    type: ["String", "Boolean"],
  },
  {
    value: ">",
    label: "Greater Than",
    type: ["Int"],
  },
  {
    value: "<",
    label: "Lesser Than",
    type: ["Int"],
  },
  {
    value: ">=",
    label: "Greater Than And Equal",
    type: ["Int"],
  },
  {
    value: "<=",
    label: "Lesser Than And Equal",
    type: ["Int"],
  },
];

export const BooleanOptions = [
  {
    value: "true",
    label: "YES",
  },
  {
    value: "false",
    label: "NO",
  },
];
