import React, { useEffect } from "react";
import { Table, Tag, Space, Spin, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  approveCoupon,
  getCoupons,
  rejectCoupon,
} from "../../reducers/coupon-reducer";

const columns = [
  {
    title: "Name",
    dataIndex: "coupon_name",
    key: "coupon_name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Duration Type",
    dataIndex: "duration_type",
    key: "duration_type",
  },
  {
    title: "Discount Type",
    dataIndex: "discount_type",
    key: "discount_type",
  },
  {
    title: "Discount Percentage",
    dataIndex: "discount_percentage",
    key: "discount_percentage",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (text: string, record: Record<string, any>) => {
      if (record.status === "PENDING_APPROVAL") {
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

export const CouponTable: React.FC = () => {
  const {
    coupons: data,
    loading,
    additionalLoader,
  } = useSelector((state: RootState) => state.coupon);
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginState.loggedIn) {
      dispatch(getCoupons(null));
    }
  }, [loginState]);

  useEffect(() => {
    if (additionalLoader) {
      dispatch(getCoupons(null));
    }
  }, [additionalLoader]);

  const callback = (id: string, record: Record<string, any>) => {
    const ids = ["approve", "reject"];
    if (ids.includes(id)) {
      const func = id === "approve" ? approveCoupon : rejectCoupon;
      dispatch(func(record.id));
    }
  };

  return (
    <>
      {!loading ? (
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
      )}
    </>
  );
};
