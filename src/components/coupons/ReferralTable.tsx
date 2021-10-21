import React, { useEffect } from "react";
import { Table, Space, Spin, Button, message } from "antd";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  approveCoupon,
  getCoupons,
  getCouponsTypes,
  rejectCoupon,
} from "../../reducers/coupon-reducer";
import { getReferrals } from "../../reducers/referral-reducer";

const columns = [
  {
    title: "Referral State",
    dataIndex: "referral_state",
    key: "referral_state",
  },
  {
    title: "Referral Code",
    dataIndex: "referral_code",
    key: "referral_code",
  },
  {
    title: "Lead Email",
    dataIndex: "lead_email",
    key: "lead_email",
  },
  {
    title: "Lead Customer ID",
    dataIndex: "lead_customer_id",
    key: "lead_customer_id",
  },
  {
    title: "Referrer Billing Customer ID",
    dataIndex: "referrer_billing_customer_id",
    key: "referrer_billing_customer_id",
  },
  {
    title: "Referrer Rewarded",
    dataIndex: "referrer_rewarded",
    key: "referrer_rewarded",
  },
];

export const ReferralTable: React.FC = () => {
  const { referrals, loading } = useSelector(
    (state: RootState) => state.referral
  );

  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginState.loggedIn) {
      dispatch(getReferrals(null))
        .unwrap()
        .then((res: any) => {
          message.success("Fetched all referred successfully");
        })
        .catch((e: any) => {
          message.error(e?.error?.message || "Fetching referrals failed");
        });
    }
  }, [loginState]);

  return (
    <>
      {!loading ? (
        <Table
          columns={columns}
          dataSource={referrals}
          pagination={{ position: ["topLeft", "bottomRight"] }}
        />
      ) : (
        <Spin
          tip="&nbsp;&nbsp;Fetching Referrals..."
          style={{ justifyContent: "center", display: "flex" }}
        />
      )}
    </>
  );
};
