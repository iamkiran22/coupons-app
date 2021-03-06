import React, { useState } from "react";
import { Tabs, Button, Select } from "antd";
import "./Coupons.scss";
import { CouponModal } from "./CouponModal";
import CouponSerializer from "../../serializers/coupon-serializer";
import { useDispatch } from "react-redux";
import { createCoupon } from "../../reducers/coupon-reducer";
import { CouponTable } from "./CouponTable";
import { ReferralTable } from "./ReferralTable";

type RequiredMark = boolean | "optional";

const { TabPane } = Tabs;
const { Option } = Select;

const TabMenus = [
  {
    key: "coupons",
    label: "Coupons",
    component: () => <CouponsMenuContent />,
  },
  {
    key: "referrals",
    label: "Referrals",
    component: () => <ReferralsMenuContent />,
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    component: () => <SubscriptionsMenuContent />,
  },
];

export const Host: React.FC<any> = () => {
  return (
    <div className="coupons-container">
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey="1"
        className="tab-class"
        onChange={(ev) => console.log("Switch Tabs", ev)}
      >
        {TabMenus.map((tab) => (
          <TabPane tab={tab.label} key={tab.key}>
            <div className="tab-content">
              <tab.component key={tab.key}></tab.component>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

const CouponsMenuContent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (bool: boolean) => {
    setIsModalVisible(bool);
  };

  return (
    <div className="coupons-menu">
      <div className="create-button">
        <Button type="primary" onClick={() => showModal(true)}>
          Create Coupons
        </Button>
        <CouponModal show={isModalVisible} displayModal={showModal} />
      </div>
      <div className="coupon-table">
        <CouponTable />
      </div>
    </div>
  );
};

const ReferralsMenuContent: React.FC = () => {
  return (
    <div className="referrals-menu">
      <ReferralTable />
    </div>
  );
};

const SubscriptionsMenuContent: React.FC = () => {
  return <div className="subscription-menu">Subscription content</div>;
};
