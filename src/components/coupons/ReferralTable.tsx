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
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (text: string, record: Record<string, any>) => {
      const role = localStorage.getItem("role");
      if (record.status === "PENDING_APPROVAL" && role === "admin") {
        return (
          <Space size="middle">
            <span>{text}</span>
            <Button id="approve">Approve</Button>
            <Button id="reject" type="primary" danger>
              Reject
            </Button>
          </Space>
        );
      }
      return <span>{text}</span>;
    },
  },
];

export const ReferralTable: React.FC = () => {
  //   const {
  //     referrals,
  //     loading,
  //   } = useSelector((state: RootState) => state.coupon);
  //   const loginState = useSelector((state: RootState) => state.login);
  //   const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     if (loginState.loggedIn) {
  //       dispatch(getReferrals(null))
  //         .unwrap()
  //         .then((res: any) => {
  //           message.success("Fetched all coupons successfully");
  //         })
  //         .catch((e: any) => {
  //           message.error(e?.error?.message || "Fetching coupons failed");
  //         });
  //       //Fetch coupon types once
  //       dispatch(getCouponsTypes(null));
  //     }
  //   }, [loginState]);

  //   const callback = async (id: string, record: Record<string, any>) => {
  //     const ids = ["approve", "reject"];
  //     const msg: any = {
  //       approve: "approved",
  //       reject: "rejected",
  //     };
  //     if (ids.includes(id)) {
  //       const func = id === "approve" ? approveCoupon : rejectCoupon;
  //       try {
  //         await dispatch(func(record.id)).unwrap();
  //         message.success(`Your coupon has been ${msg["id"]}!`);
  //         dispatch(getCoupons(null));
  //       } catch (error: any) {
  //         message.error(error);
  //       }
  //       // .then((res) => {
  //       //   message.success(`Your coupon has been ${msg["id"]}!`);
  //       //   dispatch(getCoupons(null));
  //       // })
  //       // .catch((e: any) => {
  //       //   message.error(e);
  //       // });
  //     }
  //   };

  return (
    <>
      <h1>Referral Table comes here !!!</h1>
      {/* {!loading ? (
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event: any) => {
                const id = event.target.parentElement.id || event.target.id;
                callback(id, record);
              },
            };
          }}
          columns={columns}
          dataSource={data}
          pagination={{ position: ["topLeft", "bottomRight"] }}
        />
      ) : (
        <Spin
          tip="&nbsp;&nbsp;Fetching Coupons..."
          style={{ justifyContent: "center", display: "flex" }}
        />
      )} */}
    </>
  );
};
