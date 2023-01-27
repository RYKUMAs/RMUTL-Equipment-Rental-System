import axios from "axios";

export async function load({ params }) {
  let res = await axios.get("http://127.0.0.1:5000/api/equipment");

  let { data } = res.data;

  return {
    equipment: data,
  };
}
