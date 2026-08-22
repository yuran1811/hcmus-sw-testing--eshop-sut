# TC-CANCEL-038: Kiểm định JSON Schema cho phản hồi lỗi 404 Not Found (Contract Testing)

## Requirement ID
FR-10 / API Contract

## Module / Test type / Technique
Order Cancel / Contract Testing / Error JSON Schema Validation

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- ID đơn hàng không tồn tại
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/999999/cancel |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 999999 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/999999/cancel`
2. Đính kèm header `X-Student-Id: 23127148`
3. Kiểm tra JSON Schema của phản hồi lỗi 404

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["error"],
  "properties": {
    "error": {
      "type": "string"
    }
  },
  "additionalProperties": false
}
```

## Expected result
Mã trạng thái HTTP 404 Not Found. Response body chứa trường `error` kiểu chuỗi có giá trị `"Order not found"`.

## Status / Related bugs
Not Run / None
