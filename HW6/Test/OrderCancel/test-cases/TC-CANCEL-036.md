# TC-CANCEL-036: Kiểm định JSON Schema cho phản hồi 200 OK thành công (Contract Testing)

## Requirement ID
FR-10 / API Contract

## Module / Test type / Technique
Order Cancel / Contract Testing / JSON Schema Validation (Draft-07)

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đơn hàng tồn tại ở trạng thái `pending` và thuộc quyền sở hữu của user
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/1/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Xác minh cấu trúc response body khớp 100% với JSON Schema quy định

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["message"],
  "properties": {
    "message": {
      "type": "string",
      "enum": ["Order canceled successfully"]
    }
  },
  "additionalProperties": false
}
```

## Expected result
Mã trạng thái HTTP 200 OK. Response body tuân thủ tuyệt đối JSON Schema Draft-07: thuộc tính `message` bắt buộc kiểu chuỗi `Order canceled successfully`, không chứa trường dư thừa.

## Status / Related bugs
Not Run / None
