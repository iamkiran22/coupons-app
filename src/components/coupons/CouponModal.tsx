import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  InputNumber,
  Form,
  Input,
  DatePicker,
  Space,
  Select,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./Coupons.scss";
import {
  BooleanOptions,
  CaseOperatorOptions,
  CaseTypesOptions,
  CouponTypesOptions,
  CurrencyOptions,
  DiscountTypesOptions,
  DurationTypesOptions,
  OperatorOptions,
  StatusOptions,
} from "../../constants/coupon-constants";
import { useDispatch } from "react-redux";
import CouponSerializer from "../../serializers/coupon-serializer";
import { createCoupon } from "../../reducers/coupon-reducer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type RequiredMark = boolean | "optional";
const { Option } = Select;

const dateFormat = "YYYY/MM/DD";

export const CouponModal: React.FC<{
  show: boolean;
  displayModal: (bool: boolean) => void;
}> = ({ show, displayModal }) => {
  const [isModalVisible, setIsModalVisible] = useState(show);
  const dispatch: any = useDispatch();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [caseOperatorOptionsObj, setCaseOperatorOptions] = useState({} as any);
  const [caseComponentsObj, setCaseComponentsOptions] = useState({} as any);
  const couponTypes = useSelector(
    (state: RootState) => state.coupon.couponTypes
  );

  const [form] = Form.useForm();
  const [dealType, setDealType] = useState("");
  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>("optional");

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  useEffect(() => {
    setIsModalVisible(show);
  }, [show]);

  const addNewCoupon = async (formData: any) => {
    const payload = CouponSerializer.requestPayload(formData);
    try {
      await dispatch(createCoupon(payload)).unwrap();
      message.success("Coupon created successfully");
      displayModal(false);
      setConfirmLoading(false);
    } catch (e: any) {
      message.error(e?.error?.message || "Please try back later");
      setConfirmLoading(false);
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addNewCoupon(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    displayModal(false);
  };

  const dealTypeCallback = (): void => {
    setDealType(form.getFieldValue("discount_type"));
  };

  const setCaseOptions = (option: any, key: number) => {
    caseOperatorOptionsObj[key] = CaseOperatorOptions.filter((v) =>
      v.type.includes(option.type)
    );
    caseComponentsObj[key] = option.component;
    setCaseOperatorOptions({ ...caseOperatorOptionsObj });
    setCaseComponentsOptions({ ...caseComponentsObj });
    const values = form.getFieldsValue();
    values["rules"][key] = { ...values["rules"][key], operator: "", value: "" };
    form.setFieldsValue({ ...values });
  };

  return (
    <Modal
      title="Create Coupon"
      visible={isModalVisible}
      width={800}
      okText="Create"
      cancelText="Cancel"
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{ requiredMarkValue: requiredMark }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        <Form.Item
          name="coupon_name"
          label="Name"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please enter a coupon name" }]}
        >
          <Input style={{ width: 200 }} placeholder="Name" />
        </Form.Item>

        <Form.Item
          required
          name="description"
          label="Description"
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input style={{ width: 200 }} placeholder="Description" />
        </Form.Item>

        <Form.Item
          name="coupon_type_id"
          label="Coupon Type"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please select a coupon type" }]}
        >
          <Select placeholder="Coupon Type" style={{ width: 200 }}>
            {couponTypes.map((item: any) => (
              <Option key={item.id} value={item.id} label={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="valid_from"
          label="Valid From"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please select valid from" }]}
        >
          <Space direction="vertical" size={12}>
            <DatePicker
              format={dateFormat}
              onChange={(ev: any) => {
                const dateStr = ev.format(dateFormat);
                const values = { ...form.getFieldsValue() };
                values["valid_from"] = dateStr;
                form.setFieldsValue({ ...values });
              }}
            />
          </Space>
        </Form.Item>

        <Form.Item name="valid_until" label="Valid Until">
          <Space direction="vertical" size={12}>
            <DatePicker
              format={dateFormat}
              onChange={(ev: any) => {
                const dateStr = ev.format(dateFormat);
                const values = { ...form.getFieldsValue() };
                values["valid_until"] = dateStr;
                form.setFieldsValue({ ...values });
              }}
            />
          </Space>
        </Form.Item>

        {/* <Form.Item
          name="status"
          label="Status"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select
            options={[...StatusOptions]}
            // defaultValue={"ACTIVE"}
            placeholder="Status"
            style={{ width: 200 }}
          ></Select>
        </Form.Item> */}

        <Form.Item
          name="duration_type"
          label="Duration Type"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please select duration type" }]}
        >
          <Select
            options={[...DurationTypesOptions]}
            placeholder="Duration Type"
            style={{ width: 200 }}
          ></Select>
        </Form.Item>

        <Form.Item
          label="Discount Type"
          name="discount_type"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: "Please select discount type" }]}
        >
          <Select
            options={[...DiscountTypesOptions]}
            placeholder="Discount Type"
            style={{ width: 200 }}
            onChange={(ev: any) => dealTypeCallback()}
          ></Select>
        </Form.Item>

        {dealType === "PERCENTAGE" && (
          <Form.Item
            name="discount_percentage"
            label="Discount Percentage"
            required
            tooltip="This is a required field"
            rules={[
              { required: true, message: "Please input discount percentage" },
            ]}
          >
            <InputNumber
              style={{ width: 200 }}
              placeholder="Discount Percentage"
            />
          </Form.Item>
        )}

        {dealType === "FIXED" && (
          <Form.Item
            label="Discount Amount"
            required
            tooltip="This is a required field"
          >
            <Form.Item
              name="currency_code"
              style={{ display: "inline-block", width: "calc(20% - 8px)" }}
              required
              rules={[{ required: true, message: "Please select currency" }]}
            >
              <Select
                options={[...CurrencyOptions]}
                placeholder="CUR"
                style={{ width: 100 }}
              ></Select>
            </Form.Item>
            <Form.Item
              name="discount_amount"
              style={{ display: "inline-block", width: "calc(10% - 8px)" }}
              rules={[
                { required: true, message: "Please input discount amount" },
              ]}
              required
            >
              <InputNumber
                style={{ width: 200 }}
                placeholder="Discount Amount"
              />
            </Form.Item>
          </Form.Item>
        )}

        <Form.Item name="applicable_brand_id" label="Current Product">
          <Input
            style={{ width: 200 }}
            placeholder="Current Product"
            disabled
          />
        </Form.Item>

        <Form.Item name="applicable_plan_id" label="Current Plan">
          <Input style={{ width: 200 }} placeholder="Current Plan" disabled />
        </Form.Item>

        <Form.Item
          name="applicable_subscription_id"
          label="Customer's Subscription ID"
        >
          <Input
            style={{ width: 200 }}
            placeholder="Customer's Subscription ID"
            disabled
          />
        </Form.Item>

        <Form.List name="rules">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "type"]}
                    fieldKey={[fieldKey, "type"]}
                    rules={[{ required: true, message: "Missing Type" }]}
                  >
                    <Select
                      options={[...CaseTypesOptions]}
                      onChange={(ev: string, option) =>
                        setCaseOptions(option, key)
                      }
                      style={{ width: 150 }}
                    ></Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "operator"]}
                    fieldKey={[fieldKey, "operator"]}
                    rules={[{ required: true, message: "Missing Operator" }]}
                  >
                    <Select
                      options={
                        caseOperatorOptionsObj[key]
                          ? [...caseOperatorOptionsObj[key]]
                          : []
                      }
                      style={{ width: 150 }}
                    ></Select>
                  </Form.Item>
                  {caseComponentsObj[key] === "Textbox" && (
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      fieldKey={[fieldKey, "value"]}
                      rules={[{ required: true, message: "Missing Value" }]}
                    >
                      <Input style={{ width: 150 }} />
                    </Form.Item>
                  )}

                  {caseComponentsObj[key] === "Number" && (
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      fieldKey={[fieldKey, "value"]}
                      rules={[{ required: true, message: "Missing Value" }]}
                    >
                      <InputNumber style={{ width: 150 }} />
                    </Form.Item>
                  )}

                  {caseComponentsObj[key] === "Select" && (
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      fieldKey={[fieldKey, "value"]}
                      rules={[{ required: true, message: "Missing Value" }]}
                    >
                      <Select
                        options={[...BooleanOptions]}
                        style={{ width: 150 }}
                      ></Select>
                    </Form.Item>
                  )}

                  {form.getFieldValue("rules").length > 1 &&
                    key !== form.getFieldValue("rules").length - 1 && (
                      <Form.Item
                        name={[name, "logical_operator"]}
                        fieldKey={[fieldKey, "logical_operator"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing Logical AND/OR Operator",
                          },
                        ]}
                      >
                        <Select
                          options={[...OperatorOptions]}
                          style={{ width: 150 }}
                        ></Select>
                      </Form.Item>
                    )}
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Rule
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
