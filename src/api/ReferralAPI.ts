import Axios from "../utils/Axios";
import URLHelper from "./URLHelper";

const { hostName } = URLHelper;

const baseURL = `${hostName}/coupon/referrals`;

const ReferralAPI = {
  getReferrals: async () => {
    // return await Axios.get(baseURL);
    return Promise.resolve({ data: mock.slice() });
  },
};

export default ReferralAPI;

const mock = [
  {
    referral_state: "LEAD_CUSTOMER_PURCHASED",
    referral_code: "AP027079",
    lead_email: "sriram.saranathan+d2@freshworks.com",
    referrer_billing_customer_id: "345627_IN",
    lead_customer_id: "656542_IN",
    created_at: "2021-10-19T12:07:07.079+0000",
    referrer_rewarded: true,
  },
  {
    referral_state: "LEAD_CONTACTED",
    referral_code: "EC012484",
    lead_email: "sriram.saranathan+d56@freshworks.com",
    referrer_billing_customer_id: "345627_IN",
    lead_customer_id: null,
    created_at: "2021-10-21T11:55:12.481+0000",
    referrer_rewarded: false,
  },
  {
    referral_state: "LEAD_CONTACTED",
    referral_code: "YA010830",
    lead_email: "sriram.saranathan+d1@freshworks.com",
    referrer_billing_customer_id: "345627_IN",
    lead_customer_id: null,
    created_at: "2021-10-19T12:03:50.828+0000",
    referrer_rewarded: false,
  },
];
