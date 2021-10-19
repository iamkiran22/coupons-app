import React from "react";
import { Tabs, Select } from "antd";
import "./Rules.scss";
import { InfoCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const { Option } = Select;

const TabMenus = [
  {
    key: "conditions",
    label: "Conditions",
    component: () => <ConditionMenu />,
  },
  {
    key: "advanced",
    label: "Advanced",
    component: () => <h1> Advanced</h1>,
  },
  {
    key: "parameters",
    label: "Parameters",
    component: () => <h1> Parameters</h1>,
  },
  {
    key: "pages",
    label: "Pages & Classes",
    component: () => <h1> Pages & Classes</h1>,
  },
  {
    key: "specifications",
    label: "Specifications",
    component: () => <h1> Specifications</h1>,
  },
  {
    key: "history",
    label: "History",
    component: () => <h1> History</h1>,
  },
];

export const Rules: React.FC<any> = () => {
  return (
    <div className="add-rule">
      <Tabs
        defaultActiveKey="1"
        className="tab-class"
        onChange={(ev) => console.log("Switch Tabs", ev)}
      >
        {TabMenus.map((tab, index) => (
          <TabPane tab={tab.label} key={tab.key}>
            <div className="tab-content">
              <tab.component></tab.component>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

const ConditionMenu: React.FC<any> = ({}) => {
  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }
  return (
    <section className="condition-menu">
      <div className="header">
        <span className="title">
          Set conditions <InfoCircleOutlined />
        </span>
        <Select
          defaultValue="ands"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="ands">Groups ANDs</Option>
          <Option value="ors">Groups ORs</Option>
          <Option value="nots" disabled>
            Groups NOTs
          </Option>
        </Select>
      </div>
    </section>
  );
};
