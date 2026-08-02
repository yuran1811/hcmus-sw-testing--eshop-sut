# Bug index & evidence — U-001

**Phiên bản:** 1.1 — 02/08/2026
**Scope:** usability findings F01–F12

## Mục lục

- [Quy ước](#quy-ước)
- [Bug index](#bug-index)
- [Finding evidence](#finding-evidence)
- [Recording manifest](#recording-manifest)
- [Findings không tạo bug](#findings-không-tạo-bug)
- [Gate trước khi file Issue](#gate-trước-khi-file-issue)
- [Workflow](#workflow)

## Quy ước

- Bug usability nằm trong `tests/bug-reports/usability/U-001/`; bug GUI tái sử dụng được link trực tiếp.
- Một defect = một folder = một file Markdown; evidence nằm cùng folder hoặc được link từ bug file.
- Finding ID (`F01`…`F12`) là source ID; bug phải trỏ ngược về finding và ngược lại.
- Bug Home đã tồn tại từ Task 1 được tái sử dụng nếu cùng defect — không tạo duplicate.
- `Severity` mô tả impact; `Priority` mô tả độ khẩn cấp. `Found by Test Case` ghi `Fxx (Sessions: ...)`.
- Không có GitHub Issue nào được tạo trong lần tổng hợp này.

## Bug index

| BUG-ID                                                                                                | Source                  | Sessions                | Severity | Priority | Status          | GitHub Issue |
| ----------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------- | -------- | -------- | --------------- | ------------ |
| [BUG-AUTH-F01](../../../bug-reports/usability/U-001/BUG-AUTH-F01/BUG-AUTH-F01.md)                     | F01                     | P01–P07                 | Blocker  | P0       | New             | Not filed    |
| [BUG-AUTH-F02](../../../bug-reports/usability/U-001/BUG-AUTH-F02/BUG-AUTH-F02.md)                     | F02                     | P01, P02, P04, P05, P06 | Major    | P1       | New             | Not filed    |
| [BUG-AUTH-F03](../../../bug-reports/usability/U-001/BUG-AUTH-F03/BUG-AUTH-F03.md)                     | F03                     | P01, P03, P05           | Major    | P1       | New             | Not filed    |
| [BUG-HOME-GUI-IA03-022](../../../bug-reports/gui/home/BUG-HOME-GUI-IA03-022/BUG-HOME-GUI-IA03-022.md) | F04 + HOME-GUI-IA03-022 | P01–P06                 | Major    | P1       | New — retriaged | Not filed    |
| [BUG-CHECKOUT-F05](../../../bug-reports/usability/U-001/BUG-CHECKOUT-F05/BUG-CHECKOUT-F05.md)         | F05                     | P01, P02, P03, P05, P06 | Blocker  | P0       | New             | Not filed    |
| [BUG-CHECKOUT-F06](../../../bug-reports/usability/U-001/BUG-CHECKOUT-F06/BUG-CHECKOUT-F06.md)         | F06                     | P02, P04                | Major    | P1       | New             | Not filed    |
| [BUG-CART-F07](../../../bug-reports/usability/U-001/BUG-CART-F07/BUG-CART-F07.md)                     | F07                     | P05, P07                | Major    | P1       | New             | Not filed    |
| [BUG-CART-F08](../../../bug-reports/usability/U-001/BUG-CART-F08/BUG-CART-F08.md)                     | F08                     | P02                     | Major    | P2       | New             | Not filed    |
| [BUG-CART-F09](../../../bug-reports/usability/U-001/BUG-CART-F09/BUG-CART-F09.md)                     | F09                     | P02, P03                | Major    | P2       | New             | Not filed    |
| [BUG-HOME-GUI-IA04-031](../../../bug-reports/gui/home/BUG-HOME-GUI-IA04-031/BUG-HOME-GUI-IA04-031.md) | F10 + HOME-GUI-IA04-031 | P03, P04, P06           | Major    | P2       | New             | Not filed    |
| [BUG-HOME-GUI-IA04-044](../../../bug-reports/gui/home/BUG-HOME-GUI-IA04-044/BUG-HOME-GUI-IA04-044.md) | F10 + HOME-GUI-IA04-044 | P03, P04, P06           | Major    | P1       | New             | Not filed    |

## Finding evidence

| Finding | Session note/timestamp                                                                                                                                                                                                                                                                        |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F01     | [P01](../3_sessions/P01.md) 01:39–02:52; [P02](../3_sessions/P02.md) 02:28–03:13; [P03](../3_sessions/P03.md) 01:41–02:42; [P04](../3_sessions/P04.md) 01:55–02:23; [P05](../3_sessions/P05.md) 03:52–04:16; [P06](../3_sessions/P06.md) 01:16–01:38; [P07](../3_sessions/P07.md) 01:07–01:41 |
| F02     | P01 03:37; P02 01:24; P04 03:02; P05 03:15; P06 02:22                                                                                                                                                                                                                                         |
| F03     | P01 01:03; P03 01:02; P05 02:56, 03:21, 05:15                                                                                                                                                                                                                                                 |
| F04     | P01 00:27–00:33; P02 00:21; P03 00:51; P04 03:18; P05 OQ-04; P06 03:02–03:28                                                                                                                                                                                                                  |
| F05     | P01 04:56; P02 06:20; P03 03:59; P05 06:55; P06 03:56                                                                                                                                                                                                                                         |
| F06     | P02 05:13–05:32; P04 04:35                                                                                                                                                                                                                                                                    |
| F07     | P05 01:50; P07 04:18                                                                                                                                                                                                                                                                          |
| F08     | P02 03:34                                                                                                                                                                                                                                                                                     |
| F09     | P02 00:44; P03 OQ-01                                                                                                                                                                                                                                                                          |
| F10     | P03 00:21; P04 00:15; P06 02:44                                                                                                                                                                                                                                                               |
| F11     | P04 03:53–04:07                                                                                                                                                                                                                                                                               |
| F12     | P07 05:18                                                                                                                                                                                                                                                                                     |

`OQ` nghĩa là evidence nằm trong câu trả lời mở và không có timestamp riêng. Mỗi bug file chứa representative video links; bảng dưới giữ manifest đầy đủ của 7 recording.

## Recording manifest

| Session | Recording                                                                                        | Note check                           |
| ------- | ------------------------------------------------------------------------------------------------ | ------------------------------------ |
| P01     | [P01.mp4](https://drive.google.com/file/d/1zkPgCgSC0gVMEPaQh-E1dnG0fnSfbuNj/view?usp=drive_link) | Opened, redacted, completed same day |
| P02     | [P02.mp4](https://drive.google.com/file/d/1UnZxGGsmdV04Kp1MBT1dl3RqPO1Z3t8U/view?usp=sharing)    | Opened, redacted, completed same day |
| P03     | [P03.mp4](https://drive.google.com/file/d/1L7tNC4hNkCoVrxLtaviXIa-3WBs_3znn/view?usp=drive_link) | Opened, redacted, completed same day |
| P04     | [P04.mp4](https://drive.google.com/file/d/1Wy3gdWqb1sOhwFKaxgG_JJm6SnXKKjI-/view?usp=drive_link) | Opened, redacted, completed same day |
| P05     | [P05.mp4](https://drive.google.com/file/d/1cBgjcD05Xyzq2sC3j2L85z_iyfAwLI5h/view?usp=drive_link) | Opened, redacted, completed same day |
| P06     | [P06.mp4](https://drive.google.com/file/d/1Wz8BLp15dhaxPXwhJElNxajRZD6ea_Wy/view?usp=sharing)    | Opened, redacted, completed same day |
| P07     | [P07.mp4](https://drive.google.com/file/d/1m_XPwGj0JsTt6yPhziYBINCvaFliqJN3/view?usp=sharing)    | Opened, redacted, completed same day |

## Findings không tạo bug

| Finding | Decision                                                                 |
| ------- | ------------------------------------------------------------------------ |
| F11     | Giữ trong report; cần retest để xác định flow defect hay kỳ vọng one-off |
| F12     | Product feedback; không có requirement về số phương thức thanh toán      |

## Workflow

`Draft → New → Triaged → Assigned → In Progress → Ready for Retest → Verified/Closed`

Không đưa bug `Draft` vào `In Progress`. Không đóng bug nếu chưa retest.
