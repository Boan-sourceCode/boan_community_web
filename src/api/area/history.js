import request from "@/utils/requestForGuoWenJun";

export async function getApplymenu() {
  return request({
    url: "ds/applymenu",
    method: "get",
  });
}
export async function getDetail() {
  return request({
    url: "ds/getDetail",
    method: "get",
  });
}
export async function getJ(url) {
  return request({
    url: url,
    method: "get",
  });
}
