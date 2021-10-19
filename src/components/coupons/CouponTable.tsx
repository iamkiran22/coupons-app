import React, { useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { getCoupons } from "../../reducers/coupon-reducer";

const columns = [
  {
    title: "Name",
    dataIndex: "coupon_name",
    key: "coupon_name",
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
  },
  {
    title: "Duration Type",
    key: "duration_type",
    dataIndex: "duration_type",
  },
];

export const CouponTable: React.FC = () => {
  const data = useSelector((state: RootState) => state.coupon.coupons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons(null));
  }, []);
  return <Table columns={columns} dataSource={data} />;
};
