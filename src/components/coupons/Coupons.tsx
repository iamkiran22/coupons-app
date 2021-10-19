import React, { useState } from "react";
import { Tabs, Button, Select } from "antd";
import "./Coupons.scss";
import { CouponModal } from "./CouponModal";
import CouponSerializer from "../../serializers/coupon-serializer";

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

export const Coupons: React.FC<any> = () => {
  return (
    <div className="coupons-container">
      <Tabs
        defaultActiveKey="1"
        className="tab-class"
        onChange={(ev) => console.log("Switch Tabs", ev)}
      >
        {TabMenus.map((tab) => (
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

const CouponsMenuContent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (bool: boolean) => {
    setIsModalVisible(bool);
  };

  const addNewCoupon = (formData: any) => {
    const payload = CouponSerializer.requestPayload(formData);
    console.log("DISPATCH", payload);
  };

  return (
    <div className="coupons-menu">
      <div className="create-button">
        <Button type="primary" onClick={() => showModal(true)}>
          Create Coupons
        </Button>
        <CouponModal
          show={isModalVisible}
          displayModal={showModal}
          callback={addNewCoupon}
        />
      </div>
    </div>
  );
};

const ReferralsMenuContent: React.FC = () => {
  return <div className="referrals-menu">Referral Content</div>;
};

const SubscriptionsMenuContent: React.FC = () => {
  return <div className="subscription-menu">Subscription content</div>;
};
