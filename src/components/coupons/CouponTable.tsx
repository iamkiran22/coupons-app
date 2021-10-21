import React, { useEffect } from "react";
import { Table, Tag, Space, Spin, Button, message } from "antd";
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
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
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

export const CouponTable: React.FC = () => {
  const {
    coupons: data,
    loading,
    // additionalLoader,
  } = useSelector((state: RootState) => state.coupon);
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginState.loggedIn) {
      dispatch(getCoupons(null))
        .unwrap()
        .then((res: any) => {
          message.success("Fetched all coupons successfully");
        })
        .catch((e: any) => {
          message.error(e?.error?.message || "Fetching coupons failed");
        });
      //Fetch coupon types once
      dispatch(getCouponsTypes(null));
    }
  }, [loginState]);

  const callback = async (id: string, record: Record<string, any>) => {
    const ids = ["approve", "reject"];
    const msg: any = {
      approve: "approved",
      reject: "rejected",
    };
    if (ids.includes(id)) {
      const func = id === "approve" ? approveCoupon : rejectCoupon;
      try {
        await dispatch(func(record.id)).unwrap();
        message.success(`Your coupon has been ${msg["id"]}!`);
        dispatch(getCoupons(null));
      } catch (error: any) {
        message.error(error);
      }
      // .then((res) => {
      //   message.success(`Your coupon has been ${msg["id"]}!`);
      //   dispatch(getCoupons(null));
      // })
      // .catch((e: any) => {
      //   message.error(e);
      // });
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
