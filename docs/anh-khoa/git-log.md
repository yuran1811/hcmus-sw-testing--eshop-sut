* commit 13099f9fb0f6770f8224355ddb6bf090e284697b
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sun Aug 9 14:23:24 2026 +0700
| 
|     fix: harden rowFor() locator in cart.spec.ts to exact cell match
|     
|     rowFor() used filter({ hasText: name }), a case-insensitive substring
|     match - the same fragile pattern already found and fixed in
|     product.spec.ts's productRow() (TC-PRODUCT-003 matched 5-6 unrelated
|     rows on a 1-char boundary name). cart.json currently only uses long,
|     unique product names so this hasn't caused a real failure yet, but the
|     locator is equally fragile and would break the same way if a short
|     boundary-value product name were ever added. Switched to matching the
|     "San pham" cell exactly via getByRole('cell', { name, exact: true }).
|     
|     Re-ran cart.spec.ts on chromium after the change: still 1 pass / 12
|     fail, identical to the documented baseline - no regression.
| 
|  tests/e2e/specs/cart.spec.ts | 10 +++++++++-
|  1 file changed, 9 insertions(+), 1 deletion(-)
| 
* commit cb0c818867edfa31df5a5abc2552b80949410c19
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 21:19:27 2026 +0700
| 
|     docs: 📖 update self-assessment scores and add demo video link
| 
|  docs/anh-khoa/README.md | 30 +++++++++++++++++++++---------
|  1 file changed, 21 insertions(+), 9 deletions(-)
| 
* commit 4f912a773e38b1f8eb2cd285cd474012ca3c31ed
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 18:21:52 2026 +0700
| 
|     docs: 📖 update test-runs and test-summary
| 
|  tests/test-runs/sprint-1-test-run.md      | 42 +++++++-------
|  tests/test-summary/traceability-matrix.md | 87 ++++++++++++++---------------
|  2 files changed, 63 insertions(+), 66 deletions(-)
| 
* commit f36369f595f3b9760fb49b58b05fa480e6b01eb3
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 18:20:49 2026 +0700
| 
|     docs: 📖 add main report and related docs
| 
|  docs/anh-khoa/README.md            |  68 ++++++++++
|  docs/anh-khoa/ai critique.md       |   7 ++
|  docs/anh-khoa/github-issues(1).png | Bin 0 -> 286908 bytes
|  docs/anh-khoa/github-issues(2).png | Bin 0 -> 289105 bytes
|  docs/anh-khoa/main-report.md       | 238 +++++++++++++++++++++++++++++++++++
|  5 files changed, 313 insertions(+)
| 
* commit 6b00dc95c923741072d745af111c4788a3e16db1
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 15:30:29 2026 +0700
| 
|     docs: 📖 update AI audit report
| 
|  docs/anh-khoa/ai audit report.md | 267 +++++++++++++++++++++++++------------
|  1 file changed, 180 insertions(+), 87 deletions(-)
| 
* commit ce125af5fcc528236e0ab60b1b468dc8898a3b26
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 15:26:03 2026 +0700
| 
|     docs: 📖 fix typo mistakes
| 
|  tests/test-runs/sprint-1-test-run.md | 2 --
|  1 file changed, 2 deletions(-)
| 
* commit a673c1a377fc1a848e143a9b572391675a4d0b7c
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 13:24:59 2026 +0700
| 
|     docs: 📖 update ai audit report
| 
|  docs/anh-khoa/ai audit report.md | 1099 ++++++++++++++++++++++++++++++++++++
|  1 file changed, 1099 insertions(+)
| 
* commit e6e76dd72f3d7070a8a3640e89de7e04bf52745d
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 13:23:52 2026 +0700
| 
|     docs: 📖 add bug reports and related docs
| 
|  tests/bug-reports/cart/BUG-CART-001.md            |  58 ++++++++++++
|  tests/bug-reports/cart/BUG-CART-002.md            |  44 +++++++++
|  tests/bug-reports/cart/BUG-CART-003.md            |  43 +++++++++
|  tests/bug-reports/cart/BUG-CART-004.md            |  45 +++++++++
|  tests/bug-reports/cart/BUG-CART-005.md            |  43 +++++++++
|  tests/bug-reports/cart/BUG-CART-006.md            |  43 +++++++++
|  tests/bug-reports/cart/BUG-CART-007.md            |  51 ++++++++++
|  tests/bug-reports/cart/BUG-CART-008.md            |  44 +++++++++
|  tests/bug-reports/cart/BUG-CART-009.md            |  44 +++++++++
|  tests/bug-reports/cart/BUG-CART-010.md            |  45 +++++++++
|  tests/bug-reports/product/BUG-PRODUCT-001.md      |  50 ++++++++++
|  tests/bug-reports/product/BUG-PRODUCT-002.md      |  44 +++++++++
|  tests/bug-reports/product/BUG-PRODUCT-003.md      |  48 ++++++++++
|  tests/bug-reports/product/BUG-PRODUCT-004.md      |  44 +++++++++
|  tests/bug-reports/product/BUG-PRODUCT-005.md      |  46 +++++++++
|  tests/bug-reports/product/BUG-PRODUCT-006.md      |  54 +++++++++++
|  tests/bug-reports/product/BUG-PRODUCT-007.md      |  43 +++++++++
|  tests/bug-reports/register/BUG-REGISTER-001.md    |  54 +++++++++++
|  tests/bug-reports/register/BUG-REGISTER-002.md    |  44 +++++++++
|  tests/bug-reports/register/BUG-REGISTER-003.md    |  44 +++++++++
|  tests/bug-reports/register/BUG-REGISTER-004.md    |  44 +++++++++
|  tests/bug-reports/register/BUG-REGISTER-005.md    |  44 +++++++++
|  tests/bug-reports/screenshots/BUG-CART-001.png    | Bin 0 -> 16718 bytes
|  tests/bug-reports/screenshots/BUG-CART-002.png    | Bin 0 -> 26336 bytes
|  tests/bug-reports/screenshots/BUG-CART-003.png    | Bin 0 -> 29129 bytes
|  tests/bug-reports/screenshots/BUG-CART-004.png    | Bin 0 -> 23382 bytes
|  tests/bug-reports/screenshots/BUG-CART-005.png    | Bin 0 -> 29129 bytes
|  tests/bug-reports/screenshots/BUG-CART-006.png    | Bin 0 -> 16718 bytes
|  tests/bug-reports/screenshots/BUG-CART-007.png    | Bin 0 -> 23668 bytes
|  tests/bug-reports/screenshots/BUG-CART-008.png    | Bin 0 -> 23202 bytes
|  tests/bug-reports/screenshots/BUG-CART-009.png    | Bin 0 -> 16683 bytes
|  tests/bug-reports/screenshots/BUG-CART-010.png    | Bin 0 -> 27058 bytes
|  tests/bug-reports/screenshots/BUG-PRODUCT-001.png | Bin 0 -> 29824 bytes
|  tests/bug-reports/screenshots/BUG-PRODUCT-002.png | Bin 0 -> 29115 bytes
|  tests/bug-reports/screenshots/BUG-PRODUCT-003.png | Bin 0 -> 43991 bytes
|  tests/bug-reports/screenshots/BUG-PRODUCT-004.png | Bin 0 -> 32989 bytes
|  tests/bug-reports/screenshots/BUG-PRODUCT-005.png | Bin 0 -> 42646 bytes
|  tests/bug-reports/screenshots/BUG-PRODUCT-006.png | Bin 0 -> 59069 bytes
|  tests/bug-reports/screenshots/BUG-PRODUCT-007.png | Bin 0 -> 42646 bytes
|  .../bug-reports/screenshots/BUG-REGISTER-001.png  | Bin 0 -> 32136 bytes
|  .../bug-reports/screenshots/BUG-REGISTER-002.png  | Bin 0 -> 22780 bytes
|  .../bug-reports/screenshots/BUG-REGISTER-003.png  | Bin 0 -> 27248 bytes
|  .../bug-reports/screenshots/BUG-REGISTER-004.png  | Bin 0 -> 29753 bytes
|  .../bug-reports/screenshots/BUG-REGISTER-005.png  | Bin 0 -> 27875 bytes
|  tests/test-runs/sprint-1-test-run.md              |  98 ++++++++++++++++++++
|  tests/test-summary/traceability-matrix.md         |  74 ++++++++++++++-
|  46 files changed, 1188 insertions(+), 3 deletions(-)
| 
* commit 588f85faf9549a017ce0ba0cbc91b1fe1c4299b1
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 13:23:12 2026 +0700
| 
|     test: ✅ add report e2e tests
| 
|  tests/e2e/.gitignore                              |   8 +
|  .../03777a4b86c50ddbaa576340c72caa389c987de7.zip  | Bin 0 -> 513007 bytes
|  .../0b898976ed4b3f758bcc0306025979d8411b9d88.md   | 167 +++++++++
|  .../19a39ada2edf56b9d4ca3857f7a17d39af4ad36a.zip  | Bin 0 -> 307721 bytes
|  .../1fe73bb416e08c871413913d2d08c8ab71116b98.md   | 353 ++++++++++++++++++++
|  .../2a4abef61255372919d8192435035c39b2792ccf.webm | Bin 0 -> 126418 bytes
|  .../2aba03f38401f74a8678ae3950ba39811afc769a.zip  | Bin 0 -> 411963 bytes
|  .../2afdaf8ca4812c065458685f8db76172cbb5da18.zip  | Bin 0 -> 1446647 bytes
|  .../39e4d1fb928bc3e551a0f8d302b79cb75b22d2f7.zip  | Bin 0 -> 456579 bytes
|  .../442840e5c95e6b8da03f08883c9fe0af54014979.zip  | Bin 0 -> 358794 bytes
|  .../45bd27619599b3e934ff6aceb94c6cde3806bb2b.webm | Bin 0 -> 136606 bytes
|  .../50d359626e2747baa627363e3dd9343b5efa4be8.zip  | Bin 0 -> 406418 bytes
|  .../524a83f634545383ffb0cffab6bb77cd84c17a6b.png  | Bin 0 -> 22275 bytes
|  .../55aff6c12b1f9a50db55fa95127d9509a0400e5d.png  | Bin 0 -> 25629 bytes
|  .../5abc752a468805ee1907ac0d37c63e5558b33f57.md   | 249 ++++++++++++++
|  .../610f0ffc5f172592dfde2ab8fa2efdbabeb6263e.md   | 288 ++++++++++++++++
|  .../67fa4811fefe05df252e7131938aeb895bf9796b.png  | Bin 0 -> 22490 bytes
|  .../73338f02ed2fbd5a3e817fa9efd8a51809af8ee8.png  | Bin 0 -> 15826 bytes
|  .../8ab8311b7791e8ec1c9eb5fc417e3e415f5c2766.zip  | Bin 0 -> 416785 bytes
|  .../94189e1367ce98a67cb8d8cff124cede6da8324f.webm | Bin 0 -> 83802 bytes
|  .../94eac43412a2a4c845ea9aa4e409913d7dadd1da.md   | 281 ++++++++++++++++
|  .../9611f05492604ff91c6936143f395368fda5e441.zip  | Bin 0 -> 356804 bytes
|  .../9b3431b9d93cbee815a37f25855ea1da0dcf01d2.webm | Bin 0 -> 137927 bytes
|  .../9e8484883d838e3d1dbc6aa3cd8abd0dff27ac72.webm | Bin 0 -> 197867 bytes
|  .../a7973d5453c8f4c544fb064ffc46d9c908534779.png  | Bin 0 -> 16449 bytes
|  .../a8008ce2481f3b41d4db6df791082f84c38a6793.md   | 281 ++++++++++++++++
|  .../b1dd9ea549863f25827322939fa06aa51e5713ff.webm | Bin 0 -> 486747 bytes
|  .../bc7d799de6c5d241c994f588143d713d41f43a56.md   | 190 +++++++++++
|  .../c04b0608bdd7d70f410fced4621a2631e24e24eb.webm | Bin 0 -> 124559 bytes
|  .../c1208cc26c845a679f106a4bada6a11f9a1d4e9f.md   | 281 ++++++++++++++++
|  .../c257611a0438d74a54a616b5591eb9de07d94b1a.webm | Bin 0 -> 177442 bytes
|  .../c646d899780413fa07dc78f65cfe8f73a75c7d6c.zip  | Bin 0 -> 581957 bytes
|  .../c6cacba05d2a74903c8a30858f00dbbee9b01cd8.md   | 272 +++++++++++++++
|  .../ce14cbf9d716cb082dfd5b08dc442f6b864d83e2.png  | Bin 0 -> 24858 bytes
|  .../d1b6393246eb2026e4bc175906faa831da78d8a7.png  | Bin 0 -> 16415 bytes
|  .../d276442f1c88975787e348d4893c07953be269a9.webm | Bin 0 -> 138768 bytes
|  .../d3641e8235b62209728334ccc542fec7d3c327c4.webm | Bin 0 -> 180998 bytes
|  .../d5e1efb755f72400ac329e1497e60f8dd46d412f.md   | 288 ++++++++++++++++
|  .../d78c5f5f066186e630422e369c38efb067dd0753.md   | 254 ++++++++++++++
|  .../dabbe68817e5c6505c56ec8929f2620c14856697.png  | Bin 0 -> 22399 bytes
|  .../e371f8bf2156c61c77cc87eda74bfaf815dea3e9.png  | Bin 0 -> 24584 bytes
|  .../e3faf9f98b123af14518a2a435b7825e614af27d.webm | Bin 0 -> 116950 bytes
|  .../ea4823edaefaac09fe469a02f6ed9302ac3afec2.webm | Bin 0 -> 76326 bytes
|  .../ee2cc45c11e592a0cabe8f862973e225f016b691.zip  | Bin 0 -> 419506 bytes
|  .../f340b7d4af9399b14085e00691c38aa4511286cc.md   | 290 ++++++++++++++++
|  .../fd26ceb0331fb2906b1f0f626f4d3d574aa36c53.zip  | Bin 0 -> 402763 bytes
|  tests/e2e/reports/html/cart-chromium/index.html   |  90 +++++
|  .../trace/assets/codeMirrorModule-LEHpjmcn.js     |  32 ++
|  .../trace/assets/defaultSettingsView-BNmKHKpQ.js  | 264 +++++++++++++++
|  .../trace/assets/urlMatch-BYQrIQwR.js             |   1 +
|  .../trace/codeMirrorModule.DYBRYzYX.css           |   1 +
|  .../html/cart-chromium/trace/codicon.DCmgc-ay.ttf | Bin 0 -> 80340 bytes
|  .../trace/defaultSettingsView.CjdS-WJx.css        |   1 +
|  .../html/cart-chromium/trace/index.CzXZzn5A.css   |   1 +
|  .../html/cart-chromium/trace/index.DMMX1gXU.js    |   2 +
|  .../reports/html/cart-chromium/trace/index.html   |  44 +++
|  .../html/cart-chromium/trace/manifest.webmanifest |  16 +
|  .../html/cart-chromium/trace/playwright-logo.svg  |   9 +
|  .../html/cart-chromium/trace/snapshot.html        |  10 +
|  .../html/cart-chromium/trace/snapshot.v8KI4P3m.js |   2 +
|  .../reports/html/cart-chromium/trace/sw.bundle.js |   5 +
|  .../html/cart-chromium/trace/uiMode.BZQ54Kgt.css  |   1 +
|  .../html/cart-chromium/trace/uiMode.Ut8wwJNp.js   |   6 +
|  .../reports/html/cart-chromium/trace/uiMode.html  |  18 +
|  .../cart-chromium/trace/xtermModule.DYP7pi_n.css  |  32 ++
|  .../02a72995e9855b7c841bdeb99af03fc0a2d17eeb.zip  | Bin 0 -> 1072893 bytes
|  .../06c3f8057372206c2663b3ed8b3b639cec751756.webm | Bin 0 -> 159792 bytes
|  .../0b898976ed4b3f758bcc0306025979d8411b9d88.md   | 167 +++++++++
|  .../1217545d8d91cb920eb1d85883cc4c48e06cb4df.png  | Bin 0 -> 27094 bytes
|  .../196fdf271879dd10a016fa474af41b7b956d8517.zip  | Bin 0 -> 1001045 bytes
|  .../2ebbef73c1e4d38136e083c479c4fc547781b387.webm | Bin 0 -> 129218 bytes
|  .../2f2bbe9867471585137987e42094b88d47f4f825.png  | Bin 0 -> 23940 bytes
|  .../31e26987cc0b855e5e2ccb80ec749629a79ab6d1.zip  | Bin 0 -> 1015571 bytes
|  .../418bd246a86c39ea9f09bedf68e9a456dc39340b.webm | Bin 0 -> 136628 bytes
|  .../4856dfba55394db7582421959d0db4b4a51b0d3d.md   | 352 +++++++++++++++++++
|  .../50f25ea2bcebe54b48e37b211d37ab69cd09a1b9.zip  | Bin 0 -> 2129829 bytes
|  .../5abc752a468805ee1907ac0d37c63e5558b33f57.md   | 249 ++++++++++++++
|  .../5d989d673e77f9c6d4496594d4738be7c7960b67.md   | 113 +++++++
|  .../5e2b727d53969e40d3c3e57b5c455e08a56bfafd.png  | Bin 0 -> 23945 bytes
|  .../5e840eeed5d10dd535cfb751df96052399fe709c.zip  | Bin 0 -> 4349883 bytes
|  .../610f0ffc5f172592dfde2ab8fa2efdbabeb6263e.md   | 288 ++++++++++++++++
|  .../6655ca2195918e82b91b29609baff1ba6e3210ba.webm | Bin 0 -> 153575 bytes
|  .../66736129aea1671e0f4214e48c65d57cfb56323b.webm | Bin 0 -> 572589 bytes
|  .../7284f1de8032740cb1b3e5372da86d2542208d50.png  | Bin 0 -> 15094 bytes
|  .../7dfd9cf1f963ec916ad420b3d7254aa92997394b.png  | Bin 0 -> 14456 bytes
|  .../8363f98d6f352692294a7a9ee5014ed2fecea8ac.png  | Bin 0 -> 15084 bytes
|  .../88f3d329b4ad5d308e38b3349abdd5fa974c1031.zip  | Bin 0 -> 1108015 bytes
|  .../94eac43412a2a4c845ea9aa4e409913d7dadd1da.md   | 281 ++++++++++++++++
|  .../97b9e4f92afa6687cc7ea5f3726cb6085874d744.webm | Bin 0 -> 191041 bytes
|  .../9cca289db54911b992b2b064fb0984d16647f470.zip  | Bin 0 -> 757175 bytes
|  .../a1ee959f21ca336079be5cc7602b80fe283dfddc.webm | Bin 0 -> 131009 bytes
|  .../a6ece89ab979879551e900e28da60318d3e207b9.png  | Bin 0 -> 26759 bytes
|  .../a8008ce2481f3b41d4db6df791082f84c38a6793.md   | 281 ++++++++++++++++
|  .../aaac329a61751194ea7bab696c46caa65dd22235.png  | Bin 0 -> 23906 bytes
|  .../b57536c9a78b2b39775ac56a8419450f937866a0.zip  | Bin 0 -> 1170555 bytes
|  .../bc7d799de6c5d241c994f588143d713d41f43a56.md   | 190 +++++++++++
|  .../bdb822da6972f1e5538f917b65d3c3302613c771.png  | Bin 0 -> 59995 bytes
|  .../bdf7f0668515788fb787158f19816a76ea8e7dfe.zip  | Bin 0 -> 721246 bytes
|  .../c1208cc26c845a679f106a4bada6a11f9a1d4e9f.md   | 281 ++++++++++++++++
|  .../c6cacba05d2a74903c8a30858f00dbbee9b01cd8.md   | 272 +++++++++++++++
|  .../cc90386c9c34704b813e7c958ef3ad9965c5bf14.webm | Bin 0 -> 148478 bytes
|  .../d5e1efb755f72400ac329e1497e60f8dd46d412f.md   | 288 ++++++++++++++++
|  .../ded9e38d85f1975d5e01e756cd6de5308fcd23b1.zip  | Bin 0 -> 1173676 bytes
|  .../dfaf64c894b09cccf36ba8c1a526003448050006.webm | Bin 0 -> 143101 bytes
|  .../dfe3ac8c6a891d5c460dbafa6155bbfcb09db0fb.zip  | Bin 0 -> 1428901 bytes
|  .../ee1d9f361252731f849424b1654ab61497afb215.zip  | Bin 0 -> 1228343 bytes
|  .../f290842ff9c7f2fcd4cdea23eb59e915949c23e2.webm | Bin 0 -> 211470 bytes
|  .../f340b7d4af9399b14085e00691c38aa4511286cc.md   | 290 ++++++++++++++++
|  .../f4df9dfd2f31f0260399d70f19d310a65b767ac6.webm | Bin 0 -> 155876 bytes
|  .../f733867a05ee6c3d5e4a31da3c03712d0c59235e.webm | Bin 0 -> 102507 bytes
|  .../fd0b4d69166fd248054583b4892c959cd06b73c9.png  | Bin 0 -> 27054 bytes
|  tests/e2e/reports/html/cart-firefox/index.html    |  90 +++++
|  .../trace/assets/codeMirrorModule-LEHpjmcn.js     |  32 ++
|  .../trace/assets/defaultSettingsView-BNmKHKpQ.js  | 264 +++++++++++++++
|  .../trace/assets/urlMatch-BYQrIQwR.js             |   1 +
|  .../trace/codeMirrorModule.DYBRYzYX.css           |   1 +
|  .../html/cart-firefox/trace/codicon.DCmgc-ay.ttf  | Bin 0 -> 80340 bytes
|  .../trace/defaultSettingsView.CjdS-WJx.css        |   1 +
|  .../html/cart-firefox/trace/index.CzXZzn5A.css    |   1 +
|  .../html/cart-firefox/trace/index.DMMX1gXU.js     |   2 +
|  .../reports/html/cart-firefox/trace/index.html    |  44 +++
|  .../html/cart-firefox/trace/manifest.webmanifest  |  16 +
|  .../html/cart-firefox/trace/playwright-logo.svg   |   9 +
|  .../reports/html/cart-firefox/trace/snapshot.html |  10 +
|  .../html/cart-firefox/trace/snapshot.v8KI4P3m.js  |   2 +
|  .../reports/html/cart-firefox/trace/sw.bundle.js  |   5 +
|  .../html/cart-firefox/trace/uiMode.BZQ54Kgt.css   |   1 +
|  .../html/cart-firefox/trace/uiMode.Ut8wwJNp.js    |   6 +
|  .../reports/html/cart-firefox/trace/uiMode.html   |  18 +
|  .../cart-firefox/trace/xtermModule.DYP7pi_n.css   |  32 ++
|  .../002d025aa0376242a2df1e26069f137dd2741986.webm | Bin 0 -> 140436 bytes
|  .../0505b2582ecd10c44320978f37690ebff75c04a3.zip  | Bin 0 -> 405832 bytes
|  .../096721f04aff39b3e265c1adb3a3d97e99e4c8a8.webm | Bin 0 -> 126381 bytes
|  .../0ada5e5904abc5b872fafaf7c2f8dc4578893196.zip  | Bin 0 -> 419831 bytes
|  .../0e46c9f58b6a02bfed41fc2c7de3015d98d84e6e.png  | Bin 0 -> 67239 bytes
|  .../1d16e6bfd03828c4f281304670bf3bb22eb4cc3e.zip  | Bin 0 -> 310213 bytes
|  .../1fc0e00e89c2b85f60e278cee80857e96fd06e5c.md   | 290 ++++++++++++++++
|  .../21d644d295e68265b3914a0962e8fb82ebf7a2ed.zip  | Bin 0 -> 384558 bytes
|  .../28144940a6e1fb09760e0680d3e31c2cd12e06ce.webm | Bin 0 -> 112951 bytes
|  .../3049f14fd04754a9df3c35539a57f22bdde781a7.md   | 249 ++++++++++++++
|  .../43689c4c956b25c2457ea9b7e74102c3012d4e11.png  | Bin 0 -> 62591 bytes
|  .../4b9ea3f1e0d6ebc58e3862966bbf88672f1a2317.zip  | Bin 0 -> 301691 bytes
|  .../4bf3f2d1f970a3ce5625bf5518d4bcffbb37a642.png  | Bin 0 -> 61330 bytes
|  .../5596c32850591ac0fa4d5f5c046278ace06eb533.png  | Bin 0 -> 44777 bytes
|  .../56c6bc4eca1d9af44fedb1b1d23d2a0255d97e73.png  | Bin 0 -> 44746 bytes
|  .../5b45a7d1f1bd9dffedc7ab91be7c860aec9c6265.webm | Bin 0 -> 518522 bytes
|  .../5d1570e5ac24212e3bc248add9e3cf16ec2f98e7.zip  | Bin 0 -> 474807 bytes
|  .../6c5d76a70014aa11c6e04ae9d24ad93c568f4480.png  | Bin 0 -> 70122 bytes
|  .../76fcbb9668086f1bc88d4d223324b3bde72fad81.webm | Bin 0 -> 145444 bytes
|  .../7c6da1011944e601410187bc6e51d032cfe50585.zip  | Bin 0 -> 591545 bytes
|  .../8317a08c31756594a4a07a19c6735e1face8031f.png  | Bin 0 -> 42955 bytes
|  .../83ceb1702c4179d36c4c7d7893ba7dc128f688fb.webm | Bin 0 -> 214283 bytes
|  .../8ac4ea212d40bc24fdcfb47fae321e7a1fe3f208.md   | 281 ++++++++++++++++
|  .../8fa142a56a1474cb99c629241ee6c30139ff26e8.webm | Bin 0 -> 168571 bytes
|  .../999c6ca2a3e130c1105ce6ff416270a2fbb2cb08.md   | 281 ++++++++++++++++
|  .../a02704dfb8fd2923565ccb7b75d3de7b0ce9838f.zip  | Bin 0 -> 1257584 bytes
|  .../ae8b3a2fd9aa954cc4c87f4f03a6c61821e43adc.zip  | Bin 0 -> 448594 bytes
|  .../b3cf5f00eff31ee5c58381fecc75b1b8ed76f900.webm | Bin 0 -> 100568 bytes
|  .../b750c6fa0e7052253fce172ea7b78032b7af0fb3.md   | 272 +++++++++++++++
|  .../bf6aa25facf680348544d97176897238ec8c8bd5.zip  | Bin 0 -> 474436 bytes
|  .../c00abdab45cd7d0088414cb234cd00c1dc5c1209.md   | 352 +++++++++++++++++++
|  .../c0ee935fd4448833fa4783f11063535f543fe280.png  | Bin 0 -> 60867 bytes
|  .../c61e3193368ebe010e10113c3849673f38a24b48.md   | 190 +++++++++++
|  .../c9a4fe8c9ad5bdb4901cd70990cb4b036d272cd3.webm | Bin 0 -> 158049 bytes
|  .../cc422bb7c7af7b2983ca3a00517cd4c229817831.zip  | Bin 0 -> 458486 bytes
|  .../d92777b3d00897c98adffc28ebc4c3505b67b86f.md   | 288 ++++++++++++++++
|  .../dcf311526918ef63d620746cf99c39bb5e8c0d9a.md   | 288 ++++++++++++++++
|  .../e18d8932886977dd9a02c490eae5c85f07fb8bbc.webm | Bin 0 -> 142852 bytes
|  .../e3258ee4b5ab8f411974abe94722aea811401bfe.webm | Bin 0 -> 156508 bytes
|  .../ebd182154551372641221dbe8e0b97c73e3798dc.md   | 281 ++++++++++++++++
|  .../f7dd4b9350e24c2a60c7b417ac535e8620b9516a.png  | Bin 0 -> 62319 bytes
|  .../f97d19ad5c42d1cd64c6b173ced7dc69aec37686.md   | 254 ++++++++++++++
|  .../fdb7513f2798f190c0343a1686c129bb640dd334.webm | Bin 0 -> 195597 bytes
|  .../fddf1df3bd44c6ca468419be134b4a49cad530e7.md   | 167 +++++++++
|  .../ff6cbc83ba1588dba98d580fc4e647d0ce31de83.zip  | Bin 0 -> 422239 bytes
|  tests/e2e/reports/html/cart-webkit/index.html     |  90 +++++
|  .../trace/assets/codeMirrorModule-LEHpjmcn.js     |  32 ++
|  .../trace/assets/defaultSettingsView-BNmKHKpQ.js  | 264 +++++++++++++++
|  .../cart-webkit/trace/assets/urlMatch-BYQrIQwR.js |   1 +
|  .../trace/codeMirrorModule.DYBRYzYX.css           |   1 +
|  .../html/cart-webkit/trace/codicon.DCmgc-ay.ttf   | Bin 0 -> 80340 bytes
|  .../trace/defaultSettingsView.CjdS-WJx.css        |   1 +
|  .../html/cart-webkit/trace/index.CzXZzn5A.css     |   1 +
|  .../html/cart-webkit/trace/index.DMMX1gXU.js      |   2 +
|  .../e2e/reports/html/cart-webkit/trace/index.html |  44 +++
|  .../html/cart-webkit/trace/manifest.webmanifest   |  16 +
|  .../html/cart-webkit/trace/playwright-logo.svg    |   9 +
|  .../reports/html/cart-webkit/trace/snapshot.html  |  10 +
|  .../html/cart-webkit/trace/snapshot.v8KI4P3m.js   |   2 +
|  .../reports/html/cart-webkit/trace/sw.bundle.js   |   5 +
|  .../html/cart-webkit/trace/uiMode.BZQ54Kgt.css    |   1 +
|  .../html/cart-webkit/trace/uiMode.Ut8wwJNp.js     |   6 +
|  .../reports/html/cart-webkit/trace/uiMode.html    |  18 +
|  .../cart-webkit/trace/xtermModule.DYP7pi_n.css    |  32 ++
|  .../028a50935b9361fe1495ea1d22b57c2cdb438120.webm | Bin 0 -> 156857 bytes
|  .../0b7334856aa4a8093ae196c9d19c7bf2edbe64cf.md   | 228 +++++++++++++
|  .../0dc6da96ae0d2676eea6130c4b25a7b04d98510e.webm | Bin 0 -> 193247 bytes
|  .../17f5d419279e3fa6ca6c9d1803c46bb25a7e3a2a.zip  | Bin 0 -> 558696 bytes
|  .../1a8e1992619f4abc62fb98d8e518f3e58d462c3d.webm | Bin 0 -> 1924 bytes
|  .../22a148be75b860cf5deaf837a09c111dca1162f3.zip  | Bin 0 -> 424434 bytes
|  .../292b2bee1217f428c3e75266f4fb6ca479136f9e.md   | 228 +++++++++++++
|  .../2abe84c143434cbe767690a1cd1634510c5a87ae.zip  | Bin 0 -> 316225 bytes
|  .../2b31c49a7b2ed0b4b7c523164d667355c1e94c89.md   | 322 ++++++++++++++++++
|  .../346429971dba9ab807b9059e1e4582f788350157.zip  | Bin 0 -> 21735 bytes
|  .../37725cf4c13129cee1bac5a350003760703304be.webm | Bin 0 -> 1924 bytes
|  .../3e98db4cbd26239c298a6a5f4c0d6461fbc67e5c.md   | 322 ++++++++++++++++++
|  .../50a5d16ea92aa56b5fc68b19760ea105536414ae.webm | Bin 0 -> 68503 bytes
|  .../51d64b1364f7a6e379f36870535e0c2c8c85c986.zip  | Bin 0 -> 23042 bytes
|  .../583b9e8284ff60f0c7737ac7d7f84d3c8c636a17.png  | Bin 0 -> 34696 bytes
|  .../587b3a016cd8f76751bdef4c581f58396a15f72b.md   | 323 ++++++++++++++++++
|  .../659aee4f712d5ac449ce3e8de12e137502d6e6bf.zip  | Bin 0 -> 22389 bytes
|  .../65da4b2bbb515530261cbb9e48e8fb695af66aef.zip  | Bin 0 -> 446845 bytes
|  .../78485ad26ab49de2007fe98b0854715a58aaf5b6.png  | Bin 0 -> 4254 bytes
|  .../7b409f36ec26aacf6e5d669a6fe331d925c5612a.md   | 330 ++++++++++++++++++
|  .../892a31a541b7a9a12ad9822aa744d0a748c39c5f.png  | Bin 0 -> 38403 bytes
|  .../94336e95e3f7c231804112fb8bf27cf4b1d127ed.png  | Bin 0 -> 32222 bytes
|  .../99e9fc7261335106764e35e5d1655f63315131ad.webm | Bin 0 -> 53940 bytes
|  .../9ce05f023ae83bbd569e4cdae193b92137c8232d.webm | Bin 0 -> 67702 bytes
|  .../a91425049200193a4262e3644360b30e37ae0f7e.png  | Bin 0 -> 34714 bytes
|  .../b3fb8bf5b7593601a8fa1fb7d66b8e3f3e149c97.zip  | Bin 0 -> 448301 bytes
|  .../b9b562e045fd0a987f1288a7fd475a2e377d484c.md   | 322 ++++++++++++++++++
|  .../bc3932bc717a9df2acc66e2517fed6075cca44fa.png  | Bin 0 -> 34741 bytes
|  .../be1c33f036fdf372d9e5d37506bc3fc72ca4b45a.webm | Bin 0 -> 67647 bytes
|  .../c05f2e3e89edec971791d8e641b2e4882d26bf6b.md   | 228 +++++++++++++
|  .../c7bee080df6301caba83f4399efa5b072e4a02b7.zip  | Bin 0 -> 360439 bytes
|  .../d4519fc05d3f3b2249861905621f17cd04fbb64b.webm | Bin 0 -> 165888 bytes
|  .../d68d731a06a8e04df51f9692cc2223487260fd42.webm | Bin 0 -> 1924 bytes
|  .../db73774a852c28983a9e10acc4e8c32d037367d8.png  | Bin 0 -> 34193 bytes
|  .../e3d9a0b2b438408e648c0206a9b834c0f9f5b645.zip  | Bin 0 -> 21775 bytes
|  .../e3f552d675a2830a5302f42044824a3fa611a1ad.zip  | Bin 0 -> 400181 bytes
|  .../f27971b786fd814a40d0f010b16cd2cedcc2eacf.webm | Bin 0 -> 1924 bytes
|  .../f2c316c3bd621cf66f877c3f9084bf4432ff94eb.md   | 228 +++++++++++++
|  .../fa0d944089e13a8fac4cf71bd388052d4b4fffbd.md   | 201 +++++++++++
|  .../fa119fdd3a23327d4fc4477b67dcd8a32c4ab5f7.md   | 322 ++++++++++++++++++
|  .../fcb58eb0020279800e640c0f4c82bb90e7b5376f.png  | Bin 0 -> 38757 bytes
|  .../e2e/reports/html/product-chromium/index.html  |  90 +++++
|  .../trace/assets/codeMirrorModule-LEHpjmcn.js     |  32 ++
|  .../trace/assets/defaultSettingsView-BNmKHKpQ.js  | 264 +++++++++++++++
|  .../trace/assets/urlMatch-BYQrIQwR.js             |   1 +
|  .../trace/codeMirrorModule.DYBRYzYX.css           |   1 +
|  .../product-chromium/trace/codicon.DCmgc-ay.ttf   | Bin 0 -> 80340 bytes
|  .../trace/defaultSettingsView.CjdS-WJx.css        |   1 +
|  .../product-chromium/trace/index.CzXZzn5A.css     |   1 +
|  .../html/product-chromium/trace/index.DMMX1gXU.js |   2 +
|  .../html/product-chromium/trace/index.html        |  44 +++
|  .../product-chromium/trace/manifest.webmanifest   |  16 +
|  .../product-chromium/trace/playwright-logo.svg    |   9 +
|  .../html/product-chromium/trace/snapshot.html     |  10 +
|  .../product-chromium/trace/snapshot.v8KI4P3m.js   |   2 +
|  .../html/product-chromium/trace/sw.bundle.js      |   5 +
|  .../product-chromium/trace/uiMode.BZQ54Kgt.css    |   1 +
|  .../product-chromium/trace/uiMode.Ut8wwJNp.js     |   6 +
|  .../html/product-chromium/trace/uiMode.html       |  18 +
|  .../trace/xtermModule.DYP7pi_n.css                |  32 ++
|  .../01ad7cd63e07ef50c3c73583e636462f9e458d74.zip  | Bin 0 -> 23961 bytes
|  .../0b7334856aa4a8093ae196c9d19c7bf2edbe64cf.md   | 228 +++++++++++++
|  .../1046bfd1ab8e577c86a30fbfd810390ff3306094.md   | 323 ++++++++++++++++++
|  .../13616776783ee513d489effeff0ea1495a869132.webm | Bin 0 -> 150404 bytes
|  .../1cad56df65057e78c4e5719b3f5193c49fc79fa7.png  | Bin 0 -> 35890 bytes
|  .../204f57d88e412bc13c4069c14e90e5bafea3aa6a.md   | 314 +++++++++++++++++
|  .../2683f3e36c68c6f4b88f9e903a95356d3aa216d0.webm | Bin 0 -> 58374 bytes
|  .../292b2bee1217f428c3e75266f4fb6ca479136f9e.md   | 228 +++++++++++++
|  .../35d2e1d61317662890f0787bbc9ccd76b4c4a950.zip  | Bin 0 -> 660182 bytes
|  .../4aaa0463583ccf60506932a0d70a1f2aee67b8f1.webm | Bin 0 -> 59217 bytes
|  .../50214f11ef1879b45f977773453c57310a6ee63d.png  | Bin 0 -> 35387 bytes
|  .../581fd6198323d968a393a38d2c631cae3183049d.md   | 322 ++++++++++++++++++
|  .../5a6a50c795629b5fb2ea4cdbffe48c608fe52627.zip  | Bin 0 -> 25156 bytes
|  .../5a8c9cf151bd2d8b0d91da7d1947376d6ab6df3f.zip  | Bin 0 -> 24732 bytes
|  .../62e447b12030dbba84ab7f53ecd544a299bb7b43.png  | Bin 0 -> 35891 bytes
|  .../7d7aa58b4199d53742aa017f283061e7e62025ad.zip  | Bin 0 -> 1043968 bytes
|  .../860aa7bb5a6cc0f26997bae43a9f16650451aec3.webm | Bin 0 -> 55387 bytes
|  .../911c49e679c2dbb66b496a42e29e244acfb08627.webm | Bin 0 -> 2796 bytes
|  .../91520e5e2e69ad4039d0dd869f96b28aa107e4ee.md   | 314 +++++++++++++++++
|  .../a29ee89a3b2f2647fe6ab2945ee998180e7aa515.zip  | Bin 0 -> 653838 bytes
|  .../a5d22fd5cfca277c9c664c3c4b91fc238fce5942.webm | Bin 0 -> 126341 bytes
|  .../b6fdb9c544429a1667cb98fb3b1a0798e999d36a.webm | Bin 0 -> 2928 bytes
|  .../bce7de2b313f10ad3224a3910bf5c405a475296d.md   | 201 +++++++++++
|  .../c05f2e3e89edec971791d8e641b2e4882d26bf6b.md   | 228 +++++++++++++
|  .../cf6c71227b48b43a2ec7a557e0604f0bdd543839.zip  | Bin 0 -> 1210805 bytes
|  .../d7a5eed98f52b3a8ab83bfb6cda4263aac918b89.png  | Bin 0 -> 5212 bytes
|  .../e07d448ed7a5367306659749aef6542aed2b0114.png  | Bin 0 -> 42821 bytes
|  .../e10b35b75037d1d015769d959added59e2422e93.zip  | Bin 0 -> 751524 bytes
|  .../e3d3b476b0d48a48965c1850c521c4b628372d7e.webm | Bin 0 -> 3062 bytes
|  .../e4e4056ef929126cf6e6101971e7c8c1d5c67ea1.webm | Bin 0 -> 2961 bytes
|  .../f2c316c3bd621cf66f877c3f9084bf4432ff94eb.md   | 228 +++++++++++++
|  .../f4d17f613ad3574d3eccf3c8bc217a49de865ae2.zip  | Bin 0 -> 24565 bytes
|  .../fc0a931ed1eea6287bfd8d88d64f69590237579e.zip  | Bin 0 -> 377274 bytes
|  .../fcb9221e93ad005057bec98c02e72c5c187f7499.webm | Bin 0 -> 52757 bytes
|  .../fd07200eff835d8a74029765dcefb572d0bddb6b.md   | 322 ++++++++++++++++++
|  tests/e2e/reports/html/product-firefox/index.html |  90 +++++
|  .../trace/assets/codeMirrorModule-LEHpjmcn.js     |  32 ++
|  .../trace/assets/defaultSettingsView-BNmKHKpQ.js  | 264 +++++++++++++++
|  .../trace/assets/urlMatch-BYQrIQwR.js             |   1 +
|  .../trace/codeMirrorModule.DYBRYzYX.css           |   1 +
|  .../product-firefox/trace/codicon.DCmgc-ay.ttf    | Bin 0 -> 80340 bytes
|  .../trace/defaultSettingsView.CjdS-WJx.css        |   1 +
|  .../html/product-firefox/trace/index.CzXZzn5A.css |   1 +
|  .../html/product-firefox/trace/index.DMMX1gXU.js  |   2 +
|  .../reports/html/product-firefox/trace/index.html |  44 +++
|  .../product-firefox/trace/manifest.webmanifest    |  16 +
|  .../product-firefox/trace/playwright-logo.svg     |   9 +
|  .../html/product-firefox/trace/snapshot.html      |  10 +
|  .../product-firefox/trace/snapshot.v8KI4P3m.js    |   2 +
|  .../html/product-firefox/trace/sw.bundle.js       |   5 +
|  .../product-firefox/trace/uiMode.BZQ54Kgt.css     |   1 +
|  .../html/product-firefox/trace/uiMode.Ut8wwJNp.js |   6 +
|  .../html/product-firefox/trace/uiMode.html        |  18 +
|  .../trace/xtermModule.DYP7pi_n.css                |  32 ++
|  .../0b7334856aa4a8093ae196c9d19c7bf2edbe64cf.md   | 228 +++++++++++++
|  .../0e064a26e997e5f72d15d6042be509726e769c2a.md   | 322 ++++++++++++++++++
|  .../185d5fa1464b2f71ebc7c72c945a7e7994f62283.webm | Bin 0 -> 103528 bytes
|  .../188e38999b1f8c4d09c40ff58aec4f5f603f74c4.md   | 322 ++++++++++++++++++
|  .../1b0890e21e386e817f9502015c73a603fb78320e.zip  | Bin 0 -> 22681 bytes
|  .../292b2bee1217f428c3e75266f4fb6ca479136f9e.md   | 228 +++++++++++++
|  .../2a2dcd10c9078eac6d5c61e84fdd6e7aa08b6814.webm | Bin 0 -> 1924 bytes
|  .../2d22b5a9dab8568b7d838e7b22a866e3e79e5d07.webm | Bin 0 -> 48602 bytes
|  .../3e88fc1075dc0b9956694d2b88e8ac04e4ed4032.webm | Bin 0 -> 1924 bytes
|  .../414009685d2c861a9d5d32246b6ddd65d041a5e6.zip  | Bin 0 -> 22696 bytes
|  .../4576bb3fbd5bbddb2cc0ce7e61f2ad4cde34ae29.webm | Bin 0 -> 1924 bytes
|  .../45d1b0be3ec0d178954c9694d342b2760bbffb21.png  | Bin 0 -> 111027 bytes
|  .../59e0ebfb967aea42b378c95e9aa209265f67639c.png  | Bin 0 -> 90458 bytes
|  .../5ecef8b7364a908d8a1acf8b9cac981ef351e730.png  | Bin 0 -> 18139 bytes
|  .../62b4cd927c7c2d594a59b7e5ebddfe06b9f2ba11.md   | 322 ++++++++++++++++++
|  .../6f4be8e920a8c27765cff410666913a5256010b5.zip  | Bin 0 -> 24059 bytes
|  .../7d3374e2f18b097d801cfac5b58a33404f59ce7a.md   | 322 ++++++++++++++++++
|  .../7f16bc5fcf1424e764557761d14b78816679f454.webm | Bin 0 -> 46422 bytes
|  .../8199893a234e9689956adc4e388341b7312b15fe.md   | 201 +++++++++++
|  .../86480c9b32ebf08d128a231878dc7913c70b1a34.zip  | Bin 0 -> 22656 bytes
|  .../8ecd6d9e66eda30a97652133e96b8594dda8b462.zip  | Bin 0 -> 303095 bytes
|  .../8f586bd9d3a9b9c68e643e89125d8c378f2d8a6b.png  | Bin 0 -> 90730 bytes
|  .../9c9dee21d46950d3451119616f797be403ae4df9.png  | Bin 0 -> 84142 bytes
|  .../9fc31df1fb46d02f2d6386c724b1f440fb76b9aa.png  | Bin 0 -> 90946 bytes
|  .../ba5d1eccc01787f5412a8465f6c3b7c8a897d62a.webm | Bin 0 -> 49034 bytes
|  .../c05f2e3e89edec971791d8e641b2e4882d26bf6b.md   | 228 +++++++++++++
|  .../c5a6392691a5f1d297a2a9f05157ae494729e695.zip  | Bin 0 -> 369728 bytes
|  .../cabb0fcdc21800223545529866a12f5e62a5bb9c.webm | Bin 0 -> 47001 bytes
|  .../cd296d7ac133957cf373a3780e6347b64d6706e6.md   | 323 ++++++++++++++++++
|  .../d5e406fc8c493084e9a628d996e23f39454d3c21.zip  | Bin 0 -> 342393 bytes
|  .../d876d27b8ade8bb15ce0e47b39eaeb515aca2ffd.png  | Bin 0 -> 90927 bytes
|  .../d9c898dbe83054baf9bdc1ec21d1840bbf33bdf2.webm | Bin 0 -> 1924 bytes
|  .../dc395ab273c1149f3e5193d820c9ac166b130b12.zip  | Bin 0 -> 311216 bytes
|  .../dec9b94c8f46c25f7fec95f2b6d1f07c6d474e1b.zip  | Bin 0 -> 368237 bytes
|  .../e8161015aed502fd5c4711d7b547e63f3d7f6861.zip  | Bin 0 -> 286280 bytes
|  .../f2c316c3bd621cf66f877c3f9084bf4432ff94eb.md   | 228 +++++++++++++
|  .../fb8b8ae9affbbbc03d0d9713a92e684f697987e1.webm | Bin 0 -> 135130 bytes
|  tests/e2e/reports/html/product-webkit/index.html  |  90 +++++
|  .../trace/assets/codeMirrorModule-LEHpjmcn.js     |  32 ++
|  .../trace/assets/defaultSettingsView-BNmKHKpQ.js  | 264 +++++++++++++++
|  .../trace/assets/urlMatch-BYQrIQwR.js             |   1 +
|  .../trace/codeMirrorModule.DYBRYzYX.css           |   1 +
|  .../product-webkit/trace/codicon.DCmgc-ay.ttf     | Bin 0 -> 80340 bytes
|  .../trace/defaultSettingsView.CjdS-WJx.css        |   1 +
|  .../html/product-webkit/trace/index.CzXZzn5A.css  |   1 +
|  .../html/product-webkit/trace/index.DMMX1gXU.js   |   2 +
|  .../reports/html/product-webkit/trace/index.html  |  44 +++
|  .../product-webkit/trace/manifest.webmanifest     |  16 +
|  .../html/product-webkit/trace/playwright-logo.svg |   9 +
|  .../html/product-webkit/trace/snapshot.html       |  10 +
|  .../product-webkit/trace/snapshot.v8KI4P3m.js     |   2 +
|  .../html/product-webkit/trace/sw.bundle.js        |   5 +
|  .../html/product-webkit/trace/uiMode.BZQ54Kgt.css |   1 +
|  .../html/product-webkit/trace/uiMode.Ut8wwJNp.js  |   6 +
|  .../reports/html/product-webkit/trace/uiMode.html |  18 +
|  .../product-webkit/trace/xtermModule.DYP7pi_n.css |  32 ++
|  .../0cac09f2001120ce9346e5c2f463b8994f3588d3.zip  | Bin 0 -> 11805 bytes
|  .../0db171906229a09b6e437accc91eb8e478f653cd.zip  | Bin 0 -> 249343 bytes
|  .../0ef7fb446d88ed39ed073e95e57952a78069f3ef.zip  | Bin 0 -> 12037 bytes
|  .../1330f7d80a518f74c61209b8f9e53ccf954de5d6.zip  | Bin 0 -> 357431 bytes
|  .../242bd0b605f8dd629e69d2b017b0cd99cb1c7796.md   | 259 ++++++++++++++
|  .../28eb5f58d2d907f52952bc5771e8120897e1f141.png  | Bin 0 -> 27413 bytes
|  .../2c4bee503c8cc2461aacacf248dae585b004336c.png  | Bin 0 -> 25150 bytes
|  .../32b87211a5a9542b4ca9b28c0057cee01c555f3c.webm | Bin 0 -> 88585 bytes
|  .../39753e7fc14fb5afebfff09538344ac3579663e6.webm | Bin 0 -> 112829 bytes
|  .../3e262b05f25be77122f3d67ddebe0eb883ba32f9.webm | Bin 0 -> 114218 bytes
|  .../475b2b8fa9ad1191db84e127127a3404c53dfd02.zip  | Bin 0 -> 338446 bytes
|  .../503bf97bd783f22701baae400db92ffdaebbddbc.zip  | Bin 0 -> 234828 bytes
|  .../54357bdb83051d115b731c539495023b6825491c.md   | 131 ++++++++
|  .../89bb5428319336d82725fe4e0384be3345187e63.md   | 182 ++++++++++
|  .../8dd268d58e87ca8654504e761d2c8228c8280ff9.md   | 273 +++++++++++++++
|  .../8e9d0ac68b557a1cf17dd00c2e43cd3e10f07f2c.md   | 259 ++++++++++++++
|  .../96765c33583a28804494de24d7a7d8d6a8569245.zip  | Bin 0 -> 222387 bytes
|  .../a67c09ec8bee17a533f14eb0502574fa5855a482.png  | Bin 0 -> 27456 bytes
|  .../a94cb496469f8b27a893f7570ab416203ca35946.md   | 259 ++++++++++++++
|  .../c14b9d2d2843decce5dde36683a39f339f13e927.md   | 161 +++++++++
|  .../d4af7417fc3d2328e57b501e85854248ec4869ac.png  | Bin 0 -> 27533 bytes
|  .../d52a7b945c039a9934e6cc373e0be2581bcc2dd2.webm | Bin 0 -> 114667 bytes
|  .../dcd1e580f4fbdbf1a882f492b76a6bfc31ea75c0.png  | Bin 0 -> 25171 bytes
|  .../e7cf5dca5d7e4a574017a20d21a759ad580bec8e.zip  | Bin 0 -> 14783 bytes
|  .../f2446f2b058d74add018c3cb24360bc6b1c6f7ab.webm | Bin 0 -> 139760 bytes
|  .../fff0dfb529f9cd893a0492938b30dfc7ce849dd8.md   | 273 +++++++++++++++
|  .../e2e/reports/html/register-chromium/index.html |  90 +++++
|  .../trace/assets/codeMirrorModule-LEHpjmcn.js     |  32 ++
|  .../trace/assets/defaultSettingsView-BNmKHKpQ.js  | 264 +++++++++++++++
|  .../trace/assets/urlMatch-BYQrIQwR.js             |   1 +
|  .../trace/codeMirrorModule.DYBRYzYX.css           |   1 +
|  .../register-chromium/trace/codicon.DCmgc-ay.ttf  | Bin 0 -> 80340 bytes
|  .../trace/defaultSettingsView.CjdS-WJx.css        |   1 +
|  .../register-chromium/trace/index.CzXZzn5A.css    |   1 +
|  .../register-chromium/trace/index.DMMX1gXU.js     |   2 +
|  .../html/register-chromium/trace/index.html       |  44 +++
|  .../register-chromium/trace/manifest.webmanifest  |  16 +
|  .../register-chromium/trace/playwright-logo.svg   |   9 +
|  .../html/register-chromium/trace/snapshot.html    |  10 +
|  .../register-chromium/trace/snapshot.v8KI4P3m.js  |   2 +
|  .../html/register-chromium/trace/sw.bundle.js     |   5 +
|  .../register-chromium/trace/uiMode.BZQ54Kgt.css   |   1 +
|  .../register-chromium/trace/uiMode.Ut8wwJNp.js    |   6 +
|  .../html/register-chromium/trace/uiMode.html      |  18 +
|  .../trace/xtermModule.DYP7pi_n.css                |  32 ++
|  .../1a88d360d33621599a7afc107802a922260e4893.zip  | Bin 0 -> 848174 bytes
|  .../1ec1093e7e81528b0c9ee20307c14062f52525a8.md   | 259 ++++++++++++++
|  .../24bf517fbbed1c0a70e52735d60e792f044c3b2a.png  | Bin 0 -> 26759 bytes
|  .../2a4821714e2bef08f66bcdaeef115b6a982a9349.webm | Bin 0 -> 111974 bytes
|  .../31a1e3b9d5af9d62737c1bec31fa3644811913d5.webm | Bin 0 -> 102565 bytes
|  .../3fc9b73531b2ba71f15608323faeb5a8451c97a6.zip  | Bin 0 -> 865154 bytes
|  .../41834f18d34b37ed1bca80f4244f418ce5e644cc.md   | 273 +++++++++++++++
|  .../4e652a97054b6e4e5c3705122d2ec0eef9e09a34.zip  | Bin 0 -> 780744 bytes
|  .../5299132263050f077ae59d3d0a14032d7394cb27.zip  | Bin 0 -> 11939 bytes
|  .../54357bdb83051d115b731c539495023b6825491c.md   | 131 ++++++++
|  .../5a25b52f0cd44da61d53ee6547f7fc8fa6c3bb9a.webm | Bin 0 -> 111206 bytes
|  .../5e2c92802e3f8ae8dcd792feb09102f2c309838d.zip  | Bin 0 -> 777415 bytes
|  .../6f05c696469d2d77c2f071528a64fa4ed6f59aa1.png  | Bin 0 -> 29164 bytes
|  .../6fd35f9faec82135d2c580240ef8b495efac5958.png  | Bin 0 -> 29404 bytes
|  .../89bb5428319336d82725fe4e0384be3345187e63.md   | 182 ++++++++++
|  .../a0a281f7cede2deb9f418492773ebff0ea724641.webm | Bin 0 -> 98856 bytes
|  .../a1de55ff52246f0cdf03a93dff6e6941f074dcf6.zip  | Bin 0 -> 14681 bytes
|  .../a65987c6eb32fff5057d22e4859aa32967efa2b5.zip  | Bin 0 -> 854401 bytes
|  .../bcdbe2c6ea5441ed30f26d29916d0f2db4e607ab.zip  | Bin 0 -> 11716 bytes
|  .../c05b2bb5beb7e9d9ef4f4b63087fc62d3f1d31a7.md   | 273 +++++++++++++++
|  .../c14b9d2d2843decce5dde36683a39f339f13e927.md   | 161 +++++++++
|  .../e02461961679c87ba0e1182e9f93caae72f86635.png  | Bin 0 -> 29099 bytes
|  .../e4456a4dd3355377e5bca7a47da1ab4b02ac23a7.webm | Bin 0 -> 109436 bytes
|  .../eaf29d2851d3ab1a7a5d2d75d454c2fc3b0c0813.md   | 259 ++++++++++++++
|  .../f05f2855cbef2e7d916e4531bb7e293ca57e1740.md   | 259 ++++++++++++++
|  .../f7b3c44134ba1b530968bff990ad08045cd75026.png  | Bin 0 -> 26720 bytes
|  .../e2e/reports/html/register-firefox/index.html  |  90 +++++
|  .../trace/assets/codeMirrorModule-LEHpjmcn.js     |  32 ++
|  .../trace/assets/defaultSettingsView-BNmKHKpQ.js  | 264 +++++++++++++++
|  .../trace/assets/urlMatch-BYQrIQwR.js             |   1 +
|  .../trace/codeMirrorModule.DYBRYzYX.css           |   1 +
|  .../register-firefox/trace/codicon.DCmgc-ay.ttf   | Bin 0 -> 80340 bytes
|  .../trace/defaultSettingsView.CjdS-WJx.css        |   1 +
|  .../register-firefox/trace/index.CzXZzn5A.css     |   1 +
|  .../html/register-firefox/trace/index.DMMX1gXU.js |   2 +
|  .../html/register-firefox/trace/index.html        |  44 +++
|  .../register-firefox/trace/manifest.webmanifest   |  16 +
|  .../register-firefox/trace/playwright-logo.svg    |   9 +
|  .../html/register-firefox/trace/snapshot.html     |  10 +
|  .../register-firefox/trace/snapshot.v8KI4P3m.js   |   2 +
|  .../html/register-firefox/trace/sw.bundle.js      |   5 +
|  .../register-firefox/trace/uiMode.BZQ54Kgt.css    |   1 +
|  .../register-firefox/trace/uiMode.Ut8wwJNp.js     |   6 +
|  .../html/register-firefox/trace/uiMode.html       |  18 +
|  .../trace/xtermModule.DYP7pi_n.css                |  32 ++
|  .../0443beab1dd6d6151def86017610202b3f527cb7.md   | 273 +++++++++++++++
|  .../13ca13ca52d0facc6c0ffd7abb0a9dad09fd9e7a.webm | Bin 0 -> 112727 bytes
|  .../1836319f980895eb8fc7a7985e8cec014f920fec.webm | Bin 0 -> 119008 bytes
|  .../2a00c1ef0b9bb480136ea5e51e3adef4bce73afd.webm | Bin 0 -> 122354 bytes
|  .../54357bdb83051d115b731c539495023b6825491c.md   | 131 ++++++++
|  .../5be373cfa2ef1220ff27d62736308713050f802a.md   | 259 ++++++++++++++
|  .../6d752f1e319a8709c21a21f9fdeda360f83d4fa7.zip  | Bin 0 -> 345913 bytes
|  .../7275e3541f2e7d9dead395645d9e44d88c329351.zip  | Bin 0 -> 369503 bytes
|  .../7e789af70ef2f4f721283fefeb6012fdf170d5e9.png  | Bin 0 -> 69827 bytes
|  .../81c0859881bf5feddd3de01ecce5ca1b7ccb9dda.zip  | Bin 0 -> 242086 bytes
|  .../88ec8505d16831f66e17068c551adf08d07854dc.md   | 273 +++++++++++++++
|  .../89bb5428319336d82725fe4e0384be3345187e63.md   | 182 ++++++++++
|  .../93968f527aec68d9c7cb4cb491c8e7b90edf1e08.png  | Bin 0 -> 76273 bytes
|  .../9ebf9c199da6eb76c41434af00a579f711f1dd30.webm | Bin 0 -> 121301 bytes
|  .../a08e2ce743dca01cd70f117d2efe53577f29977d.zip  | Bin 0 -> 260044 bytes
|  .../aa180b1b3dc8b08928f5c265fa78252518d380fa.webm | Bin 0 -> 115460 bytes
|  .../bc4d778e8bef178ede5c08228037629c329266cb.png  | Bin 0 -> 75734 bytes
|  .../c14b9d2d2843decce5dde36683a39f339f13e927.md   | 161 +++++++++
|  .../c28e4933efa6402ba58b107224093eceb76410ac.zip  | Bin 0 -> 262368 bytes
|  .../c5a90076f64740a836b3d026d6afe5d7efaf7f75.md   | 259 ++++++++++++++
|  .../c6b4a1acb48479cb855790f8a61091e191c43285.png  | Bin 0 -> 75839 bytes
|  .../d4494537189202931e6def05ed82d10be99f9a5d.zip  | Bin 0 -> 14736 bytes
|  .../d6479d54bef03f730fcc4a182c12a626fb724285.zip  | Bin 0 -> 12034 bytes
|  .../e07cc9b13385f7e233ff47d70588e5ff07853b29.md   | 259 ++++++++++++++
|  .../e5f2d9afdbb39f7c235bdf120f89ec829cf9fd90.zip  | Bin 0 -> 11786 bytes
|  .../ff79c0fee9a01dc5154a6b21a0b9861121fc6424.png  | Bin 0 -> 69556 bytes
|  tests/e2e/reports/html/register-webkit/index.html |  90 +++++
|  .../trace/assets/codeMirrorModule-LEHpjmcn.js     |  32 ++
|  .../trace/assets/defaultSettingsView-BNmKHKpQ.js  | 264 +++++++++++++++
|  .../trace/assets/urlMatch-BYQrIQwR.js             |   1 +
|  .../trace/codeMirrorModule.DYBRYzYX.css           |   1 +
|  .../register-webkit/trace/codicon.DCmgc-ay.ttf    | Bin 0 -> 80340 bytes
|  .../trace/defaultSettingsView.CjdS-WJx.css        |   1 +
|  .../html/register-webkit/trace/index.CzXZzn5A.css |   1 +
|  .../html/register-webkit/trace/index.DMMX1gXU.js  |   2 +
|  .../reports/html/register-webkit/trace/index.html |  44 +++
|  .../register-webkit/trace/manifest.webmanifest    |  16 +
|  .../register-webkit/trace/playwright-logo.svg     |   9 +
|  .../html/register-webkit/trace/snapshot.html      |  10 +
|  .../register-webkit/trace/snapshot.v8KI4P3m.js    |   2 +
|  .../html/register-webkit/trace/sw.bundle.js       |   5 +
|  .../register-webkit/trace/uiMode.BZQ54Kgt.css     |   1 +
|  .../html/register-webkit/trace/uiMode.Ut8wwJNp.js |   6 +
|  .../html/register-webkit/trace/uiMode.html        |  18 +
|  .../trace/xtermModule.DYP7pi_n.css                |  32 ++
|  499 files changed, 28139 insertions(+)
| 
* commit 81df2fcf8393d90a4bfedcc476f0860b2646656e
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 11:22:57 2026 +0700
| 
|     fix: enhance API tests for email format and duplication cases
| 
|  tests/e2e/specs/register.spec.ts  | 69 +++++++++++++++++++++++++++++++++++--
|  tests/e2e/test-data/register.json | 14 ++++----
|  2 files changed, 72 insertions(+), 11 deletions(-)
| 
* commit 4089d521ed0c7484faa246313c6cc50d44cab47d
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 11:22:46 2026 +0700
| 
|     fix: improve product row locator to match exact cell content
| 
|  tests/e2e/specs/product.spec.ts | 11 ++++++++++-
|  1 file changed, 10 insertions(+), 1 deletion(-)
| 
* commit 48decb8cb589f32b3c81eee3d0b82e654b4d298c
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Sat Aug 8 11:22:33 2026 +0700
| 
|     fix: refine test case setups in cart.spec.ts and cart.json
| 
|  tests/e2e/specs/cart.spec.ts  | 25 +++++++++++++++++--------
|  tests/e2e/test-data/cart.json |  5 +++--
|  2 files changed, 20 insertions(+), 10 deletions(-)
| 
* commit a6f259799823631df9eddcc4786da37b4e69094d
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Fri Aug 7 22:15:38 2026 +0700
| 
|     docs: log AI audit entry for the product FR-15 automation session
| 
|  docs/anh-khoa/ai audit report.md | 116 +++++++++++++++++++++++++++++++++++++
|  1 file changed, 116 insertions(+)
| 
* commit a56a52a64fcc31b6fc71e9240de55e2a79248965
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Fri Aug 7 22:15:31 2026 +0700
| 
|     test(product): automate all 18 FR-15 admin CRUD test cases (data-driven)
|     
|     Add product.json + product.spec.ts for the admin product management
|     feature, with expectations held to the SRS rather than to current SUT
|     behaviour.
|     
|     Auditing every route confirmed that POST/PUT/DELETE /api/products carry
|     no authenticateToken at all, while the categories routes right below
|     them do — FR-12/SEC-02. A second layer turned up beyond that:
|     authenticateToken only verifies the JWT signature and never checks
|     role === 'admin', so TC-PRODUCT-014 would still fail even once the
|     first hole is patched.
|     
|     TC-PRODUCT-015 asserts both the UI right after save and the API,
|     because the mass-rename defect lives in local React state while the
|     database stays correct — checking only the API would pass and miss the
|     bug users actually see.
| 
|  tests/e2e/specs/product.spec.ts  | 451 +++++++++++++++++++++++++++++++++++++
|  tests/e2e/test-data/product.json | 162 +++++++++++++
|  2 files changed, 613 insertions(+)
| 
* commit 017418495091b1b09d5c7ea10540aa08e55be7e7
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Fri Aug 7 22:07:18 2026 +0700
| 
|     docs: log AI audit entry for the cart FR-07 automation session
| 
|  docs/anh-khoa/ai audit report.md | 105 +++++++++++++++++++++++++++++++++++++
|  1 file changed, 105 insertions(+)
| 
* commit e64fc50f232465cdd762d13ebb5de60c51e16355
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Fri Aug 7 22:07:12 2026 +0700
| 
|     test(cart): automate all 13 FR-07 test cases (data-driven)
|     
|     Add cart.json + cart.spec.ts covering the shopping cart feature, with
|     expectations held to the SRS rather than to current SUT behaviour.
|     
|     Gap analysis against the source turned up 12 deviations from FR-07, six
|     beyond the ones already suspected. The most consequential is
|     ProductDetail.jsx:21-31, where handleAddToCart swallows the first click:
|     seeding the cart through that page would have made TC-CART-011 pass for
|     the wrong reason (empty cart matching "must be blocked"), so seeding is
|     split between the home-page button and the detail page depending on what
|     each case actually targets.
|     
|     Cart state lives only in React state with no persistence, so every
|     page.goto() wipes it — all setup navigates via in-app links instead.
| 
|  tests/e2e/specs/cart.spec.ts  | 420 ++++++++++++++++++++++++++++++++++++++++
|  tests/e2e/test-data/cart.json | 205 ++++++++++++++++++++
|  2 files changed, 625 insertions(+)
| 
* commit 75c46a4b3fadf05d111006c13e09fbf80deb2a8d
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Fri Aug 7 00:37:04 2026 +0700
| 
|     docs: log AI audit entry for the register 17-case expansion
| 
|  docs/anh-khoa/ai audit report.md | 216 +++++++++++++++++++++++++++++++++++++
|  1 file changed, 216 insertions(+)
| 
* commit eb67fb8d43c41640acd00070bf204a315e2c18b0
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Thu Aug 6 09:15:23 2026 +0700
| 
|     test(register): cover all 17 FR-01 test cases (data-driven)
|     
|     Expand register.json from 3 to 17/17 cases (domain + BVA + SEC-01).
|     Add confirmField/dbHash kinds to register.spec.ts for two gaps found
|     against the SRS: the form has no "confirm password" field, and the
|     frontend password regex blocks every password that is actually valid
|     per FR-01. Drop the flaky waitForResponse on the redirect branch, and
|     add a dedicated API-based test for TC-REGISTER-017 (SEC-01).
| 
|  tests/e2e/specs/register.spec.ts  |  83 +++++++++++++--
|  tests/e2e/test-data/register.json | 203 +++++++++++++++++++++++++++++++++++-
|  2 files changed, 276 insertions(+), 10 deletions(-)
| 
* commit 31023aa71768e42d1a90b01f9c7835a2ac12c9b7
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Wed Aug 5 23:51:32 2026 +0700
| 
|     docs: 📖 add AI audit report cho phần setup automation
|     
|     Log phiên làm việc dựng khung Playwright + spec FR-01 theo mục 9 của đề
|     (công cụ AI, thời gian, prompt gốc, full output không tóm tắt).
|     
|     Kèm phần human review: getByLabel() không dùng được trên SUT này, selector
|     banner lỗi còn bám class Tailwind, và dự đoán TC-REGISTER-001/003 sẽ fail do
|     regex mật khẩu trong Register.jsx mâu thuẫn với hướng dẫn hiển thị trên UI.
| 
|  docs/anh-khoa/ai audit report.md | 325 +++++++++++++++++++++++++++++++++++++
|  1 file changed, 325 insertions(+)
| 
* commit 7bbe64616d604622d420eccc8d8405345193bce6
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Wed Aug 5 23:51:14 2026 +0700
| 
|     test(register): ✅ automate FR-01 theo hướng data-driven
|     
|     Tự động hoá TC-REGISTER-001/002/003, dữ liệu tách hẳn ra
|     test-data/register.json (không hardcode inline theo yêu cầu HW04).
|     
|     4 assertion pattern:
|     1. Điều hướng      - expect(page).toHaveURL()
|     2. Thuộc tính DOM  - validity.valueMissing (constraint validation API)
|     3. Nội dung text   - expect(locator).toContainText()
|     4. Network         - đếm POST /api/register để kiểm chứng "không có tài
|                          khoản nào được tạo"
|     
|     Ghi chú selector: form Đăng ký không gắn htmlFor/id giữa label và input,
|     cũng không có data-testid, nên getByLabel() không dùng được. Thay bằng cách
|     thu hẹp theo khối div chứa nhãn của từng trường.
|     
|     Token {{unique}} trong file dữ liệu được thay lúc chạy để thoả precondition
|     "email chưa tồn tại trong hệ thống" mà không phụ thuộc trạng thái DB.
|     
|     Kiểm chứng: playwright test --list ra đúng 9 test (3 TC x 3 browser),
|     tsc --noEmit sạch.
| 
|  tests/e2e/specs/register.spec.ts  | 103 ++++++++++++++++++++++++++++++++++++
|  tests/e2e/test-data/register.json |  48 +++++++++++++++++
|  2 files changed, 151 insertions(+)
| 
* commit fac99fdadfd33a1978d726a52be194cdcc874239
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Wed Aug 5 23:50:53 2026 +0700
| 
|     chore(e2e): ⚙️ setup Playwright project cho 3 browser
|     
|     - 3 project: chromium / firefox / webkit
|     - HTML reporter nhúng "Run by: 23127211" + ISO timestamp vào title và metadata
|       để thoả mục 11 (Anti-AI-Cheat)
|     - REPORT_NAME cho phép tách report theo từng feature x browser (cần đủ 9 report)
|     - workers=1 vì SUT dùng chung một SQLite DB, chạy song song sẽ phá state của nhau
|     - .gitignore: bỏ qua test-results/ và thư mục report tạm reports/html/latest/
| 
|  tests/e2e/.gitignore           |  6 ++++
|  tests/e2e/package.json         | 17 +++++++++++
|  tests/e2e/playwright.config.ts | 65 ++++++++++++++++++++++++++++++++++++++++
|  tests/e2e/tsconfig.json        | 15 ++++++++++
|  4 files changed, 103 insertions(+)
| 
* commit 39ea4281fb2c0ec6f1ce1a528c4f9eab2b013a7b
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Wed Aug 5 23:36:15 2026 +0700
| 
|     docs: 📖 add agent skill
| 
|  .agents/skills/ai-audit-logger/SKILL.md           |  26 ++
|  .../references/FR-01-audit-entry.md               |  46 ++++
|  .../templates/audit-entry-template.md             |  12 +
|  .agents/skills/boundary-value-analysis/SKILL.md   |  27 ++
|  .../references/TC-REGISTER-015.md                 |  28 ++
|  .../templates/output-format-template.md           |   9 +
|  .agents/skills/bug-reporting/SKILL.md             |  26 ++
|  .../bug-reporting/references/BUG-PRODUCT-002.md   |  69 +++++
|  .../skills/bug-reporting/templates/bug_report.md  |  42 +++
|  .agents/skills/domain-testing/SKILL.md            |  53 ++++
|  .../domain-testing/references/TC-REGISTER-001.md  |  27 ++
|  .../templates/output-format-template.md           |  34 +++
|  .agents/skills/playwright-automation/SKILL.md     | 130 +++++++++
|  .../assets/data-file.template.json                |  57 ++++
|  .../assets/gap-analysis.template.md               |  75 ++++++
|  .../assets/playwright.config.template.ts          |  52 ++++
|  .../references/assertion-patterns.md              |  95 +++++++
|  .../references/data-driven-patterns.md            | 118 +++++++++
|  .../references/gap-analysis-guide.md              |  84 ++++++
|  .../references/multi-browser-report.md            | 125 +++++++++
|  .agents/skills/requirement-analysis/SKILL.md      |  29 +++
|  .../requirement-analysis/references/FR-01.md      |  32 +++
|  .../references/TC-LOGIN-001.md                    |  33 +++
|  .../templates/output-format-template.md           |   8 +
|  .agents/skills/test-runner/SKILL.md               |  63 +++++
|  .../test-runner/references/automated-test-run.md  |  71 +++++
|  .../templates/output-format-template.md           |  28 ++
|  .agents/skills/traceability-matrix/SKILL.md       |  39 +++
|  .../references/traceability-matrix.md             |  62 +++++
|  .../templates/output-format-template.md           |  19 ++
|  .claude/settings.json                             |  44 ++++
|  requirements/Automation Web Seminar.md            | 275 ++++++++++++++++++++
|  requirements/HW04-Automation Testing.md           | 188 +++++++++++++
|  33 files changed, 2026 insertions(+)
| 
* commit b10cdf5cb19b5626cd80f106ed95579200e865df
| Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| Date:   Mon Aug 3 16:19:54 2026 +0700
| 
|     docs: 📖 add test case for 3 feats
| 
|  tests/test-cases/cart/TC-CART-001.md         | 26 +++++++++++++++++++
|  tests/test-cases/cart/TC-CART-002.md         | 25 ++++++++++++++++++
|  tests/test-cases/cart/TC-CART-003.md         | 24 ++++++++++++++++++
|  tests/test-cases/cart/TC-CART-004.md         | 25 ++++++++++++++++++
|  tests/test-cases/cart/TC-CART-005.md         | 24 ++++++++++++++++++
|  tests/test-cases/cart/TC-CART-006.md         | 27 ++++++++++++++++++++
|  tests/test-cases/cart/TC-CART-007.md         | 26 +++++++++++++++++++
|  tests/test-cases/cart/TC-CART-008.md         | 25 ++++++++++++++++++
|  tests/test-cases/cart/TC-CART-009.md         | 25 ++++++++++++++++++
|  tests/test-cases/cart/TC-CART-010.md         | 21 ++++++++++++++++
|  tests/test-cases/cart/TC-CART-011.md         | 35 ++++++++++++++++++++++++++
|  tests/test-cases/cart/TC-CART-012.md         | 27 ++++++++++++++++++++
|  tests/test-cases/cart/TC-CART-013.md         | 32 +++++++++++++++++++++++
|  tests/test-cases/login/TC-LOGIN-001.md       | 33 ------------------------
|  tests/test-cases/product/TC-PRODUCT-001.md   | 26 +++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-002.md   | 25 ++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-003.md   | 25 ++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-004.md   | 25 ++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-005.md   | 26 +++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-006.md   | 26 +++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-007.md   | 26 +++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-008.md   | 26 +++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-009.md   | 26 +++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-010.md   | 26 +++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-011.md   | 26 +++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-012.md   | 25 ++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-013.md   | 25 ++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-014.md   | 25 ++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-015.md   | 25 ++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-016.md   | 28 +++++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-017.md   | 24 ++++++++++++++++++
|  tests/test-cases/product/TC-PRODUCT-018.md   | 24 ++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-001.md | 27 ++++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-002.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-003.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-004.md | 27 ++++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-005.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-006.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-007.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-008.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-009.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-010.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-011.md | 27 ++++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-012.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-013.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-014.md | 26 +++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-015.md | 28 +++++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-016.md | 28 +++++++++++++++++++++
|  tests/test-cases/register/TC-REGISTER-017.md | 28 +++++++++++++++++++++
|  49 files changed, 1252 insertions(+), 33 deletions(-)
|   
| * commit 79756e96152061bccf98ce9b2190c19f0a1963e7
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Sat Aug 8 20:37:35 2026 +0700
| | 
| |     docs: translate hw4 reports to vietnamese
| |     
| |     - Main Report (23127152-HW04-Main-Report.md): Translated 9 sections
| |     - README.md: Translated self-assessment & test summary
| |     - SUBMISSION_CHECKLIST.md: Translated compliance checklist
| | 
| |  23127152-hw4/23127152-HW04-Main-Report.md | 676 +++++++++++++-------------
| |  23127152-hw4/README.md                    | 412 ++++++++--------
| |  23127152-hw4/SUBMISSION_CHECKLIST.md      | 332 ++++++-------
| |  3 files changed, 710 insertions(+), 710 deletions(-)
| | 
| * commit 6c90ee5415ce459552ad9b1849e7437654afdb3d
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Sat Aug 8 20:27:26 2026 +0700
| | 
| |     docs: update git commit log with new commit hashes
| | 
| |  23127152-hw4/GIT_COMMIT_LOG.txt | 34 ++++++++++++++++++----------------
| |  1 file changed, 18 insertions(+), 16 deletions(-)
| | 
| * commit 24efad7220657209b35937725859696fdadafea2
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Sat Aug 8 22:51:00 2026 +0700
| | 
| |     submit
| | 
| |  23127152-hw4/23127152-HW04-Main-Report.md        | 656 +++++++++++++++++++
| |  23127152-hw4/README.md                           | 315 +++++++++
| |  23127152-hw4/SUBMISSION_CHECKLIST.md             | 320 +++++++++
| |  .../eshop-test-automation-agent-skill/SKILL.md   | 162 +++++
| |  .../scripts/append-ai-audit.js                   |  68 ++
| |  .../scripts/inject-report-banner.js              |  57 ++
| |  .../templates/playwright.config.template.ts      |  44 ++
| |  .../templates/test-data-schema.example.json      |  23 +
| |  8 files changed, 1645 insertions(+)
| | 
| * commit 3561966154c9733a000f052d8ec0baa6d469c687
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Sat Aug 8 22:37:00 2026 +0700
| | 
| |     finalize hw4
| | 
| |  .claude/skills/eshop-test-automation/SKILL.md    | 162 ++++
| |  .../scripts/append-ai-audit.js                   |  68 ++
| |  .../scripts/inject-report-banner.js              |  57 ++
| |  .../templates/playwright.config.template.ts      |  44 +
| |  .../templates/test-data-schema.example.json      |  23 +
| |  23127152-hw4/bug-reports/fr02-login/BUG-01.md    |  51 ++
| |  .../bug-reports/fr10-orderstate/BUG-06.md        |  44 +
| |  .../bug-reports/fr10-orderstate/BUG-07.md        |  49 +
| |  .../bug-reports/fr18-ordermanagement/BUG-08.md   |  53 ++
| |  .../bug-reports/fr18-ordermanagement/BUG-09.md   |  56 ++
| |  .../bug-reports/fr18-ordermanagement/BUG-14.md   |  63 ++
| |  .../screenshots/BUG-01-fr02-early-lockout.png    | Bin 0 -> 38373 bytes
| |  .../BUG-06-fr10-canceled-to-delivered-1.png      | Bin 0 -> 123184 bytes
| |  .../BUG-06-fr10-canceled-to-delivered-2.png      | Bin 0 -> 98573 bytes
| |  .../BUG-07-fr10-user-cancel-shipping-1.png       | Bin 0 -> 122183 bytes
| |  .../BUG-07-fr10-user-cancel-shipping-2.png       | Bin 0 -> 100516 bytes
| |  .../screenshots/BUG-09a-fr18-revenue-before.png  | Bin 0 -> 11971 bytes
| |  .../screenshots/BUG-09b-fr18-revenue-after.png   | Bin 0 -> 12158 bytes
| |  23127152-hw4/e2e/package-lock.json               |  78 ++
| |  .../3b59ce55d86f303176b68548d1f79c596e0a3ace.zip | Bin 0 -> 303167 bytes
| |  .../51b3a6bc3f2c6d726b79a6647314a5e2b491585b.png | Bin 0 -> 38373 bytes
| |  ...557cbf4e9fb16f94234d627f2346cc37e6ad2da8.webm | Bin 0 -> 48570 bytes
| |  .../e14d731417a3f754b5ed028195b4ccb701c98f1a.md  | 178 ++++
| |  .../e2e/reports/fr02-login/chromium/index.html   |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../chromium/trace/assets/urlMatch-L3liM589.js   |   1 +
| |  .../chromium/trace/codeMirrorModule.-QdMvsKi.css |   1 +
| |  .../chromium/trace/codicon.DCmgc-ay.ttf          | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../fr02-login/chromium/trace/index.B_TqY17P.css |   1 +
| |  .../fr02-login/chromium/trace/index.KZ4wOW1K.js  |   1 +
| |  .../reports/fr02-login/chromium/trace/index.html |  44 +
| |  .../chromium/trace/manifest.webmanifest          |  16 +
| |  .../chromium/trace/playwright-logo.svg           |   9 +
| |  .../chromium/trace/snapshot.B_Jk1wbt.js          |   1 +
| |  .../fr02-login/chromium/trace/snapshot.html      |  10 +
| |  .../fr02-login/chromium/trace/sw.bundle.js       |   4 +
| |  .../chromium/trace/uiMode.C7UW1sC9.css           |   1 +
| |  .../fr02-login/chromium/trace/uiMode.Dzuouizj.js |   5 +
| |  .../fr02-login/chromium/trace/uiMode.html        |  18 +
| |  .../chromium/trace/xtermModule.kHJ-D0s7.css      |   1 +
| |  .../85377b09f83b0ff5c1fa160402fd92e8906b6c21.png | Bin 0 -> 45803 bytes
| |  ...cc5b3bb9ddbd0ffd641e3e5387689c4e9200137c.webm | Bin 0 -> 47208 bytes
| |  .../e14d731417a3f754b5ed028195b4ccb701c98f1a.md  | 178 ++++
| |  .../ed2e2652eb89ec20e74d93e164f1b29e71814470.zip | Bin 0 -> 223594 bytes
| |  .../e2e/reports/fr02-login/firefox/index.html    |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../firefox/trace/assets/urlMatch-L3liM589.js    |   1 +
| |  .../firefox/trace/codeMirrorModule.-QdMvsKi.css  |   1 +
| |  .../firefox/trace/codicon.DCmgc-ay.ttf           | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../fr02-login/firefox/trace/index.B_TqY17P.css  |   1 +
| |  .../fr02-login/firefox/trace/index.KZ4wOW1K.js   |   1 +
| |  .../reports/fr02-login/firefox/trace/index.html  |  44 +
| |  .../firefox/trace/manifest.webmanifest           |  16 +
| |  .../fr02-login/firefox/trace/playwright-logo.svg |   9 +
| |  .../firefox/trace/snapshot.B_Jk1wbt.js           |   1 +
| |  .../fr02-login/firefox/trace/snapshot.html       |  10 +
| |  .../fr02-login/firefox/trace/sw.bundle.js        |   4 +
| |  .../fr02-login/firefox/trace/uiMode.C7UW1sC9.css |   1 +
| |  .../fr02-login/firefox/trace/uiMode.Dzuouizj.js  |   5 +
| |  .../reports/fr02-login/firefox/trace/uiMode.html |  18 +
| |  .../firefox/trace/xtermModule.kHJ-D0s7.css       |   1 +
| |  .../90ef5e37f2a1b97b199d4875ecf32866b880f0b6.md  | 178 ++++
| |  .../c7146bc9019c663c50782a65dcefb1eef50a86c5.png | Bin 0 -> 156776 bytes
| |  ...cfe4cceb1882951849b64bcb68701cda70745587.webm | Bin 0 -> 40768 bytes
| |  .../e1c1d32096fccdd709d374e6932ab631dbb9b464.zip | Bin 0 -> 252798 bytes
| |  .../e2e/reports/fr02-login/webkit/index.html     |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../webkit/trace/assets/urlMatch-L3liM589.js     |   1 +
| |  .../webkit/trace/codeMirrorModule.-QdMvsKi.css   |   1 +
| |  .../fr02-login/webkit/trace/codicon.DCmgc-ay.ttf | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../fr02-login/webkit/trace/index.B_TqY17P.css   |   1 +
| |  .../fr02-login/webkit/trace/index.KZ4wOW1K.js    |   1 +
| |  .../reports/fr02-login/webkit/trace/index.html   |  44 +
| |  .../fr02-login/webkit/trace/manifest.webmanifest |  16 +
| |  .../fr02-login/webkit/trace/playwright-logo.svg  |   9 +
| |  .../fr02-login/webkit/trace/snapshot.B_Jk1wbt.js |   1 +
| |  .../fr02-login/webkit/trace/snapshot.html        |  10 +
| |  .../reports/fr02-login/webkit/trace/sw.bundle.js |   4 +
| |  .../fr02-login/webkit/trace/uiMode.C7UW1sC9.css  |   1 +
| |  .../fr02-login/webkit/trace/uiMode.Dzuouizj.js   |   5 +
| |  .../reports/fr02-login/webkit/trace/uiMode.html  |  18 +
| |  .../webkit/trace/xtermModule.kHJ-D0s7.css        |   1 +
| |  .../28a558d4cf6bc03051c029e36dee6dcbe5c44b4b.md  | 159 ++++
| |  .../47f2f1d9cf82f1a49721026dba4842593192407e.zip | Bin 0 -> 1635688 bytes
| |  .../5919e10c8e0e210f04c239ed5b7015fe9a9936f6.md  | 159 ++++
| |  .../5fb499211485a2e9eb204eea25747c0f668904a1.png | Bin 0 -> 102086 bytes
| |  .../84935f36872ce5ceb6dfdc64172b53ca3097d5ae.png | Bin 0 -> 108784 bytes
| |  .../9a0d339c847116a88aad850991a0612045232764.png | Bin 0 -> 119897 bytes
| |  .../c5dcceaca132a5e894ff30c5eb06497e00ce8bfd.png | Bin 0 -> 117431 bytes
| |  .../e128639e5036aee12a44af79c6c9adb55c4ad0d3.zip | Bin 0 -> 1295440 bytes
| |  .../reports/fr10-orderstate/chromium/index.html  |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../chromium/trace/assets/urlMatch-L3liM589.js   |   1 +
| |  .../chromium/trace/codeMirrorModule.-QdMvsKi.css |   1 +
| |  .../chromium/trace/codicon.DCmgc-ay.ttf          | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../chromium/trace/index.B_TqY17P.css            |   1 +
| |  .../chromium/trace/index.KZ4wOW1K.js             |   1 +
| |  .../fr10-orderstate/chromium/trace/index.html    |  44 +
| |  .../chromium/trace/manifest.webmanifest          |  16 +
| |  .../chromium/trace/playwright-logo.svg           |   9 +
| |  .../chromium/trace/snapshot.B_Jk1wbt.js          |   1 +
| |  .../fr10-orderstate/chromium/trace/snapshot.html |  10 +
| |  .../fr10-orderstate/chromium/trace/sw.bundle.js  |   4 +
| |  .../chromium/trace/uiMode.C7UW1sC9.css           |   1 +
| |  .../chromium/trace/uiMode.Dzuouizj.js            |   5 +
| |  .../fr10-orderstate/chromium/trace/uiMode.html   |  18 +
| |  .../chromium/trace/xtermModule.kHJ-D0s7.css      |   1 +
| |  .../16a95777d8fc51f5ae138e9cccdb8daec8bac674.zip | Bin 0 -> 7676377 bytes
| |  .../5b62f75e230da7d7f5d6e1b7a29f6e1ed1f9af7c.md  | 152 +++
| |  .../68ca9c0b522af89dbe9f2fd0261e3ea8ccdef845.png | Bin 0 -> 140022 bytes
| |  .../841f8cbc62ce2bb94611e3e07159c9c860574c4b.zip | Bin 0 -> 2754321 bytes
| |  .../a610992fdf73b29902d01be096af19e617eb54fc.png | Bin 0 -> 140186 bytes
| |  .../b3a9fbe891aa33af7b803084a6087b97b9a46893.md  | 159 ++++
| |  .../b8290a0b1cc5ddb40a0ddf8b6109ea283b8b8bc4.png | Bin 0 -> 121916 bytes
| |  .../d0e54d886c8d8f203e584c11ebeb2441488a81cb.png | Bin 0 -> 123642 bytes
| |  .../reports/fr10-orderstate/firefox/index.html   |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../firefox/trace/assets/urlMatch-L3liM589.js    |   1 +
| |  .../firefox/trace/codeMirrorModule.-QdMvsKi.css  |   1 +
| |  .../firefox/trace/codicon.DCmgc-ay.ttf           | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../firefox/trace/index.B_TqY17P.css             |   1 +
| |  .../firefox/trace/index.KZ4wOW1K.js              |   1 +
| |  .../fr10-orderstate/firefox/trace/index.html     |  44 +
| |  .../firefox/trace/manifest.webmanifest           |  16 +
| |  .../firefox/trace/playwright-logo.svg            |   9 +
| |  .../firefox/trace/snapshot.B_Jk1wbt.js           |   1 +
| |  .../fr10-orderstate/firefox/trace/snapshot.html  |  10 +
| |  .../fr10-orderstate/firefox/trace/sw.bundle.js   |   4 +
| |  .../firefox/trace/uiMode.C7UW1sC9.css            |   1 +
| |  .../firefox/trace/uiMode.Dzuouizj.js             |   5 +
| |  .../fr10-orderstate/firefox/trace/uiMode.html    |  18 +
| |  .../firefox/trace/xtermModule.kHJ-D0s7.css       |   1 +
| |  .../24f26cea5faef72f4c1c1085f07eaa6ed0e23079.zip | Bin 0 -> 13934 bytes
| |  .../31ff990a1e0af6b3c051a6dd84924eb05e6163e0.md  | 105 +++
| |  .../383ea436f1051691ce0ba36c7b8793cecdf94b6a.zip | Bin 0 -> 13266 bytes
| |  .../77212e3979be49f976e9b6e73069567fd4a5b816.md  | 105 +++
| |  .../8321d0eb5a92bede9cd60d6a6d14fecf50edd28d.md  | 105 +++
| |  .../b01ea43e3297ce99e320ec4a126b66c68e710040.zip | Bin 0 -> 12421 bytes
| |  .../reports/fr10-orderstate/webkit/index.html    |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../webkit/trace/assets/urlMatch-L3liM589.js     |   1 +
| |  .../webkit/trace/codeMirrorModule.-QdMvsKi.css   |   1 +
| |  .../webkit/trace/codicon.DCmgc-ay.ttf            | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../webkit/trace/index.B_TqY17P.css              |   1 +
| |  .../webkit/trace/index.KZ4wOW1K.js               |   1 +
| |  .../fr10-orderstate/webkit/trace/index.html      |  44 +
| |  .../webkit/trace/manifest.webmanifest            |  16 +
| |  .../webkit/trace/playwright-logo.svg             |   9 +
| |  .../webkit/trace/snapshot.B_Jk1wbt.js            |   1 +
| |  .../fr10-orderstate/webkit/trace/snapshot.html   |  10 +
| |  .../fr10-orderstate/webkit/trace/sw.bundle.js    |   4 +
| |  .../webkit/trace/uiMode.C7UW1sC9.css             |   1 +
| |  .../webkit/trace/uiMode.Dzuouizj.js              |   5 +
| |  .../fr10-orderstate/webkit/trace/uiMode.html     |  18 +
| |  .../webkit/trace/xtermModule.kHJ-D0s7.css        |   1 +
| |  .../07ed7a36f96ec6375d57da2b5939428c12298cdf.png | Bin 0 -> 93356 bytes
| |  .../0c4dc7fe9ccde2ae94115d596ef6baa4809a1d97.md  | 756 +++++++++++++++
| |  .../11e45a744b6a6e2eb5413d0d89654065049e248c.md  | 176 ++++
| |  .../1ca10767188e19acb272aa76c66f37c7e1328d17.png | Bin 0 -> 93245 bytes
| |  .../1d8a3f5eaf80228f20664f2757322c7c134e4666.zip | Bin 0 -> 199902 bytes
| |  .../26164a6f70513f780caacac16a86d1561aacb1a2.md  | 746 +++++++++++++++
| |  ...39f70e4a3c78354734650d8eeb858d0bab1cd07a.webm | Bin 0 -> 31736 bytes
| |  .../402599ccbb56ce3fd52e3623e5de032f02c83e6a.md  | 176 ++++
| |  .../47a53d6737b90564c38e18f4f56001b5bb1ba1a1.zip | Bin 0 -> 324575 bytes
| |  .../6216e98579975c0cd80118c1b44335a9b8c64612.png | Bin 0 -> 32800 bytes
| |  .../685e5c436ad2f162979fcc231abb12a10b8030d9.zip | Bin 0 -> 212164 bytes
| |  ...758ee67dc331fafb02f23a3d21c44b1e4a36c53c.webm | Bin 0 -> 1954 bytes
| |  .../78485ad26ab49de2007fe98b0854715a58aaf5b6.png | Bin 0 -> 4254 bytes
| |  ...810a1526d76a0e699b411fb8590fdbcf78f838ed.webm | Bin 0 -> 78307 bytes
| |  .../8f5e6d1135e7e69a27cba1a86fa11cb26d06508d.md  | 165 ++++
| |  ...93da972f68f9828055f5aad115f3f359463b79ab.webm | Bin 0 -> 32738 bytes
| |  ...9da07951b99d4aae843b29bedb014731a7c59d1b.webm | Bin 0 -> 74872 bytes
| |  .../acf3c6909fbbf9d9ea979ff03b81e6b14b5dea26.zip | Bin 0 -> 16867 bytes
| |  .../cfa049855298b70d19c256296df6c9f0edc5e78c.png | Bin 0 -> 32507 bytes
| |  .../d658751e7946a5e9908125f7f98c4575ad1050c5.zip | Bin 0 -> 331326 bytes
| |  .../fr18-ordermanagement/chromium/index.html     |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../chromium/trace/assets/urlMatch-L3liM589.js   |   1 +
| |  .../chromium/trace/codeMirrorModule.-QdMvsKi.css |   1 +
| |  .../chromium/trace/codicon.DCmgc-ay.ttf          | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../chromium/trace/index.B_TqY17P.css            |   1 +
| |  .../chromium/trace/index.KZ4wOW1K.js             |   1 +
| |  .../chromium/trace/index.html                    |  44 +
| |  .../chromium/trace/manifest.webmanifest          |  16 +
| |  .../chromium/trace/playwright-logo.svg           |   9 +
| |  .../chromium/trace/snapshot.B_Jk1wbt.js          |   1 +
| |  .../chromium/trace/snapshot.html                 |  10 +
| |  .../chromium/trace/sw.bundle.js                  |   4 +
| |  .../chromium/trace/uiMode.C7UW1sC9.css           |   1 +
| |  .../chromium/trace/uiMode.Dzuouizj.js            |   5 +
| |  .../chromium/trace/uiMode.html                   |  18 +
| |  .../chromium/trace/xtermModule.kHJ-D0s7.css      |   1 +
| |  .../36b17d9b139a822b6f7d2a623eccecf6768cd5b2.md  | 176 ++++
| |  .../469f0d1ebb5145d84abf6637ebe7739ad39fa61a.png | Bin 0 -> 40175 bytes
| |  .../4c5a182f9d1d2c5953d43666ce77cabd6dcc1c18.zip | Bin 0 -> 370418 bytes
| |  .../642dd7cd0e49121feea1fbd0ac44cfa36ff739ec.md  | 176 ++++
| |  .../6479d622e7747471b50a7f0bf638ea8fa1f72ac7.md  | 837 +++++++++++++++++
| |  .../83caa3a105d4142c7c27344cc1cdd472c3057564.zip | Bin 0 -> 174256 bytes
| |  .../858b30225b86ef81a8f2a9c3f9dcef687cbe7cdd.zip | Bin 0 -> 367309 bytes
| |  ...8d6b7c33311f4a8abcca31c2dd3c7093e686b947.webm | Bin 0 -> 2131 bytes
| |  .../8f5e6d1135e7e69a27cba1a86fa11cb26d06508d.md  | 165 ++++
| |  .../953ab0e9b7c2191932dcf870a0838988dca445e7.png | Bin 0 -> 107515 bytes
| |  .../981948015c0887d69d9e5227542eb23d9dfad58d.png | Bin 0 -> 107255 bytes
| |  ...98f855daeea25c25f1337bf3d227437a6135398f.webm | Bin 0 -> 32276 bytes
| |  .../b621677fd2a4366474664676f6607a8891eb92de.md  | 827 +++++++++++++++++
| |  .../ba4d3165a14e2bdd360c8607549c55b5c86fc70e.zip | Bin 0 -> 167800 bytes
| |  ...bb7935091987e9acb496ecac8141cfc4758908a6.webm | Bin 0 -> 77922 bytes
| |  .../c05f9e36235178e71045a391992e6ea166871693.png | Bin 0 -> 39960 bytes
| |  ...cd8d422045562d97092de505d2a4e2be3da3ff6f.webm | Bin 0 -> 56783 bytes
| |  .../d7a5eed98f52b3a8ab83bfb6cda4263aac918b89.png | Bin 0 -> 5212 bytes
| |  ...d9daec8f4e7b5ab854e152c57e3e52617f598937.webm | Bin 0 -> 36413 bytes
| |  .../f15c3e9d44c0f4f6d4e3ede04251a962a5dc253a.zip | Bin 0 -> 17572 bytes
| |  .../fr18-ordermanagement/firefox/index.html      |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../firefox/trace/assets/urlMatch-L3liM589.js    |   1 +
| |  .../firefox/trace/codeMirrorModule.-QdMvsKi.css  |   1 +
| |  .../firefox/trace/codicon.DCmgc-ay.ttf           | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../firefox/trace/index.B_TqY17P.css             |   1 +
| |  .../firefox/trace/index.KZ4wOW1K.js              |   1 +
| |  .../firefox/trace/index.html                     |  44 +
| |  .../firefox/trace/manifest.webmanifest           |  16 +
| |  .../firefox/trace/playwright-logo.svg            |   9 +
| |  .../firefox/trace/snapshot.B_Jk1wbt.js           |   1 +
| |  .../firefox/trace/snapshot.html                  |  10 +
| |  .../firefox/trace/sw.bundle.js                   |   4 +
| |  .../firefox/trace/uiMode.C7UW1sC9.css            |   1 +
| |  .../firefox/trace/uiMode.Dzuouizj.js             |   5 +
| |  .../firefox/trace/uiMode.html                    |  18 +
| |  .../firefox/trace/xtermModule.kHJ-D0s7.css       |   1 +
| |  .../171e8e6231921f9a1b3d33bb5e891f76d8c88a46.md  | 176 ++++
| |  .../18fea8675f25e581d6f285fedbdb574424448698.zip | Bin 0 -> 18465 bytes
| |  .../25db5bdb4423084d753e0793486c1f8ac638be32.zip | Bin 0 -> 403833 bytes
| |  .../28ff6e7af5147abd3fbb83efde60a852a126b15f.zip | Bin 0 -> 204093 bytes
| |  ...308ee82fd629dd0a835de63fec8de9a6b391c875.webm | Bin 0 -> 3111 bytes
| |  .../519874c90b026e864332369e27b133b93b2bbada.png | Bin 0 -> 67988 bytes
| |  .../59d00b3c608d1c07143a075a4ed09dca762dc449.png | Bin 0 -> 291504 bytes
| |  ...6b9422d68d4f9b20377ddbcf65329282576d1bcf.webm | Bin 0 -> 32445 bytes
| |  .../723f421c32762bdd5195826a49d42e52b9c27ade.png | Bin 0 -> 134868 bytes
| |  .../8f5e6d1135e7e69a27cba1a86fa11cb26d06508d.md  | 165 ++++
| |  ...91e8898f845b5c056151a90faefa47e2f6bb175d.webm | Bin 0 -> 58792 bytes
| |  .../98ce2090405a1bfafa46b9492b3e1ba5bb7b934d.md  | 918 +++++++++++++++++++
| |  .../a4bbd088424d5973305c509e0220def0c2a3f421.md  | 176 ++++
| |  .../af41ffa6fedf54984ef9abcf01446374de6070b2.png | Bin 0 -> 292622 bytes
| |  .../cc37815772b1a2d4fa3003a9337b49e09476f814.png | Bin 0 -> 134888 bytes
| |  .../d740674c1933763cadc041154c952ece78e108ae.md  | 908 ++++++++++++++++++
| |  ...d9aaaef8ee387019bfdee10a091df031884b6c36.webm | Bin 0 -> 66827 bytes
| |  .../edcbdf449b6016387d439b12e75a981e5e15ece8.zip | Bin 0 -> 217287 bytes
| |  .../f35b3dd87f5ab4af60929f8390632d857fd4ec84.zip | Bin 0 -> 423026 bytes
| |  ...f9e29446f95cbe46984b3206a0278965fb9b8339.webm | Bin 0 -> 32671 bytes
| |  .../fr18-ordermanagement/webkit/index.html       |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../webkit/trace/assets/urlMatch-L3liM589.js     |   1 +
| |  .../webkit/trace/codeMirrorModule.-QdMvsKi.css   |   1 +
| |  .../webkit/trace/codicon.DCmgc-ay.ttf            | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../webkit/trace/index.B_TqY17P.css              |   1 +
| |  .../webkit/trace/index.KZ4wOW1K.js               |   1 +
| |  .../fr18-ordermanagement/webkit/trace/index.html |  44 +
| |  .../webkit/trace/manifest.webmanifest            |  16 +
| |  .../webkit/trace/playwright-logo.svg             |   9 +
| |  .../webkit/trace/snapshot.B_Jk1wbt.js            |   1 +
| |  .../webkit/trace/snapshot.html                   |  10 +
| |  .../webkit/trace/sw.bundle.js                    |   4 +
| |  .../webkit/trace/uiMode.C7UW1sC9.css             |   1 +
| |  .../webkit/trace/uiMode.Dzuouizj.js              |   5 +
| |  .../webkit/trace/uiMode.html                     |  18 +
| |  .../webkit/trace/xtermModule.kHJ-D0s7.css        |   1 +
| |  ...04d30a3d6897ae3933d4d39eb430fba8a44258b4.webm | Bin 0 -> 40546 bytes
| |  .../24717ae92fb73a7d5afefac3cd72411b4905c492.md  | 109 +++
| |  .../3c614336e5dce9247a939b827f0c5e145caaf634.png | Bin 0 -> 29260 bytes
| |  .../4af778bab35015f23b72875e19a168420ca69b33.png | Bin 0 -> 133830 bytes
| |  ...5b9d75a4f333d0a145d4e35899cf819c23423e31.webm | Bin 0 -> 45822 bytes
| |  .../72cbfd50bc950ca032c020d93b435241b42321dc.zip | Bin 0 -> 137323 bytes
| |  .../95751e8068df3542f2577e49d07457144a1d7881.md  | 109 +++
| |  .../b7f379321ef0e585ccbb4f67fb4832881f288383.zip | Bin 0 -> 186005 bytes
| |  ...cdc4e2fafe416d7727ef042f1347813c471ce4a1.webm | Bin 0 -> 39000 bytes
| |  .../d010bf9373af361223fbe3bd0401f1f2f43831b5.zip | Bin 0 -> 169177 bytes
| |  .../d21253b4fca5d6ecc190d2540d375204883c5339.png | Bin 0 -> 35512 bytes
| |  .../e2e/reports/register/all-browsers/index.html |  49 +
| |  .../trace/assets/codeMirrorModule-rXmQmLUY.js    |  32 +
| |  .../trace/assets/defaultSettingsView-B-dXF5JN.js | 181 ++++
| |  .../trace/assets/urlMatch-L3liM589.js            |   1 +
| |  .../trace/codeMirrorModule.-QdMvsKi.css          |   1 +
| |  .../all-browsers/trace/codicon.DCmgc-ay.ttf      | Bin 0 -> 80340 bytes
| |  .../trace/defaultSettingsView.BLFoOugd.css       |   1 +
| |  .../all-browsers/trace/index.B_TqY17P.css        |   1 +
| |  .../all-browsers/trace/index.KZ4wOW1K.js         |   1 +
| |  .../register/all-browsers/trace/index.html       |  44 +
| |  .../all-browsers/trace/manifest.webmanifest      |  16 +
| |  .../all-browsers/trace/playwright-logo.svg       |   9 +
| |  .../all-browsers/trace/snapshot.B_Jk1wbt.js      |   1 +
| |  .../register/all-browsers/trace/snapshot.html    |  10 +
| |  .../register/all-browsers/trace/sw.bundle.js     |   4 +
| |  .../all-browsers/trace/uiMode.C7UW1sC9.css       |   1 +
| |  .../all-browsers/trace/uiMode.Dzuouizj.js        |   5 +
| |  .../register/all-browsers/trace/uiMode.html      |  18 +
| |  .../all-browsers/trace/xtermModule.kHJ-D0s7.css  |   1 +
| |  23127152-hw4/report/AI_Audit_Report.md           | 118 +++
| |  23127152-hw4/report/AI_Critique.md               |  29 +
| |  23127152-hw4/test-runs/test-run-report.md        |  75 ++
| |  23127152-hw4/test-summary/traceability-matrix.md |  78 ++
| |  backend/database.sqlite                          | Bin 36864 -> 57344 bytes
| |  319 files changed, 13047 insertions(+)
| | 
| * commit 6c7ea62cc69194d4dee16535117a9cafc1d75724
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Sat Aug 8 22:14:00 2026 +0700
| | 
| |     docs(register): clarify role of register smoke tests
| | 
| |  23127152-hw4/GIT_COMMIT_LOG.txt            | 27 ++++++++++++++++++++++++++
| |  23127152-hw4/e2e/register/register.spec.ts |  3 +++
| |  2 files changed, 30 insertions(+)
| | 
| * commit 95363193c1b2d26b6481a30f3308221946d016c4
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Fri Aug 7 23:34:00 2026 +0700
| | 
| |     docs(fr18): document delta-based assertion rationale
| | 
| |  23127152-hw4/e2e/fr18-ordermanagement/fr18-ordermanagement.spec.ts | 3 +++
| |  1 file changed, 3 insertions(+)
| | 
| * commit 0c53e5a19570064d025d5242b1d2a81d5b8e2647
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Fri Aug 7 23:41:00 2026 +0700
| | 
| |     docs(fr10): add assertion pattern documentation
| | 
| |  23127152-hw4/e2e/fr10-orderstate/fr10-orderstate.spec.ts | 3 +++
| |  1 file changed, 3 insertions(+)
| | 
| * commit b73798bebb08bfd65f20915f6996c21ac262a00f
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Fri Aug 7 23:12:00 2026 +0700
| | 
| |     docs(fr02): add performance & isolation notes to login spec
| | 
| |  23127152-hw4/e2e/fr02-login/fr02-login.spec.ts | 3 +++
| |  1 file changed, 3 insertions(+)
| | 
| * commit 08b4aefcf8e8fa8d7cf209741de3d36658691d7f
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Thu Aug 6 23:01:00 2026 +0700
| | 
| |     chore: add .gitignore for e2e test artifacts
| |     
| |     - Ignore node_modules, test-results, reports, playwright-report
| |     - Exclude database and temp files
| | 
| |  23127152-hw4/e2e/.gitignore | 3 +++
| |  1 file changed, 3 insertions(+)
| | 
| * commit 15f763621f3c6c413e58736278a88090ede23a03
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Thu Aug 6 21:32:00 2026 +0700
| | 
| |     chore: setup Playwright configuration (3-browser, HTML reporter with anti-cheat banner)
| |     
| |     - Config: chromium/firefox/webkit projects
| |     - Reporter: title embeds studentID + ISO timestamp
| |     - Package.json: playwright 1.62.0, TypeScript dev deps
| | 
| |  23127152-hw4/e2e/package.json         | 13 +++++++++
| |  23127152-hw4/e2e/playwright.config.ts | 45 +++++++++++++++++++++++++++++++
| |  23127152-hw4/e2e/student.config.json  |  3 +++
| |  3 files changed, 61 insertions(+)
| | 
| * commit a6f580cfe0d018ad3fd0362babc5babea7b4205c
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Thu Aug 6 21:13:00 2026 +0700
| | 
| |     refactor: extract shared UI helpers for test reusability
| |     
| |     - loginWeb, loginAdmin: real form submissions
| |     - placeOrderViaUI: end-to-end checkout flow
| |     - clickAdminOrderAction: response waits for race condition handling
| |     - dashboard readers: polling for async data fetches
| | 
| |  23127152-hw4/e2e/support/ui-helpers.ts | 144 +++++++++++++++++++++++++++++
| |  1 file changed, 144 insertions(+)
| | 
| * commit 5c28a89f725283417c8904603af9f1d05a1cf3ac
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Wed Aug 5 21:01:00 2026 +0700
| | 
| |     test(register): automate FR-01 register (3 data-driven cases, 3 browsers)
| | 
| |  23127152-hw4/e2e/data/register.json        | 35 ++++++++++++++++++
| |  23127152-hw4/e2e/register/register.spec.ts | 50 ++++++++++++++++++++++++++
| |  2 files changed, 85 insertions(+)
| | 
| * commit f0911eb7518ed03a41f852f7c36bd6d35440e8d0
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Wed Aug 5 23:27:00 2026 +0700
| | 
| |     test(fr18): automate FR-18 order management (12 data-driven cases, 3 browsers)
| | 
| |  23127152-hw4/e2e/data/fr18-ordermanagement.json  |  69 ++++++++++
| |  .../fr18-ordermanagement.spec.ts                 | 138 +++++++++++++++++++
| |  2 files changed, 207 insertions(+)
| | 
| * commit 6eada9023287a40b0f77181d878fc6241aa3c7a6
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Wed Aug 5 23:05:00 2026 +0700
| | 
| |     test(fr10): automate FR-10 order state machine (15 data-driven cases, 3 browsers)
| | 
| |  23127152-hw4/e2e/data/fr10-orderstate.json       |  90 ++++++++++++++
| |  .../e2e/fr10-orderstate/fr10-orderstate.spec.ts  | 120 +++++++++++++++++++
| |  2 files changed, 210 insertions(+)
| | 
| * commit a07959af2cb427a5faee037ea47f938e7079968a
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Tue Aug 4 23:47:00 2026 +0700
| | 
| |     test(fr02): automate FR-02 login & account lockout (13 data-driven cases, 3 browsers)
| | 
| |  23127152-hw4/e2e/data/fr02-login.json          |  93 ++++++++++++++++
| |  23127152-hw4/e2e/fr02-login/fr02-login.spec.ts | 117 +++++++++++++++++++++
| |  2 files changed, 210 insertions(+)
| | 
| * commit 5639d81e476ea65e797503b82e4f2fd789f5ad45
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Tue Aug 4 23:06:00 2026 +0700
| | 
| |     anhnguyen-hw4-setup
| | 
| |  23127152-hw4/2026.HW04.Automation Testing_En.pdf | Bin 0 -> 463412 bytes
| |  23127152-hw4/test-runs/test-run-report.md        |   0
| |  23127152-hw4/test-summary/traceability-matrix.md |   0
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  4 files changed, 0 insertions(+), 0 deletions(-)
| | 
| * commit be1cd74d37e72dc6b4fffe9ccf50aaff3c0048c7
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Tue Aug 4 21:08:00 2026 +0700
| | 
| |     temp
| | 
| |  .DS_Store                                        | Bin 0 -> 8196 bytes
| |  ...03ac7b22f993e9d5021792f7728eab2eb1bb12d7.webm | Bin 0 -> 193977 bytes
| |  ...0b8b6840b0ace4249dead7a696044822fc9d7fc5.webm | Bin 0 -> 195162 bytes
| |  .../17d81f9a72843d208fba4674d104312cc8d679cf.png | Bin 0 -> 38089 bytes
| |  .../1d179890c3c66f5002763b9d3b4d49e388f91a07.md  | 202 +++++++++++++++++++
| |  .../3d7c5066784db7e7653110d32a9806a56b3de502.png | Bin 0 -> 38498 bytes
| |  .../61dcb24af562d97e2c21f3e5bd49502b84a547ea.md  | 202 +++++++++++++++++++
| |  .../6d7161eff4e39f341decae35741ba7b08ce1fa78.md  | 190 +++++++++++++++++
| |  ...9c5c8b8167125c7b1241ee1c9b2bd0178bfbb10f.webm | Bin 0 -> 48510 bytes
| |  .../b7596502f74bf6604fe3e87570be9265b012083c.md  | 202 +++++++++++++++++++
| |  .../c6d3710f40a9f25e122eace884c06dda70114296.md  | 190 +++++++++++++++++
| |  ...ca6422e68773e883f4ccb5553f6cf4dd8dcdbf0f.webm | Bin 0 -> 24737 bytes
| |  ...d2c0826a2e5ff7fd6ccb33a5401f8c9d8ea20e52.webm | Bin 0 -> 36209 bytes
| |  .../db59f2d4f04da32f963649f2ce2ef94c42361252.png | Bin 0 -> 36972 bytes
| |  .../dc49f3600f1409480eaff9d9711c66f74d48684d.md  | 195 ++++++++++++++++++
| |  .../eea5321688829eb718c5870ba2a73f6f7dfcc4dd.md  | 202 +++++++++++++++++++
| |  .../ef1ab6d4fd1b6ff0e8a6fd7fc6f2dd9184246d1d.png | Bin 0 -> 36592 bytes
| |  ...f01361f1d95632feb5c433497024be8234ee1941.webm | Bin 0 -> 50271 bytes
| |  ...f400d7245c0901f445a4fb8e18eca4240e87d6c0.webm | Bin 0 -> 46091 bytes
| |  e2e/reports/html/fr02-login/chromium/index.html  |  49 +++++
| |  e2e/reports/html/fr02-login/chromium/run-by.txt  |   1 +
| |  ...06205268b2d6a479831a7e6e8af2347ba10ff13e.webm | Bin 0 -> 33426 bytes
| |  ...1950a44b41c07636c036fa82ea0d412bc76becd7.webm | Bin 0 -> 65347 bytes
| |  .../1d179890c3c66f5002763b9d3b4d49e388f91a07.md  | 202 +++++++++++++++++++
| |  ...1ea4652ba8a24455feac7c115d23be8560ea944e.webm | Bin 0 -> 41906 bytes
| |  .../2d572a787d6be73b48f24fe0440a9afdffe09740.png | Bin 0 -> 45652 bytes
| |  .../395047541dd35bc7e4b58ea408dacd4a55c42851.png | Bin 0 -> 45538 bytes
| |  ...4c571e391970d51ccfe305eb8db3f6c12ab4074e.webm | Bin 0 -> 40100 bytes
| |  .../61dcb24af562d97e2c21f3e5bd49502b84a547ea.md  | 202 +++++++++++++++++++
| |  .../6d7161eff4e39f341decae35741ba7b08ce1fa78.md  | 190 +++++++++++++++++
| |  ...74a818778c646138fc2f2ed0e50fcd0cac5adaa6.webm | Bin 0 -> 160065 bytes
| |  ...a8e365705c581ecf862818d5764fa55e14cb5975.webm | Bin 0 -> 45341 bytes
| |  .../b7596502f74bf6604fe3e87570be9265b012083c.md  | 202 +++++++++++++++++++
| |  .../c6d3710f40a9f25e122eace884c06dda70114296.md  | 190 +++++++++++++++++
| |  .../dc49f3600f1409480eaff9d9711c66f74d48684d.md  | 195 ++++++++++++++++++
| |  .../ea8414a3994bf8242c2c92f3187316e25194eb71.png | Bin 0 -> 46037 bytes
| |  .../edf9b65cad4f3694daa059d3cea97391136836a6.png | Bin 0 -> 44265 bytes
| |  .../eea5321688829eb718c5870ba2a73f6f7dfcc4dd.md  | 202 +++++++++++++++++++
| |  ...faf8cae74867bac6173c4f49af4cd15f3de4ae1a.webm | Bin 0 -> 184220 bytes
| |  e2e/reports/html/fr02-login/firefox/index.html   |  49 +++++
| |  e2e/reports/html/fr02-login/firefox/run-by.txt   |   1 +
| |  ...00e0c6e9837e235a8d31e344840b8689c29a9b02.webm | Bin 0 -> 151532 bytes
| |  .../13f52e1e44a534196c973102da47e106d54b71d1.png | Bin 0 -> 151269 bytes
| |  .../1d179890c3c66f5002763b9d3b4d49e388f91a07.md  | 202 +++++++++++++++++++
| |  .../502b3c3bab7eb327ceb858f1011b7bd20d44518a.png | Bin 0 -> 156234 bytes
| |  .../61dcb24af562d97e2c21f3e5bd49502b84a547ea.md  | 202 +++++++++++++++++++
| |  ...69f2d1fe5081d2d04281f86a12e5576802153550.webm | Bin 0 -> 151116 bytes
| |  .../6d7161eff4e39f341decae35741ba7b08ce1fa78.md  | 190 +++++++++++++++++
| |  ...72fde4576aab9186a7af8f764d782d139ae8ab6f.webm | Bin 0 -> 40370 bytes
| |  .../94fb7cfe732486ca5d017abc121793b877eb2b63.png | Bin 0 -> 153157 bytes
| |  ...a22ac9724f15d7f2b50d94ec8184bab37847ebd7.webm | Bin 0 -> 46237 bytes
| |  ...b746c7af935f06a8010076dd2204090783f3f9a1.webm | Bin 0 -> 69789 bytes
| |  .../b7596502f74bf6604fe3e87570be9265b012083c.md  | 202 +++++++++++++++++++
| |  ...c6443b563a948d81cd55a808b5d00c4b3e6a8248.webm | Bin 0 -> 29717 bytes
| |  .../c6d3710f40a9f25e122eace884c06dda70114296.md  | 190 +++++++++++++++++
| |  .../dc49f3600f1409480eaff9d9711c66f74d48684d.md  | 195 ++++++++++++++++++
| |  .../eea5321688829eb718c5870ba2a73f6f7dfcc4dd.md  | 202 +++++++++++++++++++
| |  .../fbf1d85f581e673a6179d8fdb7d0eeb9cdf20b0e.png | Bin 0 -> 157201 bytes
| |  ...ff0140097c167bd91f35a8924237da0d316591d0.webm | Bin 0 -> 37673 bytes
| |  e2e/reports/html/fr02-login/webkit/index.html    |  49 +++++
| |  e2e/reports/html/fr02-login/webkit/run-by.txt    |   1 +
| |  e2e/reports/run-manifest.json                    |  42 ++++
| |  e2e/test-results/.last-run.json                  |  12 ++
| |  .../error-context.md"                            | 195 ++++++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 151269 bytes
| |  .../video.webm"                                  | Bin 0 -> 46237 bytes
| |  .../error-context.md"                            | 202 +++++++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 157201 bytes
| |  .../video.webm"                                  | Bin 0 -> 29717 bytes
| |  .../error-context.md                             | 202 +++++++++++++++++++
| |  .../test-failed-1.png                            | Bin 0 -> 157201 bytes
| |  .../video.webm                                   | Bin 0 -> 69789 bytes
| |  .../error-context.md"                            | 202 +++++++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 157201 bytes
| |  .../video.webm"                                  | Bin 0 -> 37673 bytes
| |  .../error-context.md"                            | 190 +++++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 156234 bytes
| |  .../video.webm"                                  | Bin 0 -> 151532 bytes
| |  .../error-context.md"                            | 202 +++++++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 153157 bytes
| |  .../video.webm"                                  | Bin 0 -> 40370 bytes
| |  .../error-context.md                             | 190 +++++++++++++++++
| |  .../test-failed-1.png                            | Bin 0 -> 156234 bytes
| |  .../video.webm                                   | Bin 0 -> 151116 bytes
| |  tests/.DS_Store                                  | Bin 0 -> 6148 bytes
| |  85 files changed, 5736 insertions(+)
| | 
| * commit 7319921cf1306cac051dc21097d353ff7f7f8cec
| | Author: spartan-anhnguyen <anh.tuan.nguyen@c0x12c.com>
| | Date:   Mon Aug 3 22:15:00 2026 +0700
| | 
| |     test(hw02): add Playwright screenshots to all reports and bug reports
| |     
| |     - Added FR10 screenshot script (fr10-screenshots.spec.js)
| |     - Captured screenshots for BUG-06 (canceled→delivered), BUG-07 (cancel shipping),
| |       BUG-14 (role bypass), and FR-10 normal state flow
| |     - Updated all 14 bug reports (BUG-01 to BUG-14) with actual Playwright screenshots
| |     - Updated DomainTesting.md for all 4 features with screenshot sections
| |     - Updated BVA.md for all 4 features with screenshot evidence
| |     - Screenshots embedded with relative paths (../playwright-tests/screenshots/...)
| |     
| |     Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
| | 
| |  tests/HW02/FR02_Login/BVA.md                     |  19 ++
| |  tests/HW02/FR02_Login/DomainTesting.md           |  52 ++++--
| |  tests/HW02/FR10_OrderState/BVA.md                |  24 ++-
| |  tests/HW02/FR10_OrderState/DomainTesting.md      |  38 +++-
| |  tests/HW02/FR18_AdminOrder/BVA.md                |  20 ++-
| |  tests/HW02/FR18_AdminOrder/DomainTesting.md      |  34 +++-
| |  tests/HW02/Mobile_OrderHistory/BVA.md            |  26 ++-
| |  tests/HW02/Mobile_OrderHistory/DomainTesting.md  |  20 ++-
| |  tests/HW02/bug-reports/BUG-01.md                 |  14 +-
| |  tests/HW02/bug-reports/BUG-02.md                 |  14 ++
| |  tests/HW02/bug-reports/BUG-03.md                 |  12 ++
| |  tests/HW02/bug-reports/BUG-04.md                 |   8 +
| |  tests/HW02/bug-reports/BUG-05.md                 |  16 ++
| |  tests/HW02/bug-reports/BUG-06.md                 |  22 +++
| |  tests/HW02/bug-reports/BUG-07.md                 |  22 +++
| |  tests/HW02/bug-reports/BUG-08.md                 |  14 ++
| |  tests/HW02/bug-reports/BUG-09.md                 |  13 ++
| |  tests/HW02/bug-reports/BUG-10.md                 |   8 +
| |  tests/HW02/bug-reports/BUG-11.md                 |  13 ++
| |  tests/HW02/bug-reports/BUG-12.md                 |   8 +
| |  tests/HW02/bug-reports/BUG-13.md                 |  15 ++
| |  tests/HW02/bug-reports/BUG-14.md                 |  36 ++++
| |  .../playwright-tests/fr10-screenshots.spec.js    | 177 +++++++++++++++++++
| |  .../FR10/BUG06-01-canceled-order-admin.png       | Bin 0 -> 39832 bytes
| |  .../screenshots/FR10/BUG06-02-api-response.json  |   7 +
| |  .../FR10/BUG06-03-status-now-delivered.png       | Bin 0 -> 32923 bytes
| |  .../FR10/BUG07-01-shipping-order-web.png         | Bin 0 -> 65371 bytes
| |  .../screenshots/FR10/BUG07-02-api-response.json  |   7 +
| |  .../screenshots/FR10/BUG07-03-after-cancel.png   | Bin 0 -> 64005 bytes
| |  .../FR10/BUG14-01-regular-user-web.png           | Bin 0 -> 77884 bytes
| |  .../FR10/BUG14-02-role-bypass-results.json       |  23 +++
| |  .../screenshots/FR10/FR10-01-pending-order.png   | Bin 0 -> 40649 bytes
| |  .../screenshots/FR10/FR10-02-confirmed.png       | Bin 0 -> 40797 bytes
| |  .../screenshots/FR10/FR10-03-shipping.png        | Bin 0 -> 39488 bytes
| |  .../screenshots/FR10/FR10-04-delivered.png       | Bin 0 -> 38343 bytes
| |  .../FR10/FR10-05-delivered-final-state.png       | Bin 0 -> 38343 bytes
| |  36 files changed, 637 insertions(+), 25 deletions(-)
| | 
| * commit e749ad14a9ee68a6ea554ed9a21240f537d92044
| | Author: spartan-anhnguyen <anh.tuan.nguyen@c0x12c.com>
| | Date:   Mon Aug 3 21:47:00 2026 +0700
| | 
| |     test(hw02): update AI audit report with session 4 execution results
| |     
| |     Added session 4 log covering Playwright execution across all 4 features,
| |     confirmed 14 bugs (including newly discovered BUG-14: missing admin role check),
| |     and updated README with actual PASS/FAIL counts.
| |     
| |     Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
| | 
| |  tests/HW02/ai-audit/AI_Audit_Report.md | 43 +++++++++++++++++++++++-------
| |  1 file changed, 33 insertions(+), 10 deletions(-)
| | 
| * commit 67782cb86e73c43b92e6e8311efeef38bd304bba
|/  Author: spartan-anhnguyen <anh.tuan.nguyen@c0x12c.com>
|   Date:   Mon Aug 3 23:07:00 2026 +0700
|   
|       test(hw02): add domain testing & BVA reports for 4 features
|       
|       - FR-02 Login: 30 TC (15 DT + 15 BVA), bugs BUG-01..05 confirmed
|       - FR-10 Order State: 48 TC (27 DT + 21 BVA), bugs BUG-06, 07, 14
|       - FR-18 Admin Orders: 47 TC (27 DT + 20 BVA), bugs BUG-08, 09, 14
|       - Mobile Order History: 44 TC (24 DT + 20 BVA), bugs BUG-11, 13
|       - Playwright automation scripts for all features with screenshots
|       - 14 bug reports (BUG-01 to BUG-14, including new critical BUG-14)
|       - AI Audit Report and Critique included
|       
|       Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
|   
|    tests/HW02/FR02_Login/BVA.md                     | 102 +++++
|    tests/HW02/FR02_Login/DomainTesting.md           | 165 ++++++++
|    tests/HW02/FR10_OrderState/BVA.md                | 102 +++++
|    tests/HW02/FR10_OrderState/DomainTesting.md      | 207 +++++++++
|    tests/HW02/FR18_AdminOrder/BVA.md                | 111 +++++
|    tests/HW02/FR18_AdminOrder/DomainTesting.md      | 184 ++++++++
|    tests/HW02/Mobile_OrderHistory/BVA.md            | 110 +++++
|    tests/HW02/Mobile_OrderHistory/DomainTesting.md  | 172 ++++++++
|    tests/HW02/README.md                             | 165 ++++++++
|    tests/HW02/ai-audit/AI_Audit_Report.md           | 107 +++++
|    tests/HW02/ai-audit/AI_Critique.md               |  13 +
|    tests/HW02/bug-reports/BUG-01.md                 |  51 +++
|    tests/HW02/bug-reports/BUG-02.md                 |  47 +++
|    tests/HW02/bug-reports/BUG-03.md                 |  43 ++
|    tests/HW02/bug-reports/BUG-04.md                 |  33 ++
|    tests/HW02/bug-reports/BUG-05.md                 |  50 +++
|    tests/HW02/bug-reports/BUG-06.md                 |  49 +++
|    tests/HW02/bug-reports/BUG-07.md                 |  49 +++
|    tests/HW02/bug-reports/BUG-08.md                 |  47 +++
|    tests/HW02/bug-reports/BUG-09.md                 |  49 +++
|    tests/HW02/bug-reports/BUG-10.md                 |  40 ++
|    tests/HW02/bug-reports/BUG-11.md                 |  49 +++
|    tests/HW02/bug-reports/BUG-12.md                 |  32 ++
|    tests/HW02/bug-reports/BUG-13.md                 |  36 ++
|    tests/HW02/bug-reports/BUG-14.md                 | 106 +++++
|    tests/HW02/playwright-tests/fr02-login.spec.js   | 249 +++++++++++
|    .../playwright-tests/fr10-fr18-orders.spec.js    | 423 +++++++++++++++++++
|    .../HW02/playwright-tests/fr18-admin-ui.spec.js  | 246 +++++++++++
|    tests/HW02/playwright-tests/fr18-focused.spec.js | 163 +++++++
|    .../mobile-order-history.spec.js                 | 262 ++++++++++++
|    tests/HW02/playwright-tests/package-lock.json    |  75 ++++
|    tests/HW02/playwright-tests/package.json         |  16 +
|    tests/HW02/playwright-tests/results-fr02.json    | 106 +++++
|    .../playwright-tests/results-fr18-focused.json   |  66 +++
|    tests/HW02/playwright-tests/results-fr18.json    |  90 ++++
|    tests/HW02/playwright-tests/results-mobile.json  | 146 +++++++
|    .../screenshots/FR02/DT-FR02-01-after-login.png  | Bin 0 -> 68534 bytes
|    .../FR02/DT-FR02-01-before-submit.png            | Bin 0 -> 33958 bytes
|    .../FR02/DT-FR02-10-locked-response.png          | Bin 0 -> 39677 bytes
|    .../FR02/DT-FR02-email-input-type.png            | Bin 0 -> 29580 bytes
|    .../FR02/DT-FR02-lockout-attempt-1.png           | Bin 0 -> 40562 bytes
|    .../FR02/DT-FR02-lockout-attempt-2.png           | Bin 0 -> 40562 bytes
|    .../screenshots/FR02/DT-FR02-login-form.png      | Bin 0 -> 29580 bytes
|    .../FR02/DT-FR02-password-input-type.png         | Bin 0 -> 29580 bytes
|    .../screenshots/FR18/FR18-00-admin-login.png     | Bin 0 -> 12336 bytes
|    .../screenshots/FR18/FR18-00-login-page.png      | Bin 0 -> 12336 bytes
|    .../FR18/FR18-01-admin-credentials-filled.png    | Bin 0 -> 13557 bytes
|    .../FR18/FR18-02-admin-after-login.png           | Bin 0 -> 33217 bytes
|    .../screenshots/FR18/FR18-03-orders-page.png     | Bin 0 -> 41920 bytes
|    .../screenshots/FR18/FR18-04-xss-check.png       | Bin 0 -> 41920 bytes
|    .../screenshots/FR18/FR18-05-dashboard.png       | Bin 0 -> 41920 bytes
|    .../FR18/FR18-06-pending-order-ui.png            | Bin 0 -> 31230 bytes
|    .../screenshots/FR18/FR18-07-no-confirm-btn.png  | Bin 0 -> 31230 bytes
|    .../screenshots/FR18/FR18-A1-dashboard.png       | Bin 0 -> 33361 bytes
|    .../screenshots/FR18/FR18-A2-revenue.png         | Bin 0 -> 33361 bytes
|    .../screenshots/FR18/FR18-B1-orders-tab.png      | Bin 0 -> 51919 bytes
|    .../screenshots/FR18/FR18-B2-xss-orders.png      | Bin 0 -> 51919 bytes
|    .../screenshots/FR18/FR18-B3-order-buttons.png   | Bin 0 -> 51919 bytes
|    .../screenshots/FR18/FR18-B4-after-confirm.png   | Bin 0 -> 51204 bytes
|    .../screenshots/FR18/FR18-B5-after-ship.png      | Bin 0 -> 50485 bytes
|    .../screenshots/FR18/FR18-B6-after-deliver.png   | Bin 0 -> 48878 bytes
|    .../screenshots/FR18/FR18-B7-canceled-order.png  | Bin 0 -> 31230 bytes
|    .../screenshots/Mobile/MOB-01-login.png          | Bin 0 -> 33521 bytes
|    .../screenshots/Mobile/MOB-02-profile-orders.png | Bin 0 -> 67632 bytes
|    .../screenshots/Mobile/MOB-03-cancel-buttons.png | Bin 0 -> 67718 bytes
|    .../screenshots/Mobile/MOB-04-after-cancel.png   | Bin 0 -> 66180 bytes
|    .../screenshots/Mobile/MOB-05-final-state.png    | Bin 0 -> 66262 bytes
|    67 files changed, 3961 insertions(+)
| 
* commit d97f995247a4a31ac91e8c6664da6fbf58b5fbd5
| Author: yuran1811 <trieuvanbd123@gmail.com>
| Date:   Mon Aug 3 09:49:04 2026 +0700
| 
|     chore: approve sqlite3 build
| 
|  backend/pnpm-workspace.yaml | 2 ++
|  1 file changed, 2 insertions(+)
|   
| * commit 86642a342271fb6e4c36462dc7c6694745167742
| | Author: ntanh <tuananh835.nta@gmail.com>
| | Date:   Sat Aug 8 13:30:08 2026 +0700
| | 
| |     anhnguyen-hw3
| | 
| |  .DS_Store                                        | Bin 0 -> 6148 bytes
| |  .../scripts/watermark_screenshot.py              |   7 +-
| |  .claude/skills/ai-audit-logger/SKILL.md          |  26 +
| |  .../references/FR-01-audit-entry.md              |  46 ++
| |  .../templates/audit-entry-template.md            |  12 +
| |  .claude/skills/bug-reporting/SKILL.md            |  26 +
| |  .../bug-reporting/references/BUG-PRODUCT-002.md  |  69 ++
| |  .../skills/bug-reporting/templates/bug_report.md |  42 ++
| |  .../cross-platform-testing-tracker/SKILL.md      | 143 +++++
| |  .../assets/platform_matrix_template.md           |  32 +
| |  .../scripts/watermark_screenshot.py              | 132 ++++
| |  .claude/skills/gui-checklist-builder/SKILL.md    | 232 +++++++
| |  .../assets/bug_report_template.md                |  66 ++
| |  .../assets/checklist_template.md                 |  17 +
| |  .../skills/playwright-script-generator/SKILL.md  |  44 ++
| |  .../references/login.spec.ts.md                  |  32 +
| |  .../templates/output-format-template.md          |  21 +
| |  .claude/skills/requirement-analysis/SKILL.md     |  29 +
| |  .../requirement-analysis/references/FR-01.md     |  32 +
| |  .../references/TC-LOGIN-001.md                   |  33 +
| |  .claude/skills/test-runner/SKILL.md              |  63 ++
| |  .../test-runner/references/automated-test-run.md |  71 +++
| |  .../templates/output-format-template.md          |  28 +
| |  .claude/skills/traceability-matrix/SKILL.md      |  39 ++
| |  .../references/traceability-matrix.md            |  62 ++
| |  .../templates/output-format-template.md          |  19 +
| |  .../skills/usability-evaluation-builder/SKILL.md | 258 ++++++++
| |  .../assets/findings_report_template.md           |  89 +++
| |  .../assets/instruments_reference.md              |  95 +++
| |  .../assets/recruitment_tracker_template.md       |  44 ++
| |  .../assets/session_log_template.md               |  69 ++
| |  .../assets/test_plan_template.md                 |  79 +++
| |  .pnpm-store/v11/index.db                         | Bin 0 -> 8192 bytes
| |  2026.HW03.GUI Usability_En.pdf                   | Bin 0 -> 231854 bytes
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  backend/pnpm-workspace.yaml                      |   2 +
| |  homework-requirements.md                         | 271 ++++++++
| |  tests-23127152/.DS_Store                         | Bin 0 -> 8196 bytes
| |  tests-23127152/README.md                         |  53 ++
| |  tests-23127152/ai-audit/ai_audit_report.md       |  90 +++
| |  tests-23127152/ai-audit/ai_critique.md           |   9 +
| |  tests-23127152/bug-reports/GITHUB_ISSUES.md      |  30 +
| |  .../bug-reports/create-github-issues.sh          |  64 ++
| |  .../github-issue-bodies/BUG-LOGIN-001.md         |  43 ++
| |  .../github-issue-bodies/BUG-LOGIN-002.md         |  42 ++
| |  .../github-issue-bodies/BUG-LOGIN-003.md         |  42 ++
| |  .../github-issue-bodies/BUG-LOGIN-004.md         |  42 ++
| |  .../github-issue-bodies/BUG-LOGIN-005.md         |  42 ++
| |  .../github-issue-bodies/BUG-LOGIN-006.md         |  42 ++
| |  .../github-issue-bodies/BUG-LOGIN-007.md         |  42 ++
| |  .../github-issue-bodies/BUG-LOGIN-008.md         |  42 ++
| |  .../github-issue-bodies/BUG-LOGIN-009.md         |  42 ++
| |  .../github-issue-bodies/BUG-LOGIN-010.md         |  42 ++
| |  .../github-issue-bodies/BUG-LOGIN-011.md         |  42 ++
| |  .../github-issue-bodies/BUG-PROFILE-001.md       |  42 ++
| |  .../github-issue-bodies/BUG-PROFILE-003.md       |  42 ++
| |  .../github-issue-bodies/BUG-PROFILE-004.md       |  42 ++
| |  .../github-issue-bodies/BUG-PROFILE-005.md       |  42 ++
| |  .../github-issue-bodies/BUG-PROFILE-006.md       |  42 ++
| |  .../github-issue-bodies/BUG-PROFILE-007.md       |  42 ++
| |  .../github-issue-bodies/BUG-PROFILE-008.md       |  42 ++
| |  .../github-issue-bodies/BUG-PROFILE-009.md       |  42 ++
| |  .../github-issue-bodies/BUG-PROFILE-010.md       |  42 ++
| |  .../bug-reports/github-issues-created.md         |  24 +
| |  .../bug-reports/github-issues-index.json         | 262 ++++++++
| |  tests-23127152/bug-reports/login/.gitkeep        |   0
| |  .../bug-reports/login/BUG-LOGIN-001.md           |  44 ++
| |  .../bug-reports/login/BUG-LOGIN-002.md           |  43 ++
| |  .../bug-reports/login/BUG-LOGIN-003.md           |  43 ++
| |  .../bug-reports/login/BUG-LOGIN-004.md           |  43 ++
| |  .../bug-reports/login/BUG-LOGIN-005.md           |  43 ++
| |  .../bug-reports/login/BUG-LOGIN-006.md           |  43 ++
| |  .../bug-reports/login/BUG-LOGIN-007.md           |  43 ++
| |  .../bug-reports/login/BUG-LOGIN-008.md           |  43 ++
| |  .../bug-reports/login/BUG-LOGIN-009.md           |  43 ++
| |  .../bug-reports/login/BUG-LOGIN-010.md           |  43 ++
| |  .../bug-reports/login/BUG-LOGIN-011.md           |  43 ++
| |  tests-23127152/bug-reports/profile/.gitkeep      |   0
| |  .../bug-reports/profile/BUG-PROFILE-001.md       |  43 ++
| |  .../bug-reports/profile/BUG-PROFILE-003.md       |  43 ++
| |  .../bug-reports/profile/BUG-PROFILE-004.md       |  43 ++
| |  .../bug-reports/profile/BUG-PROFILE-005.md       |  43 ++
| |  .../bug-reports/profile/BUG-PROFILE-006.md       |  43 ++
| |  .../bug-reports/profile/BUG-PROFILE-007.md       |  43 ++
| |  .../bug-reports/profile/BUG-PROFILE-008.md       |  43 ++
| |  .../bug-reports/profile/BUG-PROFILE-009.md       |  43 ++
| |  .../bug-reports/profile/BUG-PROFILE-010.md       |  43 ++
| |  tests-23127152/bug-reports/screenshots/.gitkeep  |   0
| |  .../BUG-LOGIN-001-wrong-title-dang-ky.png        | Bin 0 -> 31039 bytes
| |  .../screenshots/BUG-LOGIN-002-mixed-language.png | Bin 0 -> 31039 bytes
| |  .../screenshots/BUG-LOGIN-003-default-title.png  | Bin 0 -> 31039 bytes
| |  .../BUG-LOGIN-004-lockout-generic-error.png      | Bin 0 -> 32492 bytes
| |  .../BUG-LOGIN-005-password-plaintext.png         | Bin 0 -> 31039 bytes
| |  .../BUG-LOGIN-006-no-submit-loading.png          | Bin 0 -> 85955 bytes
| |  .../BUG-LOGIN-007-forgot-plain-anchor.png        | Bin 0 -> 28146 bytes
| |  .../BUG-LOGIN-008-tabindex-signin.png            | Bin 0 -> 31039 bytes
| |  .../BUG-LOGIN-009-labels-not-associated.png      | Bin 0 -> 32492 bytes
| |  .../screenshots/BUG-LOGIN-010-html-lang-en.png   | Bin 0 -> 38449 bytes
| |  .../BUG-LOGIN-011-error-no-aria-live.png         | Bin 0 -> 38449 bytes
| |  .../BUG-PROFILE-001-guest-no-login-cta.png       | Bin 0 -> 20830 bytes
| |  ...UG-PROFILE-003-phone-placeholder-mismatch.png | Bin 0 -> 49506 bytes
| |  .../BUG-PROFILE-004-alert-only-feedback.png      | Bin 0 -> 48932 bytes
| |  .../BUG-PROFILE-005-no-update-loading.png        | Bin 0 -> 48932 bytes
| |  .../BUG-PROFILE-006-header-name-stale.png        | Bin 0 -> 49767 bytes
| |  .../BUG-PROFILE-007-no-unsaved-warning.png       | Bin 0 -> 86648 bytes
| |  .../BUG-PROFILE-009-labels-not-associated.png    | Bin 0 -> 50420 bytes
| |  ...G-PROFILE-010-xss-dangerouslysetinnerhtml.png | Bin 0 -> 50420 bytes
| |  .../checklist/login/checklist_login.md           | 172 +++++
| |  .../checklist/profile/checklist_profile.md       | 175 ++++++
| |  tests-23127152/cross-platform/platform-matrix.md |  58 ++
| |  .../cross-platform/screenshots/.gitkeep          |   0
| |  .../chrome_LOGIN-COM-01_comLayout.png            | Bin 0 -> 38271 bytes
| |  .../chrome_LOGIN-COM-02_viTextLogin.png          | Bin 0 -> 38271 bytes
| |  .../chrome_LOGIN-FUN-03_pwdType.png              | Bin 0 -> 38271 bytes
| |  .../chrome_LOGIN-RES-01_noHScroll.png            | Bin 0 -> 38271 bytes
| |  .../chrome_LOGIN-RES-03_noHScroll.png            | Bin 0 -> 16888 bytes
| |  .../chrome_LOGIN-VIS-01_loginCard.png            | Bin 0 -> 38271 bytes
| |  .../chrome_LOGIN-VIS-02_loginTitle.png           | Bin 0 -> 38271 bytes
| |  .../chrome_PROFILE-COM-01_profileLayout.png      | Bin 0 -> 38271 bytes
| |  .../chrome_PROFILE-COM-02_viTextProfile.png      | Bin 0 -> 38271 bytes
| |  .../chrome_PROFILE-RES-01_noHScroll.png          | Bin 0 -> 38271 bytes
| |  .../chrome_PROFILE-RES-03_noHScroll.png          | Bin 0 -> 16888 bytes
| |  .../chrome_PROFILE-VIS-01_profileLayout.png      | Bin 0 -> 38271 bytes
| |  .../chrome_PROFILE-VIS-02_profileFormCard.png    | Bin 0 -> 38271 bytes
| |  .../chrome_PROFILE-VIS-04_emailDisabled.png      | Bin 0 -> 38271 bytes
| |  .../firefox_LOGIN-COM-01_comLayout.png           | Bin 0 -> 35611 bytes
| |  .../firefox_LOGIN-COM-02_viTextLogin.png         | Bin 0 -> 35611 bytes
| |  .../firefox_LOGIN-FUN-03_pwdType.png             | Bin 0 -> 35611 bytes
| |  .../firefox_LOGIN-RES-01_noHScroll.png           | Bin 0 -> 35611 bytes
| |  .../firefox_LOGIN-RES-03_noHScroll.png           | Bin 0 -> 35611 bytes
| |  .../firefox_LOGIN-VIS-01_loginCard.png           | Bin 0 -> 35611 bytes
| |  .../firefox_LOGIN-VIS-02_loginTitle.png          | Bin 0 -> 35611 bytes
| |  .../firefox_PROFILE-COM-01_profileLayout.png     | Bin 0 -> 35611 bytes
| |  .../firefox_PROFILE-COM-02_viTextProfile.png     | Bin 0 -> 35611 bytes
| |  .../firefox_PROFILE-RES-01_noHScroll.png         | Bin 0 -> 35611 bytes
| |  .../firefox_PROFILE-RES-03_noHScroll.png         | Bin 0 -> 35611 bytes
| |  .../firefox_PROFILE-VIS-01_profileLayout.png     | Bin 0 -> 35611 bytes
| |  .../firefox_PROFILE-VIS-02_profileFormCard.png   | Bin 0 -> 35611 bytes
| |  .../firefox_PROFILE-VIS-04_emailDisabled.png     | Bin 0 -> 35611 bytes
| |  .../chrome_LOGIN-COM-01_comLayout.png            | Bin 0 -> 46924 bytes
| |  .../chrome_LOGIN-COM-02_viTextLogin.png          | Bin 0 -> 46924 bytes
| |  .../chrome_LOGIN-FUN-03_pwdType.png              | Bin 0 -> 46924 bytes
| |  .../chrome_LOGIN-RES-01_noHScroll.png            | Bin 0 -> 46924 bytes
| |  .../chrome_LOGIN-RES-03_noHScroll.png            | Bin 0 -> 33854 bytes
| |  .../chrome_LOGIN-VIS-01_loginCard.png            | Bin 0 -> 46924 bytes
| |  .../chrome_LOGIN-VIS-02_loginTitle.png           | Bin 0 -> 46924 bytes
| |  .../chrome_PROFILE-COM-01_profileLayout.png      | Bin 0 -> 67089 bytes
| |  .../chrome_PROFILE-COM-02_viTextProfile.png      | Bin 0 -> 67089 bytes
| |  .../chrome_PROFILE-RES-01_noHScroll.png          | Bin 0 -> 67089 bytes
| |  .../chrome_PROFILE-RES-03_noHScroll.png          | Bin 0 -> 52449 bytes
| |  .../chrome_PROFILE-VIS-01_profileLayout.png      | Bin 0 -> 67089 bytes
| |  .../chrome_PROFILE-VIS-02_profileFormCard.png    | Bin 0 -> 67089 bytes
| |  .../chrome_PROFILE-VIS-04_emailDisabled.png      | Bin 0 -> 67089 bytes
| |  .../firefox_LOGIN-COM-01_comLayout.png           | Bin 0 -> 47328 bytes
| |  .../firefox_LOGIN-COM-02_viTextLogin.png         | Bin 0 -> 47328 bytes
| |  .../firefox_LOGIN-FUN-03_pwdType.png             | Bin 0 -> 47328 bytes
| |  .../firefox_LOGIN-RES-01_noHScroll.png           | Bin 0 -> 47328 bytes
| |  .../firefox_LOGIN-RES-03_noHScroll.png           | Bin 0 -> 34133 bytes
| |  .../firefox_LOGIN-VIS-01_loginCard.png           | Bin 0 -> 47328 bytes
| |  .../firefox_LOGIN-VIS-02_loginTitle.png          | Bin 0 -> 47328 bytes
| |  .../firefox_PROFILE-COM-01_profileLayout.png     | Bin 0 -> 66694 bytes
| |  .../firefox_PROFILE-COM-02_viTextProfile.png     | Bin 0 -> 66694 bytes
| |  .../firefox_PROFILE-RES-01_noHScroll.png         | Bin 0 -> 66694 bytes
| |  .../firefox_PROFILE-RES-03_noHScroll.png         | Bin 0 -> 52245 bytes
| |  .../firefox_PROFILE-VIS-01_profileLayout.png     | Bin 0 -> 66694 bytes
| |  .../firefox_PROFILE-VIS-02_profileFormCard.png   | Bin 0 -> 66694 bytes
| |  .../firefox_PROFILE-VIS-04_emailDisabled.png     | Bin 0 -> 66694 bytes
| |  .../_raw/chrome_LOGIN-COM-01_comLayout.png       | Bin 0 -> 36707 bytes
| |  .../_raw/chrome_LOGIN-COM-02_viTextLogin.png     | Bin 0 -> 36707 bytes
| |  .../_raw/chrome_LOGIN-FUN-03_pwdType.png         | Bin 0 -> 36707 bytes
| |  .../_raw/chrome_LOGIN-RES-01_noHScroll.png       | Bin 0 -> 36707 bytes
| |  .../_raw/chrome_LOGIN-RES-03_noHScroll.png       | Bin 0 -> 29419 bytes
| |  .../_raw/chrome_LOGIN-VIS-01_loginCard.png       | Bin 0 -> 36707 bytes
| |  .../_raw/chrome_LOGIN-VIS-02_loginTitle.png      | Bin 0 -> 36707 bytes
| |  .../_raw/chrome_PROFILE-COM-01_profileLayout.png | Bin 0 -> 55681 bytes
| |  .../_raw/chrome_PROFILE-COM-02_viTextProfile.png | Bin 0 -> 55681 bytes
| |  .../_raw/chrome_PROFILE-RES-01_noHScroll.png     | Bin 0 -> 55681 bytes
| |  .../_raw/chrome_PROFILE-RES-03_noHScroll.png     | Bin 0 -> 47070 bytes
| |  .../_raw/chrome_PROFILE-VIS-01_profileLayout.png | Bin 0 -> 55681 bytes
| |  .../chrome_PROFILE-VIS-02_profileFormCard.png    | Bin 0 -> 55681 bytes
| |  .../_raw/chrome_PROFILE-VIS-04_emailDisabled.png | Bin 0 -> 55681 bytes
| |  .../_raw/firefox_LOGIN-COM-01_comLayout.png      | Bin 0 -> 43592 bytes
| |  .../_raw/firefox_LOGIN-COM-02_viTextLogin.png    | Bin 0 -> 43592 bytes
| |  .../_raw/firefox_LOGIN-FUN-03_pwdType.png        | Bin 0 -> 43592 bytes
| |  .../_raw/firefox_LOGIN-RES-01_noHScroll.png      | Bin 0 -> 43592 bytes
| |  .../_raw/firefox_LOGIN-RES-03_noHScroll.png      | Bin 0 -> 33992 bytes
| |  .../_raw/firefox_LOGIN-VIS-01_loginCard.png      | Bin 0 -> 43592 bytes
| |  .../_raw/firefox_LOGIN-VIS-02_loginTitle.png     | Bin 0 -> 43592 bytes
| |  .../firefox_PROFILE-COM-01_profileLayout.png     | Bin 0 -> 68670 bytes
| |  .../firefox_PROFILE-COM-02_viTextProfile.png     | Bin 0 -> 68670 bytes
| |  .../_raw/firefox_PROFILE-RES-01_noHScroll.png    | Bin 0 -> 68670 bytes
| |  .../_raw/firefox_PROFILE-RES-03_noHScroll.png    | Bin 0 -> 53131 bytes
| |  .../firefox_PROFILE-VIS-01_profileLayout.png     | Bin 0 -> 68670 bytes
| |  .../firefox_PROFILE-VIS-02_profileFormCard.png   | Bin 0 -> 68670 bytes
| |  .../firefox_PROFILE-VIS-04_emailDisabled.png     | Bin 0 -> 68670 bytes
| |  .../_raw_real/chrome_LOGIN-COM-01_comLayout.png  | Bin 0 -> 684095 bytes
| |  .../chrome_LOGIN-COM-02_viTextLogin.png          | Bin 0 -> 684095 bytes
| |  .../_raw_real/chrome_LOGIN-FUN-03_pwdType.png    | Bin 0 -> 684095 bytes
| |  .../_raw_real/chrome_LOGIN-RES-01_noHScroll.png  | Bin 0 -> 684095 bytes
| |  .../_raw_real/chrome_LOGIN-RES-03_noHScroll.png  | Bin 0 -> 485860 bytes
| |  .../_raw_real/chrome_LOGIN-VIS-01_loginCard.png  | Bin 0 -> 684095 bytes
| |  .../_raw_real/chrome_LOGIN-VIS-02_loginTitle.png | Bin 0 -> 684095 bytes
| |  .../chrome_PROFILE-COM-01_profileLayout.png      | Bin 0 -> 748872 bytes
| |  .../chrome_PROFILE-COM-02_viTextProfile.png      | Bin 0 -> 748872 bytes
| |  .../chrome_PROFILE-RES-01_noHScroll.png          | Bin 0 -> 748872 bytes
| |  .../chrome_PROFILE-RES-03_noHScroll.png          | Bin 0 -> 524026 bytes
| |  .../chrome_PROFILE-VIS-01_profileLayout.png      | Bin 0 -> 748872 bytes
| |  .../chrome_PROFILE-VIS-02_profileFormCard.png    | Bin 0 -> 748872 bytes
| |  .../chrome_PROFILE-VIS-04_emailDisabled.png      | Bin 0 -> 748872 bytes
| |  .../_raw_real/firefox_LOGIN-COM-01_comLayout.png | Bin 0 -> 664748 bytes
| |  .../firefox_LOGIN-COM-02_viTextLogin.png         | Bin 0 -> 664748 bytes
| |  .../_raw_real/firefox_LOGIN-FUN-03_pwdType.png   | Bin 0 -> 664748 bytes
| |  .../_raw_real/firefox_LOGIN-RES-01_noHScroll.png | Bin 0 -> 664748 bytes
| |  .../_raw_real/firefox_LOGIN-RES-03_noHScroll.png | Bin 0 -> 502684 bytes
| |  .../_raw_real/firefox_LOGIN-VIS-01_loginCard.png | Bin 0 -> 664748 bytes
| |  .../firefox_LOGIN-VIS-02_loginTitle.png          | Bin 0 -> 664748 bytes
| |  .../firefox_PROFILE-COM-01_profileLayout.png     | Bin 0 -> 730084 bytes
| |  .../firefox_PROFILE-COM-02_viTextProfile.png     | Bin 0 -> 730084 bytes
| |  .../firefox_PROFILE-RES-01_noHScroll.png         | Bin 0 -> 730084 bytes
| |  .../firefox_PROFILE-RES-03_noHScroll.png         | Bin 0 -> 565370 bytes
| |  .../firefox_PROFILE-VIS-01_profileLayout.png     | Bin 0 -> 730084 bytes
| |  .../firefox_PROFILE-VIS-02_profileFormCard.png   | Bin 0 -> 730084 bytes
| |  .../firefox_PROFILE-VIS-04_emailDisabled.png     | Bin 0 -> 730084 bytes
| |  .../screenshots/_smoke_real_chrome.png           | Bin 0 -> 219264 bytes
| |  .../screenshots/_smoke_real_firefox.png          | Bin 0 -> 55883 bytes
| |  .../chrome_LOGIN-COM-01_comLayout.png            | Bin 0 -> 381690 bytes
| |  .../chrome_LOGIN-COM-02_viTextLogin.png          | Bin 0 -> 381690 bytes
| |  .../screenshots/chrome_LOGIN-FUN-03_pwdType.png  | Bin 0 -> 381690 bytes
| |  .../chrome_LOGIN-RES-01_noHScroll.png            | Bin 0 -> 381690 bytes
| |  .../chrome_LOGIN-RES-03_noHScroll.png            | Bin 0 -> 309153 bytes
| |  .../chrome_LOGIN-VIS-01_loginCard.png            | Bin 0 -> 381690 bytes
| |  .../chrome_LOGIN-VIS-02_loginTitle.png           | Bin 0 -> 381690 bytes
| |  .../chrome_PROFILE-COM-01_profileLayout.png      | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-COM-02_viTextProfile.png      | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-RES-01_noHScroll.png          | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-RES-03_noHScroll.png          | Bin 0 -> 337807 bytes
| |  .../chrome_PROFILE-VIS-01_profileLayout.png      | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-VIS-02_profileFormCard.png    | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-VIS-04_emailDisabled.png      | Bin 0 -> 424205 bytes
| |  .../firefox_LOGIN-COM-01_comLayout.png           | Bin 0 -> 374211 bytes
| |  .../firefox_LOGIN-COM-02_viTextLogin.png         | Bin 0 -> 374211 bytes
| |  .../screenshots/firefox_LOGIN-FUN-03_pwdType.png | Bin 0 -> 374211 bytes
| |  .../firefox_LOGIN-RES-01_noHScroll.png           | Bin 0 -> 374211 bytes
| |  .../firefox_LOGIN-RES-03_noHScroll.png           | Bin 0 -> 282550 bytes
| |  .../firefox_LOGIN-VIS-01_loginCard.png           | Bin 0 -> 374211 bytes
| |  .../firefox_LOGIN-VIS-02_loginTitle.png          | Bin 0 -> 374211 bytes
| |  .../firefox_PROFILE-COM-01_profileLayout.png     | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-COM-02_viTextProfile.png     | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-RES-01_noHScroll.png         | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-RES-03_noHScroll.png         | Bin 0 -> 323031 bytes
| |  .../firefox_PROFILE-VIS-01_profileLayout.png     | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-VIS-02_profileFormCard.png   | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-VIS-04_emailDisabled.png     | Bin 0 -> 415673 bytes
| |  tests-23127152/plan.md                           | 190 ++++++
| |  tests-23127152/submission/.DS_Store              | Bin 0 -> 6148 bytes
| |  .../23127152_HW03_AI_GUIUsability_99.zip         | Bin 0 -> 10495307 bytes
| |  .../01-main-reports/appendix_checklist_login.md  | 172 +++++
| |  .../appendix_checklist_profile.md                | 175 ++++++
| |  .../appendix_sprint1_gui_execution.md            |  79 +++
| |  .../01-main-reports/gui_checklist_report.md      |  47 ++
| |  .../01-main-reports/gui_checklist_report.pdf     | Bin 0 -> 226122 bytes
| |  .../usability_evaluation_report.md               |  55 ++
| |  .../usability_evaluation_report.pdf              | Bin 0 -> 256494 bytes
| |  .../02-bug-reports/GITHUB_ISSUES.md              |  30 +
| |  .../02-bug-reports/github-issues-created.md      |  24 +
| |  .../02-bug-reports/login/BUG-LOGIN-001.md        |  44 ++
| |  .../02-bug-reports/login/BUG-LOGIN-002.md        |  43 ++
| |  .../02-bug-reports/login/BUG-LOGIN-003.md        |  43 ++
| |  .../02-bug-reports/login/BUG-LOGIN-004.md        |  43 ++
| |  .../02-bug-reports/login/BUG-LOGIN-005.md        |  43 ++
| |  .../02-bug-reports/login/BUG-LOGIN-006.md        |  43 ++
| |  .../02-bug-reports/login/BUG-LOGIN-007.md        |  43 ++
| |  .../02-bug-reports/login/BUG-LOGIN-008.md        |  43 ++
| |  .../02-bug-reports/login/BUG-LOGIN-009.md        |  43 ++
| |  .../02-bug-reports/login/BUG-LOGIN-010.md        |  43 ++
| |  .../02-bug-reports/login/BUG-LOGIN-011.md        |  43 ++
| |  .../02-bug-reports/profile/BUG-PROFILE-001.md    |  43 ++
| |  .../02-bug-reports/profile/BUG-PROFILE-003.md    |  43 ++
| |  .../02-bug-reports/profile/BUG-PROFILE-004.md    |  43 ++
| |  .../02-bug-reports/profile/BUG-PROFILE-005.md    |  43 ++
| |  .../02-bug-reports/profile/BUG-PROFILE-006.md    |  43 ++
| |  .../02-bug-reports/profile/BUG-PROFILE-007.md    |  43 ++
| |  .../02-bug-reports/profile/BUG-PROFILE-008.md    |  43 ++
| |  .../02-bug-reports/profile/BUG-PROFILE-009.md    |  43 ++
| |  .../02-bug-reports/profile/BUG-PROFILE-010.md    |  43 ++
| |  .../BUG-LOGIN-001-wrong-title-dang-ky.png        | Bin 0 -> 31039 bytes
| |  .../screenshots/BUG-LOGIN-002-mixed-language.png | Bin 0 -> 31039 bytes
| |  .../screenshots/BUG-LOGIN-003-default-title.png  | Bin 0 -> 31039 bytes
| |  .../BUG-LOGIN-004-lockout-generic-error.png      | Bin 0 -> 32492 bytes
| |  .../BUG-LOGIN-005-password-plaintext.png         | Bin 0 -> 31039 bytes
| |  .../BUG-LOGIN-006-no-submit-loading.png          | Bin 0 -> 85955 bytes
| |  .../BUG-LOGIN-007-forgot-plain-anchor.png        | Bin 0 -> 28146 bytes
| |  .../BUG-LOGIN-008-tabindex-signin.png            | Bin 0 -> 31039 bytes
| |  .../BUG-LOGIN-009-labels-not-associated.png      | Bin 0 -> 32492 bytes
| |  .../screenshots/BUG-LOGIN-010-html-lang-en.png   | Bin 0 -> 38449 bytes
| |  .../BUG-LOGIN-011-error-no-aria-live.png         | Bin 0 -> 38449 bytes
| |  .../BUG-PROFILE-001-guest-no-login-cta.png       | Bin 0 -> 20830 bytes
| |  ...UG-PROFILE-003-phone-placeholder-mismatch.png | Bin 0 -> 49506 bytes
| |  .../BUG-PROFILE-004-alert-only-feedback.png      | Bin 0 -> 48932 bytes
| |  .../BUG-PROFILE-005-no-update-loading.png        | Bin 0 -> 48932 bytes
| |  .../BUG-PROFILE-006-header-name-stale.png        | Bin 0 -> 49767 bytes
| |  .../BUG-PROFILE-007-no-unsaved-warning.png       | Bin 0 -> 86648 bytes
| |  .../BUG-PROFILE-009-labels-not-associated.png    | Bin 0 -> 50420 bytes
| |  ...G-PROFILE-010-xss-dangerouslysetinnerhtml.png | Bin 0 -> 50420 bytes
| |  .../03-ai-audit/ai_audit_report.md               |  90 +++
| |  .../03-ai-audit/ai_audit_report.pdf              | Bin 0 -> 184462 bytes
| |  .../03-ai-audit/ai_critique.md                   |   9 +
| |  .../03-ai-audit/ai_critique.pdf                  | Bin 0 -> 131065 bytes
| |  .../04-git/commit_log.txt                        |  46 ++
| |  .../05-excel/checklist_and_test_summary.xlsx     | Bin 0 -> 16664 bytes
| |  .../01-plan/Survey-23127152.xlsx                 | Bin 0 -> 53877 bytes
| |  .../06-usability-evidence/01-plan/instruments.md |  57 ++
| |  .../01-plan/recruitment-tracker.md               |  66 ++
| |  .../06-usability-evidence/01-plan/test-plan.md   | 117 ++++
| |  .../02-conduct/participants/P01.md               |  69 ++
| |  .../02-conduct/participants/P02.md               |  68 ++
| |  .../02-conduct/participants/P03.md               |  68 ++
| |  .../02-conduct/participants/P04.md               |  68 ++
| |  .../02-conduct/participants/P05.md               |  67 ++
| |  .../02-conduct/participants/P06.md               |  68 ++
| |  .../02-conduct/participants/P07.md               |  67 ++
| |  .../02-conduct/pilot/P00.md                      |  35 ++
| |  .../03-analyse/aggregate-results.md              |  43 ++
| |  .../03-analyse/findings-report.md                | 130 ++++
| |  .../07-cross-platform/platform-matrix.md         |  47 ++
| |  .../chrome_LOGIN-COM-01_comLayout.png            | Bin 0 -> 381690 bytes
| |  .../chrome_LOGIN-COM-02_viTextLogin.png          | Bin 0 -> 381690 bytes
| |  .../screenshots/chrome_LOGIN-FUN-03_pwdType.png  | Bin 0 -> 381690 bytes
| |  .../chrome_LOGIN-RES-01_noHScroll.png            | Bin 0 -> 381690 bytes
| |  .../chrome_LOGIN-RES-03_noHScroll.png            | Bin 0 -> 309153 bytes
| |  .../chrome_LOGIN-VIS-01_loginCard.png            | Bin 0 -> 381690 bytes
| |  .../chrome_LOGIN-VIS-02_loginTitle.png           | Bin 0 -> 381690 bytes
| |  .../chrome_PROFILE-COM-01_profileLayout.png      | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-COM-02_viTextProfile.png      | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-RES-01_noHScroll.png          | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-RES-03_noHScroll.png          | Bin 0 -> 337807 bytes
| |  .../chrome_PROFILE-VIS-01_profileLayout.png      | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-VIS-02_profileFormCard.png    | Bin 0 -> 424205 bytes
| |  .../chrome_PROFILE-VIS-04_emailDisabled.png      | Bin 0 -> 424205 bytes
| |  .../firefox_LOGIN-COM-01_comLayout.png           | Bin 0 -> 374211 bytes
| |  .../firefox_LOGIN-COM-02_viTextLogin.png         | Bin 0 -> 374211 bytes
| |  .../screenshots/firefox_LOGIN-FUN-03_pwdType.png | Bin 0 -> 374211 bytes
| |  .../firefox_LOGIN-RES-01_noHScroll.png           | Bin 0 -> 374211 bytes
| |  .../firefox_LOGIN-RES-03_noHScroll.png           | Bin 0 -> 282550 bytes
| |  .../firefox_LOGIN-VIS-01_loginCard.png           | Bin 0 -> 374211 bytes
| |  .../firefox_LOGIN-VIS-02_loginTitle.png          | Bin 0 -> 374211 bytes
| |  .../firefox_PROFILE-COM-01_profileLayout.png     | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-COM-02_viTextProfile.png     | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-RES-01_noHScroll.png         | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-RES-03_noHScroll.png         | Bin 0 -> 323031 bytes
| |  .../firefox_PROFILE-VIS-01_profileLayout.png     | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-VIS-02_profileFormCard.png   | Bin 0 -> 415673 bytes
| |  .../firefox_PROFILE-VIS-04_emailDisabled.png     | Bin 0 -> 415673 bytes
| |  .../sprint-2-cross-browser-com.md                |  50 ++
| |  .../08-agent-skills/agent_skills.md              |  22 +
| |  .../cross-platform-testing-tracker/SKILL.md      | 143 +++++
| |  .../assets/platform_matrix_template.md           |  32 +
| |  .../scripts/watermark_screenshot.py              | 137 ++++
| |  .../gui-checklist-builder/SKILL.md               | 232 +++++++
| |  .../assets/bug_report_template.md                |  66 ++
| |  .../assets/checklist_template.md                 |  17 +
| |  .../usability-evaluation-builder/SKILL.md        | 258 ++++++++
| |  .../assets/findings_report_template.md           |  89 +++
| |  .../assets/instruments_reference.md              |  95 +++
| |  .../assets/recruitment_tracker_template.md       |  44 ++
| |  .../assets/session_log_template.md               |  69 ++
| |  .../assets/test_plan_template.md                 |  79 +++
| |  .../23127152_HW03_AI_GUIUsability_99/CONTENTS.md | 103 +++
| |  .../23127152_HW03_AI_GUIUsability_99/README.md   |  63 ++
| |  .../23127152_HW03_AI_GUIUsability_99/README.pdf  | Bin 0 -> 223432 bytes
| |  tests-23127152/submission/README.md              |  39 ++
| |  .../submission/checklist_and_test_summary.xlsx   | Bin 0 -> 16664 bytes
| |  tests-23127152/submission/commit_log.txt         |  46 ++
| |  .../submission/gui_checklist_report.md           |  45 ++
| |  .../submission/usability_evaluation_report.md    |  71 +++
| |  .../test-runs/RUN-REAL-BROWSER-CAPTURE.md        |  46 ++
| |  tests-23127152/test-runs/capture-window.sh       |  20 +
| |  tests-23127152/test-runs/execute-task1.mjs       | 626 +++++++++++++++++++
| |  tests-23127152/test-runs/execute-task3-real.mjs  | 309 +++++++++
| |  tests-23127152/test-runs/execute-task3.mjs       | 198 ++++++
| |  tests-23127152/test-runs/execution-results.json  | 276 ++++++++
| |  tests-23127152/test-runs/macos_window_capture.py | 297 +++++++++
| |  .../test-runs/sprint-1-gui-execution.md          |  79 +++
| |  .../test-runs/sprint-2-cross-browser-com.md      |  52 ++
| |  tests-23127152/test-runs/task3-results-real.json | 259 ++++++++
| |  tests-23127152/test-runs/task3-results.json      | 229 +++++++
| |  tests-23127152/usability/README.md               |  17 +
| |  .../01-plan/Survey-23127152.xlsx                 | Bin 0 -> 53593 bytes
| |  .../U-01-login-profile/01-plan/instruments.md    |  57 ++
| |  .../01-plan/recruitment-tracker.md               |  66 ++
| |  .../01-plan/survey-sheets-P00-P07.xlsx           | Bin 0 -> 32848 bytes
| |  .../U-01-login-profile/01-plan/test-plan.md      | 117 ++++
| |  .../U-01-login-profile/02-conduct/README.md      |  11 +
| |  .../02-conduct/evidence/.gitkeep                 |   0
| |  .../02-conduct/participants/P01.md               |  69 ++
| |  .../02-conduct/participants/P02.md               |  68 ++
| |  .../02-conduct/participants/P03.md               |  68 ++
| |  .../02-conduct/participants/P04.md               |  68 ++
| |  .../02-conduct/participants/P05.md               |  67 ++
| |  .../02-conduct/participants/P06.md               |  68 ++
| |  .../02-conduct/participants/P07.md               |  67 ++
| |  .../participants/_SESSION_INSTRUCTIONS.md        |   8 +
| |  .../U-01-login-profile/02-conduct/pilot/P00.md   |  35 ++
| |  .../03-analyse/aggregate-results.md              |  43 ++
| |  .../03-analyse/findings-report.md                | 130 ++++
| |  .../usability/U-01-login-profile/README.md       |  31 +
| |  406 files changed, 12697 insertions(+), 1 deletion(-)
| |   
| | * commit 96073d11003dd4987f225230caa58ab6df49c6e2
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Aug 7 09:09:38 2026 +0700
| | | 
| | |     feat: add Mini-Exercise categories API tests and GitHub Actions workflow
| | | 
| | |  .github/workflows/newman-api-test.yml           |   50 +
| | |  Mini-Exercise/Mini_Exercise.md                  |  305 ++++
| | |  Mini-Exercise/Mini_Exercise.pdf                 |  Bin 0 -> 256333 bytes
| | |  Mini-Exercise/README.md                         |  263 +++
| | |  Mini-Exercise/mini-categories.data.json         |   32 +
| | |  .../mini-categories.postman_collection.json     |   73 +
| | |  .../mini-local.postman_environment.json         |   18 +
| | |  Mini-Exercise/mini-newman-report.json           | 1543 +++++++++++++++++
| | |  .../postman-contract-test-prompt-guide.md       |  301 ++++
| | |  9 files changed, 2585 insertions(+)
| | | 
| | * commit 0e7c1bb81d6414ff878dc72d6aa82ed81396d5d3
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 11:36:35 2026 +0700
| | | 
| | |     feat: add Agent skills + demo video youtube
| | | 
| | |  HW3/Agent Skills/gui-checklist-runner/SKILL.md  | 130 +++++++++++
| | |  HW3/Agent Skills/gui-checklist-writer/SKILL.md  | 192 ++++++++++++++++
| | |  .../examples/sample_checklist_excerpt.md        |  13 ++
| | |  .../references/ia_aspects.md                    |  22 ++
| | |  .../references/item_catalog.md                  |  55 +++++
| | |  HW3/Agent Skills/link_demo_youtube.txt          |   1 +
| | |  HW3/Agent Skills/usability-runner/SKILL.md      | 212 ++++++++++++++++++
| | |  .../usability-runner/examples/sample_finding.md |  14 ++
| | |  .../references/severity_and_outcomes.md         |  27 +++
| | |  HW3/Agent Skills/usability-writer/SKILL.md      | 195 ++++++++++++++++
| | |  .../examples/sample_test_plan_excerpt.md        |  33 +++
| | |  .../references/scenario_rules.md                |  36 +++
| | |  12 files changed, 930 insertions(+)
| | | 
| | * commit 5f09b5d646f68ee587f4c9330021145f6a078dd3
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 11:28:24 2026 +0700
| | | 
| | |     feat(demo): design usability test plan for register and login flows
| | | 
| | |  demo/DESIGN_NOTES.md        | 80 ++++++++++++++++++++++++++++++++
| | |  demo/instruments/probes.md  | 27 +++++++++++
| | |  demo/instruments/scale.md   | 50 ++++++++++++++++++++
| | |  demo/participants/roster.md | 27 +++++++++++
| | |  demo/pilot/pilot-notes.md   | 44 ++++++++++++++++++
| | |  demo/pilot/pilot-plan.md    | 29 ++++++++++++
| | |  demo/sessions/_TEMPLATE.md  | 96 +++++++++++++++++++++++++++++++++++++++
| | |  demo/test-plan.md           | 82 +++++++++++++++++++++++++++++++++
| | |  8 files changed, 435 insertions(+)
| | | 
| | * commit 03fb36dcb5d744146579d99a7805bc09a3949e42
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 10:44:42 2026 +0700
| | | 
| | |     feat: add screenshot of the bugs on the Github Issues Page for 13 GUI Testing Bugs
| | | 
| | |  .../Github_Issues_Screenshots/13_GUI_Issues.png  | Bin 0 -> 269287 bytes
| | |  .../Github_Issues_Screenshots/Issue_1.png        | Bin 0 -> 180007 bytes
| | |  .../Github_Issues_Screenshots/Issue_2.png        | Bin 0 -> 175192 bytes
| | |  3 files changed, 0 insertions(+), 0 deletions(-)
| | | 
| | * commit 802e068093d81d78f8835bd9d4e82d7006b7a5a2
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 10:31:47 2026 +0700
| | | 
| | |     docs: finish AI Audit Report for HW3
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 142 +++++++++++++++++------------
| | |  1 file changed, 86 insertions(+), 56 deletions(-)
| | | 
| | * commit 1533671d73f3967b06a91da1f314fd98fb24f2c1
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 10:30:17 2026 +0700
| | | 
| | |     docs: add main report for HW3
| | | 
| | |  HW3/Main_Report.md | 158 +++++++++++++++++++++++++++++++++++++++++++++++
| | |  1 file changed, 158 insertions(+)
| | | 
| | * commit 70fc8f5d7a12e31396a6dda9175825bb2231cea6
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 10:25:17 2026 +0700
| | | 
| | |     finalized task 3 in HW3
| | | 
| | |  .../Chrome/admin-orders-canceled-state.png      | Bin 0 -> 26184 bytes
| | |  .../Evidences/Chrome/admin-orders-xss.png       | Bin 0 -> 26184 bytes
| | |  .../forgot-password-step2-weak-password.png     | Bin 0 -> 27679 bytes
| | |  .../Firefox/admin-orders-canceled-state.png     | Bin 0 -> 27091 bytes
| | |  .../Evidences/Firefox/admin-orders-xss.png      | Bin 0 -> 27091 bytes
| | |  .../forgot-password-step2-weak-password.png     | Bin 0 -> 29127 bytes
| | |  .../Safari/admin-orders-canceled-state.png      | Bin 0 -> 23799 bytes
| | |  .../Evidences/Safari/admin-orders-xss.png       | Bin 0 -> 23799 bytes
| | |  .../forgot-password-step2-weak-password.png     | Bin 0 -> 26742 bytes
| | |  HW3/Task3_CrossPlatform/Report.md               |  23 ++++++++++++------
| | |  HW3/Task3_CrossPlatform/Report.pdf              | Bin 0 -> 253043 bytes
| | |  11 files changed, 16 insertions(+), 7 deletions(-)
| | | 
| | * commit 5bc6047c191424081513a0e07625813b8ce0bbf7
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 10:24:54 2026 +0700
| | | 
| | |     docs: add README.md
| | | 
| | |  HW3/README.md | 66 +++++++++++++++++++++++++++--------------------------
| | |  1 file changed, 34 insertions(+), 32 deletions(-)
| | | 
| | * commit aba3314070c6fc65d5c0b5cda0613d0f27b6a8a8
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 10:14:55 2026 +0700
| | | 
| | |     docs: append Artifacts 13 and 14 to AI Audit Report
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 99 ++++++++++++++++++++++++++++--
| | |  1 file changed, 95 insertions(+), 4 deletions(-)
| | | 
| | * commit 9480e13be13753629c273c90bae3ef79facffbfc
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 10:13:26 2026 +0700
| | | 
| | |     docs: create HW3 README with self-assessment table and test summary
| | | 
| | |  HW3/README.md | 55 +++++++++++++++++++++++++++++++++++++++++++++++++++++
| | |  1 file changed, 55 insertions(+)
| | | 
| | * commit 799baefeaa037cf0b43d90c23bb25c7ebd4bc166
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 10:06:11 2026 +0700
| | | 
| | |     docs: add AI Critique for HW3 in Vietnamese
| | | 
| | |  HW3/AI Submission/AI_Critique.md | 9 +++++++++
| | |  1 file changed, 9 insertions(+)
| | | 
| | * commit 165d79a13d5ec669c8394fa9630e39476912e538
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 09:55:28 2026 +0700
| | | 
| | |     docs: expand Task 3 cross-platform matrix to include all 45 test cases
| | | 
| | |  HW3/Task3_CrossPlatform/Report.md | 67 +++++++++++++++++++++++++--------
| | |  1 file changed, 51 insertions(+), 16 deletions(-)
| | | 
| | * commit d0c05f3450b865fb724a6d10f375a62b4abf4476
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 09:37:08 2026 +0700
| | | 
| | |     feat: add excel Usability Testing in Hw2
| | | 
| | |  .../23127148 - Usability Testing.xlsx             | Bin 0 -> 34942 bytes
| | |  1 file changed, 0 insertions(+), 0 deletions(-)
| | | 
| | * commit 82b207c9d323d3f6c066885207d13f6c39b81243
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 09:36:19 2026 +0700
| | | 
| | |     docs(HW3): finalize task 2 in HW3
| | | 
| | |  HW3/Task2_Usability/analysis/SUMMARY.md     |  9 +++--
| | |  HW3/Task2_Usability/assets/video.md         | 19 +++++++++
| | |  HW3/Task2_Usability/instruments/probes.md   | 26 ++++++-------
| | |  HW3/Task2_Usability/participants/roster.md  | 18 ++++-----
| | |  HW3/Task2_Usability/pilot/pilot-plan.md     |  7 +++-
| | |  HW3/Task2_Usability/plan/scenario.md        |  7 +++-
| | |  HW3/Task2_Usability/report.md               |  9 ++++-
| | |  HW3/Task2_Usability/results/findings.md     | 19 ++++-----
| | |  HW3/Task2_Usability/sessions/session-P01.md | 46 ++++++++++++++++------
| | |  HW3/Task2_Usability/sessions/session-P02.md | 42 +++++++++++++++-----
| | |  HW3/Task2_Usability/sessions/session-P03.md | 43 ++++++++++++++++-----
| | |  HW3/Task2_Usability/sessions/session-P04.md | 30 ++++++++++++---
| | |  HW3/Task2_Usability/sessions/session-P05.md | 44 ++++++++++++++++-----
| | |  HW3/Task2_Usability/sessions/session-P06.md | 44 ++++++++++++++++-----
| | |  HW3/Task2_Usability/sessions/session-P07.md | 47 +++++++++++++++++------
| | |  15 files changed, 304 insertions(+), 106 deletions(-)
| | | 
| | * commit b374504cdf3470a8a31e194e1449196d20ffeeab
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 09:17:28 2026 +0700
| | | 
| | |     docs: resolve TODO placeholders in usability objectives and scenario plans
| | | 
| | |  HW3/Task2_Usability/plan/objectives.md | 2 +-
| | |  HW3/Task2_Usability/plan/scenario.md   | 2 +-
| | |  2 files changed, 2 insertions(+), 2 deletions(-)
| | | 
| | * commit 904193223375dc8338170ca90a48fcb504e5ba2c
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 08:40:40 2026 +0700
| | | 
| | |     docs: update AI audit report for Task 2 usability evaluation and format roster
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md       | 62 ++++++++++++++++++++++--
| | |  HW3/Task2_Usability/participants/roster.md | 21 ++++----
| | |  2 files changed, 66 insertions(+), 17 deletions(-)
| | | 
| | * commit 1f3647440663f52a886f4033aeaa1c2d2a1df53e
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Mon Aug 3 08:16:39 2026 +0700
| | | 
| | |     docs: update usability testing session logs, findings, and summary for P01-P07
| | | 
| | |  HW3/Task2_Usability/analysis/SUMMARY.md      | 35 +++++++++++++++++
| | |  HW3/Task2_Usability/analysis/scale-scores.md | 16 ++++++++
| | |  HW3/Task2_Usability/participants/roster.md   | 15 ++++----
| | |  HW3/Task2_Usability/pilot/pilot-notes.md     |  7 +++-
| | |  HW3/Task2_Usability/pilot/pilot-plan.md      | 17 ++++----
| | |  HW3/Task2_Usability/report.md                | 45 +++++++++++++++++-----
| | |  HW3/Task2_Usability/results/findings.md      | 10 ++++-
| | |  HW3/Task2_Usability/results/sus-scores.md    | 21 +++++-----
| | |  HW3/Task2_Usability/sessions/session-P01.md  | 30 ++++++++-------
| | |  HW3/Task2_Usability/sessions/session-P02.md  | 30 ++++++++-------
| | |  HW3/Task2_Usability/sessions/session-P03.md  | 30 ++++++++-------
| | |  HW3/Task2_Usability/sessions/session-P04.md  | 30 ++++++++-------
| | |  HW3/Task2_Usability/sessions/session-P05.md  | 29 +++++++-------
| | |  HW3/Task2_Usability/sessions/session-P06.md  | 30 ++++++++-------
| | |  HW3/Task2_Usability/sessions/session-P07.md  | 30 ++++++++-------
| | |  15 files changed, 246 insertions(+), 129 deletions(-)
| | | 
| | * commit c3f76e3b82c1edfff25765bbd564b491fa587bfa
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 11:07:52 2026 +0700
| | | 
| | |     docs(usability): append Artifact 11 (Google Sheet standardization) to AI Audit Report
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 104 +++++++++++++++++++++++++++--
| | |  1 file changed, 97 insertions(+), 7 deletions(-)
| | | 
| | * commit 2d7d61748105f1b7dcdef80758c74e20a1685200
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 11:07:03 2026 +0700
| | | 
| | |     feat(usability): add scripts to standardize and validate usability testing Google Sheet
| | | 
| | |  scripts/standardize_sheet.py | 362 +++++++++++++++++++++++++++++++++++++
| | |  scripts/validate_sheet.py    |  51 ++++++
| | |  2 files changed, 413 insertions(+)
| | | 
| | * commit 2fb6c9f102305cc4ba23aa8a3e6eb01d10185858
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 10:59:54 2026 +0700
| | | 
| | |     docs: append Artifact #10 (Google Sheets setup) to AI Audit Report
| | | 
| | |  .gitignore                                |  3 +-
| | |  HW3/AI Submission/AI_Audit_Report.md      | 60 ++++++++++++++++--
| | |  HW3/Task2_Usability/DESIGN_NOTES.md       | 42 -------------
| | |  HW3/Task2_Usability/PROBE_QUESTIONS.md    | 44 -------------
| | |  HW3/Task2_Usability/SUS_FORM.md           | 44 -------------
| | |  HW3/Task2_Usability/sessions/_TEMPLATE.md | 73 ----------------------
| | |  HW3/Task2_Usability/test-plan.md          | 83 -------------------------
| | |  7 files changed, 57 insertions(+), 292 deletions(-)
| | | 
| | * commit 9fd1bf7aa3539170e41707a4ee2f02cd680f6f14
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 10:59:11 2026 +0700
| | | 
| | |     Update AI Audit Report with Artifact #9 documenting usability evaluation template human review
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 80 ++++++++++++++++++++++++++++--
| | |  1 file changed, 75 insertions(+), 5 deletions(-)
| | | 
| | * commit 8f62ca4b93034648c4262b2e5200fc12d7218f4b
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 10:57:52 2026 +0700
| | | 
| | |     Initialize usability evaluation templates and plans for Task 2
| | | 
| | |  HW3/Task2_Usability/instruments/probes.md   | 40 +++++-------
| | |  HW3/Task2_Usability/instruments/scale.md    | 74 ++++++++---------------
| | |  HW3/Task2_Usability/participants/roster.md  | 35 ++++-------
| | |  HW3/Task2_Usability/pilot/pilot-notes.md    | 35 ++---------
| | |  HW3/Task2_Usability/pilot/pilot-plan.md     | 50 ++++++---------
| | |  HW3/Task2_Usability/plan/objectives.md      | 11 ++++
| | |  HW3/Task2_Usability/plan/scenario.md        | 19 ++++++
| | |  HW3/Task2_Usability/report.md               | 20 ++++++
| | |  HW3/Task2_Usability/results/findings.md     | 13 ++++
| | |  HW3/Task2_Usability/results/sus-scores.md   | 18 ++++++
| | |  HW3/Task2_Usability/sessions/session-P01.md | 26 ++++++++
| | |  HW3/Task2_Usability/sessions/session-P02.md | 26 ++++++++
| | |  HW3/Task2_Usability/sessions/session-P03.md | 26 ++++++++
| | |  HW3/Task2_Usability/sessions/session-P04.md | 26 ++++++++
| | |  HW3/Task2_Usability/sessions/session-P05.md | 26 ++++++++
| | |  HW3/Task2_Usability/sessions/session-P06.md | 26 ++++++++
| | |  HW3/Task2_Usability/sessions/session-P07.md | 26 ++++++++
| | |  17 files changed, 339 insertions(+), 158 deletions(-)
| | | 
| | * commit 29c885bac6db686f8e5314fffd84701fa41712a1
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 10:25:46 2026 +0700
| | | 
| | |     docs: Update mail fit clc + screenshot from Task03
| | | 
| | |  .../Evidences/Chrome/admin-orders.png           | Bin 347427 -> 352727 bytes
| | |  .../Evidences/Chrome/forgot-password-step2.png  | Bin 229245 -> 232936 bytes
| | |  .../Evidences/Chrome/forgot-password.png        | Bin 189062 -> 193062 bytes
| | |  .../Evidences/Chrome/user-not-found.png         | Bin 235384 -> 239444 bytes
| | |  .../Evidences/Firefox/admin-orders.png          | Bin 264615 -> 269105 bytes
| | |  .../Evidences/Firefox/forgot-password-step2.png | Bin 190461 -> 194707 bytes
| | |  .../Evidences/Firefox/forgot-password.png       | Bin 186129 -> 192717 bytes
| | |  .../Evidences/Firefox/user-not-found.png        | Bin 211008 -> 215239 bytes
| | |  .../Evidences/Safari/admin-orders.png           | Bin 241669 -> 245940 bytes
| | |  .../Evidences/Safari/forgot-password.png        | Bin 182561 -> 186616 bytes
| | |  .../Evidences/Safari/forgotpassword-step2.png   | Bin 164589 -> 168959 bytes
| | |  .../Evidences/Safari/user-not-found.png         | Bin 154975 -> 159104 bytes
| | |  HW3/Task3_CrossPlatform/Report.md               |   2 +-
| | |  13 files changed, 1 insertion(+), 1 deletion(-)
| | | 
| | * commit 90be1a1268034511bc0e588373904aadc8620521
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 10:13:11 2026 +0700
| | | 
| | |     feat(hw3/task 3): finish task 3 + upload screenshots via cross platform + report
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md            |  55 ++++++++++--
| | |  .../Evidences/Chrome/admin-orders.png           | Bin 0 -> 347427 bytes
| | |  .../Evidences/Chrome/forgot-password-step2.png  | Bin 0 -> 229245 bytes
| | |  .../Evidences/Chrome/forgot-password.png        | Bin 0 -> 189062 bytes
| | |  .../Evidences/Chrome/user-not-found.png         | Bin 0 -> 235384 bytes
| | |  .../Evidences/Firefox/admin-orders.png          | Bin 0 -> 264615 bytes
| | |  .../Evidences/Firefox/forgot-password-step2.png | Bin 0 -> 190461 bytes
| | |  .../Evidences/Firefox/forgot-password.png       | Bin 0 -> 186129 bytes
| | |  .../Evidences/Firefox/user-not-found.png        | Bin 0 -> 211008 bytes
| | |  .../Evidences/Safari/admin-orders.png           | Bin 0 -> 241669 bytes
| | |  .../Evidences/Safari/forgot-password.png        | Bin 0 -> 182561 bytes
| | |  .../Evidences/Safari/forgotpassword-step2.png   | Bin 0 -> 164589 bytes
| | |  .../Evidences/Safari/user-not-found.png         | Bin 0 -> 154975 bytes
| | |  HW3/Task3_CrossPlatform/Report.md               |  78 ++++++++++--------
| | |  14 files changed, 93 insertions(+), 40 deletions(-)
| | | 
| | * commit 7e4f82a9b379335b26b601f48572afdeff867a6a
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 09:34:22 2026 +0700
| | | 
| | |     fix: patch React DevTools global hook in index.html to avoid crash in BrowserStack
| | | 
| | |  frontend-admin/index.html | 5 +++++
| | |  frontend-web/index.html   | 5 +++++
| | |  2 files changed, 10 insertions(+)
| | | 
| | * commit 8f6f0a1fec0d2e29960ef2c5d181dc80ce6f5169
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 09:31:47 2026 +0700
| | | 
| | |     chore: allow all hosts in Vite configs to support ngrok tunnel access
| | | 
| | |  frontend-admin/vite.config.js | 1 +
| | |  frontend-web/vite.config.js   | 3 +++
| | |  2 files changed, 4 insertions(+)
| | | 
| | * commit 7bde92879d1fe05d78b3c64c861d8e3bee47f527
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 09:30:01 2026 +0700
| | | 
| | |     chore: change local web host to 0.0.0.0 in run.sh to allow external access
| | | 
| | |  scripts/run.sh | 4 ++--
| | |  1 file changed, 2 insertions(+), 2 deletions(-)
| | | 
| | * commit 0a9f922a97ab581d3ebb64bfe8e172299aa74810
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 09:25:11 2026 +0700
| | | 
| | |     docs: filter cross-platform matrix to 15 items and update audit log
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 46 +++++++++++++++++++++++++++---
| | |  HW3/Task3_CrossPlatform/Report.md    | 39 ++++---------------------
| | |  2 files changed, 48 insertions(+), 37 deletions(-)
| | | 
| | * commit d7e54a500b6903675fcea907583218759bbfc5d4
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 09:16:39 2026 +0700
| | | 
| | |     docs: append cross-platform report initialization to AI_Audit_Report.md
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 77 ++++++++++++++++++++++++++++--
| | |  1 file changed, 72 insertions(+), 5 deletions(-)
| | | 
| | * commit 0f6865cb439ccb98c3a40d06f2c9dcbed932bdf6
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Sun Aug 2 09:11:49 2026 +0700
| | | 
| | |     docs: generate cross-platform testing report with 45 checklist items
| | | 
| | |  .../cross-platform-testing-tracker/SKILL.md     | 143 ++++++++++++++++++
| | |  .../assets/platform_matrix_template.md          |  32 ++++
| | |  .../scripts/watermark_screenshot.py             | 132 ++++++++++++++++
| | |  HW3/Task3_CrossPlatform/Report.md               | 116 ++++++++++++++
| | |  4 files changed, 423 insertions(+)
| | | 
| | * commit 9e750e701601922ca5e111206bb467de6568885c
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 11:13:41 2026 +0700
| | | 
| | |     fix(hw3/task2): remove Task 1 cross-references from usability artifacts — Task 2 is independent
| | | 
| | |  HW3/Task2_Usability/DESIGN_NOTES.md       | 16 +---------------
| | |  HW3/Task2_Usability/PROBE_QUESTIONS.md    |  4 ++--
| | |  HW3/Task2_Usability/sessions/_TEMPLATE.md |  1 -
| | |  3 files changed, 3 insertions(+), 18 deletions(-)
| | | 
| | * commit 432dcb482ebdedcf4b22b0451644c1d1caac63ca
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 11:11:41 2026 +0700
| | | 
| | |     feat(hw3/task2): add usability test plan, SUS form, probe questions, session template for Login/ForgotPassword flow (FR-02, FR-03)
| | | 
| | |  HW3/Task2_Usability/DESIGN_NOTES.md       |  39 ++++++---
| | |  HW3/Task2_Usability/PROBE_QUESTIONS.md    |  44 +++++++++++
| | |  HW3/Task2_Usability/SUS_FORM.md           |  44 +++++++++++
| | |  HW3/Task2_Usability/sessions/_TEMPLATE.md |  29 ++++---
| | |  HW3/Task2_Usability/test-plan.md          | 100 ++++++++++++++++--------
| | |  5 files changed, 201 insertions(+), 55 deletions(-)
| | | 
| | * commit d332a3cc5515d7d49bf9b05b2c667e714003a90c
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 11:06:28 2026 +0700
| | | 
| | |     docs: append Artifact #5 for Task 2 Usability folder structure and Agent Skills into AI Audit Report
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 104 +++++++++++++++++++++++------
| | |  1 file changed, 83 insertions(+), 21 deletions(-)
| | | 
| | * commit a6e933c276b9411b585b58bcd6d68f90cb4897b4
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 11:05:42 2026 +0700
| | | 
| | |     refactor: move Evidences and Bug Report into HW3/Task1_GUI and update image reference paths
| | | 
| | |  .agents/skills/gui-checklist-runner/SKILL.md    |  27 +++++++------
| | |  .../Bug Report/BUG-FORGOT-001.md                |   2 +-
| | |  .../Bug Report/BUG-FORGOT-002.md                |   2 +-
| | |  .../Bug Report/BUG-FORGOT-003.md                |   2 +-
| | |  .../Bug Report/BUG-FORGOT-004.md                |   2 +-
| | |  .../Bug Report/BUG-FORGOT-005.md                |   2 +-
| | |  .../Bug Report/BUG-FORGOT-006.md                |   2 +-
| | |  .../Bug Report/BUG-FORGOT-007.md                |   2 +-
| | |  .../Bug Report/BUG-FORGOT-008.md                |   2 +-
| | |  .../Bug Report/BUG-ORDERS-001.md                |   2 +-
| | |  .../Bug Report/BUG-ORDERS-002.md                |   2 +-
| | |  .../Bug Report/BUG-ORDERS-003.md                |   2 +-
| | |  .../Bug Report/BUG-ORDERS-004.md                |   0
| | |  .../Bug Report/BUG-ORDERS-005.md                |   0
| | |  HW3/Task1_GUI/CHECKLIST.csv                     |  36 +++++++++---------
| | |  HW3/Task1_GUI/CHECKLIST.md                      |  36 +++++++++---------
| | |  .../Evidences/GUI-FORGOT-IA01-01.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-01.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-02.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-03.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-04.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-05.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-06.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-07.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-08.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-09.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA02-10.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA04-01.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA04-02.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA04-03.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA04-04.png            | Bin
| | |  .../Evidences/GUI-FORGOT-IA04-05.png            | Bin
| | |  .../Evidences/GUI-ORDERS-IA01-05.png            | Bin
| | |  .../Evidences/GUI-ORDERS-IA04-01.png            | Bin
| | |  .../Evidences/GUI-ORDERS-IA04-02.png            | Bin
| | |  .../Evidences/GUI-ORDERS-IA04-05.png            | Bin
| | |  .../Evidences/GUI-ORDERS-IA04-07.png            | Bin
| | |  HW3/Task1_GUI/TEST_SUMMARY.md                   |  24 ++++++------
| | |  38 files changed, 72 insertions(+), 73 deletions(-)
| | | 
| | * commit 67fe6aab040cce0eaccd0e1c6230724d9049f76e
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 11:03:38 2026 +0700
| | | 
| | |     Change name to Task1_GUI
| | | 
| | |  HW3/{GUI-Testing => Task1_GUI}/CHECKLIST.csv    |   0
| | |  HW3/{GUI-Testing => Task1_GUI}/CHECKLIST.md     |   0
| | |  HW3/{GUI-Testing => Task1_GUI}/CHECKLIST.xlsx   | Bin
| | |  HW3/{GUI-Testing => Task1_GUI}/DESIGN_REPORT.md |   0
| | |  HW3/{GUI-Testing => Task1_GUI}/TEST_SUMMARY.md  |   0
| | |  5 files changed, 0 insertions(+), 0 deletions(-)
| | | 
| | * commit f407fb9edcdcc17d0a5e4b5de024c15f0ab2a926
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 11:02:49 2026 +0700
| | | 
| | |     feat: add Task2_Usability folder structure and usability skills
| | | 
| | |  .agents/skills/usability-runner/SKILL.md        | 212 ++++++++++++++++++
| | |  .../usability-runner/examples/sample_finding.md |  14 ++
| | |  .../references/severity_and_outcomes.md         |  27 +++
| | |  .agents/skills/usability-writer/SKILL.md        | 195 ++++++++++++++++
| | |  .../examples/sample_test_plan_excerpt.md        |  33 +++
| | |  .../references/scenario_rules.md                |  36 +++
| | |  HW3/Task2_Usability/DESIGN_NOTES.md             |  37 +++
| | |  HW3/Task2_Usability/instruments/probes.md       |  31 +++
| | |  HW3/Task2_Usability/instruments/scale.md        |  48 ++++
| | |  HW3/Task2_Usability/participants/roster.md      |  22 ++
| | |  HW3/Task2_Usability/pilot/pilot-notes.md        |  32 +++
| | |  HW3/Task2_Usability/pilot/pilot-plan.md         |  34 +++
| | |  HW3/Task2_Usability/sessions/_TEMPLATE.md       |  69 ++++++
| | |  HW3/Task2_Usability/test-plan.md                |  49 ++++
| | |  14 files changed, 839 insertions(+)
| | | 
| | * commit c06d76057491ffa49f50f9c36490057505d5f371
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 08:58:55 2026 +0700
| | | 
| | |     docs(hw3): add excel checklist + test summary for task 1
| | | 
| | |  HW3/GUI-Testing/CHECKLIST.xlsx  | Bin 0 -> 14001 bytes
| | |  HW3/GUI-Testing/TEST_SUMMARY.md |  60 ++++++++++++++++++++++++++++++++++
| | |  2 files changed, 60 insertions(+)
| | | 
| | * commit 5cfc67b81118807b38ab9063495a1dfdd5b9f93b
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 08:58:04 2026 +0700
| | | 
| | |     docs(hw03): update AI Audit Report with Artifact #4 for Test Summary and Excel checklist
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 66 ++++++++++++++++++++++++++----
| | |  1 file changed, 58 insertions(+), 8 deletions(-)
| | | 
| | * commit 301ee734bebcae1f8cb1ff96e24d1a60a67489df
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 08:58:00 2026 +0700
| | | 
| | |     style(hw03): remove github issue drafts from bug reports
| | | 
| | |  HW3/Bug Report/BUG-FORGOT-001.md | 26 --------------------
| | |  HW3/Bug Report/BUG-FORGOT-002.md | 26 --------------------
| | |  HW3/Bug Report/BUG-FORGOT-003.md | 26 --------------------
| | |  HW3/Bug Report/BUG-FORGOT-004.md | 26 --------------------
| | |  HW3/Bug Report/BUG-FORGOT-005.md | 27 ---------------------
| | |  HW3/Bug Report/BUG-FORGOT-006.md | 27 ---------------------
| | |  HW3/Bug Report/BUG-FORGOT-007.md | 26 --------------------
| | |  HW3/Bug Report/BUG-FORGOT-008.md | 26 --------------------
| | |  HW3/Bug Report/BUG-ORDERS-001.md | 28 ----------------------
| | |  HW3/Bug Report/BUG-ORDERS-002.md | 26 --------------------
| | |  HW3/Bug Report/BUG-ORDERS-003.md | 26 --------------------
| | |  HW3/Bug Report/BUG-ORDERS-004.md | 43 ++++++++++++++++++++++++++++++++++
| | |  HW3/Bug Report/BUG-ORDERS-005.md | 40 +++++++++++++++++++++++++++++++
| | |  13 files changed, 83 insertions(+), 290 deletions(-)
| | | 
| | * commit fe8e1e5336bb8d05aaead67a3edb2c4f0e23f69d
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Fri Jul 31 08:45:11 2026 +0700
| | | 
| | |     docs(hw3): update AI_Audit_Report.md with artifact 3 for task 1 execution phase
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 89 ++++++++++++++++++++++++++----
| | |  1 file changed, 77 insertions(+), 12 deletions(-)
| | | 
| | * commit 6f35f7c92dadd15845fc189a5e683825caeb81ab
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Thu Jul 30 16:07:54 2026 +0700
| | | 
| | |     fix(hw3): add red element highlight overlays and failure badges to evidence screenshots
| | | 
| | |  HW3/Evidences/GUI-FORGOT-IA01-01.png | Bin 17666 -> 21174 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-01.png | Bin 17796 -> 20441 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-02.png | Bin 17796 -> 21594 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-04.png | Bin 17796 -> 21680 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-05.png | Bin 22199 -> 25985 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-06.png | Bin 22199 -> 26341 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-07.png | Bin 17666 -> 21428 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-08.png | Bin 22199 -> 26298 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-09.png | Bin 17666 -> 21554 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-10.png | Bin 22833 -> 27424 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA04-03.png | Bin 22831 -> 26522 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA04-04.png | Bin 19707 -> 23367 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA04-05.png | Bin 22831 -> 26479 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA01-05.png | Bin 41772 -> 45151 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA04-01.png | Bin 41772 -> 45091 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA04-02.png | Bin 41772 -> 44606 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA04-05.png | Bin 41114 -> 43464 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA04-07.png | Bin 41114 -> 44039 bytes
| | |  scripts/gui_results.json             |   2 +-
| | |  scripts/run_gui_checklist.js         | 131 +++++++++++++++++++----------
| | |  20 files changed, 88 insertions(+), 45 deletions(-)
| | | 
| | * commit 237b665552d2d916b1fcb03bf8dcd4d933863746
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Thu Jul 30 16:05:48 2026 +0700
| | | 
| | |     test(hw3): execute task 1 gui checklist end-to-end and update artifacts with bug reports
| | | 
| | |  HW3/Bug Report/BUG-FORGOT-001.md      |  64 ++++
| | |  HW3/Bug Report/BUG-FORGOT-002.md      |  64 ++++
| | |  HW3/Bug Report/BUG-FORGOT-003.md      |  64 ++++
| | |  HW3/Bug Report/BUG-FORGOT-004.md      |  64 ++++
| | |  HW3/Bug Report/BUG-FORGOT-005.md      |  66 ++++
| | |  HW3/Bug Report/BUG-FORGOT-006.md      |  66 ++++
| | |  HW3/Bug Report/BUG-FORGOT-007.md      |  64 ++++
| | |  HW3/Bug Report/BUG-FORGOT-008.md      |  64 ++++
| | |  HW3/Bug Report/BUG-ORDERS-001.md      |  68 ++++
| | |  HW3/Bug Report/BUG-ORDERS-002.md      |  64 ++++
| | |  HW3/Bug Report/BUG-ORDERS-003.md      |  64 ++++
| | |  HW3/Evidences/GUI-FORGOT-IA01-01.png  | Bin 0 -> 17666 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-01.png  | Bin 0 -> 17796 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-02.png  | Bin 0 -> 17796 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-03.png  | Bin 0 -> 18934 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-04.png  | Bin 0 -> 17796 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-05.png  | Bin 0 -> 22199 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-06.png  | Bin 0 -> 22199 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-07.png  | Bin 0 -> 17666 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-08.png  | Bin 0 -> 22199 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-09.png  | Bin 0 -> 17666 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA02-10.png  | Bin 0 -> 22833 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA04-01.png  | Bin 0 -> 18934 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA04-02.png  | Bin 0 -> 18934 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA04-03.png  | Bin 0 -> 22831 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA04-04.png  | Bin 0 -> 19707 bytes
| | |  HW3/Evidences/GUI-FORGOT-IA04-05.png  | Bin 0 -> 22831 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA01-05.png  | Bin 0 -> 41772 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA04-01.png  | Bin 0 -> 41772 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA04-02.png  | Bin 0 -> 41772 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA04-05.png  | Bin 0 -> 41114 bytes
| | |  HW3/Evidences/GUI-ORDERS-IA04-07.png  | Bin 0 -> 41114 bytes
| | |  HW3/GUI-Testing/CHECKLIST.csv         |  90 +++---
| | |  HW3/GUI-Testing/CHECKLIST.md          |  90 +++---
| | |  scripts/generate_bug_reports.js       | 262 +++++++++++++++
| | |  scripts/gui_results.json              | 272 ++++++++++++++++
| | |  scripts/run_gui_checklist.js          | 475 ++++++++++++++++++++++++++++
| | |  scripts/update_checklist_artifacts.js |  82 +++++
| | |  38 files changed, 1893 insertions(+), 90 deletions(-)
| | | 
| | * commit 9b1ecea31177992443f49215eaabe30b68df80b9
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Thu Jul 30 15:59:13 2026 +0700
| | | 
| | |     feat(skill): update gui checklist runner with bug report template
| | | 
| | |  .agents/skills/gui-checklist-runner/SKILL.md | 51 +++++++++++++++-------
| | |  1 file changed, 35 insertions(+), 16 deletions(-)
| | | 
| | * commit df631fa8d424b21359b6a360c6b9aa6ec3be9cc7
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Thu Jul 30 15:32:29 2026 +0700
| | | 
| | |     feat(skill): add gui-checklist-runner skill for Playwright GUI test execution + skill for playwright
| | | 
| | |  .../skills/build-playwright-assignment/SKILL.md |  75 ++++++++++++
| | |  .agents/skills/gui-checklist-runner/SKILL.md    | 112 ++++++++++++++++++
| | |  2 files changed, 187 insertions(+)
| | | 
| | * commit 469801bea9f06ebef923b03c2c1bf13efda20774
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Thu Jul 30 14:59:27 2026 +0700
| | | 
| | |     docs(hw03): add AI Audit Report for Task 1 GUI checklist design (AI-02 template)
| | | 
| | |  HW3/AI Submission/AI_Audit_Report.md | 202 +++++++++++++++++++++++++++++
| | |  1 file changed, 202 insertions(+)
| | | 
| | * commit 14ae77a83d11564799f8f8a5d6cf0166c7d572b1
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Thu Jul 30 14:26:41 2026 +0700
| | | 
| | |     HW3: add GUI checklist design for Forgot Password + Admin Orders (45 items, IA-01..04)
| | | 
| | |  HW3/GUI-Testing/CHECKLIST.csv    |  46 +++++++++++
| | |  HW3/GUI-Testing/CHECKLIST.md     | 102 +++++++++++++++++++++++
| | |  HW3/GUI-Testing/DESIGN_REPORT.md | 144 +++++++++++++++++++++++++++++++++
| | |  3 files changed, 292 insertions(+)
| | | 
| | * commit 8d2741f562e26f28cbdfd99d24fcbff430bc641d
| | | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | | Date:   Thu Jul 30 13:42:07 2026 +0700
| | | 
| | |     feat(skills): add GUI checklist writer skill for testing in HW3
| | | 
| | |  .agents/skills/gui-checklist-writer/SKILL.md    | 192 ++++++++++++++++++
| | |  .../examples/sample_checklist_excerpt.md        |  13 ++
| | |  .../references/ia_aspects.md                    |  22 ++
| | |  .../references/item_catalog.md                  |  55 +++++
| | |  4 files changed, 282 insertions(+)
| | | 
| | * commit 1fa9486df5403f9f86bba06a9f772495140add1e
| |/  Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
|/|   Date:   Thu Jul 30 13:31:26 2026 +0700
| |   
| |       feat(skill): add skill for AI audit report
| |   
| |    .agents/skills/ai-audit-report/SKILL.md         | 336 ++++++++++++++++++
| |    .../examples/sample_audit_report.md             | 140 ++++++++
| |    .../references/ai_02_template.md                |  50 +++
| |    .../references/ai_usage_guidelines_summary.md   |  33 ++
| |    4 files changed, 559 insertions(+)
| |   
| | * commit 23cc4e09f532118e7d8b8c45db67a1c5b2bbc166
| | | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | | Date:   Mon Aug 3 15:29:14 2026 +0700
| | | 
| | |     docs: 📖 add req and related docs
| | | 
| | |  .gitignore                                      |   3 +-
| | |  backend/database.sqlite                         | Bin 36864 -> 36864 bytes
| | |  requirements/01_GUI_Testing_Theory_Slides.md    | 419 ++++++++++++++++
| | |  requirements/02_HW03_Assignment_Requirements.md | 242 +++++++++
| | |  requirements/Usability_Testing_Seminar.md       | 472 ++++++++++++++++++
| | |  5 files changed, 1135 insertions(+), 1 deletion(-)
| | | 
| | * commit 8f6fceacc69259010a30527da097065bc45d917a
| | | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | | Date:   Mon Aug 3 15:28:50 2026 +0700
| | | 
| | |     docs: 📖 update summission
| | | 
| | |  .../Appendix_A}/ai audit report.md              |    6 +-
| | |  docs/23127211/Appendix_A/ai audit report.pdf    |  Bin 0 -> 1397111 bytes
| | |  docs/23127211/Appendix_A/ai critique.md         |   11 +
| | |  docs/23127211/Appendix_A/ai critique.pdf        |  Bin 0 -> 80006 bytes
| | |  docs/23127211/README.MD                         |  148 +
| | |  docs/23127211/README.pdf                        |  Bin 0 -> 199942 bytes
| | |  docs/23127211/git-log.md                        | 5235 +++++++++++++++++
| | |  docs/23127211/git-log.pdf                       |  Bin 0 -> 714846 bytes
| | |  docs/23127211/github-issues.png                 |  Bin 0 -> 416018 bytes
| | |  docs/23127211/main-report.md                    |  397 ++
| | |  docs/23127211/main-report.pdf                   |  Bin 0 -> 838040 bytes
| | |  11 files changed, 5794 insertions(+), 3 deletions(-)
| | | 
| | * commit 53f2943f24519e5b22107675571f7c5ff954f3e2
| | | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | | Date:   Mon Aug 3 02:45:02 2026 +0700
| | | 
| | |     docs: 📖 add traceability matrix
| | | 
| | |  tests/test-cases/login/TC-LOGIN-001.md       |  33 -----
| | |  tests/test-cases/register/TC-REGISTER-001.md |   0
| | |  tests/test-summary/traceability-matrix.md    | 163 ++++++++++++++++++++-
| | |  3 files changed, 160 insertions(+), 36 deletions(-)
| | | 
| | * commit c83cbb6f260f5017c871353bcdd494283014f7ed
| | | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | | Date:   Mon Aug 3 02:09:00 2026 +0700
| | | 
| | |     docs: 📖 add evidences for bug 008 and 013
| | | 
| | |  .../product-detail/BUG-PRODDETAIL-008.md         |  12 ++++++++----
| | |  .../product-detail/BUG-PRODDETAIL-013.md         |   6 +++---
| | |  ...ODDETAIL-008-chrome-price-comma-en-locale.png | Bin 0 -> 65632 bytes
| | |  ...DDETAIL-008-firefox-price-comma-en-locale.png | Bin 0 -> 65742 bytes
| | |  ...TAIL-008-safari-ios-price-comma-en-locale.png | Bin 0 -> 647610 bytes
| | |  ...DETAIL-008-safari-ios-price-dot-vi-locale.png | Bin 0 -> 343267 bytes
| | |  .../BUG-PRODDETAIL-013-chrome-spinner-arrows.png | Bin 0 -> 65368 bytes
| | |  ...UG-PRODDETAIL-013-firefox-spinner-chevron.png | Bin 0 -> 65936 bytes
| | |  ...PRODDETAIL-013-safari-ios-spinner-missing.png | Bin 0 -> 648013 bytes
| | |  9 files changed, 11 insertions(+), 7 deletions(-)
| | | 
| | * commit 43f48a0c53f7feee56e1f6d18d9c09d80ded6238
| | | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | | Date:   Mon Aug 3 01:50:12 2026 +0700
| | | 
| | |     fix: 🐛 typo fix
| | | 
| | |  tests/usability/U-01/recruitment-tracker.md | 10 +++++-----
| | |  1 file changed, 5 insertions(+), 5 deletions(-)
| | | 
| | * commit d4fd0f2125fb1e86dfef795b9891b1fd76f27909
| | | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | | Date:   Mon Aug 3 00:39:45 2026 +0700
| | | 
| | |     docs: 📖 add 8 sessions usability tests
| | | 
| | |  tests/usability/U-01/findings-report.md     | 241 ++++++++++++++++++++++
| | |  tests/usability/U-01/recruitment-tracker.md |  69 +------
| | |  tests/usability/U-01/sessions/P00-pilot.md  |   2 +-
| | |  tests/usability/U-01/sessions/P01.md        |   9 +-
| | |  tests/usability/U-01/sessions/P02.md        | 114 ++++------
| | |  tests/usability/U-01/sessions/P03.md        | 157 ++++++--------
| | |  tests/usability/U-01/sessions/P04.md        | 181 +++++++---------
| | |  tests/usability/U-01/sessions/P05.md        | 165 ++++++---------
| | |  tests/usability/U-01/sessions/P06.md        | 176 +++++++---------
| | |  tests/usability/U-01/sessions/P07.md        | 182 +++++++---------
| | |  tests/usability/U-01/test-plan.md           |  22 +-
| | |  11 files changed, 653 insertions(+), 665 deletions(-)
| | | 
| | * commit 5c56bf7eaadbebe03b2c3a2dbee50934fc1350e3
| | | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | | Date:   Sat Aug 1 23:06:58 2026 +0700
| | | 
| | |     docs: 📖 finish task 03
| | | 
| | |  .../product-detail/BUG-PRODDETAIL-008.md        |  27 +++
| | |  .../product-detail/BUG-PRODDETAIL-013.md        |  83 +++++++++
| | |  tests/cross-platform/platform-matrix.md         | 148 +++++++++-------
| | |  ...in11_PRODDETAIL-ACC-03_focus-ring-button.png | Bin 0 -> 70893 bytes
| | |  ...in11_PRODDETAIL-COM-01_layout-comparison.png | Bin 0 -> 70946 bytes
| | |  ...e-win11_PRODDETAIL-COM-02_spinner-arrows.png | Bin 0 -> 71138 bytes
| | |  ..._PRODDETAIL-COM-03_vietnamese-diacritics.png | Bin 0 -> 70867 bytes
| | |  ...DDETAIL-COM-04_price-after-locale-change.png | Bin 0 -> 70700 bytes
| | |  ...DETAIL-COM-04_price-before-locale-change.png | Bin 0 -> 70867 bytes
| | |  ..._PRODDETAIL-COM-04_price-comma-en-locale.png | Bin 0 -> 71331 bytes
| | |  ...DETAIL-RES-01_devtools-viewport-1440x900.png | Bin 0 -> 119825 bytes
| | |  ...ODDETAIL-RES-05_addtocart-position-502px.png | Bin 0 -> 186648 bytes
| | |  .../chrome-win11_PRODDETAIL-RES-06_zoom-150.png | Bin 0 -> 86831 bytes
| | |  ..._PRODDETAIL-VIS-01_image-upscaled-blurry.png | Bin 0 -> 70946 bytes
| | |  ...DDETAIL-VIS-02_price-thousands-separator.png | Bin 0 -> 70946 bytes
| | |  ...1_PRODDETAIL-VIS-03_dong-symbol-position.png | Bin 0 -> 70946 bytes
| | |  ...DETAIL-VIS-05_label-input-vertical-align.png | Bin 0 -> 70946 bytes
| | |  ...DDETAIL-VIS-12_description-gray-contrast.png | Bin 0 -> 70946 bytes
| | |  ...ome-win11_PRODDETAIL-VIS-13_os-dark-mode.png | Bin 0 -> 71488 bytes
| | |  ...e-win11_baseline_product-detail-1440x900.png | Bin 0 -> 70946 bytes
| | |  ...in11_PRODDETAIL-ACC-03_focus-ring-button.png | Bin 0 -> 72409 bytes
| | |  ...in11_PRODDETAIL-COM-01_layout-comparison.png | Bin 0 -> 71705 bytes
| | |  ...11_PRODDETAIL-COM-02_quantity-set-to-3-b.png | Bin 0 -> 77729 bytes
| | |  ...in11_PRODDETAIL-COM-02_quantity-set-to-3.png | Bin 0 -> 77674 bytes
| | |  ...-win11_PRODDETAIL-COM-02_spinner-chevron.png | Bin 0 -> 72503 bytes
| | |  ..._PRODDETAIL-COM-03_vietnamese-diacritics.png | Bin 0 -> 72226 bytes
| | |  ..._PRODDETAIL-COM-04_price-comma-en-locale.png | Bin 0 -> 71705 bytes
| | |  ...DETAIL-RES-01_devtools-viewport-1440x900.png | Bin 0 -> 130406 bytes
| | |  ...firefox-win11_PRODDETAIL-RES-06_zoom-150.png | Bin 0 -> 89906 bytes
| | |  ..._PRODDETAIL-VIS-01_image-upscaled-blurry.png | Bin 0 -> 71705 bytes
| | |  ...DDETAIL-VIS-02_price-thousands-separator.png | Bin 0 -> 71705 bytes
| | |  ...1_PRODDETAIL-VIS-03_dong-symbol-position.png | Bin 0 -> 71705 bytes
| | |  ...DETAIL-VIS-05_label-input-vertical-align.png | Bin 0 -> 71705 bytes
| | |  ...PRODDETAIL-VIS-06_input-vs-button-height.png | Bin 0 -> 72230 bytes
| | |  ...DDETAIL-VIS-12_description-gray-contrast.png | Bin 0 -> 71705 bytes
| | |  ...PRODDETAIL-VIS-13_os-dark-mode-no-change.png | Bin 0 -> 71705 bytes
| | |  ...x-win11_baseline_product-detail-1440x900.png | Bin 0 -> 71705 bytes
| | |  ...-ios_PRODDETAIL-COM-01_layout-comparison.png | Bin 0 -> 258802 bytes
| | |  ...ri-ios_PRODDETAIL-COM-02_spinner-missing.png | Bin 0 -> 258542 bytes
| | |  ..._PRODDETAIL-COM-03_vietnamese-diacritics.png | Bin 0 -> 258688 bytes
| | |  ..._PRODDETAIL-COM-04_price-comma-en-locale.png | Bin 0 -> 257879 bytes
| | |  ...ETAIL-COM-04_price-dot-vi-locale-recheck.png | Bin 0 -> 257260 bytes
| | |  ...os_PRODDETAIL-COM-04_price-dot-vi-locale.png | Bin 0 -> 263312 bytes
| | |  ...s_PRODDETAIL-RES-04_no-horizontal-scroll.png | Bin 0 -> 285711 bytes
| | |  ...ODDETAIL-RES-05_addtocart-position-430px.png | Bin 0 -> 285711 bytes
| | |  ..._PRODDETAIL-VIS-01_image-upscaled-blurry.png | Bin 0 -> 258802 bytes
| | |  ...DDETAIL-VIS-02_price-thousands-separator.png | Bin 0 -> 258802 bytes
| | |  ...s_PRODDETAIL-VIS-03_dong-symbol-position.png | Bin 0 -> 258802 bytes
| | |  ...DETAIL-VIS-05_label-input-vertical-align.png | Bin 0 -> 258802 bytes
| | |  ...DDETAIL-VIS-12_description-gray-contrast.png | Bin 0 -> 258802 bytes
| | |  ...-ios_PRODDETAIL-VIS-13_ios-dark-mode-off.png | Bin 0 -> 285711 bytes
| | |  ...i-ios_PRODDETAIL-VIS-13_ios-dark-mode-on.png | Bin 0 -> 263312 bytes
| | |  ...ari-ios_baseline_product-detail-scrolled.png | Bin 0 -> 258802 bytes
| | |  ...in11_PRODDETAIL-ACC-03_focus-ring-button.png | Bin 0 -> 65088 bytes
| | |  ...in11_PRODDETAIL-COM-01_layout-comparison.png | Bin 0 -> 65186 bytes
| | |  ...e-win11_PRODDETAIL-COM-02_spinner-arrows.png | Bin 0 -> 65368 bytes
| | |  ..._PRODDETAIL-COM-03_vietnamese-diacritics.png | Bin 0 -> 65089 bytes
| | |  ...DDETAIL-COM-04_price-after-locale-change.png | Bin 0 -> 64869 bytes
| | |  ...DETAIL-COM-04_price-before-locale-change.png | Bin 0 -> 65089 bytes
| | |  ..._PRODDETAIL-COM-04_price-comma-en-locale.png | Bin 0 -> 65632 bytes
| | |  ...DETAIL-RES-01_devtools-viewport-1440x900.png | Bin 0 -> 118447 bytes
| | |  ...ODDETAIL-RES-05_addtocart-position-502px.png | Bin 0 -> 198069 bytes
| | |  .../chrome-win11_PRODDETAIL-RES-06_zoom-150.png | Bin 0 -> 84176 bytes
| | |  ..._PRODDETAIL-VIS-01_image-upscaled-blurry.png | Bin 0 -> 65186 bytes
| | |  ...DDETAIL-VIS-02_price-thousands-separator.png | Bin 0 -> 65186 bytes
| | |  ...1_PRODDETAIL-VIS-03_dong-symbol-position.png | Bin 0 -> 65186 bytes
| | |  ...DETAIL-VIS-05_label-input-vertical-align.png | Bin 0 -> 65186 bytes
| | |  ...DDETAIL-VIS-12_description-gray-contrast.png | Bin 0 -> 65186 bytes
| | |  ...ome-win11_PRODDETAIL-VIS-13_os-dark-mode.png | Bin 0 -> 65453 bytes
| | |  ...e-win11_baseline_product-detail-1440x900.png | Bin 0 -> 65186 bytes
| | |  ...in11_PRODDETAIL-ACC-03_focus-ring-button.png | Bin 0 -> 65897 bytes
| | |  ...in11_PRODDETAIL-COM-01_layout-comparison.png | Bin 0 -> 65742 bytes
| | |  ...11_PRODDETAIL-COM-02_quantity-set-to-3-b.png | Bin 0 -> 71033 bytes
| | |  ...in11_PRODDETAIL-COM-02_quantity-set-to-3.png | Bin 0 -> 70787 bytes
| | |  ...-win11_PRODDETAIL-COM-02_spinner-chevron.png | Bin 0 -> 65936 bytes
| | |  ..._PRODDETAIL-COM-03_vietnamese-diacritics.png | Bin 0 -> 65702 bytes
| | |  ..._PRODDETAIL-COM-04_price-comma-en-locale.png | Bin 0 -> 65742 bytes
| | |  ...DETAIL-RES-01_devtools-viewport-1440x900.png | Bin 0 -> 125169 bytes
| | |  ...firefox-win11_PRODDETAIL-RES-06_zoom-150.png | Bin 0 -> 86346 bytes
| | |  ..._PRODDETAIL-VIS-01_image-upscaled-blurry.png | Bin 0 -> 65742 bytes
| | |  ...DDETAIL-VIS-02_price-thousands-separator.png | Bin 0 -> 65742 bytes
| | |  ...1_PRODDETAIL-VIS-03_dong-symbol-position.png | Bin 0 -> 65742 bytes
| | |  ...DETAIL-VIS-05_label-input-vertical-align.png | Bin 0 -> 65742 bytes
| | |  ...PRODDETAIL-VIS-06_input-vs-button-height.png | Bin 0 -> 65711 bytes
| | |  ...DDETAIL-VIS-12_description-gray-contrast.png | Bin 0 -> 65742 bytes
| | |  ...PRODDETAIL-VIS-13_os-dark-mode-no-change.png | Bin 0 -> 65742 bytes
| | |  ...x-win11_baseline_product-detail-1440x900.png | Bin 0 -> 65742 bytes
| | |  ...-ios_PRODDETAIL-COM-01_layout-comparison.png | Bin 0 -> 645449 bytes
| | |  ...ri-ios_PRODDETAIL-COM-02_spinner-missing.png | Bin 0 -> 648013 bytes
| | |  ..._PRODDETAIL-COM-03_vietnamese-diacritics.png | Bin 0 -> 648024 bytes
| | |  ..._PRODDETAIL-COM-04_price-comma-en-locale.png | Bin 0 -> 647610 bytes
| | |  ...ETAIL-COM-04_price-dot-vi-locale-recheck.png | Bin 0 -> 647190 bytes
| | |  ...os_PRODDETAIL-COM-04_price-dot-vi-locale.png | Bin 0 -> 343267 bytes
| | |  ...s_PRODDETAIL-RES-04_no-horizontal-scroll.png | Bin 0 -> 694567 bytes
| | |  ...ODDETAIL-RES-05_addtocart-position-430px.png | Bin 0 -> 694567 bytes
| | |  ..._PRODDETAIL-VIS-01_image-upscaled-blurry.png | Bin 0 -> 645449 bytes
| | |  ...DDETAIL-VIS-02_price-thousands-separator.png | Bin 0 -> 645449 bytes
| | |  ...s_PRODDETAIL-VIS-03_dong-symbol-position.png | Bin 0 -> 645449 bytes
| | |  ...DETAIL-VIS-05_label-input-vertical-align.png | Bin 0 -> 645449 bytes
| | |  ...DDETAIL-VIS-12_description-gray-contrast.png | Bin 0 -> 645449 bytes
| | |  ...-ios_PRODDETAIL-VIS-13_ios-dark-mode-off.png | Bin 0 -> 694567 bytes
| | |  ...i-ios_PRODDETAIL-VIS-13_ios-dark-mode-on.png | Bin 0 -> 343267 bytes
| | |  ...ari-ios_baseline_product-detail-scrolled.png | Bin 0 -> 645449 bytes
| | |  tests/usability/U-01/sessions/P01.md            | 115 +++++++++++++
| | |  tests/usability/U-01/sessions/P02.md            | 155 +++++++++++++++++
| | |  tests/usability/U-01/sessions/P03.md            | 159 ++++++++++++++++++
| | |  tests/usability/U-01/sessions/P04.md            | 159 ++++++++++++++++++
| | |  tests/usability/U-01/sessions/P05.md            | 159 ++++++++++++++++++
| | |  tests/usability/U-01/sessions/P06.md            | 159 ++++++++++++++++++
| | |  tests/usability/U-01/sessions/P07.md            | 159 ++++++++++++++++++
| | |  110 files changed, 1260 insertions(+), 63 deletions(-)
| | | 
| | * commit a49d0eeb725d8932bf8ba93fdf8e73261591a89f
| |/  Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| |   Date:   Sat Aug 1 14:13:03 2026 +0700
| |   
| |       docs: 📖 add cross platform matrix and append ai audit report
| |   
| |    docs/anh-khoa/ai audit report.md        | 732 +++++++++++++++++---------
| |    tests/cross-platform/platform-matrix.md | 176 +++++++
| |    2 files changed, 648 insertions(+), 260 deletions(-)
| | 
| * commit 75ff2d73bd4e8e2f92dce2226821ad5071361ea7
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Thu Jul 30 07:20:46 2026 +0700
| | 
| |     docs: 📖 add sprint 2 test runs
| | 
| |  tests/test-runs/sprint-2-test-run.md | 69 ++++++++++++++++++++++++++++++++
| |  1 file changed, 69 insertions(+)
| | 
| * commit 1523603938bd9ff6ccc9ee76ef9bdc5264b67760
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Wed Jul 29 23:18:29 2026 +0700
| | 
| |     docs: 📖 add bug reports and test run of all items in checklist
| | 
| |  docs/anh-khoa/ai audit report.md                 | 330 +++++++++++++++++++
| |  .../product-detail/BUG-PRODDETAIL-001.md         |  70 ++++
| |  .../product-detail/BUG-PRODDETAIL-002.md         | 103 ++++++
| |  .../product-detail/BUG-PRODDETAIL-003.md         |  58 ++++
| |  .../product-detail/BUG-PRODDETAIL-004.md         |  73 ++++
| |  .../product-detail/BUG-PRODDETAIL-005.md         |  75 +++++
| |  .../product-detail/BUG-PRODDETAIL-006.md         |  56 ++++
| |  .../product-detail/BUG-PRODDETAIL-007.md         |  88 +++++
| |  .../product-detail/BUG-PRODDETAIL-008.md         |  61 ++++
| |  .../product-detail/BUG-PRODDETAIL-009.md         |  64 ++++
| |  .../product-detail/BUG-PRODDETAIL-010.md         |  64 ++++
| |  .../product-detail/BUG-PRODDETAIL-011.md         |  64 ++++
| |  .../product-detail/BUG-PRODDETAIL-012.md         |  68 ++++
| |  ...BUG-PRODDETAIL-001-cart-empty-after-click.png | Bin 0 -> 18538 bytes
| |  .../BUG-PRODDETAIL-001-first-click-no-effect.png | Bin 0 -> 28991 bytes
| |  .../BUG-PRODDETAIL-002-qty-empty-NaN.png         | Bin 0 -> 25022 bytes
| |  .../BUG-PRODDETAIL-002-qty-negative.png          | Bin 0 -> 25842 bytes
| |  .../BUG-PRODDETAIL-002-qty-overflow.png          | Bin 0 -> 27655 bytes
| |  .../screenshots/BUG-PRODDETAIL-002-qty-zero.png  | Bin 0 -> 24487 bytes
| |  .../BUG-PRODDETAIL-003-cart-duplicate-rows.png   | Bin 0 -> 28251 bytes
| |  .../BUG-PRODDETAIL-004-stuck-loading.png         | Bin 0 -> 13341 bytes
| |  .../BUG-PRODDETAIL-005-debug-message-99999.png   | Bin 0 -> 15300 bytes
| |  .../BUG-PRODDETAIL-005-debug-message-abc.png     | Bin 0 -> 15300 bytes
| |  ...BUG-PRODDETAIL-006-cart-lost-after-reload.png | Bin 0 -> 18538 bytes
| |  .../BUG-PRODDETAIL-007-mobile-touch-target.png   | Bin 0 -> 22169 bytes
| |  .../BUG-PRODDETAIL-008-price-comma-format.png    | Bin 0 -> 28985 bytes
| |  .../BUG-PRODDETAIL-009-no-cart-badge.png         | Bin 0 -> 28991 bytes
| |  ...DDETAIL-010-whitespace-and-upscaled-image.png | Bin 0 -> 28985 bytes
| |  .../BUG-PRODDETAIL-012-scroll-position-lost.png  | Bin 0 -> 58971 bytes
| |  .../product-detail/checklist_product-detail.md   | 221 ++++++++-----
| |  tests/test-runs/sprint-1-test-run.md             | 113 +++++++
| |  31 files changed, 1427 insertions(+), 81 deletions(-)
| | 
| * commit ff9660909ca8b03efc6cbfaf7b3cab2a17378946
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Wed Jul 29 20:20:15 2026 +0700
| | 
| |     docs: 📖 edit test plan base on result of P00-pilot
| | 
| |  tests/usability/U-01/sessions/P00-pilot.md | 185 +++++++++++--------------
| |  tests/usability/U-01/test-plan.md          |  72 ++++++++--
| |  2 files changed, 143 insertions(+), 114 deletions(-)
| | 
| * commit ec62c28a8784f837136e5f5427cb0b7ef0ba999d
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Wed Jul 29 10:30:58 2026 +0700
| | 
| |     docs: 📖 update recruitment tracker doc
| | 
| |  tests/usability/U-01/recruitment-tracker.md | 8 ++------
| |  1 file changed, 2 insertions(+), 6 deletions(-)
| | 
| * commit 2341b0a11ec6e2ec6b1ec57b57dc19d9af963828
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jul 27 21:36:56 2026 +0700
| | 
| |     fix: 🐛 fix typo
| | 
| |  tests/checklist/product-detail/checklist_product-detail.md | 4 ++--
| |  1 file changed, 2 insertions(+), 2 deletions(-)
| | 
| * commit 275e101ce7bf5b58e451818ccce526a28b1d21ce
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jul 27 21:10:08 2026 +0700
| | 
| |     docs: 📖📖 add usability test documentation for U-01 and ai audit report
| | 
| |  docs/anh-khoa/ai audit report.md            | 618 ++++++++++++++++++++++++
| |  tests/usability/U-01/recruitment-tracker.md |  94 ++++
| |  tests/usability/U-01/sessions/P00-pilot.md  | 183 +++++++
| |  tests/usability/U-01/test-plan.md           | 241 +++++++++
| |  4 files changed, 1136 insertions(+)
| | 
| * commit cdbb7773f583f64fea0538b5c757cbd670a796ce
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jul 27 20:00:52 2026 +0700
| | 
| |     docs: 📖 add checklist for product detail and ai audit
| | 
| |  docs/anh-khoa/ai audit report.md                 | 295 +++++++++++++++++++
| |  .../product-detail/checklist_product-detail.md   | 233 +++++++++++++++
| |  2 files changed, 528 insertions(+)
| | 
| * commit b1e91cc24792c6c27e509947c658334d7d7fd5bd
|/  Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
|   Date:   Sun Jul 26 23:12:30 2026 +0700
|   
|       feat: ✨ add skill and settings for agents
|   
|    .agents/skills/ai-audit-logger/SKILL.md          |  26 ++
|    .../references/FR-01-audit-entry.md              |  46 ++++
|    .../templates/audit-entry-template.md            |  12 +
|    .agents/skills/bug-reporting/SKILL.md            |  26 ++
|    .../bug-reporting/references/BUG-PRODUCT-002.md  |  69 +++++
|    .../skills/bug-reporting/templates/bug_report.md |  42 +++
|    .../cross-platform-testing-tracker/SKILL.md      | 143 ++++++++++
|    .../assets/platform_matrix_template.md           |  32 +++
|    .../scripts/watermark_screenshot.py              | 132 ++++++++++
|    .agents/skills/gui-checklist-builder/SKILL.md    | 232 +++++++++++++++++
|    .../assets/bug_report_template.md                |  66 +++++
|    .../assets/checklist_template.md                 |  17 ++
|    .../skills/playwright-script-generator/SKILL.md  |  44 ++++
|    .../references/login.spec.ts.md                  |  32 +++
|    .../templates/output-format-template.md          |  21 ++
|    .agents/skills/requirement-analysis/SKILL.md     |  29 +++
|    .../requirement-analysis/references/FR-01.md     |  32 +++
|    .../references/TC-LOGIN-001.md                   |  33 +++
|    .agents/skills/test-runner/SKILL.md              |  63 +++++
|    .../test-runner/references/automated-test-run.md |  71 +++++
|    .../templates/output-format-template.md          |  28 ++
|    .agents/skills/test-writer/SKILL.md              |   0
|    .agents/skills/traceability-matrix/SKILL.md      |  39 +++
|    .../references/traceability-matrix.md            |  62 +++++
|    .../templates/output-format-template.md          |  19 ++
|    .../skills/usability-evaluation-builder/SKILL.md | 258 +++++++++++++++++++
|    .../assets/findings_report_template.md           |  89 +++++++
|    .../assets/instruments_reference.md              |  95 +++++++
|    .../assets/recruitment_tracker_template.md       |  44 ++++
|    .../assets/session_log_template.md               |  69 +++++
|    .../assets/test_plan_template.md                 |  79 ++++++
|    .claude/settings.json                            |  44 ++++
|    32 files changed, 1994 insertions(+)
|   
| * commit 64758dc8412254fe5870ee40018f7a39ff32416a
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Aug 3 09:58:44 2026 +0700
| | 
| |     bug: add link github issues
| | 
| |  .../BUG-HOME-GUI-IA01-010.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA01-049.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA01-052.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA01-054.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA02-013.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA02-016.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA02-018.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA02-053.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA03-021.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA03-022.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA03-023.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA03-024.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA03-029.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA03-048.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA04-031.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA04-032.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA04-034.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA04-035.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA04-037.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA04-038.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA04-041.md                     |  4 +++
| |  .../BUG-HOME-GUI-IA04-044.md                     |  4 +++
| |  .../usability/U-001/BUG-AUTH-F01/BUG-AUTH-F01.md |  4 +++
| |  .../usability/U-001/BUG-AUTH-F02/BUG-AUTH-F02.md |  4 +++
| |  .../usability/U-001/BUG-AUTH-F03/BUG-AUTH-F03.md |  4 +++
| |  .../usability/U-001/BUG-CART-F07/BUG-CART-F07.md |  4 +++
| |  .../usability/U-001/BUG-CART-F08/BUG-CART-F08.md |  4 +++
| |  .../usability/U-001/BUG-CART-F09/BUG-CART-F09.md |  4 +++
| |  .../U-001/BUG-CHECKOUT-F05/BUG-CHECKOUT-F05.md   |  4 +++
| |  .../U-001/BUG-CHECKOUT-F06/BUG-CHECKOUT-F06.md   |  4 +++
| |  tests/test-cases/login/TC-LOGIN-001.md           | 33 --------------------
| |  tests/test-cases/register/TC-REGISTER-001.md     |  0
| |  tests/test-runs/sprint-1-test-run.md             |  0
| |  33 files changed, 120 insertions(+), 33 deletions(-)
| | 
| * commit 7f3c857bf38b7a19aa6b54d7f185b89c5b22de7a
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Aug 3 09:46:10 2026 +0700
| | 
| |     docs: add labels GUI and usability bug reports for the home page and core modules
| | 
| |  .../gui/home/BUG-HOME-GUI-IA01-010/BUG-HOME-GUI-IA01-010.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA01-049/BUG-HOME-GUI-IA01-049.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA01-052/BUG-HOME-GUI-IA01-052.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA01-054/BUG-HOME-GUI-IA01-054.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA02-013/BUG-HOME-GUI-IA02-013.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA02-016/BUG-HOME-GUI-IA02-016.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA02-018/BUG-HOME-GUI-IA02-018.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA02-053/BUG-HOME-GUI-IA02-053.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA03-021/BUG-HOME-GUI-IA03-021.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA03-022/BUG-HOME-GUI-IA03-022.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA03-023/BUG-HOME-GUI-IA03-023.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA03-024/BUG-HOME-GUI-IA03-024.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA03-029/BUG-HOME-GUI-IA03-029.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA03-048/BUG-HOME-GUI-IA03-048.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA04-031/BUG-HOME-GUI-IA04-031.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA04-032/BUG-HOME-GUI-IA04-032.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA04-034/BUG-HOME-GUI-IA04-034.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA04-035/BUG-HOME-GUI-IA04-035.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA04-037/BUG-HOME-GUI-IA04-037.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA04-038/BUG-HOME-GUI-IA04-038.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA04-041/BUG-HOME-GUI-IA04-041.md          | 1 +
| |  .../gui/home/BUG-HOME-GUI-IA04-044/BUG-HOME-GUI-IA04-044.md          | 1 +
| |  tests/bug-reports/usability/U-001/BUG-AUTH-F01/BUG-AUTH-F01.md       | 1 +
| |  tests/bug-reports/usability/U-001/BUG-AUTH-F02/BUG-AUTH-F02.md       | 1 +
| |  tests/bug-reports/usability/U-001/BUG-AUTH-F03/BUG-AUTH-F03.md       | 1 +
| |  tests/bug-reports/usability/U-001/BUG-CART-F07/BUG-CART-F07.md       | 1 +
| |  tests/bug-reports/usability/U-001/BUG-CART-F08/BUG-CART-F08.md       | 1 +
| |  tests/bug-reports/usability/U-001/BUG-CART-F09/BUG-CART-F09.md       | 1 +
| |  .../bug-reports/usability/U-001/BUG-CHECKOUT-F05/BUG-CHECKOUT-F05.md | 1 +
| |  .../bug-reports/usability/U-001/BUG-CHECKOUT-F06/BUG-CHECKOUT-F06.md | 1 +
| |  30 files changed, 30 insertions(+)
| | 
| * commit 6ff4526e2e00533775f737a0db7d0b3c9a00dad1
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Aug 3 09:35:03 2026 +0700
| | 
| |     docs(task3): update Expo Go execution log, add screenshots, sync checklist, and update bug reports with evidence
| | 
| |  tests/checklists/home/checklist.md               |   8 +-
| |  .../CP-001/1_plan-prep/checklist.md              | 112 +++++++++----------
| |  .../CP-001/2_execution/android-expogo.md         |  33 ++++++
| |  .../CP-001/2_execution/macos-safari.md           |  16 ---
| |  .../CP-001/2_execution/windows-chrome.md         |   4 +-
| |  .../CP-001/2_execution/windows-firefox.md        |   6 +-
| |  .../android-expogo/android_home_1.png            | Bin 0 -> 472022 bytes
| |  .../android-expogo/android_home_2.png            | Bin 0 -> 497357 bytes
| |  .../android-expogo/android_home_3.png            | Bin 0 -> 538244 bytes
| |  .../android-expogo/android_home_4.png            | Bin 0 -> 516718 bytes
| |  .../CP-001/3_screenshots/macos-safari/.gitkeep   |   0
| |  .../CP-001/3_screenshots/windows-chrome/.gitkeep |   0
| |  .../3_screenshots/windows-firefox/.gitkeep       |   0
| |  13 files changed, 100 insertions(+), 79 deletions(-)
| | 
| * commit 68521110273f3e35e9056f8458528929189f7ac6
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Aug 3 09:34:00 2026 +0700
| | 
| |     bug(home): create and update bug reports with environment details and images
| | 
| |  .../BUG-HOME-GUI-IA01-010.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA01-049.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA01-052.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA01-054.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA02-013.md                     |   7 ++-
| |  .../BUG-HOME-GUI-IA02-013_03.png                 | Bin 0 -> 472022 bytes
| |  .../BUG-HOME-GUI-IA02-016.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA02-018.md                     |  56 +++++++++++++++++++
| |  .../BUG-HOME-GUI-IA02-018_01.png                 | Bin 0 -> 208638 bytes
| |  .../BUG-HOME-GUI-IA02-018_02.png                 | Bin 0 -> 210089 bytes
| |  .../BUG-HOME-GUI-IA02-018_03.png                 | Bin 0 -> 398198 bytes
| |  .../BUG-HOME-GUI-IA02-053.md                     |   7 ++-
| |  .../BUG-HOME-GUI-IA02-053_03.png                 | Bin 0 -> 297033 bytes
| |  .../BUG-HOME-GUI-IA03-021.md                     |   7 ++-
| |  .../BUG-HOME-GUI-IA03-021_03.png                 | Bin 0 -> 472022 bytes
| |  .../BUG-HOME-GUI-IA03-022.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA03-023.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA03-023_01.png                 | Bin 255470 -> 250890 bytes
| |  .../BUG-HOME-GUI-IA03-023_02.png                 | Bin 254973 -> 252082 bytes
| |  .../BUG-HOME-GUI-IA03-024.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA03-029.md                     |   7 ++-
| |  .../BUG-HOME-GUI-IA03-029_03.png                 | Bin 0 -> 516718 bytes
| |  .../BUG-HOME-GUI-IA03-048.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA04-031.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA04-032.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA04-034.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA04-035.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA04-037.md                     |  54 ++++++++++++++++++
| |  .../BUG-HOME-GUI-IA04-037_01.png                 | Bin 0 -> 530238 bytes
| |  .../BUG-HOME-GUI-IA04-038.md                     |  52 +++++++++++++++++
| |  .../BUG-HOME-GUI-IA04-038_01.png                 | Bin 0 -> 253202 bytes
| |  .../BUG-HOME-GUI-IA04-038_02.png                 | Bin 0 -> 253726 bytes
| |  .../BUG-HOME-GUI-IA04-041.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA04-044.md                     |   5 +-
| |  34 files changed, 246 insertions(+), 19 deletions(-)
| | 
| * commit 4de18874ff2383dc04344e1c1fcac37244d4d56e
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Aug 3 07:37:23 2026 +0700
| | 
| |     docs(task3): update Firefox execution log, add screenshots, sync checklist, and update bug reports with evidence
| | 
| |  .../BUG-HOME-GUI-IA01-010.md                     |  11 +-
| |  .../BUG-HOME-GUI-IA01-010_02.png                 | Bin 0 -> 255121 bytes
| |  .../BUG-HOME-GUI-IA01-049.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA01-049_02.png                 | Bin 0 -> 257199 bytes
| |  .../BUG-HOME-GUI-IA01-052.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA01-052_02.png                 | Bin 0 -> 254939 bytes
| |  .../BUG-HOME-GUI-IA01-054.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA01-054_02.png                 | Bin 0 -> 335370 bytes
| |  .../BUG-HOME-GUI-IA02-013.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA02-013_02.png                 | Bin 0 -> 255011 bytes
| |  .../BUG-HOME-GUI-IA02-016.md                     |   8 +-
| |  .../BUG-HOME-GUI-IA02-016_02.png                 | Bin 0 -> 195909 bytes
| |  .../BUG-HOME-GUI-IA02-053.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA02-053_02.png                 | Bin 0 -> 194956 bytes
| |  .../BUG-HOME-GUI-IA03-021.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA03-021_02.png                 | Bin 0 -> 255156 bytes
| |  .../BUG-HOME-GUI-IA03-022.md                     |   8 +-
| |  .../BUG-HOME-GUI-IA03-022_02.png                 | Bin 0 -> 254973 bytes
| |  .../BUG-HOME-GUI-IA03-023.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA03-023_02.png                 | Bin 0 -> 254973 bytes
| |  .../BUG-HOME-GUI-IA03-024.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA03-024_02.png                 | Bin 0 -> 286060 bytes
| |  .../BUG-HOME-GUI-IA03-029.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA03-029_02.png                 | Bin 0 -> 250879 bytes
| |  .../BUG-HOME-GUI-IA03-048.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA03-048_02.png                 | Bin 0 -> 255209 bytes
| |  .../BUG-HOME-GUI-IA04-031.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA04-031_02.png                 | Bin 0 -> 340957 bytes
| |  .../BUG-HOME-GUI-IA04-032.md                     |   8 +-
| |  .../BUG-HOME-GUI-IA04-032_02.png                 | Bin 0 -> 197824 bytes
| |  .../BUG-HOME-GUI-IA04-034.md                     |  15 ++-
| |  .../BUG-HOME-GUI-IA04-034_02.png                 | Bin 0 -> 280766 bytes
| |  .../BUG-HOME-GUI-IA04-035.md                     |   5 +-
| |  .../BUG-HOME-GUI-IA04-035_02.png                 | Bin 0 -> 255182 bytes
| |  .../BUG-HOME-GUI-IA04-041.md                     |  12 +-
| |  .../BUG-HOME-GUI-IA04-041_02.png                 | Bin 0 -> 241346 bytes
| |  .../BUG-HOME-GUI-IA04-044.md                     |   8 +-
| |  .../BUG-HOME-GUI-IA04-044_02.png                 | Bin 0 -> 322527 bytes
| |  .../CP-001/1_plan-prep/checklist.md              | 112 +++++++++----------
| |  .../CP-001/2_execution/windows-chrome.md         |   2 +-
| |  .../CP-001/2_execution/windows-firefox.md        |  37 ++++--
| |  .../windows-firefox/firefox_home_1.png           | Bin 0 -> 57884 bytes
| |  .../windows-firefox/firefox_home_2.png           | Bin 0 -> 247878 bytes
| |  43 files changed, 159 insertions(+), 122 deletions(-)
| | 
| * commit d33d08584852daeb1c81125aa5cab17b26e8e12e
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Aug 3 01:22:39 2026 +0700
| | 
| |     docs(task3): complete baseline Chrome execution log and update multi-platform checklist
| | 
| |  .../CP-001/1_plan-prep/checklist.md              | 112 +++++++++----------
| |  .../CP-001/2_execution/macos-safari.md           |   4 -
| |  .../CP-001/2_execution/windows-chrome.md         |  41 +++++--
| |  .../CP-001/2_execution/windows-firefox.md        |   4 -
| |  .../windows-chrome/chrome_home_1.png             | Bin 0 -> 255505 bytes
| |  .../windows-chrome/chrome_home_2.png             | Bin 0 -> 252851 bytes
| |  6 files changed, 85 insertions(+), 76 deletions(-)
| | 
| * commit c3d53c054d1c634b150c65561cfb1940ff1a8ee9
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Aug 3 01:20:26 2026 +0700
| | 
| |     docs(bug-reports): update bug screenshots with overlay
| | 
| |  .../BUG-HOME-GUI-IA01-010_01.png                 | Bin 95050 -> 255437 bytes
| |  .../BUG-HOME-GUI-IA01-049_01.png                 | Bin 110637 -> 257430 bytes
| |  .../BUG-HOME-GUI-IA01-052_01.png                 | Bin 109826 -> 255464 bytes
| |  .../BUG-HOME-GUI-IA01-054_01.png                 | Bin 172091 -> 336560 bytes
| |  .../BUG-HOME-GUI-IA02-013_01.png                 | Bin 110637 -> 255493 bytes
| |  .../BUG-HOME-GUI-IA02-016_01.png                 | Bin 17076 -> 195230 bytes
| |  .../BUG-HOME-GUI-IA02-053_01.png                 | Bin 16622 -> 195489 bytes
| |  .../BUG-HOME-GUI-IA03-021_01.png                 | Bin 96962 -> 255469 bytes
| |  .../BUG-HOME-GUI-IA03-022_01.png                 | Bin 42367 -> 255470 bytes
| |  .../BUG-HOME-GUI-IA03-023_01.png                 | Bin 96580 -> 255470 bytes
| |  .../BUG-HOME-GUI-IA03-024_01.png                 | Bin 117382 -> 282482 bytes
| |  .../BUG-HOME-GUI-IA03-029_01.png                 | Bin 38401 -> 252914 bytes
| |  .../BUG-HOME-GUI-IA03-048_01.png                 | Bin 10168 -> 270026 bytes
| |  .../BUG-HOME-GUI-IA04-031_01.png                 | Bin 14646 -> 263176 bytes
| |  .../BUG-HOME-GUI-IA04-032_01.png                 | Bin 17812 -> 196735 bytes
| |  .../BUG-HOME-GUI-IA04-034_01.png                 | Bin 120472 -> 284306 bytes
| |  .../BUG-HOME-GUI-IA04-035_01.png                 | Bin 95050 -> 256025 bytes
| |  .../BUG-HOME-GUI-IA04-041_01.png                 | Bin 14646 -> 279487 bytes
| |  .../BUG-HOME-GUI-IA04-044_01.png                 | Bin 14646 -> 345623 bytes
| |  19 files changed, 0 insertions(+), 0 deletions(-)
| | 
| * commit fdb4a7855c1c8bb367a0e75af1480eb15f3b998a
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Aug 3 00:23:08 2026 +0700
| | 
| |     docs(task3): prepare cross-platform testing templates and update student email overlay
| | 
| |  .../cross_platform_screenshots_log.md            |  4 +-
| |  .../CP-001/1_plan-prep/checklist.md              | 60 ++++++++++++++++++
| |  .../CP-001/2_execution/macos-safari.md           | 20 ++++++
| |  .../CP-001/2_execution/windows-chrome.md         | 20 ++++++
| |  .../CP-001/2_execution/windows-firefox.md        | 20 ++++++
| |  .../CP-001/3_screenshots/macos-safari/.gitkeep   |  0
| |  .../CP-001/3_screenshots/windows-chrome/.gitkeep |  0
| |  .../3_screenshots/windows-firefox/.gitkeep       |  0
| |  tests/cross-platform/CP-001/README.md            | 65 ++++++++++++++++++++
| |  tests/cross-platform/README.md                   |  9 +++
| |  10 files changed, 196 insertions(+), 2 deletions(-)
| | 
| * commit 6c1e12b2af7ef2fbc97aef801060944ba182d770
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 22:42:08 2026 +0700
| | 
| |     docs(usability): finalize U-001 usability evaluation and bug reports
| | 
| |  docs/report/ai_audit_report.md                   |  17 +-
| |  tests/usability-tests/README.md                  |   2 +-
| |  .../usability_evaluation_report.md               | 194 ++++++++++++-------
| |  .../U-001/5_evidence/bug_index.md                |  92 +++++++--
| |  tests/usability-tests/U-001/README.md            |   9 +-
| |  ...p (U-001) (Responses) - Form Responses 1.csv" |  13 ++
| |  6 files changed, 237 insertions(+), 90 deletions(-)
| | 
| * commit 3e5b56ec3ee1bbc177dd6b8215a5b797f232a2b9
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 22:40:59 2026 +0700
| | 
| |     feat(bugs): add usability bug reports for U-001 findings F01-F09
| | 
| |  .../usability/U-001/BUG-AUTH-F01/BUG-AUTH-F01.md | 64 +++++++++++++++++++
| |  .../usability/U-001/BUG-AUTH-F02/BUG-AUTH-F02.md | 64 +++++++++++++++++++
| |  .../usability/U-001/BUG-AUTH-F03/BUG-AUTH-F03.md | 61 ++++++++++++++++++
| |  .../usability/U-001/BUG-CART-F07/BUG-CART-F07.md | 63 +++++++++++++++++++
| |  .../usability/U-001/BUG-CART-F08/BUG-CART-F08.md | 62 +++++++++++++++++++
| |  .../usability/U-001/BUG-CART-F09/BUG-CART-F09.md | 62 +++++++++++++++++++
| |  .../U-001/BUG-CHECKOUT-F05/BUG-CHECKOUT-F05.md   | 65 ++++++++++++++++++++
| |  .../U-001/BUG-CHECKOUT-F06/BUG-CHECKOUT-F06.md   | 62 +++++++++++++++++++
| |  8 files changed, 503 insertions(+)
| | 
| * commit 1a76e5b5f8bc5a8bfea7c5c9d05cbeee11d1acd1
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 21:52:24 2026 +0700
| | 
| |     refactor(bugs): move home bug reports under gui directory
| | 
| |  .../home/BUG-HOME-GUI-IA01-010/BUG-HOME-GUI-IA01-010.md |   0
| |  .../BUG-HOME-GUI-IA01-010/BUG-HOME-GUI-IA01-010_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA01-049/BUG-HOME-GUI-IA01-049.md |   0
| |  .../BUG-HOME-GUI-IA01-049/BUG-HOME-GUI-IA01-049_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA01-052/BUG-HOME-GUI-IA01-052.md |   0
| |  .../BUG-HOME-GUI-IA01-052/BUG-HOME-GUI-IA01-052_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA01-054/BUG-HOME-GUI-IA01-054.md |   0
| |  .../BUG-HOME-GUI-IA01-054/BUG-HOME-GUI-IA01-054_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA02-013/BUG-HOME-GUI-IA02-013.md |   0
| |  .../BUG-HOME-GUI-IA02-013/BUG-HOME-GUI-IA02-013_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA02-016/BUG-HOME-GUI-IA02-016.md |   0
| |  .../BUG-HOME-GUI-IA02-016/BUG-HOME-GUI-IA02-016_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA02-053/BUG-HOME-GUI-IA02-053.md |   0
| |  .../BUG-HOME-GUI-IA02-053/BUG-HOME-GUI-IA02-053_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA03-021/BUG-HOME-GUI-IA03-021.md |   0
| |  .../BUG-HOME-GUI-IA03-021/BUG-HOME-GUI-IA03-021_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA03-022/BUG-HOME-GUI-IA03-022.md |  10 +++++++++-
| |  .../BUG-HOME-GUI-IA03-022/BUG-HOME-GUI-IA03-022_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA03-023/BUG-HOME-GUI-IA03-023.md |   0
| |  .../BUG-HOME-GUI-IA03-023/BUG-HOME-GUI-IA03-023_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA03-024/BUG-HOME-GUI-IA03-024.md |   0
| |  .../BUG-HOME-GUI-IA03-024/BUG-HOME-GUI-IA03-024_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA03-029/BUG-HOME-GUI-IA03-029.md |   0
| |  .../BUG-HOME-GUI-IA03-029/BUG-HOME-GUI-IA03-029_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA03-048/BUG-HOME-GUI-IA03-048.md |   0
| |  .../BUG-HOME-GUI-IA03-048/BUG-HOME-GUI-IA03-048_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA04-031/BUG-HOME-GUI-IA04-031.md |   5 +++++
| |  .../BUG-HOME-GUI-IA04-031/BUG-HOME-GUI-IA04-031_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA04-032/BUG-HOME-GUI-IA04-032.md |   0
| |  .../BUG-HOME-GUI-IA04-032/BUG-HOME-GUI-IA04-032_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA04-034/BUG-HOME-GUI-IA04-034.md |   0
| |  .../BUG-HOME-GUI-IA04-034/BUG-HOME-GUI-IA04-034_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA04-035/BUG-HOME-GUI-IA04-035.md |   0
| |  .../BUG-HOME-GUI-IA04-035/BUG-HOME-GUI-IA04-035_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA04-041/BUG-HOME-GUI-IA04-041.md |   0
| |  .../BUG-HOME-GUI-IA04-041/BUG-HOME-GUI-IA04-041_01.png  | Bin
| |  .../home/BUG-HOME-GUI-IA04-044/BUG-HOME-GUI-IA04-044.md |   5 +++++
| |  .../BUG-HOME-GUI-IA04-044/BUG-HOME-GUI-IA04-044_01.png  | Bin
| |  38 files changed, 19 insertions(+), 1 deletion(-)
| | 
| * commit b7a0bac3a5ae52735e306b877721cc7968e825d4
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 20:39:49 2026 +0700
| | 
| |     docs(usability): fill SUS scores summary table in instrument.md
| | 
| |  .../U-001/2_session-guide/instrument.md               | 15 +++++++--------
| |  1 file changed, 7 insertions(+), 8 deletions(-)
| | 
| * commit 10ca6079a6c69e36361bbb938eb2e1dcacb06546
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 20:36:57 2026 +0700
| | 
| |     style(usability): format table alignment in recruiting_screen.md
| | 
| |  .../U-001/1_plan-prep/recruiting_screen.md         | 18 +++++++++---------
| |  1 file changed, 9 insertions(+), 9 deletions(-)
| | 
| * commit 9ea0148b472524828d17856cd4d09ba6868a2add
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 20:35:56 2026 +0700
| | 
| |     docs(usability): update P02 session date and time in P02.md and recruiting_screen.md
| | 
| |  tests/usability-tests/U-001/1_plan-prep/recruiting_screen.md | 2 +-
| |  tests/usability-tests/U-001/3_sessions/P02.md                | 2 +-
| |  2 files changed, 2 insertions(+), 2 deletions(-)
| | 
| * commit ceef75d0bad0079fbd9f6f779894193946bcca4a
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 20:32:55 2026 +0700
| | 
| |     docs(usability): fix phone number masking in recruiting_screen.md
| | 
| |  .../U-001/1_plan-prep/recruiting_screen.md             | 14 +++++++-------
| |  1 file changed, 7 insertions(+), 7 deletions(-)
| | 
| * commit 9b7469400c4be73b17c07fdeaeadc3444ed57ba9
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 20:32:32 2026 +0700
| | 
| |     docs(usability): update participant details and screening checklist in recruiting_screen.md
| | 
| |  .../U-001/1_plan-prep/recruiting_screen.md       | 36 ++++++++++----------
| |  1 file changed, 18 insertions(+), 18 deletions(-)
| | 
| * commit 16f4098d1d82a6fca4c2fb00826572374433f867
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 20:14:39 2026 +0700
| | 
| |     feat: add usability test session documentation for P07
| | 
| |  tests/usability-tests/U-001/3_sessions/P07.md | 120 ++++++++++++----------
| |  1 file changed, 66 insertions(+), 54 deletions(-)
| | 
| * commit 26d13c6bfd3989e9b27c4911e2282f01ab357328
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 19:52:42 2026 +0700
| | 
| |     docs(usability): update sessions P05 and P06 notes and video links
| | 
| |  tests/usability-tests/U-001/3_sessions/P05.md |   2 +-
| |  tests/usability-tests/U-001/3_sessions/P06.md | 123 ++++++++++++----------
| |  2 files changed, 70 insertions(+), 55 deletions(-)
| | 
| * commit db406ca0bf9a9185a3d5b60c6b5538af408683f5
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 19:32:51 2026 +0700
| | 
| |     feat: add usability test session documentation for P05
| | 
| |  tests/usability-tests/U-001/3_sessions/P05.md | 118 +++++++++++++---------
| |  1 file changed, 68 insertions(+), 50 deletions(-)
| | 
| * commit d2ab70839d85aede784063cca5920a0ed054765a
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 19:13:27 2026 +0700
| | 
| |     feat: add usability test session documentation for P04
| | 
| |  tests/usability-tests/U-001/3_sessions/P04.md | 118 +++++++++++++---------
| |  1 file changed, 68 insertions(+), 50 deletions(-)
| | 
| * commit 15b37c14e186b78fadbc518c7620fcb631f35eb6
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 16:47:02 2026 +0700
| | 
| |     feat: add usability test session documentation for P03
| | 
| |  tests/usability-tests/U-001/3_sessions/P03.md | 116 +++++++++++++---------
| |  1 file changed, 67 insertions(+), 49 deletions(-)
| | 
| * commit fdcae7043daf87836ed5f378d822242473ba5d1e
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 15:51:02 2026 +0700
| | 
| |     feat: add usability test session documentation for P02
| | 
| |  tests/usability-tests/U-001/3_sessions/P02.md | 119 +++++++++++++---------
| |  1 file changed, 69 insertions(+), 50 deletions(-)
| | 
| * commit d9fcc7f17cfa6138fa448263d04bce459c50c418
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Aug 2 12:39:06 2026 +0700
| | 
| |     feat: add usability test session documentation for P01
| | 
| |  tests/usability-tests/U-001/3_sessions/P01.md | 114 ++++++++++++----------
| |  1 file changed, 64 insertions(+), 50 deletions(-)
| | 
| * commit ccf65ce5faad0cb083a2d719259e1d95f835ac3c
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sat Aug 1 23:35:52 2026 +0700
| | 
| |     docs(usability): update pilot runsheet results and gitignore mp4 folder
| | 
| |  .gitignore                                       |  2 +-
| |  .../U-001/2_session-guide/pilot_runsheet.md      | 28 ++++++++++----------
| |  2 files changed, 15 insertions(+), 15 deletions(-)
| | 
| * commit ec18344a5f7bb54989ba4b225a14fa954ba8ece9
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sat Aug 1 12:46:40 2026 +0700
| | 
| |     test(usability): reorganize U-001 structure and docs
| | 
| |  docs/report/ai_audit_report.md                   |  18 +--
| |  tests/usability-tests/README.md                  |  85 +++++------
| |  .../U-001/1_plan-prep/evaluation_goals.md        |  60 ++++++++
| |  .../U-001/1_plan-prep/recruiting_screen.md       |  52 +++++++
| |  .../U-001/1_plan-prep/task_scenario.md           |  37 +++++
| |  .../U-001/2_session-guide/instrument.md          |  73 ++++++++++
| |  .../U-001/2_session-guide/pilot_runsheet.md      |  53 +++++++
| |  tests/usability-tests/U-001/3_sessions/P01.md    |  83 +++++++++++
| |  tests/usability-tests/U-001/3_sessions/P02.md    |  83 +++++++++++
| |  tests/usability-tests/U-001/3_sessions/P03.md    |  83 +++++++++++
| |  tests/usability-tests/U-001/3_sessions/P04.md    |  83 +++++++++++
| |  tests/usability-tests/U-001/3_sessions/P05.md    |  83 +++++++++++
| |  tests/usability-tests/U-001/3_sessions/P06.md    |  85 +++++++++++
| |  tests/usability-tests/U-001/3_sessions/P07.md    |  85 +++++++++++
| |  .../usability_evaluation_report.md               |  87 +++++++++++
| |  .../U-001/5_evidence/bug_index.md                |  31 ++++
| |  tests/usability-tests/U-001/README.md            |  28 ++++
| |  tests/usability-tests/U-001/evaluation_goals.md  |  57 --------
| |  tests/usability-tests/U-001/instrument.md        | 146 -------------------
| |  tests/usability-tests/U-001/pilot_runsheet.md    | 138 ------------------
| |  tests/usability-tests/U-001/recruiting_screen.md |  75 ----------
| |  tests/usability-tests/U-001/task_scenario.md     |  42 ------
| |  tests/usability-tests/google-form/.clasp.json    |  16 ++
| |  tests/usability-tests/google-form/README.md      |  47 ++++++
| |  .../usability-tests/google-form/appsscript.json  |   7 +
| |  .../usability-tests/google-form/generate_form.js |  67 +++++++++
| |  26 files changed, 1190 insertions(+), 514 deletions(-)
| | 
| * commit 6d82dd45dfbf2aa3cb0f2043bcd3211bcb6fd401
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jul 31 12:47:30 2026 +0700
| | 
| |     config(deploy): specify node engine version for render environment
| | 
| |  backend/package.json | 3 +++
| |  1 file changed, 3 insertions(+)
| | 
| * commit b10a67155e918548e974ea5f1089cad7aee2a751
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jul 31 12:43:55 2026 +0700
| | 
| |     config(deploy): update configuration for cloud deployment on Render and Vercel
| | 
| |  backend/package.json                      |  1 +
| |  backend/server.js                         |  2 +-
| |  frontend-web/.gitignore                   |  1 +
| |  frontend-web/pnpm-lock.yaml               | 38 +++++++++++++++++++++++++++
| |  frontend-web/src/config.js                |  1 +
| |  frontend-web/src/context/AuthContext.jsx  |  5 ++--
| |  frontend-web/src/pages/Checkout.jsx       |  7 ++---
| |  frontend-web/src/pages/ForgotPassword.jsx |  5 ++--
| |  frontend-web/src/pages/Home.jsx           |  3 ++-
| |  frontend-web/src/pages/ProductDetail.jsx  |  3 ++-
| |  frontend-web/src/pages/Profile.jsx        |  7 ++---
| |  frontend-web/src/pages/Register.jsx       |  3 ++-
| |  frontend-web/vercel.json                  |  8 ++++++
| |  13 files changed, 70 insertions(+), 14 deletions(-)
| | 
| * commit 1cea2392ce675a2b39017019e2ad5ed588467f28
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jul 31 12:07:51 2026 +0700
| | 
| |     test(usability): generate test plan for U-001 and update study designer skill
| | 
| |  .agents/skills/usability-study-designer/SKILL.md |  51 +++++--
| |  docs/report/ai_audit_report.md                   |  38 ++++-
| |  tests/usability-tests/README.md                  |  64 ++++++++
| |  tests/usability-tests/U-001/evaluation_goals.md  |  57 ++++++++
| |  tests/usability-tests/U-001/instrument.md        | 146 +++++++++++++++++++
| |  tests/usability-tests/U-001/pilot_runsheet.md    | 138 ++++++++++++++++++
| |  tests/usability-tests/U-001/recruiting_screen.md |  75 ++++++++++
| |  tests/usability-tests/U-001/task_scenario.md     |  42 ++++++
| |  8 files changed, 595 insertions(+), 16 deletions(-)
| | 
| * commit 8f507cb54d026a452f7db3ab3774dd75fe8405a3
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Thu Jul 30 23:36:31 2026 +0700
| | 
| |     test(home): add, standardize bug reports and update checklist statuses
| | 
| |  .agents/skills/bug-report-github/SKILL.md        |  35 +++--
| |  .../BUG-HOME-GUI-IA01-010.md                     |  48 ++++++
| |  .../BUG-HOME-GUI-IA01-010_01.png                 | Bin 0 -> 95050 bytes
| |  .../BUG-HOME-GUI-IA01-049.md                     |  47 ++++++
| |  .../BUG-HOME-GUI-IA01-049_01.png                 | Bin 0 -> 110637 bytes
| |  .../BUG-HOME-GUI-IA01-052.md                     |  46 ++++++
| |  .../BUG-HOME-GUI-IA01-052_01.png                 | Bin 0 -> 109826 bytes
| |  .../BUG-HOME-GUI-IA01-054.md                     |  46 ++++++
| |  .../BUG-HOME-GUI-IA01-054_01.png                 | Bin 0 -> 172091 bytes
| |  .../BUG-HOME-GUI-IA02-013.md                     |  46 ++++++
| |  .../BUG-HOME-GUI-IA02-013_01.png                 | Bin 0 -> 110637 bytes
| |  .../BUG-HOME-GUI-IA02-016.md                     |  50 ++++++
| |  .../BUG-HOME-GUI-IA02-016_01.png                 | Bin 0 -> 17076 bytes
| |  .../BUG-HOME-GUI-IA02-053.md                     |  49 ++++++
| |  .../BUG-HOME-GUI-IA02-053_01.png                 | Bin 0 -> 16622 bytes
| |  .../BUG-HOME-GUI-IA03-021.md                     |  46 ++++++
| |  .../BUG-HOME-GUI-IA03-021_01.png                 | Bin 0 -> 96962 bytes
| |  .../BUG-HOME-GUI-IA03-022.md                     |  47 ++++++
| |  .../BUG-HOME-GUI-IA03-022_01.png                 | Bin 0 -> 42367 bytes
| |  .../BUG-HOME-GUI-IA03-023.md                     |  47 ++++++
| |  .../BUG-HOME-GUI-IA03-023_01.png                 | Bin 0 -> 96580 bytes
| |  .../BUG-HOME-GUI-IA03-024.md                     |  46 ++++++
| |  .../BUG-HOME-GUI-IA03-024_01.png                 | Bin 0 -> 117382 bytes
| |  .../BUG-HOME-GUI-IA03-029.md                     |  46 ++++++
| |  .../BUG-HOME-GUI-IA03-029_01.png                 | Bin 0 -> 38401 bytes
| |  .../BUG-HOME-GUI-IA03-048.md                     |  46 ++++++
| |  .../BUG-HOME-GUI-IA03-048_01.png                 | Bin 0 -> 10168 bytes
| |  .../BUG-HOME-GUI-IA04-031.md                     |  46 ++++++
| |  .../BUG-HOME-GUI-IA04-031_01.png                 | Bin 0 -> 14646 bytes
| |  .../BUG-HOME-GUI-IA04-032.md                     |  50 ++++++
| |  .../BUG-HOME-GUI-IA04-032_01.png                 | Bin 0 -> 17812 bytes
| |  .../BUG-HOME-GUI-IA04-034.md                     |  43 ++++++
| |  .../BUG-HOME-GUI-IA04-034_01.png                 | Bin 0 -> 120472 bytes
| |  .../BUG-HOME-GUI-IA04-035.md                     |  46 ++++++
| |  .../BUG-HOME-GUI-IA04-035_01.png                 | Bin 0 -> 95050 bytes
| |  .../BUG-HOME-GUI-IA04-041.md                     |  47 ++++++
| |  .../BUG-HOME-GUI-IA04-041_01.png                 | Bin 0 -> 14646 bytes
| |  .../BUG-HOME-GUI-IA04-044.md                     |  47 ++++++
| |  .../BUG-HOME-GUI-IA04-044_01.png                 | Bin 0 -> 14646 bytes
| |  tests/checklists/home/checklist.md               | 154 ++++++++++---------
| |  40 files changed, 989 insertions(+), 89 deletions(-)
| | 
| * commit aa392aa1d81c9149d30df858098aa1213b9a6a24
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Thu Jul 30 19:47:06 2026 +0700
| | 
| |     docs: update home checklist guidance, gap analysis and lint md
| | 
| |  .agents/skills/ai-audit-report/SKILL.md          |   3 +-
| |  .agents/skills/bug-report-github/SKILL.md        |  10 +-
| |  .agents/skills/doc_generator/SKILL.md            |   4 +-
| |  .agents/skills/gui-checklist-ai/SKILL.md         |  34 +++-
| |  .agents/skills/md-to-pdf/SKILL.md                |   5 +-
| |  .agents/skills/usability-session-notes/SKILL.md  |   2 +-
| |  api_specification.md                             |  39 +++-
| |  docs/report/ai_audit_report.md                   |  23 ++-
| |  .../usability_evaluation_report.md               |  13 +-
| |  docs/submission_demo/usability_evidence_pack.md  |   8 +-
| |  docs/theory/gui_testing_theory.md                |   6 +-
| |  docs/theory/usability_testing_theory.md          |   4 +-
| |  setup_guide.md                                   |  29 ++-
| |  tests/checklists/home/ai_gap_analysis.md         | 180 +++++++++++++------
| |  tests/checklists/home/checklist.md               |  25 ++-
| |  tests/test-summary/traceability-matrix.md        |   2 +
| |  16 files changed, 301 insertions(+), 86 deletions(-)
| | 
| * commit 79a5f049c35480abcb41695f10a1f7465e9adbe7
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Thu Jul 30 16:35:13 2026 +0700
| | 
| |     docs(test): update Home screen checklist and gap templates, ignore SUT database
| | 
| |  .agents/skills/gui-checklist-ai/SKILL.md |  12 +++-
| |  .gitignore                               |   2 +
| |  backend/database.sqlite                  | Bin 36864 -> 0 bytes
| |  tests/checklists/home/ai_gap_analysis.md | 103 ++++++++++++++-------------
| |  tests/checklists/home/checklist.md       |  34 ++++-----
| |  5 files changed, 79 insertions(+), 72 deletions(-)
| | 
| * commit 9fc7dcf48e47c5ab4dafa3811e0220f24ad67f85
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Thu Jul 30 16:12:11 2026 +0700
| | 
| |     style(test): update checklist item IDs to include screen prefix HOME-GUI-
| | 
| |  .agents/skills/gui-checklist-ai/SKILL.md |   2 +-
| |  tests/checklists/home/ai_gap_analysis.md |  18 ++---
| |  tests/checklists/home/checklist.md       | 116 +++++++++++++--------------
| |  3 files changed, 68 insertions(+), 68 deletions(-)
| | 
| * commit 1ddce58761a0f1e478825ccf4aaaf4182a7db5fa
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Thu Jul 30 15:58:35 2026 +0700
| | 
| |     docs(test): add Home screen GUI checklist and AI audit report
| | 
| |  .agents/skills/ai-audit-report/SKILL.md  |  15 ++-
| |  docs/report/ai_audit_report.md           |  80 ++++++++++++++
| |  tests/checklists/home/ai_gap_analysis.md |  94 +++++++++++++++++
| |  tests/checklists/home/checklist.md       | 151 +++++++++++++++++++++++++++
| |  4 files changed, 339 insertions(+), 1 deletion(-)
| | 
| * commit 1e984933fc8ba334eb51436daac70a0ad1fd8b77
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Thu Jul 30 15:49:32 2026 +0700
| | 
| |     feat: add documentation and premium PDF export styling for markdown files
| | 
| |  .agents/skills/doc_generator/SKILL.md            |  32 ++
| |  .../skills/doc_generator/scripts/md_to_pdf.py    | 243 +++++++++++++
| |  .agents/skills/md-to-pdf/SKILL.md                |  96 +++++
| |  .../md-to-pdf/resources/markdown-pdf-premium.css | 349 +++++++++++++++++++
| |  4 files changed, 720 insertions(+)
| | 
| * commit 558a58764c745b57c29810e6d034098e7df6d608
|/  Author: mqt4n <machquoctan2005@gmail.com>
|   Date:   Tue Jul 28 12:14:25 2026 +0700
|   
|       feat: initialize documentation structure and agent skill templates for assignment submission
|   
|    .agents/skills/ai-audit-report/SKILL.md          |  55 +++
|    .agents/skills/bug-report-github/SKILL.md        | 148 +++++++
|    .agents/skills/gui-checklist-ai/SKILL.md         | 105 +++++
|    .agents/skills/hw-submission-packager/SKILL.md   |  73 ++++
|    .agents/skills/test-runner/SKILL.md              |   0
|    .agents/skills/test-writer/SKILL.md              |   0
|    .agents/skills/usability-session-notes/SKILL.md  |  86 ++++
|    .agents/skills/usability-study-designer/SKILL.md |  76 ++++
|    docs/submission_demo/README.md                   |  42 ++
|    docs/submission_demo/ai_audit_and_critique.md    |  49 +++
|    docs/submission_demo/ai_audit_and_critique.pdf   | Bin 0 -> 27137 bytes
|    docs/submission_demo/bug_reports.md              |  80 ++++
|    .../checklist_and_test_summary.xlsx              | Bin 0 -> 9203 bytes
|    docs/submission_demo/commit_log_template.txt     |  32 ++
|    .../cross_platform_screenshots_log.md            |  17 +
|    docs/submission_demo/gui_checklist_report.md     |  51 +++
|    docs/submission_demo/gui_checklist_report.pdf    | Bin 0 -> 40033 bytes
|    docs/submission_demo/participant_table.md        |  19 +
|    .../usability_evaluation_report.md               |  49 +++
|    .../usability_evaluation_report.pdf              | Bin 0 -> 45168 bytes
|    docs/submission_demo/usability_evidence_pack.md  |  38 ++
|    docs/theory/Web GUI checklist Template.xlsx      | Bin 0 -> 27291 bytes
|    docs/theory/gui_testing_theory.md                | 393 +++++++++++++++++++
|    docs/theory/usability_testing_theory.md          | 366 +++++++++++++++++
|    24 files changed, 1679 insertions(+)
|   
| * commit 7def13c2285f29f65a39f7eb49c595ae0c071a32
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 27 16:44:41 2026 +0700
| | 
| |     feat: add ic08 database testing
| | 
| |  ic08/database/23127065/.env.example              |    5 +
| |  ic08/database/23127065/.gitignore                |    3 +
| |  ic08/database/23127065/README.md                 |   21 +
| |  ic08/database/23127065/REPORT.md                 |  122 +
| |  ic08/database/23127065/catalog-verification.sql  |   27 +
| |  ic08/database/23127065/compose.yaml              |   19 +
| |  ic08/database/23127065/db-tests.test.js          |  399 ++
| |  ic08/database/23127065/package-lock.json         | 5604 ++++++++++++++++++
| |  ic08/database/23127065/package.json              |   29 +
| |  ic08/database/23127065/performance.sql           |   23 +
| |  ic08/database/23127065/schema.sql                |  183 +
| |  ic08/database/23127065/scripts/run-sql.js        |   26 +
| |  .../23127065/scripts/transaction-evidence.js     |   30 +
| |  ic08/database/MINI_LAB_DATABASE_TESTING.md       |  312 +
| |  ic08/database/submission/23127065.zip            |  Bin 0 -> 8975 bytes
| |  ic08/database/submission/REPORT.md               |  122 +
| |  ic08/database/submission/db-tests.test.js        |  399 ++
| |  ic08/database/submission/performance.sql         |   23 +
| |  18 files changed, 7347 insertions(+)
| | 
| * commit b7f4d80a385707f4df18224e432173756d1e61a9
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 27 16:05:48 2026 +0700
| | 
| |     chore: add inclass database-testing requirement
| | 
| |  ic08/database/N09-mini_exercise.pdf | Bin 0 -> 123478 bytes
| |  1 file changed, 0 insertions(+), 0 deletions(-)
| | 
| * commit ea21409024eaab81f6581e265c2daf0d815194ca
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 27 15:40:19 2026 +0700
| | 
| |     feat: ic08
| | 
| |  .agents/skills/automation-test/SKILL.md          |  199 ++
| |  .agents/skills/gui-checklist-runner/SKILL.md     |   50 +
| |  .agents/skills/test-runner/SKILL.md              |   50 +
| |  .agents/skills/test-writer/SKILL.md              |   47 +
| |  .gitignore                                       |    3 +
| |  GUI_Testing.md                                   |   77 +-
| |  docs/ai-conversion-log.md                        |  135 ++
| |  ic08/automation/23127065/23127065.zip            |  Bin 0 -> 38021 bytes
| |  ic08/automation/23127065/README.md               |   53 +
| |  ic08/automation/23127065/automation/README.md    |   47 +
| |  .../23127065/automation/package-lock.json        |  654 ++++++
| |  ic08/automation/23127065/automation/package.json |   24 +
| |  .../23127065/automation/playwright.config.ts     |   63 +
| |  .../automation/scripts/finalize-reports.mjs      |   24 +
| |  .../23127065/automation/scripts/report-label.mjs |   26 +
| |  .../23127065/automation/scripts/run-matrix.mjs   |  160 ++
| |  .../23127065/automation/scripts/validate-data.ts |    6 +
| |  .../scripts/verify-report-visibility.mjs         |   29 +
| |  .../automation/specs/product-detail.spec.ts      |  206 ++
| |  .../src/data/load-product-detail-cases.ts        |  191 ++
| |  .../automation/src/models/product-detail.ts      |  104 +
| |  .../automation/src/pages/product-detail-page.ts  |   73 +
| |  .../automation/test-data/product-detail.json     |  277 +++
| |  .../automation/23127065/automation/tsconfig.json |   14 +
| |  .../bug-reports/FR-06-AUTOMATION-BUG-REPORTS.md  |  124 ++
| |  .../23127065/docs/ai-conversion-log.md           |  135 ++
| |  .../reports/manifests/product-detail.json        |  298 +++
| |  .../reports/results/product-detail/chromium.json | 2062 ++++++++++++++++++
| |  .../reports/results/product-detail/chromium.log  | 1525 +++++++++++++
| |  .../reports/results/product-detail/firefox.json  | 2062 ++++++++++++++++++
| |  .../reports/results/product-detail/firefox.log   | 1525 +++++++++++++
| |  .../reports/results/product-detail/webkit.json   | 2062 ++++++++++++++++++
| |  .../reports/results/product-detail/webkit.log    | 1525 +++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-001.md      |   41 +
| |  .../product-detail/TC-PRODUCT-DETAIL-002.md      |   36 +
| |  .../product-detail/TC-PRODUCT-DETAIL-003.md      |   35 +
| |  .../product-detail/TC-PRODUCT-DETAIL-004.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-005.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-006.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-007.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-008.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-009.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-010.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-011.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-012.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-013.md      |   37 +
| |  .../product-detail/TC-PRODUCT-DETAIL-014.md      |   37 +
| |  .../product-detail/TC-PRODUCT-DETAIL-015.md      |   41 +
| |  .../product-detail/TC-PRODUCT-DETAIL-BVA.md      |   37 +
| |  .../product-detail/TC-PRODUCT-DETAIL-DT.md       |   48 +
| |  .../product-detail/TEST-PLAN-PRODUCT-DETAIL.md   |   73 +
| |  .../FR-06-AUTOMATION-TEST-SUMMARY.md             |   94 +
| |  reports/manifests/product-detail.json            |  298 +++
| |  reports/results/product-detail/all-browsers.json | 1010 +++++++++
| |  reports/results/product-detail/chromium.json     | 2062 ++++++++++++++++++
| |  reports/results/product-detail/chromium.log      | 1525 +++++++++++++
| |  reports/results/product-detail/firefox.json      | 2062 ++++++++++++++++++
| |  reports/results/product-detail/firefox.log       | 1525 +++++++++++++
| |  .../product-detail/representative-repair.json    |  250 +++
| |  .../results/product-detail/representative.json   |  400 ++++
| |  reports/results/product-detail/webkit.json       | 2062 ++++++++++++++++++
| |  reports/results/product-detail/webkit.log        | 1525 +++++++++++++
| |  tests/automation/README.md                       |   47 +
| |  tests/automation/package-lock.json               |  654 ++++++
| |  tests/automation/package.json                    |   24 +
| |  tests/automation/playwright.config.ts            |   63 +
| |  tests/automation/scripts/finalize-reports.mjs    |   24 +
| |  tests/automation/scripts/report-label.mjs        |   26 +
| |  tests/automation/scripts/run-matrix.mjs          |  160 ++
| |  tests/automation/scripts/validate-data.ts        |    6 +
| |  .../scripts/verify-report-visibility.mjs         |   29 +
| |  tests/automation/specs/product-detail.spec.ts    |  206 ++
| |  .../src/data/load-product-detail-cases.ts        |  191 ++
| |  tests/automation/src/models/product-detail.ts    |  104 +
| |  .../automation/src/pages/product-detail-page.ts  |   73 +
| |  tests/automation/test-data/product-detail.json   |  277 +++
| |  tests/automation/tsconfig.json                   |   14 +
| |  tests/test-cases/admin-coupon/TC-COUPON-001.md   |   42 +
| |  tests/test-cases/admin-coupon/TC-COUPON-002.md   |   42 +
| |  tests/test-cases/admin-coupon/TC-COUPON-003.md   |   35 +
| |  tests/test-cases/admin-coupon/TC-COUPON-004.md   |   34 +
| |  tests/test-cases/admin-coupon/TC-COUPON-005.md   |   34 +
| |  tests/test-cases/admin-coupon/TC-COUPON-006.md   |   32 +
| |  tests/test-cases/admin-coupon/TC-COUPON-007.md   |   33 +
| |  tests/test-cases/admin-coupon/TC-COUPON-008.md   |   32 +
| |  tests/test-cases/admin-coupon/TC-COUPON-009.md   |   32 +
| |  tests/test-cases/admin-coupon/TC-COUPON-010.md   |   32 +
| |  tests/test-cases/cart/TC-CART-001.md             |   36 +
| |  tests/test-cases/cart/TC-CART-002.md             |   35 +
| |  tests/test-cases/cart/TC-CART-003.md             |   32 +
| |  tests/test-cases/cart/TC-CART-004.md             |   31 +
| |  tests/test-cases/cart/TC-CART-005.md             |   34 +
| |  tests/test-cases/cart/TC-CART-006.md             |   34 +
| |  tests/test-cases/cart/TC-CART-007.md             |   31 +
| |  tests/test-cases/cart/TC-CART-008.md             |   33 +
| |  .../product-detail/TC-PRODUCT-DETAIL-001.md      |   41 +
| |  .../product-detail/TC-PRODUCT-DETAIL-002.md      |   36 +
| |  .../product-detail/TC-PRODUCT-DETAIL-003.md      |   35 +
| |  .../product-detail/TC-PRODUCT-DETAIL-004.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-005.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-006.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-007.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-008.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-009.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-010.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-011.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-012.md      |   40 +
| |  .../product-detail/TC-PRODUCT-DETAIL-013.md      |   37 +
| |  .../product-detail/TC-PRODUCT-DETAIL-014.md      |   37 +
| |  .../product-detail/TC-PRODUCT-DETAIL-015.md      |   41 +
| |  .../product-detail/TC-PRODUCT-DETAIL-BVA.md      |   37 +
| |  .../product-detail/TC-PRODUCT-DETAIL-DT.md       |   48 +
| |  .../product-detail/TEST-PLAN-PRODUCT-DETAIL.md   |   73 +
| |  tests/usability/usability-plan-FR07-FR17.md      |  139 ++
| |  114 files changed, 30776 insertions(+), 8 deletions(-)
| | 
| * commit 087712eb8f43376ebf45a2e1d4de420344fe1cc4
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jul 25 23:30:22 2026 +0700
| | 
| |     chore: init
| | 
| |  .gitignore          |   3 ++
| |  .serena/.gitignore  |   2 +
| |  .serena/project.yml | 133 ++++++++++++++++++++++++++++++++++++++++++++++++
| |  requirement.pdf     | Bin 0 -> 231854 bytes
| |  4 files changed, 138 insertions(+)
| | 
| * commit 4fc7e99bcc154b4d51aa7b551f0e8e81cf33498d
|/  Author: LAP15045 <lap15045@LAP15045s-MacBook-Pro.local>
|   Date:   Mon Jul 20 17:12:03 2026 +0700
|   
|       feat: usability and GUI testing
|   
|    23127065.md                                      | 134 ++++++++++++
|    23127065.zip                                     | Bin 0 -> 1353324 bytes
|    23127065_Usability_Testing.md                    | 203 +++++++++++++++++++
|    23127065_u06_lunar_points.png                    | Bin 0 -> 287362 bytes
|    23127065_u06_profile_desktop.png                 | Bin 0 -> 269770 bytes
|    23127065_u06_profile_mobile_overlap.png          | Bin 0 -> 100205 bytes
|    23127065_u06_session_expired_login_500.png       | Bin 0 -> 222244 bytes
|    23127065_u06_watch_history_empty.png             | Bin 0 -> 240270 bytes
|    23127065_u06_wishlist_empty.png                  | Bin 0 -> 242024 bytes
|    GUI_Testing.md                                   | 144 +++++++++++++
|    P01.md                                           |  55 +++++
|    Usability_Testing_Requirement.md                 | 130 ++++++++++++
|    .../browserstack/u06-browserstack-results.json   |  57 ++++++
|    evidence/browserstack/u06-chrome-windows11.png   | Bin 0 -> 311713 bytes
|    evidence/browserstack/u06-edge-windows11.png     | Bin 0 -> 311713 bytes
|    findings-report.md                               | 120 +++++++++++
|    test-plan.md                                     |  45 ++++
|    17 files changed, 888 insertions(+)
| 
* commit ea7fee42d474f640798772481499475241967db2
| Author: yuran1811 <trieuvanbd123@gmail.com>
| Date:   Tue Jul 7 21:59:11 2026 +0700
| 
|     chore: unused ci workflow
| 
|  .github/{workflows => archived}/ci.yaml | 0
|  1 file changed, 0 insertions(+), 0 deletions(-)
|   
| * commit bce48090d453e2228bcb9f513e7a7c5a075f7a49
|/  Author: mqt4n <machquoctan2005@gmail.com>
|   Date:   Mon Jul 6 16:57:22 2026 +0700
|   
|       initial commit
|   
|    .agents/skills/test-run-reporter/SKILL.md        | 378 +++++++++++++++++++
|    .../test-run-reporter/references/conventions.md  | 144 +++++++
|    .agents/skills/test-runner/SKILL.md              |   0
|    .../skills/test-writer-decision-table/SKILL.md   | 214 +++++++++++
|    .agents/skills/test-writer-pairwise/SKILL.md     | 207 ++++++++++
|    .../skills/test-writer-state-transition/SKILL.md | 278 ++++++++++++++
|    .agents/skills/test-writer-use-case/SKILL.md     | 272 +++++++++++++
|    .agents/skills/test-writer/SKILL.md              |   0
|    backend/database.sqlite                          | Bin 36864 -> 36864 bytes
|    report/AI_Audit_Report.md                        |  25 ++
|    tests/bug-reports/auth/BUG-AUTH-001.md           |  37 ++
|    tests/bug-reports/auth/BUG-AUTH-002.md           |  37 ++
|    tests/bug-reports/auth/BUG-AUTH-003.md           |  38 ++
|    tests/bug-reports/profile/BUG-PROFILE-001.md     |  39 ++
|    tests/bug-reports/profile/BUG-PROFILE-002.md     |  41 ++
|    tests/test-cases/auth/TC-AUTH-STT-01.md          |  42 +++
|    tests/test-cases/auth/TC-AUTH-STT-02.md          |  42 +++
|    tests/test-cases/auth/TC-AUTH-STT-03.md          |  41 ++
|    tests/test-cases/auth/TC-AUTH-STT-04.md          |  42 +++
|    tests/test-cases/auth/TC-AUTH-STT-05.md          |  41 ++
|    tests/test-cases/auth/TC-AUTH-STT-06.md          |  43 +++
|    tests/test-cases/auth/TC-AUTH-STT-07.md          |  43 +++
|    tests/test-cases/auth/TC-AUTH-STT-08.md          |  43 +++
|    tests/test-cases/auth/TC-AUTH-STT-09.md          |  38 ++
|    tests/test-cases/auth/TC-AUTH-STT-10.md          |  43 +++
|    tests/test-cases/login/TC-LOGIN-001.md           |  33 --
|    tests/test-cases/profile/TC-PROFILE-UCT-01.md    |  46 +++
|    tests/test-cases/profile/TC-PROFILE-UCT-02.md    |  45 +++
|    tests/test-cases/profile/TC-PROFILE-UCT-03.md    |  45 +++
|    tests/test-cases/profile/TC-PROFILE-UCT-04.md    |  45 +++
|    tests/test-cases/profile/TC-PROFILE-UCT-05.md    |  45 +++
|    tests/test-cases/profile/TC-PROFILE-UCT-06.md    |  45 +++
|    tests/test-cases/profile/TC-PROFILE-UCT-07.md    |  44 +++
|    tests/test-cases/register/TC-REGISTER-001.md     |   0
|    tests/test-design/State_Transition_Testing.md    |  76 ++++
|    tests/test-design/Use_Case_Testing.md            |  50 +++
|    tests/test-runs/AUTH-test-run.md                 |  16 +
|    tests/test-runs/PROFILE-test-run.md              |  13 +
|    tests/test-runs/script/auth/TC-AUTH-STT-01.rest  |  11 +
|    tests/test-runs/script/auth/TC-AUTH-STT-02.rest  |  11 +
|    tests/test-runs/script/auth/TC-AUTH-STT-03.rest  |  20 +
|    tests/test-runs/script/auth/TC-AUTH-STT-04.rest  |  20 +
|    tests/test-runs/script/auth/TC-AUTH-STT-05.rest  |  29 ++
|    tests/test-runs/script/auth/TC-AUTH-STT-06.rest  |  29 ++
|    tests/test-runs/script/auth/TC-AUTH-STT-07.rest  |  38 ++
|    tests/test-runs/script/auth/TC-AUTH-STT-08.rest  |  38 ++
|    tests/test-runs/script/auth/TC-AUTH-STT-09.rest  |  39 ++
|    tests/test-runs/script/auth/TC-AUTH-STT-10.rest  |  39 ++
|    .../script/profile/TC-PROFILE-UCT-01.rest        |  30 ++
|    .../script/profile/TC-PROFILE-UCT-02.rest        |  26 ++
|    .../script/profile/TC-PROFILE-UCT-03.rest        |  26 ++
|    .../script/profile/TC-PROFILE-UCT-04.rest        |  26 ++
|    .../script/profile/TC-PROFILE-UCT-05.rest        |  30 ++
|    .../script/profile/TC-PROFILE-UCT-06.rest        |  30 ++
|    .../script/profile/TC-PROFILE-UCT-07.rest        |  21 ++
|    tests/test-runs/sprint-1-test-run.md             |   0
|    tests/test-summary/test-summary-report.md        |  48 +++
|    tests/test-summary/traceability-matrix.md        |  24 +-
|    58 files changed, 3130 insertions(+), 36 deletions(-)
|   
| * commit 566f460686baed33e2b8f0f4241023b3ff585896
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 6 16:52:44 2026 +0700
| | 
| |     feat: add submission
| | 
| |  23127065/23127065.zip                            | Bin 0 -> 36633 bytes
| |  23127065/Test_Summary_Report.md                  | 146 +++++++++++++++
| |  23127065/bug-report.md                           |  88 +++++++++
| |  .../skills/state-transition-testing/SKILL.md     | 181 +++++++++++++++++++
| |  23127065/skills/use-case-testing/SKILL.md        | 100 ++++++++++
| |  23127065/test-cases/TC-FR09-ST-001.md            |  62 +++++++
| |  23127065/test-cases/TC-FR09-ST-002.md            |  63 +++++++
| |  23127065/test-cases/TC-FR09-ST-003.md            |  62 +++++++
| |  23127065/test-cases/TC-FR09-ST-004.md            |  62 +++++++
| |  23127065/test-cases/TC-FR09-ST-005.md            |  61 +++++++
| |  23127065/test-cases/TC-FR09-ST-006.md            |  61 +++++++
| |  23127065/test-cases/TC-FR09-ST-007.md            |  60 ++++++
| |  23127065/test-cases/TC-FR09-ST-008.md            |  60 ++++++
| |  23127065/test-cases/TC-FR09-UC-001.md            |  66 +++++++
| |  23127065/test-cases/TC-FR09-UC-002.md            |  58 ++++++
| |  23127065/test-cases/TC-FR09-UC-003.md            |  58 ++++++
| |  23127065/test-cases/TC-FR09-UC-004.md            |  62 +++++++
| |  23127065/test-cases/TC-FR09-UC-005.md            |  60 ++++++
| |  23127065/test-cases/TC-FR09-UC-006.md            |  60 ++++++
| |  23127065/test-design.md                          | 154 ++++++++++++++++
| |  20 files changed, 1524 insertions(+)
| | 
| * commit 046e407b28637109132aaddc7dff6d8b4034a907
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 6 16:38:29 2026 +0700
| | 
| |     docs: update reports
| | 
| |  23127065_NgoNguyenTheKhoa.md              | 189 ++++++++
| |  ep-bva-bug-report.md                      | 669 ++++++++++++++++++++++++++
| |  group-report.md                           | 104 ++++
| |  tests/test-runs/sprint-1-test-run.md      |  16 +-
| |  tests/test-summary/traceability-matrix.md |  14 +
| |  5 files changed, 991 insertions(+), 1 deletion(-)
| | 
| * commit 784b673f5965fcd1d557e1373af14eaf499b597e
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 6 16:17:58 2026 +0700
| | 
| |     feat: update the previous bva and ep test results
| | 
| |  tests/test-runs/sprint-1-test-run.md      | 95 +++++++++++++++++++++++++++
| |  tests/test-summary/traceability-matrix.md | 88 ++++++++++++++++++++++++-
| |  2 files changed, 180 insertions(+), 3 deletions(-)
| | 
| * commit d1c8b08c234e19538049487db6064739418e39d2
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 6 16:16:29 2026 +0700
| | 
| |     chore: update .gitignore
| | 
| |  .gitignore | 2 +-
| |  1 file changed, 1 insertion(+), 1 deletion(-)
| | 
| * commit f0e969f05516bbd4c222e3768d152b85b6670fda
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 6 16:16:20 2026 +0700
| | 
| |     feat: exec test cases
| | 
| |  bun.lock                                         |  20 +
| |  package.json                                     |   6 +
| |  tests/playwright/coupon.spec.mjs                 | 426 ++++++++++++
| |  tests/reports/coupon/bug-report.md               |  88 +++
| |  tests/reports/coupon/coupon-results.json         | 656 +++++++++++++++++++
| |  .../reports/coupon/screenshots/BUG-FR09-001.png  | Bin 0 -> 256177 bytes
| |  .../reports/coupon/screenshots/BUG-FR09-002.png  | Bin 0 -> 137859 bytes
| |  .../reports/coupon/screenshots/BUG-FR09-003.png  | Bin 0 -> 79106 bytes
| |  .../reports/coupon/screenshots/BUG-FR09-004.png  | Bin 0 -> 102593 bytes
| |  .../reports/coupon/screenshots/BUG-FR09-005.png  | Bin 0 -> 69629 bytes
| |  10 files changed, 1196 insertions(+)
| | 
| * commit 4d8d18199c10d47495442ca247ae693ee0f837b6
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 6 16:05:00 2026 +0700
| | 
| |     feat: add missing test-design
| | 
| |  tests/test-cases/coupon/test-design.md | 154 +++++++++++++++++++++++++++++
| |  1 file changed, 154 insertions(+)
| | 
| * commit eebc0a690d9e3a06f35734f7bf0d8d6232c23dbb
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 6 16:02:45 2026 +0700
| | 
| |     feat: add test cases
| | 
| |  tests/test-cases/coupon/TC-FR09-ST-001.md | 62 +++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-ST-002.md | 63 +++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-ST-003.md | 62 +++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-ST-004.md | 62 +++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-ST-005.md | 61 +++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-ST-006.md | 61 +++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-ST-007.md | 60 ++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-ST-008.md | 60 ++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-UC-001.md | 66 +++++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-UC-002.md | 58 +++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-UC-003.md | 58 +++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-UC-004.md | 62 +++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-UC-005.md | 60 ++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-FR09-UC-006.md | 60 ++++++++++++++++++++++++
| |  14 files changed, 855 insertions(+)
| | 
| * commit 4cd3d7c3be384a75d6d96c25c950d429af5deb83
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 6 16:02:31 2026 +0700
| | 
| |     feat: update stt and uct specs
| | 
| |  ...state-transition-and-usecase-testing-specs.md | 154 ++++++++++++++++++-
| |  1 file changed, 152 insertions(+), 2 deletions(-)
| | 
| * commit fd74d46e8c494238d1449ddebdb695af1a194468
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Mon Jul 6 15:41:03 2026 +0700
| | 
| |     feat: add state transition and use case testing specifications
| | 
| |  ...state-transition-and-usecase-testing-specs.md | 326 +++++++++++++++++++
| |  1 file changed, 326 insertions(+)
| | 
| * commit b7e1ef4dd65e91a042292e22106e5ca83b6bfb6b
|/  Author: yuran1811 <trieuvanbd123@gmail.com>
|   Date:   Mon Jul 6 15:35:22 2026 +0700
|   
|       feat: add stt and uct skills
|   
|    .agents/skills/state-transition-testing/SKILL.md | 181 +++++++++++++++++++
|    .agents/skills/use-case-testing/SKILL.md         | 100 ++++++++++
|    2 files changed, 281 insertions(+)
|   
| * commit 103e4a5c30461cca16f1a34c27e84f347d3eba4d
|/  Author: mqt4n <machquoctan2005@gmail.com>
|   Date:   Mon Jul 6 15:22:04 2026 +0700
|   
|       initial commit
|   
|    .agents/skills/test-run-reporter/SKILL.md        | 378 +++++++++++++++++++
|    .../test-run-reporter/references/conventions.md  | 144 +++++++
|    .agents/skills/test-runner/SKILL.md              |   0
|    .../skills/test-writer-decision-table/SKILL.md   | 205 ++++++++++
|    .agents/skills/test-writer-pairwise/SKILL.md     | 198 ++++++++++
|    .agents/skills/test-writer/SKILL.md              |   0
|    api_specification.md                             |  34 +-
|    backend/database.sqlite                          | Bin 36864 -> 36864 bytes
|    report/AI_Audit_Report.md                        |  21 ++
|    setup_guide.md                                   |  15 +-
|    tests/bug-reports/checkout/BUG-CHECKOUT-001.md   |  43 +++
|    tests/bug-reports/checkout/BUG-CHECKOUT-002.md   |  43 +++
|    tests/bug-reports/checkout/BUG-CHECKOUT-003.md   |  47 +++
|    tests/test-cases/checkout/TC-CHECKOUT-DTT-001.md |  35 ++
|    tests/test-cases/checkout/TC-CHECKOUT-DTT-002.md |  37 ++
|    tests/test-cases/checkout/TC-CHECKOUT-DTT-003.md |  41 ++
|    tests/test-cases/checkout/TC-CHECKOUT-DTT-004.md |  41 ++
|    tests/test-cases/checkout/TC-CHECKOUT-PWS-001.md |  35 ++
|    tests/test-cases/checkout/TC-CHECKOUT-PWS-002.md |  35 ++
|    tests/test-cases/checkout/TC-CHECKOUT-PWS-003.md |  35 ++
|    tests/test-cases/checkout/TC-CHECKOUT-PWS-004.md |  37 ++
|    tests/test-cases/checkout/TC-CHECKOUT-PWS-005.md |  36 ++
|    tests/test-cases/checkout/TC-CHECKOUT-PWS-006.md |  37 ++
|    tests/test-cases/checkout/TC-CHECKOUT-PWS-007.md |  35 ++
|    tests/test-cases/checkout/TC-CHECKOUT-PWS-008.md |  36 ++
|    tests/test-cases/checkout/TC-CHECKOUT-PWS-009.md |  37 ++
|    tests/test-cases/login/TC-LOGIN-001.md           |  33 --
|    tests/test-cases/register/TC-REGISTER-001.md     |   0
|    tests/test-design/Decision_Table_Testing.md      |  68 ++++
|    tests/test-design/Pair_Wise_Testing.md           |  70 ++++
|    tests/test-runs/CHECKOUT-test-run.md             |  19 +
|    .../script/checkout/TC-CHECKOUT-PWS-001.rest     |  11 +
|    .../script/checkout/TC-CHECKOUT-PWS-002.rest     |  11 +
|    .../script/checkout/TC-CHECKOUT-PWS-003.rest     |  11 +
|    .../script/checkout/TC-CHECKOUT-PWS-004.rest     |  36 ++
|    .../script/checkout/TC-CHECKOUT-PWS-005.rest     |  25 ++
|    .../script/checkout/TC-CHECKOUT-PWS-006.rest     |  47 +++
|    .../script/checkout/TC-CHECKOUT-PWS-007.rest     |  11 +
|    .../script/checkout/TC-CHECKOUT-PWS-008.rest     |  36 ++
|    .../script/checkout/TC-CHECKOUT-PWS-009.rest     |  47 +++
|    tests/test-runs/sprint-1-test-run.md             |   0
|    tests/test-summary/test-summary-report.md        |  32 ++
|    tests/test-summary/traceability-matrix.md        |  18 +-
|    43 files changed, 2031 insertions(+), 49 deletions(-)
|   
| * commit 9002268907ab58e031fa3b89a8a5f41af132ea26
|/  Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
|   Date:   Mon Jul 6 15:11:32 2026 +0700
|   
|       homework dtt and pairwisw
|   
|    .DS_Store                                        | Bin 0 -> 8196 bytes
|    .claude/.DS_Store                                | Bin 0 -> 6148 bytes
|    .claude/skills/.DS_Store                         | Bin 0 -> 6148 bytes
|    .claude/skills/dtt/SKILL.md                      | 149 +++++++++++++
|    .claude/skills/pairwise/SKILL.md                 | 179 +++++++++++++++
|    agent-skills/.DS_Store                           | Bin 0 -> 6148 bytes
|    agent-skills/skills/.DS_Store                    | Bin 0 -> 6148 bytes
|    agent-skills/skills/dtt/SKILL.md                 | 149 +++++++++++++
|    agent-skills/skills/pairwise/SKILL.md            | 179 +++++++++++++++
|    backend/database.sqlite                          | Bin 36864 -> 36864 bytes
|    backend/package.json                             |   3 +
|    backend/pnpm-workspace.yaml                      |   2 +
|    tests/.DS_Store                                  | Bin 0 -> 6148 bytes
|    tests/bug-reports/register/BUG-REGISTER-01.md    |  72 ++++++
|    tests/bug-reports/register/BUG-REGISTER-02.md    |  87 ++++++++
|    tests/bug-reports/register/BUG-REGISTER-03.md    |  61 ++++++
|    tests/bug-reports/register/BUG-REGISTER-04.md    |  80 +++++++
|    tests/bug-reports/register/BUG-REGISTER-05.md    | 108 +++++++++
|    tests/test-cases/login/TC-LOGIN-001.md           |  33 ---
|    tests/test-cases/register/TC-REGISTER-001.md     |   0
|    tests/test-cases/register/TC-REGISTER-DTT-001.md |  50 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-002.md |  50 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-003.md |  50 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-004.md |  51 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-005.md |  50 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-006.md |  51 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-007.md |  51 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-008.md |  52 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-009.md |  50 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-010.md |  50 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-011.md |  50 +++++
|    tests/test-cases/register/TC-REGISTER-DTT-012.md |  51 +++++
|    tests/test-design/FR-01-DTT-design.md            | 218 +++++++++++++++++++
|    tests/test-runs/FR-01-DTT-run.md                 |  48 ++++
|    tests/test-runs/sprint-1-test-run.md             |   0
|    35 files changed, 1941 insertions(+), 33 deletions(-)
|   
| * commit 113651bbe42e9f8d3c1fd58d5977f1a1a1a7771e
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Thu Jul 2 23:10:51 2026 +0700
| | 
| |     docs: 📖 add feature-specs, test-cases, bug-reports for coupon
| | 
| |  .../bug-reports/coupon/BUG-COUPON-001.md         |  64 ++++
| |  .../screenshots/BUG-COUPON-001-bigbuy.png        | Bin 0 -> 52065 bytes
| |  .../screenshots/BUG-COUPON-001-save10.png        | Bin 0 -> 48350 bytes
| |  ...R-09 M\303\243 Gi\341\272\243m Gi\303\241.md" |  66 ++++
| |  .../coupon/FR-09-coupon-test-design.md           | 299 +++++++++++++++++++
| |  .../test-cases/coupon/TC-COUPON-DTT-001.md       |  29 ++
| |  .../test-cases/coupon/TC-COUPON-DTT-002.md       |  29 ++
| |  .../test-cases/coupon/TC-COUPON-DTT-003.md       |  26 ++
| |  .../test-cases/coupon/TC-COUPON-DTT-004.md       |  27 ++
| |  .../test-cases/coupon/TC-COUPON-DTT-005.md       |  27 ++
| |  .../test-cases/coupon/TC-COUPON-DTT-006.md       |  25 ++
| |  .../test-cases/coupon/TC-COUPON-DTT-007.md       |  27 ++
| |  12 files changed, 619 insertions(+)
| | 
| * commit 0c6de43520b9f4ba03c9f443c46b183696717694
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Thu Jul 2 23:10:06 2026 +0700
| | 
| |     feat: ✨ add dtt and pairwise testing skill
| | 
| |  .agents/skills/dtt-pairwise-testing/SKILL.md     | 489 +++++++++++++++++++
| |  .../references/TC-REGISTER-001.md                |  27 +
| |  .../templates/feature-spec.md}                   |   0
| |  .../templates/output-format-template.md          |  34 ++
| |  4 files changed, 550 insertions(+)
| | 
| * commit c8cdab6c9bbfa0ade3f782d925483530cd971244
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 15:33:27 2026 +0700
| | 
| |     fix: 🐛 update submission HW02
| | 
| |  docs/anh-khoa/README.md       |   4 +-
| |  docs/anh-khoa/README.pdf      | Bin 120929 -> 120861 bytes
| |  docs/anh-khoa/main-report.md  | 352 +++++++++++++++++++-------------------
| |  docs/anh-khoa/main-report.pdf | Bin 4082711 -> 4082384 bytes
| |  4 files changed, 178 insertions(+), 178 deletions(-)
| | 
| * commit 279756a9e856ebc14626bae12854c629efbf1ab1
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 04:15:47 2026 +0700
| | 
| |     docs: 📖 update git log
| | 
| |  docs/anh-khoa/git log.md  | 1196 +++++++++++++++++++++++++++++------------
| |  docs/anh-khoa/git log.pdf |  Bin 564291 -> 635405 bytes
| |  2 files changed, 847 insertions(+), 349 deletions(-)
| | 
| * commit d03437185efe1e8e8082ec1058bf49c8ab8030ef
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 04:14:11 2026 +0700
| | 
| |     docs: 📖 add link video demo
| | 
| |  docs/anh-khoa/README.md  |   4 +++-
| |  docs/anh-khoa/README.pdf | Bin 119722 -> 120929 bytes
| |  2 files changed, 3 insertions(+), 1 deletion(-)
| | 
| * commit a33110d4053b58920ba1b861ca5743cc55f4adcb
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 04:13:50 2026 +0700
| | 
| |     docs: 📖 add AI experience
| | 
| |  docs/anh-khoa/Appendix_A/ai critique.md  |   8 +++++---
| |  docs/anh-khoa/Appendix_A/ai critique.pdf | Bin 38941 -> 39388 bytes
| |  docs/anh-khoa/README.md                  |   2 +-
| |  docs/anh-khoa/main-report.md             |  11 +++++++++++
| |  docs/anh-khoa/main-report.pdf            | Bin 4072788 -> 4082711 bytes
| |  5 files changed, 17 insertions(+), 4 deletions(-)
| | 
| * commit c63a630384d632de111d8e6cb3c11137c0fded4c
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 02:50:18 2026 +0700
| | 
| |     feat: ✨ add templates and references for various skills in the .agents directory
| | 
| |  .../references/FR-01-audit-entry.md              | 46 +++++++++++++
| |  .../templates/audit-entry-template.md            | 12 ++++
| |  .../references/TC-REGISTER-015.md                | 28 ++++++++
| |  .../templates/output-format-template.md          |  9 +++
| |  .agents/skills/bug-reporting/SKILL.md            |  6 +-
| |  .../bug-reporting/references/BUG-PRODUCT-002.md  | 69 +++++++++++++++++++
| |  .../skills/bug-reporting/templates/bug_report.md | 42 ++++++++++++
| |  .../domain-testing/references/TC-REGISTER-001.md | 27 ++++++++
| |  .../templates/output-format-template.md          | 34 ++++++++++
| |  .../references/login.spec.ts.md                  | 32 +++++++++
| |  .../templates/output-format-template.md          | 21 ++++++
| |  .agents/skills/requirement-analysis/SKILL.md     |  2 +-
| |  .../requirement-analysis/references/FR-01.md     | 32 +++++++++
| |  .../references/TC-LOGIN-001.md                   | 33 +++++++++
| |  .../templates/output-format-template.md          |  8 +++
| |  .../test-runner/references/automated-test-run.md | 71 ++++++++++++++++++++
| |  .../templates/output-format-template.md          | 28 ++++++++
| |  .../references/traceability-matrix.md            | 62 +++++++++++++++++
| |  .../templates/output-format-template.md          | 19 ++++++
| |  19 files changed, 577 insertions(+), 4 deletions(-)
| | 
| * commit 543d127adc816ed491f77f86c5fc863f1c991c58
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 01:46:26 2026 +0700
| | 
| |     docs: 📖 add bug-reports, test-cases and pdf version
| | 
| |  docs/anh-khoa/Appendix_A/ai audit report.pdf     |  Bin 0 -> 1177072 bytes
| |  docs/anh-khoa/Appendix_A/ai critique.pdf         |  Bin 0 -> 38941 bytes
| |  docs/anh-khoa/README.pdf                         |  Bin 0 -> 119722 bytes
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-001.md   |   58 +
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-001.pdf  |  Bin 0 -> 109485 bytes
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-002.md   |   45 +
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-002.pdf  |  Bin 0 -> 92794 bytes
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-003.md   |   42 +
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-003.pdf  |  Bin 0 -> 92195 bytes
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-004.md   |   46 +
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-004.pdf  |  Bin 0 -> 101335 bytes
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-005.md   |   42 +
| |  docs/anh-khoa/bug-reports/cart/BUG-CART-005.pdf  |  Bin 0 -> 86819 bytes
| |  .../bug-reports/mobile/BUG-MOBILE-001.md         |   66 +
| |  .../bug-reports/mobile/BUG-MOBILE-001.pdf        |  Bin 0 -> 138690 bytes
| |  .../bug-reports/mobile/BUG-MOBILE-002.md         |   61 +
| |  .../bug-reports/mobile/BUG-MOBILE-002.pdf        |  Bin 0 -> 139829 bytes
| |  .../bug-reports/mobile/BUG-MOBILE-003.md         |   62 +
| |  .../bug-reports/mobile/BUG-MOBILE-003.pdf        |  Bin 0 -> 95493 bytes
| |  .../bug-reports/product/BUG-PRODUCT-001.md       |   48 +
| |  .../bug-reports/product/BUG-PRODUCT-001.pdf      |  Bin 0 -> 98378 bytes
| |  .../bug-reports/product/BUG-PRODUCT-002.md       |   69 +
| |  .../bug-reports/product/BUG-PRODUCT-002.pdf      |  Bin 0 -> 187250 bytes
| |  .../bug-reports/product/BUG-PRODUCT-003.md       |   47 +
| |  .../bug-reports/product/BUG-PRODUCT-003.pdf      |  Bin 0 -> 98757 bytes
| |  .../bug-reports/product/BUG-PRODUCT-004.md       |   51 +
| |  .../bug-reports/product/BUG-PRODUCT-004.pdf      |  Bin 0 -> 79677 bytes
| |  .../bug-reports/product/BUG-PRODUCT-005.md       |   56 +
| |  .../bug-reports/product/BUG-PRODUCT-005.pdf      |  Bin 0 -> 82274 bytes
| |  .../bug-reports/register/BUG-REGISTER-001.md     |   44 +
| |  .../bug-reports/register/BUG-REGISTER-001.pdf    |  Bin 0 -> 82855 bytes
| |  .../bug-reports/register/BUG-REGISTER-002.md     |   39 +
| |  .../bug-reports/register/BUG-REGISTER-002.pdf    |  Bin 0 -> 88883 bytes
| |  .../bug-reports/register/BUG-REGISTER-003.md     |   53 +
| |  .../bug-reports/register/BUG-REGISTER-003.pdf    |  Bin 0 -> 120640 bytes
| |  .../bug-reports/register/BUG-REGISTER-004.md     |   38 +
| |  .../bug-reports/register/BUG-REGISTER-004.pdf    |  Bin 0 -> 88565 bytes
| |  .../bug-reports/register/BUG-REGISTER-005.md     |   38 +
| |  .../bug-reports/register/BUG-REGISTER-005.pdf    |  Bin 0 -> 87250 bytes
| |  .../bug-reports/register/BUG-REGISTER-006.md     |   38 +
| |  .../bug-reports/register/BUG-REGISTER-006.pdf    |  Bin 0 -> 86964 bytes
| |  .../bug-reports/register/BUG-REGISTER-007.md     |   38 +
| |  .../bug-reports/register/BUG-REGISTER-007.pdf    |  Bin 0 -> 89845 bytes
| |  .../bug-reports/register/BUG-REGISTER-008.md     |   38 +
| |  .../bug-reports/register/BUG-REGISTER-008.pdf    |  Bin 0 -> 89997 bytes
| |  .../bug-reports/register/BUG-REGISTER-009.md     |   38 +
| |  .../bug-reports/register/BUG-REGISTER-009.pdf    |  Bin 0 -> 92273 bytes
| |  .../bug-reports/register/BUG-REGISTER-010.md     |   38 +
| |  .../bug-reports/register/BUG-REGISTER-010.pdf    |  Bin 0 -> 93610 bytes
| |  .../screenshots/BUG-CART-001-quantity-minus.png  |  Bin 0 -> 21304 bytes
| |  .../screenshots/BUG-CART-001-quantity-plus.png   |  Bin 0 -> 21304 bytes
| |  .../screenshots/BUG-CART-002-duplicate-item.png  |  Bin 0 -> 35539 bytes
| |  .../BUG-CART-003-incorrect-in-label.png          |  Bin 0 -> 35539 bytes
| |  .../BUG-CART-004-not-display-dialog.png          |  Bin 0 -> 32338 bytes
| |  .../BUG-CART-005-not-display-icon.png            |  Bin 0 -> 24487 bytes
| |  .../screenshots/BUG-MOBILE-001-empty-email.png   |  Bin 0 -> 22377 bytes
| |  .../BUG-MOBILE-001-empty-password.png            |  Bin 0 -> 23614 bytes
| |  .../screenshots/BUG-MOBILE-001-invalid-email.png |  Bin 0 -> 22615 bytes
| |  .../screenshots/BUG-MOBILE-002-counter-plus2.png |  Bin 0 -> 23043 bytes
| |  .../screenshots/BUG-MOBILE-002-counter-tc007.png |  Bin 0 -> 23043 bytes
| |  .../screenshots/BUG-MOBILE-002-locked-early.png  |  Bin 0 -> 23043 bytes
| |  .../BUG-MOBILE-003-lock-duration-180s.png        |  Bin 0 -> 23043 bytes
| |  .../BUG-MOBILE-003-still-locked-30s.png          |  Bin 0 -> 23036 bytes
| |  .../BUG-PRODUCT-001-name-over-255.png            |  Bin 0 -> 32222 bytes
| |  .../screenshots/BUG-PRODUCT-002-price-empty.png  |  Bin 0 -> 32222 bytes
| |  .../BUG-PRODUCT-002-price-invalid.png            |  Bin 0 -> 32223 bytes
| |  .../BUG-PRODUCT-002-price-negative.png           |  Bin 0 -> 32222 bytes
| |  .../screenshots/BUG-PRODUCT-002-price-zero.png   |  Bin 0 -> 32222 bytes
| |  .../BUG-PRODUCT-003-edit-isolation.png           |  Bin 0 -> 40699 bytes
| |  .../BUG-REGISTER-001-redirect-fail.png           |  Bin 0 -> 26997 bytes
| |  .../BUG-REGISTER-002-duplicate-email.png         |  Bin 0 -> 26648 bytes
| |  .../BUG-REGISTER-003-confirm-pw-missing.png      |  Bin 0 -> 24618 bytes
| |  .../BUG-REGISTER-003-confirm-pw-timeout.png      |  Bin 0 -> 24595 bytes
| |  .../BUG-REGISTER-004-generic-message.png         |  Bin 0 -> 40724 bytes
| |  .../BUG-REGISTER-005-generic-message.png         |  Bin 0 -> 41178 bytes
| |  .../BUG-REGISTER-006-generic-message.png         |  Bin 0 -> 41203 bytes
| |  .../BUG-REGISTER-007-generic-message.png         |  Bin 0 -> 41537 bytes
| |  .../BUG-REGISTER-008-generic-message.png         |  Bin 0 -> 41537 bytes
| |  .../BUG-REGISTER-009-generic-message.png         |  Bin 0 -> 41537 bytes
| |  .../BUG-REGISTER-010-generic-message.png         |  Bin 0 -> 41537 bytes
| |  ...ng k\303\275 t\303\240i kho\341\272\243n.pdf" |  Bin 0 -> 100154 bytes
| |  .../FR-07 Gi\341\273\217 h\303\240ng.pdf"        |  Bin 0 -> 97491 bytes
| |  ...l\303\275 S\341\272\243n ph\341\272\251m.pdf" |  Bin 0 -> 99972 bytes
| |  ...203ng nh\341\272\255p tr\303\252n mobile.pdf" |  Bin 0 -> 92177 bytes
| |  docs/anh-khoa/git log.md                         | 2762 ++++++++++++++++++
| |  docs/anh-khoa/git log.pdf                        |  Bin 0 -> 564291 bytes
| |  docs/anh-khoa/main-report.pdf                    |  Bin 0 -> 4072788 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-001.md     |   26 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-001.pdf    |  Bin 0 -> 61465 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-002.md     |   25 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-002.pdf    |  Bin 0 -> 61177 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-003.md     |   24 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-003.pdf    |  Bin 0 -> 61770 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-004.md     |   25 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-004.pdf    |  Bin 0 -> 61746 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-005.md     |   24 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-005.pdf    |  Bin 0 -> 72486 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-006.md     |   27 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-006.pdf    |  Bin 0 -> 66260 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-007.md     |   26 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-007.pdf    |  Bin 0 -> 61875 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-008.md     |   25 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-008.pdf    |  Bin 0 -> 61782 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-009.md     |   25 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-009.pdf    |  Bin 0 -> 62129 bytes
| |  docs/anh-khoa/test-cases/cart/TC-CART-010.md     |   21 +
| |  docs/anh-khoa/test-cases/cart/TC-CART-010.pdf    |  Bin 0 -> 48678 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-001.md          |   27 +
| |  .../mobile_login/TC-MOBILE_LOGIN-001.pdf         |  Bin 0 -> 68642 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-002.md          |   25 +
| |  .../mobile_login/TC-MOBILE_LOGIN-002.pdf         |  Bin 0 -> 62284 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-003.md          |   25 +
| |  .../mobile_login/TC-MOBILE_LOGIN-003.pdf         |  Bin 0 -> 65037 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-004.md          |   25 +
| |  .../mobile_login/TC-MOBILE_LOGIN-004.pdf         |  Bin 0 -> 63038 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-005.md          |   26 +
| |  .../mobile_login/TC-MOBILE_LOGIN-005.pdf         |  Bin 0 -> 66864 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-006.md          |   26 +
| |  .../mobile_login/TC-MOBILE_LOGIN-006.pdf         |  Bin 0 -> 67625 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-007.md          |   26 +
| |  .../mobile_login/TC-MOBILE_LOGIN-007.pdf         |  Bin 0 -> 68752 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-008.md          |   25 +
| |  .../mobile_login/TC-MOBILE_LOGIN-008.pdf         |  Bin 0 -> 68147 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-009.md          |   24 +
| |  .../mobile_login/TC-MOBILE_LOGIN-009.pdf         |  Bin 0 -> 69166 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-010.md          |   24 +
| |  .../mobile_login/TC-MOBILE_LOGIN-010.pdf         |  Bin 0 -> 66918 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-011.md          |   25 +
| |  .../mobile_login/TC-MOBILE_LOGIN-011.pdf         |  Bin 0 -> 65127 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-012.md          |   26 +
| |  .../mobile_login/TC-MOBILE_LOGIN-012.pdf         |  Bin 0 -> 83890 bytes
| |  .../mobile_login/TC-MOBILE_LOGIN-013.md          |   25 +
| |  .../mobile_login/TC-MOBILE_LOGIN-013.pdf         |  Bin 0 -> 81884 bytes
| |  .../test-cases/product/TC-PRODUCT-001.md         |   26 +
| |  .../test-cases/product/TC-PRODUCT-001.pdf        |  Bin 0 -> 66298 bytes
| |  .../test-cases/product/TC-PRODUCT-002.md         |   25 +
| |  .../test-cases/product/TC-PRODUCT-002.pdf        |  Bin 0 -> 67062 bytes
| |  .../test-cases/product/TC-PRODUCT-003.md         |   25 +
| |  .../test-cases/product/TC-PRODUCT-003.pdf        |  Bin 0 -> 65495 bytes
| |  .../test-cases/product/TC-PRODUCT-004.md         |   25 +
| |  .../test-cases/product/TC-PRODUCT-004.pdf        |  Bin 0 -> 65112 bytes
| |  .../test-cases/product/TC-PRODUCT-005.md         |   26 +
| |  .../test-cases/product/TC-PRODUCT-005.pdf        |  Bin 0 -> 65264 bytes
| |  .../test-cases/product/TC-PRODUCT-006.md         |   26 +
| |  .../test-cases/product/TC-PRODUCT-006.pdf        |  Bin 0 -> 67385 bytes
| |  .../test-cases/product/TC-PRODUCT-007.md         |   26 +
| |  .../test-cases/product/TC-PRODUCT-007.pdf        |  Bin 0 -> 65799 bytes
| |  .../test-cases/product/TC-PRODUCT-008.md         |   26 +
| |  .../test-cases/product/TC-PRODUCT-008.pdf        |  Bin 0 -> 66039 bytes
| |  .../test-cases/product/TC-PRODUCT-009.md         |   26 +
| |  .../test-cases/product/TC-PRODUCT-009.pdf        |  Bin 0 -> 65290 bytes
| |  .../test-cases/product/TC-PRODUCT-010.md         |   26 +
| |  .../test-cases/product/TC-PRODUCT-010.pdf        |  Bin 0 -> 65905 bytes
| |  .../test-cases/product/TC-PRODUCT-011.md         |   26 +
| |  .../test-cases/product/TC-PRODUCT-011.pdf        |  Bin 0 -> 64614 bytes
| |  .../test-cases/product/TC-PRODUCT-012.md         |   25 +
| |  .../test-cases/product/TC-PRODUCT-012.pdf        |  Bin 0 -> 66006 bytes
| |  .../test-cases/product/TC-PRODUCT-013.md         |   25 +
| |  .../test-cases/product/TC-PRODUCT-013.pdf        |  Bin 0 -> 68120 bytes
| |  .../test-cases/product/TC-PRODUCT-014.md         |   25 +
| |  .../test-cases/product/TC-PRODUCT-014.pdf        |  Bin 0 -> 68466 bytes
| |  .../test-cases/product/TC-PRODUCT-015.md         |   25 +
| |  .../test-cases/product/TC-PRODUCT-015.pdf        |  Bin 0 -> 67433 bytes
| |  .../test-cases/product/TC-PRODUCT-016.md         |   28 +
| |  .../test-cases/product/TC-PRODUCT-016.pdf        |  Bin 0 -> 83499 bytes
| |  .../test-cases/product/TC-PRODUCT-017.md         |   24 +
| |  .../test-cases/product/TC-PRODUCT-017.pdf        |  Bin 0 -> 65001 bytes
| |  .../test-cases/product/TC-PRODUCT-018.md         |   24 +
| |  .../test-cases/product/TC-PRODUCT-018.pdf        |  Bin 0 -> 64726 bytes
| |  .../test-cases/register/TC-REGISTER-001.md       |   27 +
| |  .../test-cases/register/TC-REGISTER-001.pdf      |  Bin 0 -> 67109 bytes
| |  .../test-cases/register/TC-REGISTER-002.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-002.pdf      |  Bin 0 -> 64727 bytes
| |  .../test-cases/register/TC-REGISTER-003.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-003.pdf      |  Bin 0 -> 66971 bytes
| |  .../test-cases/register/TC-REGISTER-004.md       |   27 +
| |  .../test-cases/register/TC-REGISTER-004.pdf      |  Bin 0 -> 68247 bytes
| |  .../test-cases/register/TC-REGISTER-005.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-005.pdf      |  Bin 0 -> 64499 bytes
| |  .../test-cases/register/TC-REGISTER-006.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-006.pdf      |  Bin 0 -> 67038 bytes
| |  .../test-cases/register/TC-REGISTER-007.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-007.pdf      |  Bin 0 -> 67126 bytes
| |  .../test-cases/register/TC-REGISTER-008.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-008.pdf      |  Bin 0 -> 67194 bytes
| |  .../test-cases/register/TC-REGISTER-009.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-009.pdf      |  Bin 0 -> 67247 bytes
| |  .../test-cases/register/TC-REGISTER-010.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-010.pdf      |  Bin 0 -> 66533 bytes
| |  .../test-cases/register/TC-REGISTER-011.md       |   27 +
| |  .../test-cases/register/TC-REGISTER-011.pdf      |  Bin 0 -> 83008 bytes
| |  .../test-cases/register/TC-REGISTER-012.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-012.pdf      |  Bin 0 -> 64313 bytes
| |  .../test-cases/register/TC-REGISTER-013.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-013.pdf      |  Bin 0 -> 66858 bytes
| |  .../test-cases/register/TC-REGISTER-014.md       |   26 +
| |  .../test-cases/register/TC-REGISTER-014.pdf      |  Bin 0 -> 66058 bytes
| |  .../test-cases/register/TC-REGISTER-015.md       |   28 +
| |  .../test-cases/register/TC-REGISTER-015.pdf      |  Bin 0 -> 80378 bytes
| |  .../test-cases/register/TC-REGISTER-016.md       |   28 +
| |  .../test-cases/register/TC-REGISTER-016.pdf      |  Bin 0 -> 79767 bytes
| |  .../test-cases/register/TC-REGISTER-017.md       |   28 +
| |  .../test-cases/register/TC-REGISTER-017.pdf      |  Bin 0 -> 83961 bytes
| |  docs/anh-khoa/traceability-matrix.pdf            |  Bin 0 -> 172410 bytes
| |  204 files changed, 5344 insertions(+)
| | 
| * commit 7be0d850076ceb77e41a999df6680dcce4c4337e
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 01:31:10 2026 +0700
| | 
| |     fix: 🐛 fix syntax md
| | 
| |  tests/bug-reports/cart/BUG-CART-001.md         |  4 ++--
| |  tests/bug-reports/cart/BUG-CART-002.md         |  2 +-
| |  tests/bug-reports/cart/BUG-CART-003.md         |  2 +-
| |  tests/bug-reports/cart/BUG-CART-004.md         |  4 ++--
| |  tests/bug-reports/cart/BUG-CART-005.md         |  2 +-
| |  tests/bug-reports/mobile/BUG-MOBILE-001.md     |  9 ++++++---
| |  tests/bug-reports/mobile/BUG-MOBILE-002.md     |  8 +++++---
| |  tests/bug-reports/mobile/BUG-MOBILE-003.md     |  6 ++++--
| |  tests/bug-reports/product/BUG-PRODUCT-001.md   |  2 +-
| |  tests/bug-reports/product/BUG-PRODUCT-002.md   | 12 ++++++++----
| |  tests/bug-reports/product/BUG-PRODUCT-003.md   |  3 ++-
| |  tests/bug-reports/register/BUG-REGISTER-001.md |  2 +-
| |  tests/bug-reports/register/BUG-REGISTER-002.md |  2 +-
| |  tests/bug-reports/register/BUG-REGISTER-003.md |  6 ++++--
| |  tests/bug-reports/register/BUG-REGISTER-004.md |  2 +-
| |  tests/bug-reports/register/BUG-REGISTER-005.md |  2 +-
| |  tests/bug-reports/register/BUG-REGISTER-006.md |  2 +-
| |  tests/bug-reports/register/BUG-REGISTER-007.md |  2 +-
| |  tests/bug-reports/register/BUG-REGISTER-008.md |  2 +-
| |  tests/bug-reports/register/BUG-REGISTER-009.md |  2 +-
| |  tests/bug-reports/register/BUG-REGISTER-010.md |  2 +-
| |  21 files changed, 46 insertions(+), 32 deletions(-)
| | 
| * commit 1bd8c03c67deb032e525c82b4db8930673ee9c8c
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 01:30:42 2026 +0700
| | 
| |     docs: 📖 add evidence of github issues
| | 
| |  docs/anh-khoa/images/issues/107.png | Bin 0 -> 151781 bytes
| |  docs/anh-khoa/images/issues/108.png | Bin 0 -> 154773 bytes
| |  docs/anh-khoa/images/issues/110.png | Bin 0 -> 182608 bytes
| |  docs/anh-khoa/images/issues/111.png | Bin 0 -> 188849 bytes
| |  docs/anh-khoa/images/issues/112.png | Bin 0 -> 163448 bytes
| |  docs/anh-khoa/images/issues/113.png | Bin 0 -> 168173 bytes
| |  docs/anh-khoa/images/issues/119.png | Bin 0 -> 160415 bytes
| |  docs/anh-khoa/images/issues/130.png | Bin 0 -> 145075 bytes
| |  docs/anh-khoa/images/issues/131.png | Bin 0 -> 158928 bytes
| |  docs/anh-khoa/images/issues/68.png  | Bin 0 -> 156752 bytes
| |  docs/anh-khoa/images/issues/70.png  | Bin 0 -> 155236 bytes
| |  docs/anh-khoa/images/issues/71.png  | Bin 0 -> 151934 bytes
| |  docs/anh-khoa/images/issues/74.png  | Bin 0 -> 154751 bytes
| |  docs/anh-khoa/images/issues/87.png  | Bin 0 -> 157699 bytes
| |  docs/anh-khoa/images/issues/88.png  | Bin 0 -> 164266 bytes
| |  docs/anh-khoa/images/issues/89.png  | Bin 0 -> 158241 bytes
| |  docs/anh-khoa/images/issues/90.png  | Bin 0 -> 147728 bytes
| |  docs/anh-khoa/images/issues/91.png  | Bin 0 -> 154361 bytes
| |  docs/anh-khoa/images/issues/92.png  | Bin 0 -> 146016 bytes
| |  docs/anh-khoa/images/issues/93.png  | Bin 0 -> 162266 bytes
| |  docs/anh-khoa/images/issues/94.png  | Bin 0 -> 152699 bytes
| |  docs/anh-khoa/images/issues/95.png  | Bin 0 -> 145846 bytes
| |  docs/anh-khoa/images/issues/96.png  | Bin 0 -> 156517 bytes
| |  docs/anh-khoa/main-report.md        |  35 ++++++++++++++++++++++++++++++++
| |  24 files changed, 35 insertions(+)
| | 
| * commit 57c3a282244a438d4548820b474fcb1c77a5fd93
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 01:14:02 2026 +0700
| | 
| |     docs: 📖 add README.MD
| | 
| |  docs/anh-khoa/README.md | 53 +++++++++++++++++++++++++++++++++++++++++++++
| |  1 file changed, 53 insertions(+)
| | 
| * commit 5b0ffca1b1230d93f44db7094455af8ae9f29e52
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 01:12:42 2026 +0700
| | 
| |     docs: 📖 remove unnecessary docs
| | 
| |  docs/anh-khoa/ai privacy checklist.md | 0
| |  docs/anh-khoa/ai use disclosure.md    | 0
| |  2 files changed, 0 insertions(+), 0 deletions(-)
| | 
| * commit 53f7c7044c3b12141bf6061094edd543a9bd23a1
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Mon Jun 29 00:52:43 2026 +0700
| | 
| |     docs: 📖 add main report and appendix
| | 
| |  .../anh-khoa/{ => Appendix_A}/ai audit report.md | 520 +++++++------
| |  docs/anh-khoa/Appendix_A/ai critique.md          |   7 +
| |  docs/anh-khoa/ai critique.md                     |   0
| |  docs/anh-khoa/images/sequence_diagram.png        | Bin 0 -> 1932439 bytes
| |  docs/anh-khoa/main-report.md                     | 722 +++++++++++++++++++
| |  5 files changed, 1027 insertions(+), 222 deletions(-)
| | 
| * commit e32e5058fb1bdf1d62f39f956d23a44a8c8e2fee
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 23:41:06 2026 +0700
| | 
| |     docs: 📖 add missing evidence
| | 
| |  tests/bug-reports/cart/BUG-CART-003.md           |   8 -------
| |  tests/bug-reports/cart/BUG-CART-004.md           |  23 +++++--------------
| |  .../BUG-MOBILE-003-lock-duration-180s.png        | Bin 0 -> 23043 bytes
| |  3 files changed, 6 insertions(+), 25 deletions(-)
| | 
| * commit 9f2f00793e7a8aae3afa4b3ddb106d47c05661a0
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 23:40:27 2026 +0700
| | 
| |     docs: 📖 add missing bug report in cart module
| | 
| |  tests/bug-reports/cart/BUG-CART-005.md           |  42 +++++++++++++++++++
| |  .../BUG-CART-005-not-display-icon.png            | Bin 0 -> 24487 bytes
| |  2 files changed, 42 insertions(+)
| | 
| * commit fb8c6a5e7b2bf80368495e4733c12752a90e1ba9
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 23:01:47 2026 +0700
| | 
| |     refactor: 🌟 remove unnecessary skill
| | 
| |  .agents/skills/test-writer/SKILL.md | 0
| |  1 file changed, 0 insertions(+), 0 deletions(-)
| | 
| * commit e2faa588e606e9a330c04546ceab2d5068144402
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 22:27:44 2026 +0700
| | 
| |     fix: 🐛 fix typo in ai audit report
| | 
| |  docs/anh-khoa/ai audit report.md | 3 ++-
| |  1 file changed, 2 insertions(+), 1 deletion(-)
| | 
| * commit 98223f5ed3c8b2f9af3b1d77b02d4e26ac4d0cfd
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 22:16:13 2026 +0700
| | 
| |     docs: 📖 add missing bug reports
| | 
| |  tests/bug-reports/register/BUG-REGISTER-004.md   |  38 +++++++++++++++++++
| |  tests/bug-reports/register/BUG-REGISTER-005.md   |  38 +++++++++++++++++++
| |  tests/bug-reports/register/BUG-REGISTER-006.md   |  38 +++++++++++++++++++
| |  tests/bug-reports/register/BUG-REGISTER-007.md   |  38 +++++++++++++++++++
| |  tests/bug-reports/register/BUG-REGISTER-008.md   |  38 +++++++++++++++++++
| |  tests/bug-reports/register/BUG-REGISTER-009.md   |  38 +++++++++++++++++++
| |  tests/bug-reports/register/BUG-REGISTER-010.md   |  38 +++++++++++++++++++
| |  .../BUG-REGISTER-004-generic-message.png         | Bin 0 -> 40724 bytes
| |  .../BUG-REGISTER-005-generic-message.png         | Bin 0 -> 41178 bytes
| |  .../BUG-REGISTER-006-generic-message.png         | Bin 0 -> 41203 bytes
| |  .../BUG-REGISTER-007-generic-message.png         | Bin 0 -> 41537 bytes
| |  .../BUG-REGISTER-008-generic-message.png         | Bin 0 -> 41537 bytes
| |  .../BUG-REGISTER-009-generic-message.png         | Bin 0 -> 41537 bytes
| |  .../BUG-REGISTER-010-generic-message.png         | Bin 0 -> 41537 bytes
| |  14 files changed, 266 insertions(+)
| | 
| * commit 10a021f39bbd607fb9d30fdefb088ebf3f8ecbc2
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 20:43:05 2026 +0700
| | 
| |     fix: 🐛 fix playwright config
| | 
| |  tests/e2e/playwright.config.ts | 7 +++----
| |  1 file changed, 3 insertions(+), 4 deletions(-)
| | 
| * commit 8ef0c4c479c3942154f426df05a6d9b470068a48
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 18:38:59 2026 +0700
| | 
| |     docs: 📖 add bug reports and evidences
| | 
| |  docs/anh-khoa/ai audit report.md                 | 340 +++++++++++++++++++
| |  tests/bug-reports/cart/BUG-CART-001.md           |  58 ++++
| |  tests/bug-reports/cart/BUG-CART-002.md           |  45 +++
| |  tests/bug-reports/cart/BUG-CART-003.md           |  50 +++
| |  tests/bug-reports/cart/BUG-CART-004.md           |  57 ++++
| |  tests/bug-reports/login/BUG-LOGIN-001.md         |  36 --
| |  tests/bug-reports/mobile/BUG-MOBILE-001.md       |  63 ++++
| |  tests/bug-reports/mobile/BUG-MOBILE-002.md       |  59 ++++
| |  tests/bug-reports/mobile/BUG-MOBILE-003.md       |  60 ++++
| |  tests/bug-reports/product/BUG-PRODUCT-001.md     |  48 +++
| |  tests/bug-reports/product/BUG-PRODUCT-002.md     |  65 ++++
| |  tests/bug-reports/product/BUG-PRODUCT-003.md     |  46 +++
| |  tests/bug-reports/product/BUG-PRODUCT-004.md     |  51 +++
| |  tests/bug-reports/product/BUG-PRODUCT-005.md     |  56 +++
| |  tests/bug-reports/register/BUG-REGISTER-001.md   |  44 +++
| |  tests/bug-reports/register/BUG-REGISTER-002.md   |  39 +++
| |  tests/bug-reports/register/BUG-REGISTER-003.md   |  51 +++
| |  .../screenshots/BUG-CART-001-quantity-minus.png  | Bin 0 -> 21304 bytes
| |  .../screenshots/BUG-CART-001-quantity-plus.png   | Bin 0 -> 21304 bytes
| |  .../screenshots/BUG-CART-002-duplicate-item.png  | Bin 0 -> 35539 bytes
| |  .../BUG-CART-003-incorrect-in-label.png          | Bin 0 -> 35539 bytes
| |  .../BUG-CART-004-not-display-dialog.png          | Bin 0 -> 32338 bytes
| |  .../screenshots/BUG-MOBILE-001-empty-email.png   | Bin 0 -> 22377 bytes
| |  .../BUG-MOBILE-001-empty-password.png            | Bin 0 -> 23614 bytes
| |  .../screenshots/BUG-MOBILE-001-invalid-email.png | Bin 0 -> 22615 bytes
| |  .../screenshots/BUG-MOBILE-002-counter-plus2.png | Bin 0 -> 23043 bytes
| |  .../screenshots/BUG-MOBILE-002-counter-tc007.png | Bin 0 -> 23043 bytes
| |  .../screenshots/BUG-MOBILE-002-locked-early.png  | Bin 0 -> 23043 bytes
| |  .../BUG-MOBILE-003-still-locked-30s.png          | Bin 0 -> 23036 bytes
| |  .../BUG-PRODUCT-001-name-over-255.png            | Bin 0 -> 32222 bytes
| |  .../screenshots/BUG-PRODUCT-002-price-empty.png  | Bin 0 -> 32222 bytes
| |  .../BUG-PRODUCT-002-price-invalid.png            | Bin 0 -> 32223 bytes
| |  .../BUG-PRODUCT-002-price-negative.png           | Bin 0 -> 32222 bytes
| |  .../screenshots/BUG-PRODUCT-002-price-zero.png   | Bin 0 -> 32222 bytes
| |  .../BUG-PRODUCT-003-edit-isolation.png           | Bin 0 -> 40699 bytes
| |  .../BUG-REGISTER-001-redirect-fail.png           | Bin 0 -> 26997 bytes
| |  .../BUG-REGISTER-002-duplicate-email.png         | Bin 0 -> 26648 bytes
| |  .../BUG-REGISTER-003-confirm-pw-missing.png      | Bin 0 -> 24618 bytes
| |  .../BUG-REGISTER-003-confirm-pw-timeout.png      | Bin 0 -> 24595 bytes
| |  39 files changed, 1132 insertions(+), 36 deletions(-)
| | 
| * commit a7b11fd61e054fdeb413d7dc45574bed7709b00c
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 17:43:55 2026 +0700
| | 
| |     test: ✅ add test case script
| | 
| |  docs/anh-khoa/ai audit report.md      |  143 +++
| |  tests/e2e/.gitignore                  |    5 +
| |  tests/e2e/cart.spec.ts                |  175 +++
| |  tests/e2e/login.spec.ts               |   33 +
| |  tests/e2e/mobile-login.spec.ts        |  243 +++++
| |  tests/e2e/package-lock.json           | 1658 +++++++++++++++++++++++++++++
| |  tests/e2e/package.json                |   18 +
| |  tests/e2e/playwright.config.ts        |   81 ++
| |  tests/e2e/product/product-api.spec.ts |   55 +
| |  tests/e2e/product/product-ui.spec.ts  |  197 ++++
| |  tests/e2e/register.spec.ts            |  183 ++++
| |  tests/e2e/tsconfig.json               |   12 +
| |  tests/e2e/utils/api-helpers.ts        |   57 +
| |  13 files changed, 2860 insertions(+)
| | 
| * commit 4383a531db1001f415f0ddde43e83ca91dc27658
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 17:22:14 2026 +0700
| | 
| |     feat: ✨ enhance test runner skill
| | 
| |  .agents/skills/test-runner/SKILL.md | 38 ++++++++++++++++++++++-----------
| |  1 file changed, 25 insertions(+), 13 deletions(-)
| | 
| * commit 84143da2d0c5cd86bbed91400114cd3f6c9161ac
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 13:07:35 2026 +0700
| | 
| |     feat: ✨ add playwright script generator and test runner skill
| | 
| |  .../skills/playwright-script-generator/SKILL.md  | 44 +++++++++++++++++
| |  .agents/skills/test-runner/SKILL.md              | 51 ++++++++++++++++++++
| |  2 files changed, 95 insertions(+)
| | 
| * commit 153ad4ac34ecebd0b0d44ade6134aaa28f6f116e
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 09:04:34 2026 +0700
| | 
| |     docs: 📖 add traceability matrix and missing test cases
| | 
| |  docs/anh-khoa/ai audit report.md                 | 225 +++++++++++++++++++
| |  docs/anh-khoa/traceability-matrix.md             |  62 +++++
| |  .../mobile_login/TC-MOBILE_LOGIN-013.md          |  25 +++
| |  tests/test-cases/product/TC-PRODUCT-017.md       |  24 ++
| |  tests/test-cases/product/TC-PRODUCT-018.md       |  24 ++
| |  tests/test-cases/register/TC-REGISTER-017.md     |  28 +++
| |  6 files changed, 388 insertions(+)
| | 
| * commit e4028f947e283c3483f106cefa6f9acaa2f53379
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sun Jun 28 08:44:23 2026 +0700
| | 
| |     feat: ✨ add traceability-matrix skill
| | 
| |  .agents/skills/traceability-matrix/SKILL.md | 39 +++++++++++++++++++++++++
| |  1 file changed, 39 insertions(+)
| | 
| * commit 648be32514650fa8174457ef617bb522f56b6629
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 12:43:43 2026 +0700
| | 
| |     docs: 📖 add boundary value test cases for FR-20
| | 
| |  docs/anh-khoa/ai audit report.md                 | 106 +++++++++++++++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-012.md          |  26 +++++
| |  2 files changed, 132 insertions(+)
| | 
| * commit 3d5c9d4a55f862684d1d05ac7c6fd8e42633a68f
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 12:23:20 2026 +0700
| | 
| |     docs: 📖 add boundary value test cases for FR-15
| | 
| |  docs/anh-khoa/ai audit report.md           | 86 ++++++++++++++++++++++++++
| |  tests/test-cases/product/TC-PRODUCT-016.md | 28 +++++++++
| |  2 files changed, 114 insertions(+)
| | 
| * commit 7577252b4f4fa783acda64e3f936237c6beb0f85
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 12:19:16 2026 +0700
| | 
| |     docs: 📖 add ai audit BVA for FR-07
| | 
| |  docs/anh-khoa/ai audit report.md | 54 ++++++++++++++++++++++++++++++++++++
| |  1 file changed, 54 insertions(+)
| | 
| * commit 80409ff03e26352779021f66a4d008b2f0826c96
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 12:11:46 2026 +0700
| | 
| |     docs: 📖 add boundary value test cases for FR-01
| | 
| |  docs/anh-khoa/ai audit report.md             | 115 +++++++++++++++++++++++
| |  tests/test-cases/register/TC-REGISTER-015.md |  28 ++++++
| |  tests/test-cases/register/TC-REGISTER-016.md |  28 ++++++
| |  3 files changed, 171 insertions(+)
| | 
| * commit 640f51ebd9563b04b9652fb1c1a21f846516b541
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 12:01:35 2026 +0700
| | 
| |     feat: ✨ enhance AI skill for BVA
| | 
| |  .agents/skills/boundary-value-analysis/SKILL.md | 23 +++++++++++++--------
| |  1 file changed, 14 insertions(+), 9 deletions(-)
| | 
| * commit d0de2ea45cb7d23da948e60b727b583f1a391487
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 11:58:09 2026 +0700
| | 
| |     docs: 📖 verdict AI output
| | 
| |  docs/anh-khoa/ai audit report.md | 34 ++++++++++++++++++++++++++++------
| |  1 file changed, 28 insertions(+), 6 deletions(-)
| | 
| * commit 232717c48b4e567466be7772e909fc60c010c957
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 11:07:41 2026 +0700
| | 
| |     docs: 📖 add test case for FR-20
| | 
| |  docs/anh-khoa/ai audit report.md                 | 78 ++++++++++++++++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-001.md          | 27 +++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-002.md          | 25 +++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-003.md          | 25 +++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-004.md          | 25 +++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-005.md          | 26 +++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-006.md          | 26 +++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-007.md          | 26 +++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-008.md          | 25 +++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-009.md          | 24 ++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-010.md          | 24 ++++++
| |  .../mobile_login/TC-MOBILE_LOGIN-011.md          | 25 +++++++
| |  12 files changed, 356 insertions(+)
| | 
| * commit 388380708b2cead201826939cf5f39eb099b619d
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 10:40:22 2026 +0700
| | 
| |     docs: 📖 add test case for FR-15
| | 
| |  docs/anh-khoa/ai audit report.md           | 90 ++++++++++++++++++++++++++
| |  tests/test-cases/product/TC-PRODUCT-001.md | 26 ++++++++
| |  tests/test-cases/product/TC-PRODUCT-002.md | 25 +++++++
| |  tests/test-cases/product/TC-PRODUCT-003.md | 25 +++++++
| |  tests/test-cases/product/TC-PRODUCT-004.md | 25 +++++++
| |  tests/test-cases/product/TC-PRODUCT-005.md | 26 ++++++++
| |  tests/test-cases/product/TC-PRODUCT-006.md | 26 ++++++++
| |  tests/test-cases/product/TC-PRODUCT-007.md | 26 ++++++++
| |  tests/test-cases/product/TC-PRODUCT-008.md | 26 ++++++++
| |  tests/test-cases/product/TC-PRODUCT-009.md | 26 ++++++++
| |  tests/test-cases/product/TC-PRODUCT-010.md | 26 ++++++++
| |  tests/test-cases/product/TC-PRODUCT-011.md | 26 ++++++++
| |  tests/test-cases/product/TC-PRODUCT-012.md | 25 +++++++
| |  tests/test-cases/product/TC-PRODUCT-013.md | 25 +++++++
| |  tests/test-cases/product/TC-PRODUCT-014.md | 25 +++++++
| |  tests/test-cases/product/TC-PRODUCT-015.md | 25 +++++++
| |  16 files changed, 473 insertions(+)
| | 
| * commit e45b36c683f5ed722ffb9f19b30bab4bf6ff86d7
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 01:40:00 2026 +0700
| | 
| |     docs: 📖 add test case for FR-07
| | 
| |  docs/anh-khoa/ai audit report.md     | 90 ++++++++++++++++++++++++++++++--
| |  tests/test-cases/cart/TC-CART-001.md | 26 +++++++++
| |  tests/test-cases/cart/TC-CART-002.md | 25 +++++++++
| |  tests/test-cases/cart/TC-CART-003.md | 24 +++++++++
| |  tests/test-cases/cart/TC-CART-004.md | 25 +++++++++
| |  tests/test-cases/cart/TC-CART-005.md | 24 +++++++++
| |  tests/test-cases/cart/TC-CART-006.md | 27 ++++++++++
| |  tests/test-cases/cart/TC-CART-007.md | 26 +++++++++
| |  tests/test-cases/cart/TC-CART-008.md | 25 +++++++++
| |  tests/test-cases/cart/TC-CART-009.md | 25 +++++++++
| |  tests/test-cases/cart/TC-CART-010.md | 21 ++++++++
| |  11 files changed, 333 insertions(+), 5 deletions(-)
| | 
| * commit 0348dd29f8f4bb64fb8c7d6ee9085be61ef8eb31
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 01:14:00 2026 +0700
| | 
| |     docs: 📖 add test case for FR01
| | 
| |  docs/anh-khoa/ai audit report.md             | 97 ++++++++++++++++++++++++
| |  tests/test-cases/register/TC-REGISTER-001.md | 27 +++++++
| |  tests/test-cases/register/TC-REGISTER-002.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-003.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-004.md | 27 +++++++
| |  tests/test-cases/register/TC-REGISTER-005.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-006.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-007.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-008.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-009.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-010.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-011.md | 27 +++++++
| |  tests/test-cases/register/TC-REGISTER-012.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-013.md | 26 +++++++
| |  tests/test-cases/register/TC-REGISTER-014.md | 26 +++++++
| |  15 files changed, 464 insertions(+)
| | 
| * commit 54b0d7c81445522e2c27d923ec695fa7ce1bf4c8
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Sat Jun 27 00:55:02 2026 +0700
| | 
| |     feat: ✨ enhance AI skill generate test case
| | 
| |  .agents/skills/domain-testing/SKILL.md | 51 ++++++++++++++++++++++++------
| |  1 file changed, 42 insertions(+), 9 deletions(-)
| | 
| * commit 2b8fdd7fb2ad1ceaa383fa23e28c090403b5c22a
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Fri Jun 26 18:10:46 2026 +0700
| | 
| |     fix: 🐛 verify AI output and fix it
| | 
| |  docs/anh-khoa/ai audit report.md                 | 72 ++++++++++++++------
| |  ... l\303\275 S\341\272\243n ph\341\272\251m.md" |  4 +-
| |  ...\203ng nh\341\272\255p tr\303\252n mobile.md" |  2 +-
| |  3 files changed, 55 insertions(+), 23 deletions(-)
| | 
| * commit 0c8aa936799575d14157c1010431a436dfe19434
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Fri Jun 26 17:40:39 2026 +0700
| | 
| |     docs: 📖 add feature specs for FR-20
| | 
| |  docs/anh-khoa/ai audit report.md                 | 45 ++++++++++++++++++++
| |  ...\203ng nh\341\272\255p tr\303\252n mobile.md" | 31 ++++++++++++++
| |  2 files changed, 76 insertions(+)
| | 
| * commit d1e3d989cb45fa6254f6fd335fecbcfb4ca74c7e
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Fri Jun 26 17:32:50 2026 +0700
| | 
| |     docs: 📖 add feature specs for FR-15
| | 
| |  docs/anh-khoa/ai audit report.md                 | 50 ++++++++++++++++++++
| |  ... l\303\275 S\341\272\243n ph\341\272\251m.md" | 36 ++++++++++++++
| |  2 files changed, 86 insertions(+)
| | 
| * commit 0fb85f31143bb681693cb671a2994715ed53fd4e
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Fri Jun 26 17:26:58 2026 +0700
| | 
| |     docs: 📖 add feature-specs for FR-07
| | 
| |  docs/anh-khoa/ai audit report.md                 | 53 ++++++++++++++++++++
| |  .../FR-07 Gi\341\273\217 h\303\240ng.md"         | 39 ++++++++++++++
| |  2 files changed, 92 insertions(+)
| | 
| * commit c31c5561a5cb6ab2b74852d2a938007720532599
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Fri Jun 26 16:54:50 2026 +0700
| | 
| |     docs: 📖 add feature spec for FR-01
| | 
| |  docs/anh-khoa/ai audit report.md                 | 43 ++++++++++++++++++++
| |  ...3ng k\303\275 t\303\240i kho\341\272\243n.md" | 32 +++++++++++++++
| |  2 files changed, 75 insertions(+)
| | 
| * commit e88160e129fc7c1495762e9de7e5a7f4ed12508e
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Fri Jun 26 16:54:17 2026 +0700
| | 
| |     feat: ✨ enhance requirement analysis skill
| | 
| |  .agents/skills/requirement-analysis/SKILL.md | 10 +++++++---
| |  1 file changed, 7 insertions(+), 3 deletions(-)
| | 
| * commit 4111afe7867156bf8c6519962b26d53c1e8f1346
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Fri Jun 26 16:43:23 2026 +0700
| | 
| |     feat: ✨ enhance AI audit logging skill
| | 
| |  .agents/skills/ai-audit-logger/SKILL.md | 13 ++++++-------
| |  1 file changed, 6 insertions(+), 7 deletions(-)
| | 
| * commit b940c4fefb4b568b0c6fee2c14cd697d0b29cc81
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Fri Jun 26 16:22:19 2026 +0700
| | 
| |     feat: ✨ add bug report template
| | 
| |  tests/bug-reports/login/BUG-LOGIN-001.md | 36 ++++++++++++++++++++++++++++
| |  1 file changed, 36 insertions(+)
| | 
| * commit b4d55c54e93eeab977bb939e5d802dea30f3a436
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Thu Jun 25 23:30:22 2026 +0700
| | 
| |     feat: ✨ add config for claude
| | 
| |  .claude/settings.json | 44 ++++++++++++++++++++++++++++++++++++++++++++
| |  1 file changed, 44 insertions(+)
| | 
| * commit 9bc65c8b826acb6d8f51f628792bc743d5448b2c
| | Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
| | Date:   Thu Jun 25 23:29:59 2026 +0700
| | 
| |     feat: ✨ add agent skills
| | 
| |  .agents/skills/ai-audit-logger/SKILL.md         | 27 +++++++++++++++++++++
| |  .agents/skills/boundary-value-analysis/SKILL.md | 22 +++++++++++++++++
| |  .agents/skills/bug-reporting/SKILL.md           | 26 ++++++++++++++++++++
| |  .agents/skills/domain-testing/SKILL.md          | 20 +++++++++++++++
| |  .agents/skills/requirement-analysis/SKILL.md    | 25 +++++++++++++++++++
| |  5 files changed, 120 insertions(+)
| | 
| * commit 67e97c6ff8a917a0c8afe326f77ac19834033b1b
|/  Author: KhoaNguyen-HCMUS <anhkhoa515.dev@gmail.com>
|   Date:   Thu Jun 25 01:29:24 2026 +0700
|   
|       feat: ✨ scaffold the structure of project
|   
|    .agents/skills/ai-audit-logger/SKILL.md         | 0
|    .agents/skills/boundary-value-analysis/SKILL.md | 0
|    .agents/skills/domain-testing/SKILL.md          | 0
|    .agents/skills/requirement-analysis/SKILL.md    | 0
|    docs/anh-khoa/ai audit report.md                | 0
|    docs/anh-khoa/ai critique.md                    | 0
|    docs/anh-khoa/ai privacy checklist.md           | 0
|    docs/anh-khoa/ai use disclosure.md              | 0
|    docs/anh-khoa/git log.md                        | 0
|    docs/anh-khoa/main-report.md                    | 0
|    10 files changed, 0 insertions(+), 0 deletions(-)
|   
| * commit ccfd1f2288d5f40348a1b92da4de29208cc270fc
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Mon Jun 29 15:35:23 2026 +0700
| | 
| |     final commit after submitting
| | 
| |  .DS_Store                                 | Bin 0 -> 8196 bytes
| |  tests/.DS_Store                           | Bin 0 -> 10244 bytes
| |  tests/AI_Report.pdf                       | Bin 0 -> 549738 bytes
| |  tests/Bug_Report.pdf                      | Bin 0 -> 3046900 bytes
| |  tests/Final_Report.pdf                    | Bin 0 -> 919961 bytes
| |  tests/README.md                           | 134 +++++++++++++++++++++++++-
| |  tests/bug-reports/.DS_Store               | Bin 0 -> 6148 bytes
| |  tests/test-cases/.DS_Store                | Bin 0 -> 6148 bytes
| |  tests/test-cases/login/TC-LOGIN-001.md    |  33 -------
| |  tests/test-summary/traceability-matrix.md |   3 -
| |  10 files changed, 130 insertions(+), 40 deletions(-)
| | 
| * commit 65fc494c281b42337a7195d584a3c83cba57b18d
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 17:29:27 2026 +0700
| | 
| |     add commit
| | 
| |  tests/Final_Report.md |  37 +++++++++++
| |  tests/README.md       |  42 +++++++++++--
| |  tests/commit-log.txt  | 155 ++++++++++++++++++++++++++++++++++++++++++++++
| |  3 files changed, 230 insertions(+), 4 deletions(-)
| | 
| * commit b99eaed4b006c912aa9036da0795ac5ccd8e424b
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 17:22:37 2026 +0700
| | 
| |     add report
| | 
| |  plan.md               | 494 ++++++++++++++++++++++++++++++++++++++++++++++
| |  tests/AI_Report.md    | 271 +++++++++++++++++++++++++
| |  tests/Bug_Report.md   | 480 ++++++++++++++++++++++++++++++++++++++++++++
| |  tests/Final_Report.md | 489 +++++++++++++++++++++++++++++++++++++++++++++
| |  tests/README.md       |  23 +--
| |  5 files changed, 1741 insertions(+), 16 deletions(-)
| | 
| * commit 542c1714924aad6335b772dd2a554a5b3dd288d0
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 16:49:52 2026 +0700
| | 
| |     add AI-audit
| | 
| |  backend/database.sqlite                      | Bin 36864 -> 45056 bytes
| |  frontend-mobile/package-lock.json            | 197 ++++++++++++++++++++++-
| |  frontend-mobile/package.json                 |   4 +-
| |  tests/README.md                              | 139 ++++++++++++++++
| |  tests/ai-audit/AI_Audit_Report.md            |  85 ++++++++++
| |  tests/ai-audit/AI_Critique.md                |  31 ++++
| |  tests/bug-reports/screenshots/bug-1.png      | Bin 0 -> 591448 bytes
| |  tests/bug-reports/screenshots/bug-2.png      | Bin 0 -> 516590 bytes
| |  tests/bug-reports/screenshots/bug-3.png      | Bin 0 -> 541491 bytes
| |  tests/bug-reports/screenshots/bug-4.png      | Bin 0 -> 536434 bytes
| |  tests/bug-reports/screenshots/bug-5.png      | Bin 0 -> 558991 bytes
| |  tests/bug-reports/screenshots/bug-6.png      | Bin 0 -> 571672 bytes
| |  tests/bug-reports/screenshots/bug-7.png      | Bin 0 -> 578094 bytes
| |  tests/bug-reports/screenshots/bug-8.png      | Bin 0 -> 559571 bytes
| |  tests/test-cases/register/TC-REGISTER-001.md |   0
| |  tests/test-runs/sprint-1-test-run.md         |   0
| |  16 files changed, 454 insertions(+), 2 deletions(-)
| | 
| * commit 8ce4df64248b442f9895153f44b61de54fff3f8f
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:29:29 2026 +0700
| | 
| |     test(mobile): test summary
| | 
| |  tests/test-summary/Mobile_OrderHistory.md | 54 +++++++++++++++++++++++++++
| |  1 file changed, 54 insertions(+)
| | 
| * commit a0de32c8512e68095e1e5095fef68e2b3890f082
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:29:25 2026 +0700
| | 
| |     test(mobile): execution — domain testing + BVA with screenshots report
| | 
| |  tests/test-runs/Mobile_OrderHistory/BVA.md       |  52 ++++++++++++++
| |  .../Mobile_OrderHistory/DomainTesting.md         |  72 +++++++++++++++++++
| |  .../screenshots/BVA-MOB-01-result.png            | Bin 0 -> 47254 bytes
| |  .../screenshots/BVA-MOB-02-result.png            | Bin 0 -> 59595 bytes
| |  .../screenshots/BVA-MOB-03-result.png            | Bin 0 -> 58370 bytes
| |  .../screenshots/BVA-MOB-04-result.png            | Bin 0 -> 58370 bytes
| |  .../screenshots/BVA-MOB-05-result.png            | Bin 0 -> 47850 bytes
| |  .../screenshots/BVA-MOB-06-result.png            | Bin 0 -> 47850 bytes
| |  .../screenshots/DT-MOB-01-result.png             | Bin 0 -> 60167 bytes
| |  .../screenshots/DT-MOB-02-result.png             | Bin 0 -> 61378 bytes
| |  .../screenshots/DT-MOB-03-result.png             | Bin 0 -> 55660 bytes
| |  .../screenshots/DT-MOB-04-result.png             | Bin 0 -> 49805 bytes
| |  .../screenshots/DT-MOB-05-result.png             | Bin 0 -> 50427 bytes
| |  .../screenshots/DT-MOB-06-result.png             | Bin 0 -> 60167 bytes
| |  .../screenshots/DT-MOB-07-result.png             | Bin 0 -> 61378 bytes
| |  .../screenshots/DT-MOB-08-result.png             | Bin 0 -> 55660 bytes
| |  .../screenshots/DT-MOB-09-result.png             | Bin 0 -> 49805 bytes
| |  .../screenshots/DT-MOB-10-result.png             | Bin 0 -> 50427 bytes
| |  .../screenshots/DT-MOB-11-before.png             | Bin 0 -> 51317 bytes
| |  .../screenshots/DT-MOB-11-result.png             | Bin 0 -> 54398 bytes
| |  .../screenshots/DT-MOB-12-before.png             | Bin 0 -> 47201 bytes
| |  .../screenshots/DT-MOB-12-result.png             | Bin 0 -> 50387 bytes
| |  .../screenshots/DT-MOB-13-result.png             | Bin 0 -> 50387 bytes
| |  .../screenshots/MOB-00-profile-loaded.png        | Bin 0 -> 43443 bytes
| |  24 files changed, 124 insertions(+)
| | 
| * commit 4b4a07c1a69274e8316943b5f2d2728b4d2a0577
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:29:22 2026 +0700
| | 
| |     test(mobile): domain testing + BVA — variables, order status classes, cancel boundary design
| | 
| |  tests/test-cases/Mobile_OrderHistory/BVA.md      | 238 +++++++++
| |  .../Mobile_OrderHistory/DomainTesting.md         | 483 +++++++++++++++++++
| |  2 files changed, 721 insertions(+)
| | 
| * commit 4472c565727a6502884488ca831c6ec1b7abfbf7
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:29:02 2026 +0700
| | 
| |     test(fr18): test summary
| | 
| |  tests/test-summary/FR18_AdminOrder.md | 83 +++++++++++++++++++++++++++++++
| |  1 file changed, 83 insertions(+)
| | 
| * commit 465e247e0bfe0059a764359f6d26327bfaac47b5
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:28:53 2026 +0700
| | 
| |     test(fr18): Execution — domain testing + BVA with screenshots report
| | 
| |  tests/test-runs/FR18_AdminOrder/BVA.md           |  61 +++++++++++++++++
| |  tests/test-runs/FR18_AdminOrder/DomainTesting.md |  65 +++++++++++++++++++
| |  .../screenshots/BVA-FR18-01-result.png           | Bin 0 -> 9152 bytes
| |  .../screenshots/BVA-FR18-02-result.png           | Bin 0 -> 9152 bytes
| |  .../screenshots/BVA-FR18-03-result.png           | Bin 0 -> 9152 bytes
| |  .../screenshots/BVA-FR18-04-result.png           | Bin 0 -> 106366 bytes
| |  .../screenshots/BVA-FR18-05-result.png           | Bin 0 -> 104761 bytes
| |  .../screenshots/BVA-FR18-06-result.png           | Bin 0 -> 103948 bytes
| |  .../screenshots/BVA-FR18-07-result.png           | Bin 0 -> 103948 bytes
| |  .../screenshots/BVA-FR18-08-result.png           | Bin 0 -> 104913 bytes
| |  .../screenshots/DT-FR18-01-result.png            | Bin 0 -> 9152 bytes
| |  .../screenshots/DT-FR18-02-result.png            | Bin 0 -> 9152 bytes
| |  .../screenshots/DT-FR18-03-result.png            | Bin 0 -> 9152 bytes
| |  .../screenshots/DT-FR18-04-result.png            | Bin 0 -> 124530 bytes
| |  .../screenshots/DT-FR18-05-result.png            | Bin 0 -> 123847 bytes
| |  .../screenshots/DT-FR18-06-before.png            | Bin 0 -> 122684 bytes
| |  .../screenshots/DT-FR18-06-result.png            | Bin 0 -> 122764 bytes
| |  .../screenshots/DT-FR18-07-result.png            | Bin 0 -> 9152 bytes
| |  .../screenshots/DT-FR18-08-result.png            | Bin 0 -> 9152 bytes
| |  .../screenshots/DT-FR18-09-result.png            | Bin 0 -> 116881 bytes
| |  .../screenshots/DT-FR18-10-result.png            | Bin 0 -> 111726 bytes
| |  .../screenshots/DT-FR18-11-result.png            | Bin 0 -> 112722 bytes
| |  22 files changed, 126 insertions(+)
| | 
| * commit db812f6a3875a059eed3ea5ccb4ae74741863693
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:28:49 2026 +0700
| | 
| |     test(fr18): domain testing + BVA — variables, auth/content classes, boundaries, test cases design
| | 
| |  tests/test-cases/FR18_AdminOrder/BVA.md          | 289 +++++++++++++
| |  .../test-cases/FR18_AdminOrder/DomainTesting.md  | 426 +++++++++++++++++++
| |  2 files changed, 715 insertions(+)
| | 
| * commit b2bb961bf5c032b155c967ae0119e367f36ac908
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:28:17 2026 +0700
| | 
| |     test(FR10): add test summary FR10
| | 
| |  tests/test-summary/FR10_OrderState.md | 88 +++++++++++++++++++++++++++++++
| |  1 file changed, 88 insertions(+)
| | 
| * commit 2dccb2e30dbe3d75d9787f2df8f9b6245cdf2907
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:28:12 2026 +0700
| | 
| |     test(FR10): execute DT and BVA test cases
| | 
| |  tests/test-runs/FR10_OrderState/BVA.md           |  65 +++++++++++++++
| |  tests/test-runs/FR10_OrderState/DomainTesting.md |  79 +++++++++++++++++++
| |  .../screenshots/BVA-FR10-01-before.png           | Bin 0 -> 132631 bytes
| |  .../screenshots/BVA-FR10-01-result.png           | Bin 0 -> 131943 bytes
| |  .../screenshots/BVA-FR10-02-before.png           | Bin 0 -> 132533 bytes
| |  .../screenshots/BVA-FR10-02-result.png           | Bin 0 -> 131571 bytes
| |  .../screenshots/BVA-FR10-03-before.png           | Bin 0 -> 131477 bytes
| |  .../screenshots/BVA-FR10-03-result.png           | Bin 0 -> 130749 bytes
| |  .../screenshots/BVA-FR10-04-before.png           | Bin 0 -> 125868 bytes
| |  .../screenshots/BVA-FR10-04-result.png           | Bin 0 -> 126507 bytes
| |  .../screenshots/BVA-FR10-05-before.png           | Bin 0 -> 126118 bytes
| |  .../screenshots/BVA-FR10-05-result.png           | Bin 0 -> 124823 bytes
| |  .../screenshots/BVA-FR10-06-before.png           | Bin 0 -> 123139 bytes
| |  .../screenshots/BVA-FR10-06-result.png           | Bin 0 -> 123139 bytes
| |  .../screenshots/BVA-FR10-07-before.png           | Bin 0 -> 122082 bytes
| |  .../screenshots/BVA-FR10-07-result.png           | Bin 0 -> 123196 bytes
| |  .../screenshots/BVA-FR10-08-before.png           | Bin 0 -> 124530 bytes
| |  .../screenshots/BVA-FR10-08-result.png           | Bin 0 -> 124530 bytes
| |  .../screenshots/DT-FR10-01-before.png            | Bin 0 -> 121744 bytes
| |  .../screenshots/DT-FR10-01-result.png            | Bin 0 -> 121776 bytes
| |  .../screenshots/DT-FR10-02-before.png            | Bin 0 -> 121770 bytes
| |  .../screenshots/DT-FR10-02-result.png            | Bin 0 -> 121281 bytes
| |  .../screenshots/DT-FR10-03-before.png            | Bin 0 -> 128015 bytes
| |  .../screenshots/DT-FR10-03-result.png            | Bin 0 -> 126528 bytes
| |  .../screenshots/DT-FR10-04-before.png            | Bin 0 -> 120579 bytes
| |  .../screenshots/DT-FR10-04-result.png            | Bin 0 -> 126726 bytes
| |  .../screenshots/DT-FR10-05-before.png            | Bin 0 -> 120779 bytes
| |  .../screenshots/DT-FR10-05-result.png            | Bin 0 -> 126855 bytes
| |  .../screenshots/DT-FR10-06-before.png            | Bin 0 -> 126400 bytes
| |  .../screenshots/DT-FR10-06-result.png            | Bin 0 -> 126400 bytes
| |  .../screenshots/DT-FR10-07-before.png            | Bin 0 -> 131561 bytes
| |  .../screenshots/DT-FR10-07-result.png            | Bin 0 -> 130784 bytes
| |  .../screenshots/DT-FR10-08-before.png            | Bin 0 -> 131569 bytes
| |  .../screenshots/DT-FR10-08-result.png            | Bin 0 -> 130909 bytes
| |  .../screenshots/DT-FR10-09-before.png            | Bin 0 -> 126831 bytes
| |  .../screenshots/DT-FR10-09-result.png            | Bin 0 -> 126831 bytes
| |  .../screenshots/DT-FR10-10-before.png            | Bin 0 -> 129004 bytes
| |  .../screenshots/DT-FR10-10-result.png            | Bin 0 -> 129004 bytes
| |  .../screenshots/DT-FR10-11-before.png            | Bin 0 -> 130958 bytes
| |  .../screenshots/DT-FR10-11-result.png            | Bin 0 -> 130209 bytes
| |  .../screenshots/DT-FR10-12-before.png            | Bin 0 -> 124319 bytes
| |  .../screenshots/DT-FR10-12-result.png            | Bin 0 -> 124319 bytes
| |  .../screenshots/DT-FR10-13-before.png            | Bin 0 -> 123181 bytes
| |  .../screenshots/DT-FR10-13-result.png            | Bin 0 -> 123181 bytes
| |  44 files changed, 144 insertions(+)
| | 
| * commit a66aff66d425bc4b65d66888588ad3b6d91efb33
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:28:08 2026 +0700
| | 
| |     test(FR10): add Domain Testing and BVA test case design for Order State Machine
| | 
| |  tests/test-cases/FR10_OrderState/BVA.md          | 316 +++++++++++
| |  .../test-cases/FR10_OrderState/DomainTesting.md  | 524 +++++++++++++++++++
| |  2 files changed, 840 insertions(+)
| | 
| * commit 78f9c5a61b8b4196441e5dacbc39606f4c6bdf66
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:26:21 2026 +0700
| | 
| |     test(fr02): test summary
| | 
| |  tests/test-summary/FR02_Login.md | 96 ++++++++++++++++++++++++++++++++++++
| |  1 file changed, 96 insertions(+)
| | 
| * commit 6161a8c379bb5b8887f7dd0eb75d8cae1ffe1fa3
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:25:50 2026 +0700
| | 
| |     test(fr02): bug reports
| | 
| |  tests/bug-reports/FR02_Login/BUG-01.md      |  70 ++++++++++++
| |  tests/bug-reports/FR02_Login/BUG-02.md      |  78 +++++++++++++
| |  tests/bug-reports/FR02_Login/BUG-03.md      |  81 ++++++++++++++
| |  tests/bug-reports/FR02_Login/BUG-04.md      |  85 ++++++++++++++
| |  tests/bug-reports/FR10_OrderState/BUG-05.md |  96 ++++++++++++++++
| |  tests/bug-reports/FR10_OrderState/BUG-06.md | 117 +++++++++++++++++++
| |  tests/bug-reports/FR18_AdminOrder/BUG-07.md | 109 ++++++++++++++++++
| |  tests/bug-reports/FR18_AdminOrder/BUG-08.md | 142 ++++++++++++++++++++++++
| |  8 files changed, 778 insertions(+)
| | 
| * commit 5318fd4d2ffd769cd1588b8a80498215df3d826a
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:25:41 2026 +0700
| | 
| |     test(fr02): Execution — domain testing + BVA with screenshots report
| | 
| |  tests/test-runs/FR02_Login/BVA.md                |  76 ++++++++++++++++++
| |  tests/test-runs/FR02_Login/DomainTesting.md      |  80 +++++++++++++++++++
| |  .../screenshots/BVA-FR02-01-result.png           | Bin 0 -> 40962 bytes
| |  .../screenshots/BVA-FR02-02-result.png           | Bin 0 -> 40962 bytes
| |  .../screenshots/BVA-FR02-03-result.png           | Bin 0 -> 40043 bytes
| |  .../screenshots/BVA-FR02-04-result.png           | Bin 0 -> 40043 bytes
| |  .../screenshots/BVA-FR02-05-result.png           | Bin 0 -> 40043 bytes
| |  .../screenshots/BVA-FR02-06-result.png           | Bin 0 -> 40043 bytes
| |  .../screenshots/BVA-FR02-07-result.png           | Bin 0 -> 38485 bytes
| |  .../screenshots/BVA-FR02-08-result.png           | Bin 0 -> 38485 bytes
| |  .../screenshots/BVA-FR02-09-result.png           | Bin 0 -> 38485 bytes
| |  .../screenshots/BVA-FR02-10-result.png           | Bin 0 -> 36901 bytes
| |  .../screenshots/BVA-FR02-11-result.png           | Bin 0 -> 38851 bytes
| |  .../screenshots/BVA-FR02-12-result.png           | Bin 0 -> 40962 bytes
| |  .../screenshots/BVA-FR02-12-step1-result.png     | Bin 0 -> 40043 bytes
| |  .../screenshots/BVA-FR02-12-verify-result.png    | Bin 0 -> 40043 bytes
| |  .../FR02_Login/screenshots/DT-FR02-01-result.png | Bin 0 -> 67780 bytes
| |  .../FR02_Login/screenshots/DT-FR02-02-result.png | Bin 0 -> 68156 bytes
| |  .../FR02_Login/screenshots/DT-FR02-03-result.png | Bin 0 -> 40481 bytes
| |  .../FR02_Login/screenshots/DT-FR02-04-result.png | Bin 0 -> 39829 bytes
| |  .../FR02_Login/screenshots/DT-FR02-05-result.png | Bin 0 -> 38997 bytes
| |  .../FR02_Login/screenshots/DT-FR02-06-result.png | Bin 0 -> 36390 bytes
| |  .../FR02_Login/screenshots/DT-FR02-07-result.png | Bin 0 -> 37838 bytes
| |  .../FR02_Login/screenshots/DT-FR02-08-result.png | Bin 0 -> 40962 bytes
| |  .../FR02_Login/screenshots/DT-FR02-09-result.png | Bin 0 -> 36901 bytes
| |  .../FR02_Login/screenshots/DT-FR02-10-result.png | Bin 0 -> 40118 bytes
| |  .../FR02_Login/screenshots/DT-FR02-11-result.png | Bin 0 -> 67780 bytes
| |  .../FR02_Login/screenshots/DT-FR02-12-result.png | Bin 0 -> 40962 bytes
| |  .../FR02_Login/screenshots/DT-FR02-13-result.png | Bin 0 -> 40043 bytes
| |  .../FR02_Login/screenshots/DT-FR02-14-result.png | Bin 0 -> 40043 bytes
| |  .../FR02_Login/screenshots/DT-FR02-15-result.png | Bin 0 -> 31271 bytes
| |  .../FR02_Login/screenshots/DT-FR02-16-result.png | Bin 0 -> 31271 bytes
| |  .../FR02_Login/screenshots/DT-FR02-17-result.png | Bin 0 -> 41015 bytes
| |  33 files changed, 156 insertions(+)
| | 
| * commit 4e839d760bae32e759affe605ba04a3903730102
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 15:24:56 2026 +0700
| | 
| |     test(fr02): restructure
| | 
| |  tests/test-cases/FR02_Login/BVA.md           | 395 +++++++++++++++--
| |  tests/test-cases/FR02_Login/DomainTesting.md | 536 +++++++++++++++++++++--
| |  2 files changed, 866 insertions(+), 65 deletions(-)
| | 
| * commit 3ccc36a5931d818472515ce3411625f812c31cc7
| | Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
| | Date:   Sun Jun 28 12:11:27 2026 +0700
| | 
| |     test(fr02): domain testing and bva
| | 
| |  tests/test-cases/FR02_Login/BVA.md           | 103 +++++++++++++++++
| |  tests/test-cases/FR02_Login/DomainTesting.md | 137 +++++++++++++++++++++++
| |  2 files changed, 240 insertions(+)
| | 
| * commit 239f7b38324608345f5dcbf673518b732d624f98
|/  Author: Anhnguyenk835 <tuananh835.nta@gmail.com>
|   Date:   Sun Jun 28 11:41:12 2026 +0700
|   
|       add claude skill
|   
|    .claude/skills/boundary-value-analysis/SKILL.md | 84 +++++++++++++++++++++
|    .claude/skills/domain-testing/SKILL.md          | 82 ++++++++++++++++++++
|    2 files changed, 166 insertions(+)
|   
| * commit f733ee50621de0ae4cdb260d81feee7bc277cd58
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 09:50:17 2026 +0700
| | 
| |     docs: update README.md with add youtube link demo
| | 
| |  report/README.md  |   5 ++++-
| |  report/README.pdf | Bin 110693 -> 114325 bytes
| |  2 files changed, 4 insertions(+), 1 deletion(-)
| | 
| * commit 6215341fe2eb25fa6b2cbd11885fb7847913336e
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 04:12:45 2026 +0700
| | 
| |     feat: add comprehensive domain testing and audit reports for HW2
| | 
| |  report/AI_Audit_Report.pdf                | Bin 0 -> 208574 bytes
| |  report/AI_Audit_Report_Raw_AI.pdf         | Bin 0 -> 240992 bytes
| |  report/AI_Critique.pdf                    | Bin 0 -> 33778 bytes
| |  report/Boundary_Value_Analysis_Report.pdf | Bin 0 -> 342182 bytes
| |  report/Bug_Report.pdf                     | Bin 0 -> 2009148 bytes
| |  report/Domain_Testing_Report.pdf          | Bin 0 -> 655556 bytes
| |  report/Main_Report.pdf                    | Bin 0 -> 2996557 bytes
| |  report/README.pdf                         | Bin 0 -> 110693 bytes
| |  8 files changed, 0 insertions(+), 0 deletions(-)
| | 
| * commit 764ea788e673018726584803d43a3686fd49f05c
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 03:59:46 2026 +0700
| | 
| |     docs(report): complete main report, test summaries, and self-assessment for HW02
| | 
| |  .agents/skills/ai-gap-analysis/SKILL.md     |  378 ---
| |  .agents/skills/test-runner/SKILL.md         |  378 ---
| |  backend/database.sqlite                     |  Bin 36864 -> 36864 bytes
| |  report/AI_Audit_Report.md                   |  430 +--
| |  report/AI_Audit_Report_Raw_AI.md            |  321 +++
| |  report/AI_Critique.md                       |    3 +
| |  report/Bug_Report.md                        |  145 +
| |  report/Main_Report.md                       | 1044 ++++++++
| |  report/README.md                            |   59 +
| |  report/git_commit_logs.txt                  | 3194 +++++++++++++++++++++++
| |  report/images/bug_issue/1.png               |  Bin 0 -> 403132 bytes
| |  report/images/bug_issue/2.png               |  Bin 0 -> 437506 bytes
| |  report/images/bug_issue/3.png               |  Bin 0 -> 367461 bytes
| |  report/images/bug_issue/detail-1.png        |  Bin 0 -> 254194 bytes
| |  report/images/bug_issue/detail-2.png        |  Bin 0 -> 326138 bytes
| |  report/images/bug_issue/detail-3.png        |  Bin 0 -> 379208 bytes
| |  tests/bug-reports/BUG-[MODULE]-[BUGID].md   |   53 -
| |  tests/test-runs/CATEGORY-test-run.md        |   32 +-
| |  tests/test-runs/CHECKOUT-test-run.md        |    2 +
| |  tests/test-runs/MOBILE-REGISTER-test-run.md |    2 +
| |  tests/test-runs/PLAS-test-run.md            |    4 +
| |  tests/test-summary/test-summary-report.md   |   36 +
| |  tests/test-summary/traceability-matrix.md   |   56 +-
| |  23 files changed, 5001 insertions(+), 1136 deletions(-)
| | 
| * commit 4d69b7174b0e692dff44ee526efba543709a7a7a
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:52:41 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-BVA-001 and BVA-002 fail under BUG-MOBILE-REGISTER-001
| | 
| |  tests/bug-reports/mobile-register/BUG-MOBILE-REGISTER-001.md   | 2 +-
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-001.md | 2 +-
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-BVA-002.md | 2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md                    | 4 ++--
| |  4 files changed, 5 insertions(+), 5 deletions(-)
| | 
| * commit 6dc091d1ec2df3d3a4458ac4714670c0b0e8a7ba
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:50:43 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-012 and 013 fail under BUG-MOBILE-REGISTER-001
| | 
| |  tests/bug-reports/mobile-register/BUG-MOBILE-REGISTER-001.md | 2 +-
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-012.md   | 2 +-
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-013.md   | 2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md                  | 4 ++--
| |  4 files changed, 5 insertions(+), 5 deletions(-)
| | 
| * commit 3a83d8794ef982598346dea950d474c26c3d0bdc
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:48:34 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-009 to 011 fail under BUG-MOBILE-REGISTER-001
| | 
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-009.md | 2 +-
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-010.md | 2 +-
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-011.md | 2 +-
| |  3 files changed, 3 insertions(+), 3 deletions(-)
| | 
| * commit bb67b2cde98a434ff393c2e0b968f7d8e515676c
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:47:56 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-008 fail under BUG-MOBILE-REGISTER-001
| | 
| |  tests/bug-reports/mobile-register/BUG-MOBILE-REGISTER-001.md | 2 +-
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-008.md   | 2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md                  | 8 ++++----
| |  3 files changed, 6 insertions(+), 6 deletions(-)
| | 
| * commit f1e98b742e859150c3590b38c82341cb7be8ac40
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:45:19 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-007 fail under BUG-MOBILE-REGISTER-001
| | 
| |  tests/bug-reports/mobile-register/BUG-MOBILE-REGISTER-001.md | 2 +-
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-007.md   | 2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md                  | 2 +-
| |  3 files changed, 3 insertions(+), 3 deletions(-)
| | 
| * commit c7111fee614ccb17a4777b9a2c0370f3d8e230e9
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:43:24 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-006 fail under BUG-MOBILE-REGISTER-001
| | 
| |  tests/bug-reports/mobile-register/BUG-MOBILE-REGISTER-001.md | 2 +-
| |  tests/test-cases/mobile-register/TC-MOBILE-REGISTER-006.md   | 2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md                  | 2 +-
| |  3 files changed, 3 insertions(+), 3 deletions(-)
| | 
| * commit e6c93d60dbf4b31689701c881b57cf7a9a5ece97
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:41:49 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-005 fail and create BUG-MOBILE-REGISTER-005
| | 
| |  .../mobile-register/BUG-MOBILE-REGISTER-001.md   |   2 +-
| |  .../mobile-register/BUG-MOBILE-REGISTER-005.md   |  48 +++++++++++++++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-005a.png  | Bin 0 -> 241853 bytes
| |  .../mobile-register/TC-MOBILE-REGISTER-005b.png  | Bin 0 -> 235151 bytes
| |  .../mobile-register/TC-MOBILE-REGISTER-005.md    |   2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md      |   2 +-
| |  6 files changed, 51 insertions(+), 3 deletions(-)
| | 
| * commit 69a5f9e710f483852febfbe775ea17801400d0a7
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:39:13 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-004 fail and create BUG-MOBILE-REGISTER-004
| | 
| |  .../mobile-register/BUG-MOBILE-REGISTER-001.md   |   2 +-
| |  .../mobile-register/BUG-MOBILE-REGISTER-004.md   |  48 +++++++++++++++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-004a.png  | Bin 0 -> 239848 bytes
| |  .../mobile-register/TC-MOBILE-REGISTER-004b.png  | Bin 0 -> 233367 bytes
| |  .../mobile-register/TC-MOBILE-REGISTER-004.md    |   2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md      |  34 ++++++-------
| |  6 files changed, 67 insertions(+), 19 deletions(-)
| | 
| * commit ebc064c35d835aa39b96ff8528c92d47275597a2
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:35:09 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-003 fail and create BUG-MOBILE-REGISTER-003
| | 
| |  .../mobile-register/BUG-MOBILE-REGISTER-001.md   |   2 +-
| |  .../mobile-register/BUG-MOBILE-REGISTER-003.md   |  48 +++++++++++++++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-003a.png  | Bin 0 -> 241455 bytes
| |  .../mobile-register/TC-MOBILE-REGISTER-003b.png  | Bin 0 -> 236239 bytes
| |  .../mobile-register/TC-MOBILE-REGISTER-003.md    |   2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md      |   2 +-
| |  6 files changed, 51 insertions(+), 3 deletions(-)
| | 
| * commit 1ed39464565b3a10f14a414027d44d8eb19f391c
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:29:39 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-002 fail and create BUG-MOBILE-REGISTER-002
| | 
| |  .../mobile-register/BUG-MOBILE-REGISTER-001.md   |   2 +-
| |  .../mobile-register/BUG-MOBILE-REGISTER-002.md   |  48 +++++++++++++++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-002a.png  | Bin 0 -> 353312 bytes
| |  .../mobile-register/TC-MOBILE-REGISTER-002b.png  | Bin 0 -> 247314 bytes
| |  .../test_tc_mobile_register_002.rest             |  13 +++++
| |  .../mobile-register/TC-MOBILE-REGISTER-002.md    |   2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md      |  34 ++++++-------
| |  7 files changed, 80 insertions(+), 19 deletions(-)
| | 
| * commit 2032565629643088d7d03a367eab09b1e4352c31
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 01:13:51 2026 +0700
| | 
| |     test(mobile): record TC-MOBILE-REGISTER-001 fail and create bug report
| | 
| |  .../mobile-register/BUG-MOBILE-REGISTER-001.md   |  42 +++++++++++++++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-001.png   | Bin 0 -> 183607 bytes
| |  .../mobile-register/TC-MOBILE-REGISTER-001.md    |   2 +-
| |  tests/test-runs/MOBILE-REGISTER-test-run.md      |  19 +++++++++
| |  4 files changed, 62 insertions(+), 1 deletion(-)
| | 
| * commit e1ea348683cf9e8d185860d7e45e25a11f99f541
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 00:56:28 2026 +0700
| | 
| |     refactor: use relative paths for test case links in reports
| | 
| |  report/AI_Audit_Report.md                | 14 ++---
| |  report/Boundary_Value_Analysis_Report.md | 34 +++++-----
| |  report/Domain_Testing_Report.md          | 94 ++++++++++++++--------------
| |  3 files changed, 71 insertions(+), 71 deletions(-)
| | 
| * commit a392bddd01bc7798f011e2b7304c72973943aae2
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 00:25:33 2026 +0700
| | 
| |     test(mobile): design domain testing and BVA test cases for FR-01 and FR-20
| |     
| |     - Generate 13 Domain Testing test cases for mobile registration
| |     - Generate 2 Boundary Value Analysis test cases
| |     - Update Domain Testing and BVA reports
| |     - Append AI Audit Report entry
| | 
| |  report/AI_Audit_Report.md                        |  75 +++++++++--
| |  report/Boundary_Value_Analysis_Report.md         |  47 +++++++
| |  report/Domain_Testing_Report.md                  | 127 +++++++++++++++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-001.md    |  43 +++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-002.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-003.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-004.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-005.md    |  43 +++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-006.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-007.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-008.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-009.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-010.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-011.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-012.md    |  42 ++++++
| |  .../mobile-register/TC-MOBILE-REGISTER-013.md    |  42 ++++++
| |  .../TC-MOBILE-REGISTER-BVA-001.md                |  43 +++++++
| |  .../TC-MOBILE-REGISTER-BVA-002.md                |  43 +++++++
| |  18 files changed, 871 insertions(+), 12 deletions(-)
| | 
| * commit 64e9907af53cc451e5909ced7d3ab74e1215b842
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Mon Jun 29 00:16:37 2026 +0700
| | 
| |     config(mobile): update local host IP address for backend API connection
| | 
| |  frontend-mobile/App.js            |   2 +-
| |  frontend-mobile/package-lock.json | 221 +++++++++++++++++++++++++++++++++-
| |  frontend-mobile/package.json      |   5 +-
| |  3 files changed, 225 insertions(+), 3 deletions(-)
| | 
| * commit 74bc1964140b4f4d3358b135c50bd3530ecb873f
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 23:33:27 2026 +0700
| | 
| |     refactor(tests): clean up login/mobile test cases and rename register to mobile-register
| | 
| |  tests/test-cases/login/TC-LOGIN-001.md           | 33 --------------------
| |  .../TC-MPLAS-001.md                              | 33 --------------------
| |  .../TC-MOBILE-REGISTER-001.md}                   |  0
| |  3 files changed, 66 deletions(-)
| | 
| * commit 018b6fcd253f853bd8507b780582e28f4ae6092e
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 23:23:11 2026 +0700
| | 
| |     test(category): update localhost port to 5174 in bug reports
| | 
| |  tests/bug-reports/category/BUG-CATEGORY-001.md | 2 +-
| |  tests/bug-reports/category/BUG-CATEGORY-002.md | 2 +-
| |  tests/bug-reports/category/BUG-CATEGORY-003.md | 2 +-
| |  tests/bug-reports/category/BUG-CATEGORY-004.md | 2 +-
| |  tests/bug-reports/category/BUG-CATEGORY-005.md | 2 +-
| |  5 files changed, 5 insertions(+), 5 deletions(-)
| | 
| * commit 97b47ad75b71cb70e3b6b8e9eded8e04a76999da
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 23:09:00 2026 +0700
| | 
| |     test: record TC-CATEGORY-BVA-002 result as Pass
| | 
| |  .../category/test_tc_category_bva_002.rest       | 25 ++++++++++++++++++++
| |  tests/test-cases/category/TC-CATEGORY-BVA-002.md |  4 ++--
| |  tests/test-runs/CATEGORY-test-run.md             |  2 +-
| |  3 files changed, 28 insertions(+), 3 deletions(-)
| | 
| * commit 81aa0f076a6b250c674eddb98405547d8ca04361
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 23:07:18 2026 +0700
| | 
| |     test: record TC-CATEGORY-BVA-001 result as Pass
| | 
| |  .../category/test_tc_category_bva_001.rest       | 25 ++++++++++++++++++++
| |  tests/test-cases/category/TC-CATEGORY-BVA-001.md |  4 ++--
| |  tests/test-runs/CATEGORY-test-run.md             |  2 +-
| |  3 files changed, 28 insertions(+), 3 deletions(-)
| | 
| * commit a17808facdb7e701299524d5e400540ab3e77b17
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 23:04:35 2026 +0700
| | 
| |     test: record TC-CATEGORY-011 result, script and create BUG-CATEGORY-005 report~
| | 
| |  tests/bug-reports/category/BUG-CATEGORY-005.md   |  42 +++++++++++++++++++
| |  .../screenshots/category/TC-CATEGORY-011.png     | Bin 0 -> 330398 bytes
| |  tests/scripts/category/test_tc_category_011.rest |  20 +++++++++
| |  tests/test-cases/category/TC-CATEGORY-011.md     |   4 +-
| |  tests/test-runs/CATEGORY-test-run.md             |   2 +-
| |  5 files changed, 65 insertions(+), 3 deletions(-)
| | 
| * commit fb0414d40768d438e635340183882aed7dff4ddd
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 23:01:17 2026 +0700
| | 
| |     test: record TC-CATEGORY-010 result and script as Pass
| | 
| |  tests/scripts/category/test_tc_category_010.rest | 5 +++++
| |  tests/test-cases/category/TC-CATEGORY-010.md     | 4 ++--
| |  tests/test-runs/CATEGORY-test-run.md             | 2 +-
| |  3 files changed, 8 insertions(+), 3 deletions(-)
| | 
| * commit a4a9e0e5465ae299d4794f434cc429cbbce63a7f
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 22:59:38 2026 +0700
| | 
| |     test: record TC-CATEGORY-009 result, script and create BUG-CATEGORY-004 report
| | 
| |  tests/bug-reports/category/BUG-CATEGORY-004.md   |  43 +++++++++++++++++++
| |  .../screenshots/category/TC-CATEGORY-009.png     | Bin 0 -> 281032 bytes
| |  tests/scripts/category/test_tc_category_009.rest |  20 +++++++++
| |  tests/test-cases/category/TC-CATEGORY-009.md     |   4 +-
| |  tests/test-runs/CATEGORY-test-run.md             |   2 +-
| |  5 files changed, 66 insertions(+), 3 deletions(-)
| | 
| * commit 6e73b869e8b15c3c09a99fbf871c991e049ceb8d
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 22:55:52 2026 +0700
| | 
| |     test: record TC-CATEGORY-008 result, script and create BUG-CATEGORY-003 report
| | 
| |  tests/bug-reports/category/BUG-CATEGORY-003.md   |  43 +++++++++++++++++++
| |  .../screenshots/category/TC-CATEGORY-008.png     | Bin 0 -> 288912 bytes
| |  tests/scripts/category/test_tc_category_008.rest |  25 +++++++++++
| |  tests/test-cases/category/TC-CATEGORY-008.md     |   4 +-
| |  tests/test-runs/CATEGORY-test-run.md             |   2 +-
| |  5 files changed, 71 insertions(+), 3 deletions(-)
| | 
| * commit 4c22debb6aaffd9bf3ce4eb5841d591803152a61
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 22:50:52 2026 +0700
| | 
| |     test: record TC-CATEGORY-007 result and script as Pass
| | 
| |  tests/scripts/category/test_tc_category_007.rest | 10 ++++++++++
| |  tests/test-cases/category/TC-CATEGORY-007.md     |  4 ++--
| |  tests/test-runs/CATEGORY-test-run.md             |  2 +-
| |  3 files changed, 13 insertions(+), 3 deletions(-)
| | 
| * commit 2013d271909bcdd96767dbba98357f27075a47f0
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 22:50:44 2026 +0700
| | 
| |     test: record TC-CATEGORY-006 result, script and create BUG-CATEGORY-002 report
| | 
| |  tests/bug-reports/category/BUG-CATEGORY-002.md   |  42 +++++++++++++++++++
| |  .../screenshots/category/TC-CATEGORY-006.png     | Bin 0 -> 235502 bytes
| |  tests/scripts/category/test_tc_category_006.rest |  20 +++++++++
| |  tests/test-cases/category/TC-CATEGORY-006.md     |   4 +-
| |  tests/test-runs/CATEGORY-test-run.md             |   2 +-
| |  5 files changed, 65 insertions(+), 3 deletions(-)
| | 
| * commit c7b32e0596eff36408e66789fe23d5e8e3041770
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 22:41:39 2026 +0700
| | 
| |     test: record TC-CATEGORY-005 result as Pass
| | 
| |  tests/scripts/category/test_tc_category_005.rest | 37 ++++++++++++++++++++
| |  tests/test-cases/category/TC-CATEGORY-005.md     |  4 +--
| |  tests/test-runs/CATEGORY-test-run.md             |  2 +-
| |  3 files changed, 40 insertions(+), 3 deletions(-)
| | 
| * commit a792ec46a7a261b31c05d0ffc12fa9982af32196
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 22:37:07 2026 +0700
| | 
| |     test: record TC-CATEGORY-004 result as Pass
| | 
| |  tests/scripts/category/test_tc_category_004.rest | 20 ++++++++++++++++++++
| |  tests/test-cases/category/TC-CATEGORY-004.md     |  4 ++--
| |  tests/test-runs/CATEGORY-test-run.md             |  2 +-
| |  3 files changed, 23 insertions(+), 3 deletions(-)
| | 
| * commit 3468abc9d71d1d9614b26dcf6a3ac407f92f3189
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 22:20:38 2026 +0700
| | 
| |     test: record TC-CATEGORY-003 result and update BUG-CATEGORY-001 report
| | 
| |  tests/bug-reports/category/BUG-CATEGORY-001.md     |  12 +++++++-----
| |  .../screenshots/category/TC-CATEGORY-003.png       | Bin 0 -> 162143 bytes
| |  tests/test-cases/category/TC-CATEGORY-003.md       |   4 ++--
| |  tests/test-runs/CATEGORY-test-run.md               |   2 +-
| |  4 files changed, 10 insertions(+), 8 deletions(-)
| | 
| * commit 0a7ec4f8f0ff67da37f24a8b75d9fa8445f6321e
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 22:18:38 2026 +0700
| | 
| |     test: record TC-CATEGORY-001 and TC-CATEGORY-002 results with BUG-CATEGORY-001
| | 
| |  tests/bug-reports/category/BUG-CATEGORY-001.md   |  45 +++++++++++++++++++
| |  .../screenshots/category/TC-CATEGORY-002.png     | Bin 0 -> 159890 bytes
| |  tests/test-cases/category/TC-CATEGORY-002.md     |   4 +-
| |  tests/test-runs/CATEGORY-test-run.md             |   2 +-
| |  4 files changed, 48 insertions(+), 3 deletions(-)
| | 
| * commit 75211e19b456cc4657aac7fa7c848b1bc22f6570
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 22:15:03 2026 +0700
| | 
| |     test: record TC-CATEGORY-001 result
| | 
| |  tests/test-cases/category/TC-CATEGORY-001.md |  4 ++--
| |  tests/test-runs/CATEGORY-test-run.md         | 17 +++++++++++++++++
| |  2 files changed, 19 insertions(+), 2 deletions(-)
| | 
| * commit 22929eed08ec5079d96fdf4aea90dc9c46aa8040
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 21:17:46 2026 +0700
| | 
| |     test(category): add negative test cases for category deletion
| | 
| |  report/AI_Audit_Report.md                    | 16 ++++----
| |  report/Domain_Testing_Report.md              | 51 ++++++++++++++----------
| |  tests/test-cases/category/TC-CATEGORY-009.md | 41 +++++++++++++++++++
| |  tests/test-cases/category/TC-CATEGORY-010.md | 37 +++++++++++++++++
| |  tests/test-cases/category/TC-CATEGORY-011.md | 38 ++++++++++++++++++
| |  5 files changed, 153 insertions(+), 30 deletions(-)
| | 
| * commit a8234324f91e329db616aef92cff68b3064a0e96
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 19:51:00 2026 +0700
| | 
| |     test(category): generate DT and BVA test cases for FR-14
| | 
| |  report/AI_Audit_Report.md                        |  83 ++++++++++++---
| |  report/Boundary_Value_Analysis_Report.md         |  51 +++++++++
| |  report/Domain_Testing_Report.md                  | 105 +++++++++++++++++++
| |  tests/test-cases/category/TC-CATEGORY-001.md     |  29 +++--
| |  tests/test-cases/category/TC-CATEGORY-002.md     |  40 +++++++
| |  tests/test-cases/category/TC-CATEGORY-003.md     |  40 +++++++
| |  tests/test-cases/category/TC-CATEGORY-004.md     |  39 +++++++
| |  tests/test-cases/category/TC-CATEGORY-005.md     |  42 ++++++++
| |  tests/test-cases/category/TC-CATEGORY-006.md     |  38 +++++++
| |  tests/test-cases/category/TC-CATEGORY-007.md     |  38 +++++++
| |  tests/test-cases/category/TC-CATEGORY-008.md     |  39 +++++++
| |  tests/test-cases/category/TC-CATEGORY-BVA-001.md |  40 +++++++
| |  tests/test-cases/category/TC-CATEGORY-BVA-002.md |  40 +++++++
| |  13 files changed, 600 insertions(+), 24 deletions(-)
| | 
| * commit 6440429639addfb084b6ae81c0126a8246a76f25
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 18:09:33 2026 +0700
| | 
| |     test: record TC-CHECKOUT-BVA-002 and 003 results, update bug report
| | 
| |  tests/bug-reports/checkout/BUG-CHECKOUT-004.md   |  2 +-
| |  .../checkout/test_tc_checkout_bva_002.rest       | 60 ++++++++++++++++++++
| |  .../checkout/test_tc_checkout_bva_003.rest       | 60 ++++++++++++++++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-002.md |  2 +-
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-003.md |  2 +-
| |  tests/test-runs/CHECKOUT-test-run.md             |  4 +-
| |  6 files changed, 125 insertions(+), 5 deletions(-)
| | 
| * commit ec0012fe739d9266164be9dc8fa2d20e3984d151
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 17:57:30 2026 +0700
| | 
| |     test: record TC-CHECKOUT-BVA-001 result and update bug reports
| | 
| |  tests/bug-reports/checkout/BUG-CHECKOUT-001.md   |  2 +-
| |  .../checkout/test_tc_checkout_bva_001.rest       | 47 ++++++++++++++++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-001.md |  2 +-
| |  tests/test-runs/CHECKOUT-test-run.md             |  2 +-
| |  4 files changed, 50 insertions(+), 3 deletions(-)
| | 
| * commit a75508e55520b7940cecab12f9bd7cc4edeec117
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 17:39:29 2026 +0700
| | 
| |     test: record TC-CHECKOUT-004 result and update bug reports
| | 
| |  tests/bug-reports/checkout/BUG-CHECKOUT-004.md   |  48 +++++++++++++++
| |  .../screenshots/checkout/TC-CHECKOUT-004a.png    | Bin 0 -> 330405 bytes
| |  .../screenshots/checkout/TC-CHECKOUT-004b.png    | Bin 0 -> 324273 bytes
| |  .../screenshots/checkout/TC-CHECKOUT-004c.png    | Bin 0 -> 324218 bytes
| |  tests/scripts/checkout/test_tc_checkout_004.rest |  59 +++++++++++++++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-004.md     |   2 +-
| |  tests/test-runs/CHECKOUT-test-run.md             |   2 +-
| |  7 files changed, 109 insertions(+), 2 deletions(-)
| | 
| * commit e75f07b2a8622a144163d22865b6d787388cbc5f
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 17:20:57 2026 +0700
| | 
| |     test: record TC-CHECKOUT-003 result and update bug reports
| | 
| |  tests/bug-reports/checkout/BUG-CHECKOUT-003.md   |  48 +++++++++++++++++++
| |  .../screenshots/checkout/TC-CHECKOUT-003a.png    | Bin 0 -> 354884 bytes
| |  .../screenshots/checkout/TC-CHECKOUT-003b.png    | Bin 0 -> 328955 bytes
| |  .../screenshots/checkout/TC-CHECKOUT-003c.png    | Bin 0 -> 289060 bytes
| |  .../bug-reports/screenshots/checkout/image.1.png | Bin 267174 -> 0 bytes
| |  tests/bug-reports/screenshots/checkout/image.png | Bin 311698 -> 0 bytes
| |  tests/scripts/checkout/test_tc_checkout_003.rest |  27 +++++++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-003.md     |   2 +-
| |  tests/test-runs/CHECKOUT-test-run.md             |   2 +-
| |  9 files changed, 77 insertions(+), 2 deletions(-)
| | 
| * commit 3f419f2c693029cf577ab5c8b17d737a5a98bf5d
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 17:03:52 2026 +0700
| | 
| |     test(checkout): record TC-CHECKOUT-002 result as Pass
| | 
| |  .../bug-reports/screenshots/checkout/image.1.png | Bin 0 -> 267174 bytes
| |  tests/bug-reports/screenshots/checkout/image.png | Bin 0 -> 311698 bytes
| |  tests/scripts/checkout/test_tc_checkout_002.rest |  20 +++++++++++++++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-002.md     |   2 +-
| |  tests/test-runs/CHECKOUT-test-run.md             |   2 +-
| |  5 files changed, 22 insertions(+), 2 deletions(-)
| | 
| * commit f986ad805e68eaecc165374038449685ed43ef6f
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 16:57:20 2026 +0700
| | 
| |     test(checkout): report TC-CHECKOUT-001 results and bugs
| | 
| |  tests/bug-reports/checkout/BUG-CHECKOUT-001.md   |  52 +++++++++++++++++++
| |  tests/bug-reports/checkout/BUG-CHECKOUT-002.md   |  42 +++++++++++++++
| |  .../screenshots/checkout/TC-CHECKOUT-001a.png    | Bin 0 -> 291796 bytes
| |  .../screenshots/checkout/TC-CHECKOUT-001b.png    | Bin 0 -> 299571 bytes
| |  .../screenshots/checkout/TC-CHECKOUT-001c.png    | Bin 0 -> 271335 bytes
| |  .../screenshots/checkout/TC-CHECKOUT-001d.png    | Bin 0 -> 293934 bytes
| |  .../screenshots/checkout/TC-CHECKOUT-001e.png    | Bin 0 -> 217822 bytes
| |  tests/test-cases/checkout/TC-CHECKOUT-001.md     |   3 +-
| |  tests/test-runs/CHECKOUT-test-run.md             |  11 ++++
| |  9 files changed, 106 insertions(+), 2 deletions(-)
| | 
| * commit 9a96217cb0e97da2d2769ae2734c9bb577d3ed7a
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 16:17:51 2026 +0700
| | 
| |     test(checkout): remove hallucinated shipping_address variable from test cases and reports
| | 
| |  report/AI_Audit_Report.md                        | 14 ++--
| |  report/Boundary_Value_Analysis_Report.md         | 78 +++++++++-----------
| |  report/Domain_Testing_Report.md                  | 77 ++++++++-----------
| |  tests/test-cases/checkout/TC-CHECKOUT-001.md     | 12 +--
| |  tests/test-cases/checkout/TC-CHECKOUT-002.md     |  8 +-
| |  tests/test-cases/checkout/TC-CHECKOUT-003.md     | 10 +--
| |  tests/test-cases/checkout/TC-CHECKOUT-004.md     | 10 +--
| |  tests/test-cases/checkout/TC-CHECKOUT-005.md     | 44 -----------
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-001.md | 10 +--
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-002.md | 10 +--
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-003.md | 10 +--
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-004.md | 44 -----------
| |  12 files changed, 106 insertions(+), 221 deletions(-)
| | 
| * commit cfd8cd247bda5c69b1db8620aba5b48f9621b621
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 16:02:40 2026 +0700
| | 
| |     refactor(test): structure screenshots folder by feature and update bug reports
| | 
| |  .../product-list-and-search/BUG-PLAS-001.md         |  16 ++++++++--------
| |  .../product-list-and-search/BUG-PLAS-002.md         |  10 +++++-----
| |  .../product-list-and-search/BUG-PLAS-003.md         |  10 +++++-----
| |  .../product-list-and-search/BUG-PLAS-004.md         |   6 +++---
| |  .../product-list-and-search/BUG-PLAS-005.md         |   4 ++--
| |  .../product-list-and-search/BUG-PLAS-006.md         |   2 +-
| |  .../product-list-and-search/BUG-PLAS-007.md         |   2 +-
| |  .../{ => product-list-and-search}/TC-PLAS-001.png   | Bin
| |  .../{ => product-list-and-search}/TC-PLAS-002.png   | Bin
| |  .../{ => product-list-and-search}/TC-PLAS-003.png   | Bin
| |  .../{ => product-list-and-search}/TC-PLAS-004.png   | Bin
| |  .../{ => product-list-and-search}/TC-PLAS-005a.png  | Bin
| |  .../{ => product-list-and-search}/TC-PLAS-005b.png  | Bin
| |  .../{ => product-list-and-search}/TC-PLAS-006a.png  | Bin
| |  .../{ => product-list-and-search}/TC-PLAS-006b.png  | Bin
| |  .../{ => product-list-and-search}/TC-PLAS-007.png   | Bin
| |  .../TC-PLAS-BVA-001.png                             | Bin
| |  .../TC-PLAS-BVA-002.png                             | Bin
| |  .../TC-PLAS-BVA-003.png                             | Bin
| |  .../TC-PLAS-BVA-004a.png                            | Bin
| |  .../TC-PLAS-BVA-004b.png                            | Bin
| |  .../TC-PLAS-BVA-005a.png                            | Bin
| |  .../TC-PLAS-BVA-005b.png                            | Bin
| |  23 files changed, 25 insertions(+), 25 deletions(-)
| | 
| * commit 857e3f39108b5c22c08d08525391a9f451f3ce10
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 15:54:39 2026 +0700
| | 
| |     test(checkout): design test cases and reports using domain testing and BVA with real db products
| |     
| |     - Created 5 Domain Testing test cases (TC-CHECKOUT-001 to 005) and 4 BVA test cases (TC-CHECKOUT-BVA-001 to 004) under tests/test-cases/checkout/
| |     
| |     - Populated test cases and report tables with real database products (AirPods Pro 2 and Keychron Q1) and actual prices
| |     
| |     - Updated Domain_Testing_Report.md, Boundary_Value_Analysis_Report.md and added Entry 3 to AI_Audit_Report.md
| | 
| |  report/AI_Audit_Report.md                        |  97 +++++++++---
| |  report/Boundary_Value_Analysis_Report.md         | 113 +++++++++++--
| |  report/Domain_Testing_Report.md                  | 158 +++++++++++++++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-001.md     |  38 +++--
| |  tests/test-cases/checkout/TC-CHECKOUT-002.md     |  42 +++++
| |  tests/test-cases/checkout/TC-CHECKOUT-003.md     |  43 +++++
| |  tests/test-cases/checkout/TC-CHECKOUT-004.md     |  45 ++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-005.md     |  44 ++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-001.md |  46 ++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-002.md |  44 ++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-003.md |  44 ++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-BVA-004.md |  44 ++++++
| |  12 files changed, 711 insertions(+), 47 deletions(-)
| | 
| * commit c3475cae2d922d9ef3eb823e55ab62d0be14ab34
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 15:13:51 2026 +0700
| | 
| |     docs: rename test run file to PLAS-test-run and update AI Audit Report
| | 
| |  report/AI_Audit_Report.md                        | 79 +++++++++++++-------
| |  .../{sprint-1-test-run.md => PLAS-test-run.md}   |  0
| |  2 files changed, 53 insertions(+), 26 deletions(-)
| | 
| * commit 269aad2ae2c36da3d953bda9f28af1c45a960443
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 15:01:52 2026 +0700
| | 
| |     test: record TC-PLAS-BVA-005 results and update existing bug reports with evidence
| | 
| |  .../product-list-and-search/BUG-PLAS-001.md        |   6 ++++--
| |  .../product-list-and-search/BUG-PLAS-002.md        |   4 +++-
| |  .../product-list-and-search/BUG-PLAS-003.md        |   4 +++-
| |  tests/bug-reports/screenshots/TC-PLAS-BVA-005a.png | Bin 0 -> 273665 bytes
| |  tests/bug-reports/screenshots/TC-PLAS-BVA-005b.png | Bin 0 -> 217721 bytes
| |  .../product-list-and-search/TC-PLAS-BVA-005.md     |   2 +-
| |  tests/test-runs/sprint-1-test-run.md               |   2 +-
| |  7 files changed, 12 insertions(+), 6 deletions(-)
| | 
| * commit 4fb360b3b4b28e2be679a6315ce929cd9381101c
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 14:56:42 2026 +0700
| | 
| |     test: record TC-PLAS-BVA-004 results and update BUG-PLAS-004 report
| | 
| |  .../product-list-and-search/BUG-PLAS-004.md      |  23 ++++++++++++-------
| |  .../bug-reports/screenshots/TC-PLAS-BVA-004a.png | Bin 0 -> 256022 bytes
| |  .../bug-reports/screenshots/TC-PLAS-BVA-004b.png | Bin 0 -> 171780 bytes
| |  .../product-list-and-search/TC-PLAS-BVA-004.md   |   2 +-
| |  tests/test-runs/sprint-1-test-run.md             |   2 +-
| |  5 files changed, 17 insertions(+), 10 deletions(-)
| | 
| * commit 7950192111b2702c6775675057d46844a42f1fb3
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 14:45:32 2026 +0700
| | 
| |     test: record TC-PLAS-BVA-003 results and update BUG-PLAS-007 report
| | 
| |  .../product-list-and-search/BUG-PLAS-007.md        |  14 ++++++++------
| |  tests/bug-reports/screenshots/TC-PLAS-BVA-003.png  | Bin 0 -> 195224 bytes
| |  .../product-list-and-search/TC-PLAS-BVA-003.md     |   2 +-
| |  tests/test-runs/sprint-1-test-run.md               |   2 +-
| |  4 files changed, 10 insertions(+), 8 deletions(-)
| | 
| * commit 09c917f6847fde162e5df8602088e2b040ae66a8
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 14:40:47 2026 +0700
| | 
| |     test: record TC-PLAS-BVA-002 results and create BUG-PLAS-007 report
| | 
| |  .../product-list-and-search/BUG-PLAS-007.md      |  46 +++++++++++++++++++
| |  .../bug-reports/screenshots/TC-PLAS-BVA-002.png  | Bin 0 -> 149100 bytes
| |  .../product-list-and-search/TC-PLAS-BVA-002.md   |   2 +-
| |  tests/test-runs/sprint-1-test-run.md             |   2 +-
| |  4 files changed, 48 insertions(+), 2 deletions(-)
| | 
| * commit 4be6b4cc5758fc8d98d9dc78b31f9366eaceaf9e
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 14:32:40 2026 +0700
| | 
| |     test: record TC-PLAS-BVA-001 results and update existing bug reports with evidence
| | 
| |  .../product-list-and-search/BUG-PLAS-001.md        |   6 ++++--
| |  .../product-list-and-search/BUG-PLAS-002.md        |   4 +++-
| |  .../product-list-and-search/BUG-PLAS-003.md        |   4 +++-
| |  tests/bug-reports/screenshots/TC-PLAS-BVA-001.png  | Bin 0 -> 297195 bytes
| |  .../product-list-and-search/TC-PLAS-BVA-001.md     |   2 +-
| |  tests/test-runs/sprint-1-test-run.md               |   2 +-
| |  6 files changed, 12 insertions(+), 6 deletions(-)
| | 
| * commit 56d27865400761d14d0c14f2701bc4581c6e1726
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 14:26:09 2026 +0700
| | 
| |     test: record TC-PLAS-007 result and link to BUG-PLAS-001
| | 
| |  .../product-list-and-search/BUG-PLAS-001.md        |   6 ++++--
| |  tests/bug-reports/screenshots/TC-PLAS-007.png      | Bin 0 -> 240024 bytes
| |  .../product-list-and-search/TC-PLAS-007.md         |   2 +-
| |  tests/test-runs/sprint-1-test-run.md               |   2 +-
| |  4 files changed, 6 insertions(+), 4 deletions(-)
| | 
| * commit 6bf5f9a52e51b0a5ff728deeb7ebdca3cf2a3009
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 14:21:33 2026 +0700
| | 
| |     test: record TC-PLAS-006 results and create BUG-PLAS-006 report
| | 
| |  .../product-list-and-search/BUG-PLAS-001.md      |   6 ++-
| |  .../product-list-and-search/BUG-PLAS-006.md      |  44 +++++++++++++++++++
| |  tests/bug-reports/screenshots/TC-PLAS-006a.png   | Bin 0 -> 264250 bytes
| |  tests/bug-reports/screenshots/TC-PLAS-006b.png   | Bin 0 -> 222356 bytes
| |  .../product-list-and-search/TC-PLAS-006.md       |   2 +-
| |  tests/test-runs/sprint-1-test-run.md             |   2 +-
| |  6 files changed, 50 insertions(+), 4 deletions(-)
| | 
| * commit f24e197c354cf41a02394a15335b2e9d1b0c3575
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 14:12:26 2026 +0700
| | 
| |     docs: add bug splitting rules to test-run-reporter skill
| | 
| |  .agents/skills/test-run-reporter/SKILL.md | 19 ++++++++++++-------
| |  1 file changed, 12 insertions(+), 7 deletions(-)
| | 
| * commit 2a8c707f95f297e0f817db6fb268aa6745983956
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 14:11:59 2026 +0700
| | 
| |     test: record TC-PLAS-005 results, update BUG-PLAS-001, and create BUG-PLAS-005 for SQLITE error
| | 
| |  .../product-list-and-search/BUG-PLAS-001.md      |   8 +--
| |  .../product-list-and-search/BUG-PLAS-005.md      |  53 +++++++++++++++++++
| |  tests/bug-reports/screenshots/TC-PLAS-005a.png   | Bin 0 -> 220197 bytes
| |  tests/bug-reports/screenshots/TC-PLAS-005b.png   | Bin 0 -> 182600 bytes
| |  .../product-list-and-search/TC-PLAS-005.md       |   2 +-
| |  tests/test-runs/sprint-1-test-run.md             |   2 +-
| |  6 files changed, 60 insertions(+), 5 deletions(-)
| | 
| * commit 5df367401592236d28c7dc0ca8bd82c09e839cff
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 13:57:15 2026 +0700
| | 
| |     test: record TC-PLAS-004 result and update existing bug reports with evidence
| | 
| |  .../product-list-and-search/BUG-PLAS-001.md        |   6 ++++--
| |  .../product-list-and-search/BUG-PLAS-002.md        |   4 +++-
| |  .../product-list-and-search/BUG-PLAS-003.md        |   4 +++-
| |  tests/bug-reports/screenshots/TC-PLAS-004.png      | Bin 0 -> 209317 bytes
| |  .../product-list-and-search/TC-PLAS-004.md         |   6 +++---
| |  tests/test-runs/sprint-1-test-run.md               |   2 +-
| |  6 files changed, 14 insertions(+), 8 deletions(-)
| | 
| * commit 8d80410f64e8f8f89ba90907e6cd1c177b072882
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 13:54:54 2026 +0700
| | 
| |     feat: add test-run-reporter skill for manual test execution reporting
| | 
| |  .agents/skills/test-run-reporter/SKILL.md        | 357 +++++++++++++++++++
| |  .../test-run-reporter/references/conventions.md  | 143 ++++++++
| |  2 files changed, 500 insertions(+)
| | 
| * commit f0254a35aa8903c53b1e975b0ec643808be09842
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 13:46:26 2026 +0700
| | 
| |     test: execute TC-PLAS-003, report BUG-PLAS-004, and add screenshot evidence
| | 
| |  .../product-list-and-search/BUG-PLAS-004.md      |  46 +++++++++++++++++++
| |  tests/bug-reports/screenshots/TC-PLAS-003.png    | Bin 0 -> 165661 bytes
| |  .../product-list-and-search/TC-PLAS-003.md       |   2 +-
| |  tests/test-runs/sprint-1-test-run.md             |   2 +-
| |  4 files changed, 48 insertions(+), 2 deletions(-)
| | 
| * commit fc6b90c9d4e401990adbd6c8bf51969bca916729
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 13:04:31 2026 +0700
| | 
| |     test: execute TC-PLAS-002, report Fail, and add screenshot evidence
| | 
| |  .../product-list-and-search/BUG-PLAS-001.md        |   7 +++++--
| |  .../product-list-and-search/BUG-PLAS-002.md        |   7 +++++--
| |  .../product-list-and-search/BUG-PLAS-003.md        |   7 +++++--
| |  tests/bug-reports/screenshots/TC-PLAS-002.png      | Bin 0 -> 216816 bytes
| |  .../product-list-and-search/TC-PLAS-002.md         |   2 +-
| |  tests/test-runs/sprint-1-test-run.md               |   2 +-
| |  6 files changed, 17 insertions(+), 8 deletions(-)
| | 
| * commit cd36f5f4e2a564eeadb16eca85e6d8efbcb7a70a
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 12:57:38 2026 +0700
| | 
| |     refactor: update test data to MacBook Pro M3 and sync reports
| | 
| |  report/Boundary_Value_Analysis_Report.md         | 24 ++++++++++----------
| |  report/Domain_Testing_Report.md                  |  8 +++----
| |  .../product-list-and-search/TC-PLAS-001.md       |  2 +-
| |  .../product-list-and-search/TC-PLAS-002.md       | 18 +++++++--------
| |  .../product-list-and-search/TC-PLAS-003.md       |  2 +-
| |  .../product-list-and-search/TC-PLAS-005.md       |  2 +-
| |  .../product-list-and-search/TC-PLAS-BVA-001.md   |  8 +++----
| |  .../product-list-and-search/TC-PLAS-BVA-002.md   |  2 +-
| |  .../product-list-and-search/TC-PLAS-BVA-003.md   |  2 +-
| |  .../product-list-and-search/TC-PLAS-BVA-005.md   |  6 ++---
| |  10 files changed, 37 insertions(+), 37 deletions(-)
| | 
| * commit a0d01fd1bcf0f959f39f92c8bc8b4f096f87a8eb
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 12:50:46 2026 +0700
| | 
| |     test: execute TC-PLAS-001 and report 3 bugs on product-list-and-search
| | 
| |  tests/bug-reports/BUG-[MODULE]-[BUGID].md        |  11 +++-
| |  .../product-list-and-search/BUG-PLAS-001.md      |  44 ++++++++++++++++
| |  .../product-list-and-search/BUG-PLAS-002.md      |  52 +++++++++++++++++++
| |  .../product-list-and-search/BUG-PLAS-003.md      |  42 +++++++++++++++
| |  tests/bug-reports/screenshots/TC-PLAS-001.png    | Bin 0 -> 322713 bytes
| |  .../product-list-and-search/TC-PLAS-001.md       |   2 +-
| |  tests/test-runs/sprint-1-test-run.md             |  17 ++++--
| |  7 files changed, 162 insertions(+), 6 deletions(-)
| | 
| * commit f81fda14b76ad3b95d45b34610a7e19ed4bdbb31
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sun Jun 28 12:09:44 2026 +0700
| | 
| |     docs: update AI audit report review and add test run & bug report templates
| | 
| |  report/AI_Audit_Report.md                 | 14 ++++----
| |  tests/bug-reports/BUG-[MODULE]-[BUGID].md | 46 +++++++++++++++++++++++++++
| |  tests/test-runs/sprint-1-test-run.md      |  3 ++
| |  3 files changed, 56 insertions(+), 7 deletions(-)
| | 
| * commit 7a9ca78d1900c9d07f6623d6df6f404dc63ba2ce
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sat Jun 27 01:12:16 2026 +0700
| | 
| |     test(fr-05): generate domain testing and boundary value analysis test cases and reports
| | 
| |  report/AI_Audit_Report.md                        | 138 +++++++++-------
| |  report/Boundary_Value_Analysis_Report.md         |  77 +++++++++
| |  report/Domain_Testing_Report.md                  | 162 +++++++++++++++++++
| |  .../product-list-and-search/TC-PLAS-001.md       |  32 ++--
| |  .../product-list-and-search/TC-PLAS-002.md       |  42 +++++
| |  .../product-list-and-search/TC-PLAS-003.md       |  42 +++++
| |  .../product-list-and-search/TC-PLAS-004.md       |  42 +++++
| |  .../product-list-and-search/TC-PLAS-005.md       |  43 +++++
| |  .../product-list-and-search/TC-PLAS-006.md       |  41 +++++
| |  .../product-list-and-search/TC-PLAS-007.md       |  39 +++++
| |  .../product-list-and-search/TC-PLAS-BVA-001.md   |  41 +++++
| |  .../product-list-and-search/TC-PLAS-BVA-002.md   |  42 +++++
| |  .../product-list-and-search/TC-PLAS-BVA-003.md   |  40 +++++
| |  .../product-list-and-search/TC-PLAS-BVA-004.md   |  40 +++++
| |  .../product-list-and-search/TC-PLAS-BVA-005.md   |  40 +++++
| |  15 files changed, 789 insertions(+), 72 deletions(-)
| | 
| * commit 5e71779ec9e5790e9005c719963bc50e93f397a2
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Sat Jun 27 01:11:18 2026 +0700
| | 
| |     docs(skills): update and format agent skills for user prompt recording
| | 
| |  .agents/skills/ai-audit-report/SKILL.md |  29 ++++++--
| |  .agents/skills/ai-gap-analysis/SKILL.md |  14 ++--
| |  .agents/skills/test-runner/SKILL.md     |   8 +--
| |  .agents/skills/test-writer/SKILL.md     | 106 ++++++++++++++--------------
| |  4 files changed, 88 insertions(+), 69 deletions(-)
| | 
| * commit 4ac9249dea953dd9f9e125bcb6269c3143c93194
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jun 26 21:32:33 2026 +0700
| | 
| |     feat(skills): update test-writer with lint phase and detailed BVA, format md files
| | 
| |  .agents/skills/test-writer/SKILL.md | 423 ++++++++++++++++++++++----------
| |  1 file changed, 299 insertions(+), 124 deletions(-)
| | 
| * commit c4c36d82eeac271dc7c7dc9ae19c3f9d1bc84605
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jun 26 20:12:49 2026 +0700
| | 
| |     chore: add initial test cases and report templates
| | 
| |  report/AI_Critique.md                            |  0
| |  report/Boundary_Value_Analysis_Report.md         |  0
| |  report/Bug_Report.md                             |  0
| |  report/Domain_Testing_Report.md                  |  0
| |  report/README.md                                 |  0
| |  report/git_commit_logs.txt                       |  0
| |  tests/test-cases/category/TC-CATEGORY-001.md     | 33 ++++++++++++++++++++
| |  tests/test-cases/checkout/TC-CHECKOUT-001.md     | 33 ++++++++++++++++++++
| |  .../TC-MPLAS-001.md                              | 33 ++++++++++++++++++++
| |  .../product-list-and-search/TC-PLAS-001.md       | 33 ++++++++++++++++++++
| |  10 files changed, 132 insertions(+)
| | 
| * commit f02fd8e3086df8c0c79efdf5499618793f4d788c
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jun 26 20:12:40 2026 +0700
| | 
| |     docs(report): add initial AI Audit Report template
| | 
| |  report/AI_Audit_Report.md | 142 ++++++++++++++++++++++++++++++++++++++++++
| |  1 file changed, 142 insertions(+)
| | 
| * commit 725229478dfecde02a739cb4449bc8f77158e402
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jun 26 20:12:33 2026 +0700
| | 
| |     feat(skills): add AI Gap Analysis skill
| | 
| |  .agents/skills/ai-gap-analysis/SKILL.md | 378 ++++++++++++++++++++++++++++
| |  1 file changed, 378 insertions(+)
| | 
| * commit ff38b7aa375a1bffe556bdec283e1780eec0df5e
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jun 26 20:12:17 2026 +0700
| | 
| |     feat(skills): add AI Audit Report skill and workspace auto-logging rules
| | 
| |  .agents/skills/ai-audit-report/SKILL.md | 377 ++++++++++++++++++++++++++++
| |  .gemini/rules.md                        |  73 ++++++
| |  2 files changed, 450 insertions(+)
| | 
| * commit 2f4fa67287c2f94744e8c12dae97459e815c7710
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jun 26 20:12:08 2026 +0700
| | 
| |     feat(skills): update test-runner skill with test execution guidelines
| | 
| |  .agents/skills/test-runner/SKILL.md | 378 ++++++++++++++++++++++++++++++++
| |  1 file changed, 378 insertions(+)
| | 
| * commit 473cac7a25db26783b36f0774a04e5cd0fe16f3c
| | Author: mqt4n <machquoctan2005@gmail.com>
| | Date:   Fri Jun 26 20:12:01 2026 +0700
| | 
| |     feat(skills): update test-writer skill for domain testing and BVA
| | 
| |  .agents/skills/test-writer/SKILL.md | 481 ++++++++++++++++++++++++++++++++
| |  1 file changed, 481 insertions(+)
| | 
| * commit 30884e695b7eec2c9d529197316844727117014d
|/  Author: mqt4n <machquoctan2005@gmail.com>
|   Date:   Fri Jun 26 20:11:52 2026 +0700
|   
|       config(agent): update QA agent profile and instructions
|   
|    .github/agents/qa.agent.md | 47 ++++++++++++++++++++++++++++++++++++++++++
|    1 file changed, 47 insertions(+)
|   
| * commit 2a4aeeba10cf9426a82d2046a110cd2700aebf96
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sun Jun 28 21:06:52 2026 +0700
| | 
| |     fix: correct gh issue environment section
| |     
| |     Date:      Sun Jun 28 21:06:52 2026 +0700
| | 
| |  tests/github-issues/BUG-01.md             |   3 +-
| |  tests/github-issues/BUG-02.md             |   3 +-
| |  tests/github-issues/BUG-03.md             |   3 +-
| |  tests/github-issues/BUG-04.md             |   3 +-
| |  tests/github-issues/BUG-05.md             |   3 +-
| |  tests/github-issues/BUG-06.md             |   3 +-
| |  tests/github-issues/BUG-07.md             |   3 +-
| |  tests/github-issues/BUG-08.md             |   3 +-
| |  tests/github-issues/BUG-09.md             |   3 +-
| |  tests/github-issues/BUG-10.md             |   3 +-
| |  tests/github-issues/BUG-11.md             |   3 +-
| |  tests/github-issues/BUG-12.md             |   3 +-
| |  tests/github-issues/BUG-13.md             |   3 +-
| |  tests/github-issues/BUG-14.md             |   3 +-
| |  tests/github-issues/BUG-15.md             |   3 +-
| |  tests/github-issues/BUG-16.md             |   3 +-
| |  tests/github-issues/BUG-17.md             |   3 +-
| |  tests/github-issues/BUG-18.md             |   3 +-
| |  tests/github-issues/BUG-19.md             |   3 +-
| |  tests/github-issues/BUG-20.md             |   3 +-
| |  tests/github-issues/BUG-21.md             |   3 +-
| |  tests/github-issues/BUG-22.md             |   3 +-
| |  tests/github-issues/BUG-23.md             |   3 +-
| |  tests/github-issues/BUG-24.md             |   3 +-
| |  tests/github-issues/BUG-25.md             |   3 +-
| |  tests/github-issues/BUG-26.md             |   3 +-
| |  tests/test-summary/traceability-matrix.md | 170 +++++++++++++-------------
| |  27 files changed, 111 insertions(+), 137 deletions(-)
| | 
| * commit c1c63c3bea11c28b96bf3d5ecdf85f2967190d35
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sun Jun 28 21:05:46 2026 +0700
| | 
| |     fix: correct FR-09 tests
| | 
| |  tests/github-issues/BUG-08.md             |   8 +-
| |  tests/github-issues/BUG-22.md             |   6 +-
| |  tests/test-runs/sprint-1-test-run.md      | 172 +++++++++++++-------------
| |  tests/test-summary/traceability-matrix.md | 170 ++++++++++++-------------
| |  4 files changed, 178 insertions(+), 178 deletions(-)
| | 
| * commit c980e01d2ec26201c8f2e4832e9a9547da056106
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sun Jun 28 17:56:31 2026 +0700
| | 
| |     fix: correct FR-06 tests
| | 
| |  tests/github-issues/BUG-01.md                          |  8 ++++----
| |  tests/github-issues/BUG-03.md                          | 10 +++++-----
| |  .../test-cases/product-detail/TC-PRODUCT-DETAIL-001.md |  2 +-
| |  .../test-cases/product-detail/TC-PRODUCT-DETAIL-008.md |  2 +-
| |  tests/test-runs/sprint-1-test-run.md                   | 14 +++++++-------
| |  tests/test-summary/traceability-matrix.md              | 12 ++++++------
| |  6 files changed, 24 insertions(+), 24 deletions(-)
| | 
| * commit cf0c68a0b7a2b5b8b75b9f9728bf9ad47e9bf557
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 22:40:01 2026 +0700
| | 
| |     test: create gh-issue drafts
| | 
| |  .serena/memories/eshop-sut/issue-reporting.md |   4 +
| |  .serena/memories/memory_maintenance.md        |  33 +++++
| |  tests/github-issues/BUG-01.md                 |  48 ++++++
| |  tests/github-issues/BUG-02.md                 |  49 +++++++
| |  tests/github-issues/BUG-03.md                 |  49 +++++++
| |  tests/github-issues/BUG-04.md                 |  49 +++++++
| |  tests/github-issues/BUG-05.md                 |  48 ++++++
| |  tests/github-issues/BUG-06.md                 |  48 ++++++
| |  tests/github-issues/BUG-07.md                 |  48 ++++++
| |  tests/github-issues/BUG-08.md                 |  48 ++++++
| |  tests/github-issues/BUG-09.md                 |  48 ++++++
| |  tests/github-issues/BUG-10.md                 |  48 ++++++
| |  tests/github-issues/BUG-11.md                 |  48 ++++++
| |  tests/github-issues/BUG-12.md                 |  48 ++++++
| |  tests/github-issues/BUG-13.md                 |  48 ++++++
| |  tests/github-issues/BUG-14.md                 |  48 ++++++
| |  tests/github-issues/BUG-15.md                 |  48 ++++++
| |  tests/github-issues/BUG-16.md                 |  48 ++++++
| |  tests/github-issues/BUG-17.md                 |  48 ++++++
| |  tests/github-issues/BUG-18.md                 |  48 ++++++
| |  tests/github-issues/BUG-19.md                 |  48 ++++++
| |  tests/github-issues/BUG-20.md                 |  49 +++++++
| |  tests/github-issues/BUG-21.md                 |  48 ++++++
| |  tests/github-issues/BUG-22.md                 |  48 ++++++
| |  tests/github-issues/BUG-23.md                 |  49 +++++++
| |  tests/github-issues/BUG-24.md                 |  48 ++++++
| |  tests/github-issues/BUG-25.md                 |  48 ++++++
| |  tests/github-issues/BUG-26.md                 |  48 ++++++
| |  tests/test-summary/traceability-matrix.md     | 170 +++++++++++-----------
| |  29 files changed, 1375 insertions(+), 85 deletions(-)
| | 
| * commit d92b189a6f067d59b6fb302ee23152782e4123b1
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 22:10:20 2026 +0700
| | 
| |     chore: move spec script to test-scripts
| | 
| |  tests/{ => test-scripts}/cart-mobile.spec.js    | 2 +-
| |  tests/{ => test-scripts}/coupon-admin.spec.js   | 2 +-
| |  tests/{ => test-scripts}/coupon.spec.js         | 2 +-
| |  tests/{ => test-scripts}/product-detail.spec.js | 0
| |  4 files changed, 3 insertions(+), 3 deletions(-)
| | 
| * commit 5f5cf76608dbdc651329f28f2e03ac2ce76a1823
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 22:00:11 2026 +0700
| | 
| |     test: run cart mobile test (FR-20)
| | 
| |  tests/cart-mobile.spec.js                        | 523 +++++++++++++++++++
| |  .../error-context.md"                            | 141 +++++
| |  .../test-failed-1.png"                           | Bin 0 -> 23635 bytes
| |  .../video.webm"                                  | Bin 0 -> 48565 bytes
| |  .../error-context.md"                            | 164 ++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 30076 bytes
| |  .../video.webm"                                  | Bin 0 -> 95242 bytes
| |  .../error-context.md"                            | 186 +++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 33199 bytes
| |  .../video.webm"                                  | Bin 0 -> 103007 bytes
| |  tests/test-runs/sprint-1-test-run.md             | 148 +++---
| |  tests/test-summary/traceability-matrix.md        | 170 +++---
| |  12 files changed, 1185 insertions(+), 147 deletions(-)
| | 
| * commit 2dc0986ed0050b2777ccebfd5003d2d5a52ed620
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 21:46:55 2026 +0700
| | 
| |     test: run coupon-admin test cases (FR-17)
| | 
| |  tests/coupon-admin.spec.js                       | 764 +++++++++++++++++++
| |  .../error-context.md"                            | 226 ++++++
| |  .../error-context.md"                            | 226 ++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 4254 bytes
| |  .../video.webm"                                  | Bin 0 -> 1924 bytes
| |  .../error-context.md"                            | 226 ++++++
| |  .../error-context.md"                            | 226 ++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 4254 bytes
| |  .../video.webm"                                  | Bin 0 -> 1924 bytes
| |  .../error-context.md"                            | 226 ++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 4254 bytes
| |  .../video.webm"                                  | Bin 0 -> 1924 bytes
| |  .../error-context.md"                            | 226 ++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 4254 bytes
| |  .../video.webm"                                  | Bin 0 -> 1924 bytes
| |  .../error-context.md"                            | 226 ++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 4254 bytes
| |  .../video.webm"                                  | Bin 0 -> 1924 bytes
| |  .../error-context.md"                            | 159 ++++
| |  .../error-context.md"                            | 226 ++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 4254 bytes
| |  .../video.webm"                                  | Bin 0 -> 1924 bytes
| |  .../error-context.md"                            | 226 ++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 4254 bytes
| |  .../video.webm"                                  | Bin 0 -> 1924 bytes
| |  tests/test-runs/sprint-1-test-run.md             |  28 +-
| |  tests/test-summary/traceability-matrix.md        |  52 +-
| |  27 files changed, 3010 insertions(+), 27 deletions(-)
| | 
| * commit 5e86e8dc09610af3d1fe792bc4c0628da47cf899
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 21:20:40 2026 +0700
| | 
| |     test: run coupon test cases (FR-09)
| |     
| |     Date:      Sat Jun 27 21:20:40 2026 +0700
| | 
| |  tests/coupon.spec.js                             | 329 +++++++++++++++++++
| |  tests/test-results/.last-run.json                |  16 +-
| |  .../error-context.md"                            | 189 +++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 50224 bytes
| |  .../video.webm"                                  | Bin 0 -> 79393 bytes
| |  .../error-context.md"                            | 222 +++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 50894 bytes
| |  .../video.webm"                                  | Bin 0 -> 76630 bytes
| |  .../error-context.md"                            | 258 +++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 44964 bytes
| |  .../video.webm"                                  | Bin 0 -> 67451 bytes
| |  .../error-context.md"                            | 225 +++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 47210 bytes
| |  .../video.webm"                                  | Bin 0 -> 114627 bytes
| |  .../error-context.md"                            | 245 ++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 49184 bytes
| |  .../video.webm"                                  | Bin 0 -> 76195 bytes
| |  .../error-context.md"                            | 258 +++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 47232 bytes
| |  .../video.webm"                                  | Bin 0 -> 111922 bytes
| |  .../error-context.md"                            | 254 ++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 47071 bytes
| |  .../video.webm"                                  | Bin 0 -> 71333 bytes
| |  .../error-context.md"                            | 248 ++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 46765 bytes
| |  .../video.webm"                                  | Bin 0 -> 109704 bytes
| |  .../error-context.md"                            | 264 +++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 50224 bytes
| |  .../video.webm"                                  | Bin 0 -> 112819 bytes
| |  .../error-context.md"                            | 227 +++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 50535 bytes
| |  .../video.webm"                                  | Bin 0 -> 80621 bytes
| |  .../error-context.md"                            | 222 +++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 50209 bytes
| |  .../video.webm"                                  | Bin 0 -> 74678 bytes
| |  tests/test-runs/sprint-1-test-run.md             |  54 ++-
| |  tests/test-summary/traceability-matrix.md        |  36 +-
| |  37 files changed, 3006 insertions(+), 41 deletions(-)
| | 
| * commit becbd3f9c4166755323f58184580986d10fa53b8
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 21:13:13 2026 +0700
| | 
| |     test: run product-detail test cases (FR-06)
| |     
| |     Date:      Sat Jun 27 21:13:13 2026 +0700
| | 
| |  frontend-mobile/package-lock.json                | 205 +++++++++++-
| |  frontend-mobile/package.json                     |   4 +-
| |  tests/package.json                               |  11 +
| |  tests/playwright.config.js                       |  22 ++
| |  tests/product-detail.spec.js                     | 330 +++++++++++++++++++
| |  tests/test-results/.last-run.json                |  10 +
| |  .../error-context.md"                            | 195 +++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 38688 bytes
| |  .../video.webm"                                  | Bin 0 -> 95936 bytes
| |  .../error-context.md"                            | 239 ++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 40617 bytes
| |  .../video.webm"                                  | Bin 0 -> 75870 bytes
| |  .../error-context.md"                            | 221 +++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 37359 bytes
| |  .../video.webm"                                  | Bin 0 -> 60244 bytes
| |  .../error-context.md"                            | 227 +++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 36175 bytes
| |  .../video.webm"                                  | Bin 0 -> 70364 bytes
| |  .../error-context.md"                            | 243 ++++++++++++++
| |  .../test-failed-1.png"                           | Bin 0 -> 38845 bytes
| |  .../video.webm"                                  | Bin 0 -> 68159 bytes
| |  tests/test-runs/sprint-1-test-run.md             |  30 +-
| |  tests/test-summary/traceability-matrix.md        |  30 +-
| |  23 files changed, 1747 insertions(+), 20 deletions(-)
| | 
| * commit f522bb119108851804bbfd1497f2fdee2f2122f6
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 18:40:22 2026 +0700
| | 
| |     feat: add sprint-1-test-run documentation and update database schema
| | 
| |  tests/test-runs/sprint-1-test-run.md | 3 +++
| |  1 file changed, 3 insertions(+)
| | 
| * commit 9fe8a73ba72a888600d3bc9ae10d61b29289090c
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 18:40:09 2026 +0700
| | 
| |     test: add test cases for FR-20 (cart)
| | 
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-001.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-002.md | 41 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-003.md | 41 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-004.md | 41 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-005.md | 41 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-006.md | 41 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-007.md | 41 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-008.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-009.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-010.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-011.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-012.md | 37 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-013.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-014.md | 35 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-015.md | 39 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-016.md | 37 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-017.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-018.md | 41 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-019.md | 41 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-020.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-021.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-022.md | 38 ++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-023.md | 41 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-024.md | 39 +++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-BVA.md | 57 ++++++++++++
| |  .../test-cases/cart-mobile/TC-CART-MOBILE-DT.md  | 69 +++++++++++++++
| |  .../cart-mobile/TEST-PLAN-CART-MOBILE.md         | 91 ++++++++++++++++++++
| |  tests/test-summary/traceability-matrix.md        | 24 ++++++
| |  28 files changed, 1177 insertions(+)
| | 
| * commit f359171f29a9751475f46af26d3b2f98d0cce91f
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 17:04:36 2026 +0700
| | 
| |     test: add test cases for FR-17
| | 
| |  .../coupon-admin/TC-COUPON-ADMIN-001.md          | 55 +++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-002.md          | 55 +++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-003.md          | 49 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-004.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-005.md          | 46 +++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-006.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-007.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-008.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-009.md          | 46 +++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-010.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-011.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-012.md          | 49 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-013.md          | 38 ++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-014.md          | 33 +++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-015.md          | 36 +++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-016.md          | 46 +++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-017.md          | 47 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-018.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-019.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-020.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-021.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-022.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-023.md          | 50 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-024.md          | 52 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-025.md          | 45 +++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-026.md          | 47 ++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-BVA.md          | 81 ++++++++++++++++
| |  .../coupon-admin/TC-COUPON-ADMIN-DT.md           | 99 ++++++++++++++++++++
| |  .../coupon-admin/TEST-PLAN-COUPON-ADMIN.md       |  3 +-
| |  29 files changed, 1426 insertions(+), 1 deletion(-)
| | 
| * commit 718ebefd05158eb2b6f7222fd1161f87a697e923
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 16:58:47 2026 +0700
| | 
| |     test: add test cases for FR-09
| | 
| |  tests/test-cases/coupon/TC-COUPON-001.md    | 42 +++++++++++
| |  tests/test-cases/coupon/TC-COUPON-002.md    | 42 +++++++++++
| |  tests/test-cases/coupon/TC-COUPON-003.md    | 40 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-004.md    | 41 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-005.md    | 41 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-006.md    | 40 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-007.md    | 40 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-008.md    | 40 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-009.md    | 41 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-010.md    | 42 +++++++++++
| |  tests/test-cases/coupon/TC-COUPON-011.md    | 41 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-012.md    | 41 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-013.md    | 41 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-014.md    | 40 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-015.md    | 41 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-016.md    | 42 +++++++++++
| |  tests/test-cases/coupon/TC-COUPON-017.md    | 40 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-018.md    | 39 ++++++++++
| |  tests/test-cases/coupon/TC-COUPON-BVA.md    | 99 +++++++++++++++++++++++++
| |  tests/test-cases/coupon/TC-COUPON-DT.md     | 72 ++++++++++++++++++
| |  tests/test-cases/coupon/TEST-PLAN-COUPON.md |  3 +
| |  tests/test-summary/traceability-matrix.md   |  6 +-
| |  22 files changed, 911 insertions(+), 3 deletions(-)
| | 
| * commit 37cdbecaf887066d89b2d47604479a0928717621
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 16:44:50 2026 +0700
| | 
| |     test: add test cases for FR-06
| | 
| |  .../product-detail/TC-PRODUCT-DETAIL-001.md      | 41 +++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-002.md      | 36 +++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-003.md      | 35 ++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-004.md      | 40 ++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-005.md      | 40 ++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-006.md      | 40 ++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-007.md      | 40 ++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-008.md      | 40 ++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-009.md      | 40 ++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-010.md      | 40 ++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-011.md      | 40 ++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-012.md      | 40 ++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-013.md      | 37 +++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-014.md      | 37 +++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-015.md      | 41 +++++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-BVA.md      | 37 +++++++++++++++
| |  .../product-detail/TC-PRODUCT-DETAIL-DT.md       | 48 ++++++++++++++++++++
| |  tests/test-summary/traceability-matrix.md        |  4 ++
| |  18 files changed, 676 insertions(+)
| | 
| * commit 1c36ab2706407a709ac699996ae0faaebd1eb280
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 16:32:19 2026 +0700
| | 
| |     chore: correct the skills
| |     
| |     Date:      Sat Jun 27 16:32:19 2026 +0700
| | 
| |  .agents/skills/bva/SKILL.md            | 59 ++++++++++++++++++++++--------
| |  .agents/skills/domain-testing/SKILL.md | 25 ++++++++-----
| |  2 files changed, 59 insertions(+), 25 deletions(-)
| | 
| * commit 34169ad80b7da46c75b5d5505fea90dfecda497e
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 16:04:49 2026 +0700
| | 
| |     test: enhance test plans
| | 
| |  .../coupon-admin/TEST-PLAN-COUPON-ADMIN.md       | 92 ++++++++++----------
| |  tests/test-cases/coupon/TEST-PLAN-COUPON.md      | 85 +++++++++---------
| |  .../product-detail/TEST-PLAN-PRODUCT-DETAIL.md   | 64 ++++++++------
| |  3 files changed, 126 insertions(+), 115 deletions(-)
| | 
| * commit 372084b3c55dafa44db6eaac06dbc97b7966c66f
| | Author: yuran1811 <trieuvanbd123@gmail.com>
| | Date:   Sat Jun 27 15:11:52 2026 +0700
| | 
| |     feat: add test plan for coupon; coupon-admin; product-detail
| | 
| |  .../coupon-admin/TEST-PLAN-COUPON-ADMIN.md       | 120 +++++++++++++++++++
| |  tests/test-cases/coupon/TEST-PLAN-COUPON.md      | 103 ++++++++++++++++
| |  .../product-detail/TEST-PLAN-PRODUCT-DETAIL.md   |  67 +++++++++++
| |  tests/test-summary/traceability-matrix.md        |  60 +++++++++-
| |  4 files changed, 347 insertions(+), 3 deletions(-)
| | 
| * commit 99c5a60ea95f59aa01ca1dd88cade2039f7ff605
|/  Author: yuran1811 <trieuvanbd123@gmail.com>
|   Date:   Fri Jun 26 21:41:53 2026 +0700
|   
|       feat: init skills and agents
|   
|    .agents/skills/bva/SKILL.md                  | 226 ++++++++++++++++++++
|    .agents/skills/domain-testing/SKILL.md       | 261 +++++++++++++++++++++++
|    .claude/skills/bva                           |   1 +
|    .claude/skills/domain-testing                |   1 +
|    .claude/skills/test-runner                   |   1 +
|    .claude/skills/test-writer                   |   1 +
|    .github/ISSUE_TEMPLATE/bug_report.md         |   6 +-
|    .github/agents/qa.agent.md                   |  38 ++++
|    .github/prompts/test-plan.prompt.md          |  66 ++++++
|    .github/prompts/test-run.prompt.md           |  60 ++++++
|    .github/prompts/test-write.prompt.md         |  44 ++++
|    .github/skills/bva                           |   1 +
|    .github/skills/domain-testing                |   1 +
|    .gitignore                                   |   3 +-
|    .oxfmtrc.json                                |  21 ++
|    .serena/.gitignore                           |   2 +
|    .serena/project.yml                          | 132 ++++++++++++
|    .vscode/mcp.json                             |  49 +++++
|    .vscode/settings.json                        |  26 +++
|    api_specification.md                         |  34 ++-
|    scripts/sync-skills.sh                       |   2 +-
|    setup_guide.md                               |  21 +-
|    tests/test-cases/login/TC-LOGIN-001.md       |  33 ---
|    tests/test-cases/register/TC-REGISTER-001.md |   0
|    24 files changed, 976 insertions(+), 54 deletions(-)
|   
| * commit cbeed528adff46b88462f1d987cb044e9f2b05f4
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sun Jun 28 20:39:07 2026 +0700
| | 
| |     Finalize the submission
| | 
| |  Appendix_A/README.md                               |   3 +--
| |  .../github_issue_detail_30_1.png                   | Bin
| |  .../github_issue_detail_30_2.png                   | Bin 0 -> 277227 bytes
| |  .../github_issue_detail_4_1.png                    | Bin
| |  .../github_issue_detail_4_2.png                    | Bin 0 -> 176053 bytes
| |  .../github_issues_overview.png                     | Bin
| |  6 files changed, 1 insertion(+), 2 deletions(-)
| | 
| * commit 54619a3c618eb6b6bae1c4bf8ee1fdd46740afb6
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sun Jun 28 20:37:25 2026 +0700
| | 
| |     Export main report from md to pdf
| | 
| |  assets/flow_chart.png       | Bin 0 -> 98507 bytes
| |  assets/sequence_diagram.png | Bin 0 -> 310306 bytes
| |  main_report.md              |  31 +++----------------------------
| |  main_report.pdf             | Bin 0 -> 4334993 bytes
| |  4 files changed, 3 insertions(+), 28 deletions(-)
| | 
| * commit 6561b5e32c63368096c25008336fa7b96d6ff0a8
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sun Jun 28 20:22:13 2026 +0700
| | 
| |     feat: Add video demo link
| | 
| |  Appendix_A/README.md | 4 +---
| |  main_report.md       | 8 ++++++--
| |  2 files changed, 7 insertions(+), 5 deletions(-)
| | 
| * commit fb57c41c45110db691ec0401432c7cb0d715cd99
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sun Jun 28 20:12:04 2026 +0700
| | 
| |     feat: upload demo sources when recording Agent Skill end to end
| | 
| |  .github/prompts/test-run.prompt.md               |  66 ++++++++
| |  .github/prompts/test-write.prompt.md             |  69 ++++++++
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-001.md |  42 +++++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md |  42 +++++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md |  54 +++++++
| |  tests/demo/forgot_password_design_report.md      | 157 +++++++++++++++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-001.md  |  48 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-002.md  |  37 +++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-003.md  |  37 +++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-004.md  |  39 +++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-005.md  |  35 +++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-006.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-007.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-008.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-009.md  |  46 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-010.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-011.md  |  48 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-012.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-013.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-014.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-015.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-016.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-017.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-018.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-019.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-020.md  |  45 ++++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-021.md  |  38 +++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-022.md  |  38 +++++
| |  tests/demo/test-cases/TC-FORGOT-PASSWORD-023.md  |  37 +++++
| |  tests/demo/test-runs/sprint-1-test-run.md        |  52 ++++++
| |  tests/demo/test-summary/traceability-matrix.md   |  35 +++++
| |  32 files changed, 1505 insertions(+)
| | 
| * commit e98751c593b8251d2040de64df1d04e64a3ca7ca
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sun Jun 28 15:32:44 2026 +0700
| | 
| |     feat: finish main report + AI Audit Report + AI Critique (MD + PDF)
| | 
| |  Appendix_A/AI_Audit_Report.md                    | 393 ++++++++-
| |  Appendix_A/AI_Critique.md                        |   4 +-
| |  ...[AI-02] - FIT@HCMUS - AI Audit Report_En.docx | Bin 37217 -> 163380 bytes
| |  .../[AI-02] - FIT@HCMUS - AI Audit Report_En.pdf | Bin 0 -> 4951812 bytes
| |  main_report.md                                   | 799 +++++++++++++++++++
| |  5 files changed, 1165 insertions(+), 31 deletions(-)
| | 
| * commit 70e99542c95e8f345f6baf457dfd4a30134889cf
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sat Jun 27 22:15:33 2026 +0700
| | 
| |     feat: add AI Critique
| | 
| |  Appendix_A/AI_Critique.md | 3 +++
| |  1 file changed, 3 insertions(+)
| | 
| * commit 99f8ffa0398717a7f4f07593e9e5c1c9c1f7cca0
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sat Jun 27 20:39:32 2026 +0700
| | 
| |     rename prompt log to AI Audit Report with format md
| | 
| |  Appendix_A/{prompt_log.md => AI_Audit_Report.md} | 0
| |  1 file changed, 0 insertions(+), 0 deletions(-)
| | 
| * commit 1ab243d897ac4a3d6659fcafbdbcba543474c566
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sat Jun 27 20:33:41 2026 +0700
| | 
| |     feat: add README.md for submission
| | 
| |  Appendix_A/README.md                             | 103 +++++++++++++
| |  Appendix_A/evidence/github_issue_detail_30_1.png | Bin 0 -> 172582 bytes
| |  Appendix_A/evidence/github_issue_detail_4_1.png  | Bin 0 -> 168476 bytes
| |  Appendix_A/evidence/github_issues_overview.png   | Bin 0 -> 314520 bytes
| |  Appendix_A/prompt_log.md                         | 143 +++++++++++++++++++
| |  tests/test-summary/test_summary_report.md        |  26 ++++
| |  6 files changed, 272 insertions(+)
| | 
| * commit 281a00b9ff1e5c465bafbe90e0ff1a1a866f7251
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sat Jun 27 19:59:47 2026 +0700
| | 
| |     feat: Add screenshots of the bugs on the GitHub Issues page
| | 
| |  .../evidence/github_issue_detail_30_1.png          | Bin 0 -> 172582 bytes
| |  .../evidence/github_issue_detail_30_2.png          | Bin 0 -> 277227 bytes
| |  .../evidence/github_issue_detail_4_1.png           | Bin 0 -> 168476 bytes
| |  .../evidence/github_issue_detail_4_2.png           | Bin 0 -> 176053 bytes
| |  .../evidence/github_issues_overview.png            | Bin 0 -> 314520 bytes
| |  5 files changed, 0 insertions(+), 0 deletions(-)
| | 
| * commit bc5afd9f10ae773301999923ea7d16bed6e9694d
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sat Jun 27 17:38:41 2026 +0700
| | 
| |     Update final evidence for check out mobile
| | 
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-003.md |  12 ++--
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-005.md |  64 +++++++++----------
| |  .../evidence/BUG-REPORT-03-CHECK-MOBILE.mp4      | Bin 0 -> 4038059 bytes
| |  4 files changed, 40 insertions(+), 36 deletions(-)
| | 
| * commit 67d8afbcfbbea85fdeb904505d8132b7aaad8064
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sat Jun 27 16:57:21 2026 +0700
| | 
| |     Update evidence from FR-20: Checkout Mobile
| | 
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  tests/api_mobile_test.js                         | 198 ---------------
| |  tests/api_user_test.js                           | 243 -------------------
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-001.md |   3 +-
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-003.md |   9 +-
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-004.md |   3 +-
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-007.md |  14 +-
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-008.md |  13 +-
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-009.md |   3 +-
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-010.md |  12 +-
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-001.md |   3 +-
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-002.md |   3 +-
| |  .../evidence/mobile_cancel_order_bug.webp        | Bin 0 -> 3924852 bytes
| |  .../evidence/mobile_cart_delete_bug.webp         | Bin 0 -> 3503880 bytes
| |  .../evidence/mobile_checkout_network_error.png   | Bin 0 -> 68156 bytes
| |  .../evidence/mobile_checkout_network_error.webp  | Bin 0 -> 1069992 bytes
| |  .../evidence/mobile_checkout_run.webp            | Bin 11418 -> 0 bytes
| |  .../evidence/mobile_coupon_calc_bug.webp         | Bin 0 -> 5058304 bytes
| |  18 files changed, 30 insertions(+), 474 deletions(-)
| | 
| * commit bda0f9752fd40b39776a714902a72340d40f9b67
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Sat Jun 27 15:20:42 2026 +0700
| | 
| |     Update evidence from FR-19 and FR-03, FR-11 by new video, new screenshots
| | 
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md |   7 ++-----
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md |   5 ++---
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-007.md |   6 ++----
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-008.md |   4 +---
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-009.md |   4 ++--
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-003.md |   9 ++++++++-
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-007.md |   9 ++++++++-
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-001.md |   6 ++++--
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-002.md |   6 ++++--
| |  .../bug-reports/evidence/after_delete_click.png  | Bin 62386 -> 67560 bytes
| |  tests/bug-reports/evidence/tab_focus_1.png       | Bin 62779 -> 73009 bytes
| |  .../evidence/user_list_only_admin.png            | Bin 0 -> 62350 bytes
| |  tests/bug-reports/evidence/user_list_page.png    | Bin 67466 -> 70736 bytes
| |  .../evidence/user_mgt_delete_no_confirm.webp     | Bin 0 -> 651528 bytes
| |  .../evidence/user_mgt_empty_state.webp           | Bin 0 -> 494800 bytes
| |  16 files changed, 33 insertions(+), 23 deletions(-)
| | 
| * commit 3d42b1b4c0062a03efaac9cd46aaa1de172e6de8
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 23:43:16 2026 +0700
| | 
| |     Update evidence for FR-03 and FR-11
| | 
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  backend/seed_orders.js                           |  27 ++++++++++++++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md |   9 ++++-
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md |  12 +++++--
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-004.md |  11 +++++-
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-005.md |  13 +++++--
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md |   9 ++++-
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-007.md |  16 +++++++--
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-008.md |  27 ++++++++++++--
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-010.md |  11 +++++-
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-001.md |  35 ++++++++++++++++---
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-002.md |  12 +++++--
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-004.md |   9 ++++-
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-005.md |  11 ++++--
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-006.md |  15 ++++++--
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-008.md |  10 +++++-
| |  tests/bug-reports/evidence/after_cancel.png      | Bin 0 -> 111825 bytes
| |  ...der_history_ui_exploration_1782469485421.webp | Bin 11418 -> 5733452 bytes
| |  .../profile_page_empty_1782469522045.png         | Bin 74243 -> 79404 bytes
| |  .../profile_page_with_order_1782469582409.png    | Bin 84975 -> 120298 bytes
| |  tests/bug-reports/evidence/profile_unauth.png    | Bin 0 -> 49781 bytes
| |  21 files changed, 202 insertions(+), 25 deletions(-)
| | 
| * commit efd1efbd01f8917f7b8be5e84d1cb05aa0f7eb7c
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 18:47:16 2026 +0700
| | 
| |     test(user-management): execute test suite and document execution results
| | 
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-001.md | 35 ++++++++++++
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-002.md | 33 ++++++++++++
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-003.md | 32 +++++++++++
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-004.md | 42 +++++++++++++++
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-005.md | 37 +++++++++++++
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-006.md | 44 +++++++++++++++
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-007.md | 43 +++++++++++++++
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-008.md | 45 ++++++++++++++++
| |  .../bug-reports/DRAFT-BUG-USER-MANAGEMENT-009.md | 35 ++++++++++++
| |  tests/test-runs/sprint-1-test-run.md             | 57 ++++++++++++++++++--
| |  10 files changed, 399 insertions(+), 4 deletions(-)
| | 
| * commit 7e5387420211a8e799b15af183abbe90cad07538
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 18:47:02 2026 +0700
| | 
| |     test(checkout-mobile): execute test suite and document execution results
| | 
| |  Appendix_A/prompt_log.md                         | 135 +++++++++++
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  frontend-mobile/App.js                           |   2 +-
| |  frontend-mobile/package-lock.json                | 197 ++++++++++++++-
| |  frontend-mobile/package.json                     |   4 +-
| |  tests/api_mobile_test.js                         | 198 +++++++++++++++
| |  tests/api_user_test.js                           | 243 +++++++++++++++++++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-001.md |  36 +++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-002.md |  42 ++++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-003.md |  36 +++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-004.md |  31 +++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-005.md |  34 +++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-006.md |  32 +++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-007.md |  41 ++++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-008.md |  50 ++++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-009.md |  31 +++
| |  .../bug-reports/DRAFT-BUG-MOBILE-CHECKOUT-010.md |  37 +++
| |  .../bug-reports/evidence/after_delete_click.png  | Bin 0 -> 62386 bytes
| |  tests/bug-reports/evidence/login_page.png        | Bin 0 -> 42948 bytes
| |  .../bug-reports/evidence/mobile_cart_3_items.png | Bin 0 -> 76172 bytes
| |  .../evidence/mobile_checkout_initial.png         | Bin 0 -> 73915 bytes
| |  .../evidence/mobile_checkout_run.webp            | Bin 0 -> 11418 bytes
| |  .../evidence/mobile_coupon_applied_error.png     | Bin 0 -> 80356 bytes
| |  .../evidence/mobile_deleted_immediately.png      | Bin 0 -> 69116 bytes
| |  tests/bug-reports/evidence/mobile_homepage.png   | Bin 0 -> 71489 bytes
| |  .../evidence/mobile_login_after_typing.png       | Bin 0 -> 52861 bytes
| |  .../evidence/mobile_login_before_typing.png      | Bin 0 -> 52179 bytes
| |  .../mobile_order_cancelled_immediately.png       | Bin 0 -> 63960 bytes
| |  .../evidence/mobile_order_history_active.png     | Bin 0 -> 65004 bytes
| |  tests/bug-reports/evidence/tab_focus_1.png       | Bin 0 -> 62779 bytes
| |  tests/bug-reports/evidence/user_list_page.png    | Bin 0 -> 67466 bytes
| |  .../bug-reports/evidence/user_mgt_test_run.webp  | Bin 0 -> 6262508 bytes
| |  tests/test-summary/gap-analysis.md               |   8 +-
| |  tests/test-summary/traceability-matrix.md        |  47 ++++
| |  34 files changed, 1197 insertions(+), 7 deletions(-)
| | 
| * commit 004eb4090f71331082b92761726ba9038ba535db
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 17:34:29 2026 +0700
| | 
| |     test(order-history): execute test suite and document execution results
| | 
| |  Appendix_A/prompt_log.md                         | 120 +++++++++++++++++++
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-001.md |  43 +++++++
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-002.md |  40 +++++++
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-003.md |  34 ++++++
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-004.md |  38 ++++++
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-005.md |  32 +++++
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-006.md |  33 +++++
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-007.md |  36 ++++++
| |  tests/bug-reports/DRAFT-BUG-ORDER-HISTORY-008.md |  32 +++++
| |  ...der_history_ui_exploration_1782469485421.webp | Bin 0 -> 11418 bytes
| |  .../profile_page_empty_1782469522045.png         | Bin 0 -> 74243 bytes
| |  .../profile_page_with_order_1782469582409.png    | Bin 0 -> 84975 bytes
| |  tests/test-runs/sprint-1-test-run.md             |  37 +++++-
| |  tests/test-summary/gap-analysis.md               |  10 +-
| |  tests/test-summary/traceability-matrix.md        |  27 +++++
| |  16 files changed, 473 insertions(+), 9 deletions(-)
| | 
| * commit 2e1d6c0241af45cf10ca2587720f569c09f2ede8
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 17:24:12 2026 +0700
| | 
| |     test(forgot-password): execute test suite and document execution results
| | 
| |  Appendix_A/prompt_log.md                         | 478 ++++++++++++-------
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-001.md |  37 ++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-002.md |  47 ++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-003.md |  39 ++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-004.md |  34 ++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-005.md |  32 ++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-006.md |  48 ++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-007.md |  39 ++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-008.md |  35 ++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-009.md |  42 ++
| |  .../bug-reports/DRAFT-BUG-FORGOT-PASSWORD-010.md |  33 ++
| |  .../forgot_password_step1_1782468478875.png      | Bin 0 -> 53415 bytes
| |  .../forgot_password_step2_1782468494724.png      | Bin 0 -> 60239 bytes
| |  ...ot_password_ui_exploration_1782468458161.webp | Bin 0 -> 6406880 bytes
| |  .../reset_password_clicked_1782468522762.png     | Bin 0 -> 62101 bytes
| |  tests/test-runs/sprint-1-test-run.md             |  50 ++
| |  tests/test-summary/gap-analysis.md               |   9 +
| |  tests/test-summary/traceability-matrix.md        |  34 +-
| |  19 files changed, 790 insertions(+), 167 deletions(-)
| | 
| * commit a6352864919d5523bbaa295fe7f68f40d59def82
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 17:01:29 2026 +0700
| | 
| |     Refine new test runner skill for agent (can open browser)
| | 
| |  .agents/skills/test-runner/SKILL.md | 13 ++++++++++++-
| |  1 file changed, 12 insertions(+), 1 deletion(-)
| | 
| * commit ee1f6bc5570c60b12fb7528f955dd3341e1601f4
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 16:15:04 2026 +0700
| | 
| |     feat: update FR-11: order-history test suites based on human review
| | 
| |  Appendix_A/AI_gap_analysis.md                    |  11 +++-
| |  ...[AI-02] - FIT@HCMUS - AI Audit Report_En.docx | Bin 36236 -> 37217 bytes
| |  Appendix_A/prompt_log.md                         |  56 +++++++++++++++++++
| |  tests/test-cases/order-history/DESIGN_REPORT.md  |  25 ++++++++-
| |  .../order-history/TC-ORDER-HISTORY-024.md        |  39 +++++++++++++
| |  .../order-history/TC-ORDER-HISTORY-025.md        |  44 +++++++++++++++
| |  .../order-history/TC-ORDER-HISTORY-026.md        |  39 +++++++++++++
| |  .../order-history/TC-ORDER-HISTORY-027.md        |  39 +++++++++++++
| |  8 files changed, 249 insertions(+), 4 deletions(-)
| | 
| * commit 670cfe47f31002a4cd443c1dc1248316c88ab7ac
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 16:11:15 2026 +0700
| | 
| |     feat: update FR-19: user-management test suites based on human review
| | 
| |  Appendix_A/AI_gap_analysis.md                    |  4 +-
| |  Appendix_A/prompt_log.md                         | 57 ++++++++++++++++++++
| |  .../test-cases/user-management/DESIGN_REPORT.md  | 33 ++++++++----
| |  .../user-management/TC-USER-MANAGEMENT-018.md    | 41 ++++++++++++++
| |  .../user-management/TC-USER-MANAGEMENT-019.md    | 39 ++++++++++++++
| |  .../user-management/TC-USER-MANAGEMENT-020.md    | 39 ++++++++++++++
| |  .../user-management/TC-USER-MANAGEMENT-021.md    | 34 ++++++++++++
| |  7 files changed, 236 insertions(+), 11 deletions(-)
| | 
| * commit 97e6fb607f233b06fe2c7452493d5348e835ac3e
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 16:08:57 2026 +0700
| | 
| |     feat: update FR-03: forgot-password test suites based on human review
| | 
| |  Appendix_A/AI_gap_analysis.md                    |  77 +++++++++++++++++++
| |  ...[AI-02] - FIT@HCMUS - AI Audit Report_En.docx | Bin 34749 -> 36236 bytes
| |  Appendix_A/prompt_log.md                         |  54 +++++++++++++
| |  .../test-cases/forgot-password/DESIGN_REPORT.md  |  76 +++++++++++-------
| |  .../forgot-password/TC-FORGOT-PASSWORD-002.md    |  10 ++-
| |  .../forgot-password/TC-FORGOT-PASSWORD-028.md    |  37 +++++++++
| |  .../forgot-password/TC-FORGOT-PASSWORD-029.md    |  38 +++++++++
| |  .../forgot-password/TC-FORGOT-PASSWORD-030.md    |  43 +++++++++++
| |  .../forgot-password/TC-FORGOT-PASSWORD-031.md    |  39 ++++++++++
| |  9 files changed, 342 insertions(+), 32 deletions(-)
| | 
| * commit 1b0ec08ef278cf64a471b65fdf2da61aa1525e7c
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 15:54:54 2026 +0700
| | 
| |     feat: update FR-20 (checkout mobile) test suite with review findings + AI Audit Log + DOCX
| | 
| |  ...[AI-02] - FIT@HCMUS - AI Audit Report_En.docx | Bin 33616 -> 34749 bytes
| |  Appendix_A/prompt_log.md                         | 606 ++++++++++++++++++-
| |  .../test-cases/mobile-checkout/DESIGN_REPORT.md  | 222 +++++++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-001.md    |  48 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-002.md    |  38 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-003.md    |  40 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-004.md    |  41 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-005.md    |  42 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-006.md    |  39 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-007.md    |  39 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-008.md    |  39 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-009.md    |  38 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-010.md    |  37 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-011.md    |  40 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-012.md    |  40 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-013.md    |  41 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-014.md    |  35 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-015.md    |  34 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-016.md    |  34 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-017.md    |  34 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-018.md    |  37 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-019.md    |  39 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-020.md    |  38 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-021.md    |  37 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-022.md    |  40 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-023.md    |  37 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-024.md    |  43 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-025.md    |  40 ++
| |  .../mobile-checkout/TC-MOBILE-CHECKOUT-026.md    |  40 ++
| |  29 files changed, 1832 insertions(+), 6 deletions(-)
| | 
| * commit 4905a2fb09f77fb0805cb4ea1cd7c7cb0d4f01d7
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 15:35:17 2026 +0700
| | 
| |     feat: update FR-19 (user-management for admin) test suite with review findings + AI Audit Log + DOCX
| | 
| |  ...[AI-02] - FIT@HCMUS - AI Audit Report_En.docx | Bin 33043 -> 33616 bytes
| |  Appendix_A/prompt_log.md                         |  46 +++++
| |  .../test-cases/user-management/DESIGN_REPORT.md  | 168 +++++++++++++++++++
| |  .../user-management/TC-USER-MANAGEMENT-001.md    |  42 +++++
| |  .../user-management/TC-USER-MANAGEMENT-002.md    |  34 ++++
| |  .../user-management/TC-USER-MANAGEMENT-003.md    |  36 ++++
| |  .../user-management/TC-USER-MANAGEMENT-004.md    |  37 ++++
| |  .../user-management/TC-USER-MANAGEMENT-005.md    |  37 ++++
| |  .../user-management/TC-USER-MANAGEMENT-006.md    |  41 +++++
| |  .../user-management/TC-USER-MANAGEMENT-007.md    |  40 +++++
| |  .../user-management/TC-USER-MANAGEMENT-008.md    |  35 ++++
| |  .../user-management/TC-USER-MANAGEMENT-009.md    |  40 +++++
| |  .../user-management/TC-USER-MANAGEMENT-010.md    |  39 +++++
| |  .../user-management/TC-USER-MANAGEMENT-011.md    |  36 ++++
| |  .../user-management/TC-USER-MANAGEMENT-012.md    |  34 ++++
| |  .../user-management/TC-USER-MANAGEMENT-013.md    |  35 ++++
| |  .../user-management/TC-USER-MANAGEMENT-014.md    |  35 ++++
| |  .../user-management/TC-USER-MANAGEMENT-015.md    |  35 ++++
| |  .../user-management/TC-USER-MANAGEMENT-016.md    |  36 ++++
| |  .../user-management/TC-USER-MANAGEMENT-017.md    |  37 ++++
| |  20 files changed, 843 insertions(+)
| | 
| * commit fda7aa25e9caba6d73833713942de60d0e8f7b6f
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 15:13:42 2026 +0700
| | 
| |     feat: update FR-11 (order-history) test suite with review findings + AI Audit log + DOCX
| | 
| |  ...[AI-02] - FIT@HCMUS - AI Audit Report_En.docx | Bin 32090 -> 33043 bytes
| |  Appendix_A/prompt_log.md                         | 188 ++++++++++++++++++-
| |  tests/test-cases/order-history/DESIGN_REPORT.md  | 183 ++++++++++++++++++
| |  .../order-history/TC-ORDER-HISTORY-001.md        |  41 ++++
| |  .../order-history/TC-ORDER-HISTORY-002.md        |  35 ++++
| |  .../order-history/TC-ORDER-HISTORY-003.md        |  36 ++++
| |  .../order-history/TC-ORDER-HISTORY-004.md        |  39 ++++
| |  .../order-history/TC-ORDER-HISTORY-005.md        |  35 ++++
| |  .../order-history/TC-ORDER-HISTORY-006.md        |  36 ++++
| |  .../order-history/TC-ORDER-HISTORY-007.md        |  34 ++++
| |  .../order-history/TC-ORDER-HISTORY-008.md        |  34 ++++
| |  .../order-history/TC-ORDER-HISTORY-009.md        |  34 ++++
| |  .../order-history/TC-ORDER-HISTORY-010.md        |  34 ++++
| |  .../order-history/TC-ORDER-HISTORY-011.md        |  35 ++++
| |  .../order-history/TC-ORDER-HISTORY-012.md        |  36 ++++
| |  .../order-history/TC-ORDER-HISTORY-013.md        |  36 ++++
| |  .../order-history/TC-ORDER-HISTORY-014.md        |  36 ++++
| |  .../order-history/TC-ORDER-HISTORY-015.md        |  36 ++++
| |  .../order-history/TC-ORDER-HISTORY-016.md        |  36 ++++
| |  .../order-history/TC-ORDER-HISTORY-017.md        |  32 ++++
| |  .../order-history/TC-ORDER-HISTORY-018.md        |  32 ++++
| |  .../order-history/TC-ORDER-HISTORY-019.md        |  34 ++++
| |  .../order-history/TC-ORDER-HISTORY-020.md        |  38 ++++
| |  .../order-history/TC-ORDER-HISTORY-021.md        |  36 ++++
| |  .../order-history/TC-ORDER-HISTORY-022.md        |  39 ++++
| |  .../order-history/TC-ORDER-HISTORY-023.md        |  38 ++++
| |  26 files changed, 1192 insertions(+), 1 deletion(-)
| | 
| * commit d373179e8f613967e3feb4f21c1f85823dc268a2
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Fri Jun 26 14:30:33 2026 +0700
| | 
| |     feat: update FR-03 (forgot password) test suite with review findings + AI Audit Log + DOCX
| | 
| |  ...[AI-02] - FIT@HCMUS - AI Audit Report_En.docx | Bin 0 -> 32090 bytes
| |  Appendix_A/prompt_log.md                         | 430 +++++++++++++++----
| |  .../test-cases/forgot-password/DESIGN_REPORT.md  | 191 ++++++++
| |  .../forgot-password/TC-FORGOT-PASSWORD-001.md    |  39 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-002.md    |  41 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-003.md    |  36 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-004.md    |  37 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-005.md    |  35 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-006.md    |  35 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-007.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-008.md    |  37 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-009.md    |  37 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-010.md    |  37 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-011.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-012.md    |  40 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-013.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-014.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-015.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-016.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-017.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-018.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-019.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-020.md    |  39 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-021.md    |  38 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-022.md    |  36 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-023.md    |  37 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-024.md    |  41 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-025.md    |  37 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-026.md    |  44 ++
| |  .../forgot-password/TC-FORGOT-PASSWORD-027.md    |  44 ++
| |  .../test-cases/hotel}/hotel_design_report.md     |   0
| |  31 files changed, 1565 insertions(+), 88 deletions(-)
| | 
| * commit dc848658fcf1b7f661d7d722b8d070b5c70701a9
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Thu Jun 25 18:19:32 2026 +0700
| | 
| |     chore: initialize backend database, workspace configuration, and add project documentation files
| | 
| |  .agents/skills/test-planner/SKILL.md |  74 -------------------------------
| |  backend/database.sqlite              | Bin 36864 -> 36864 bytes
| |  backend/pnpm-workspace.yaml          |   2 +
| |  3 files changed, 2 insertions(+), 74 deletions(-)
| | 
| * commit 1661083591251c6f2b71df39722fbd86d5b9b6f5
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Thu Jun 25 16:32:30 2026 +0700
| | 
| |     feat(skills): finalize test-runner skill with course alignment, fixes, and prompt log
| | 
| |  .agents/skills/test-runner/SKILL.md | 171 ++++++++++++++++++++++----------
| |  Appendix_A/prompt_log.md            |  70 +++++++++++++
| |  2 files changed, 187 insertions(+), 54 deletions(-)
| | 
| * commit fbd0512acc32a55f524b8932f3ca629219890495
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Thu Jun 25 16:18:04 2026 +0700
| | 
| |     Finalized the skill test-writter.md for agent
| | 
| |  .agents/skills/test-writer/SKILL.md |  4 ++--
| |  Appendix_A/prompt_log.md            | 17 +++++++++++++++++
| |  2 files changed, 19 insertions(+), 2 deletions(-)
| | 
| * commit b1ffa61e8b0933d720e9b951959322dcbcd531da
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Thu Jun 25 15:47:34 2026 +0700
| | 
| |     feat(skills): add test-planner and test-runner agent skills
| | 
| |  .agents/skills/test-planner/SKILL.md | 74 +++++++++++++++++++++++++++++
| |  .agents/skills/test-runner/SKILL.md  | 80 ++++++++++++++++++++++++++++++++
| |  2 files changed, 154 insertions(+)
| | 
| * commit 200b854511ff84f260c9675a4f1480f7db84ff02
| | Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
| | Date:   Thu Jun 25 15:42:31 2026 +0700
| | 
| |     test(hotel): add EP/BVA test cases, design report, and prompt log for hotel calculation
| | 
| |  Appendix_A/hotel_design_report.md      | 181 +++++++++++++++++++++++++++++
| |  Appendix_A/prompt_log.md               |  54 +++++++++
| |  tests/test-cases/hotel/TC-HOTEL-001.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-002.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-003.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-004.md |  37 ++++++
| |  tests/test-cases/hotel/TC-HOTEL-005.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-006.md |  37 ++++++
| |  tests/test-cases/hotel/TC-HOTEL-007.md |  37 ++++++
| |  tests/test-cases/hotel/TC-HOTEL-008.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-009.md |  40 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-010.md |  40 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-011.md |  37 ++++++
| |  tests/test-cases/hotel/TC-HOTEL-012.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-013.md |  37 ++++++
| |  tests/test-cases/hotel/TC-HOTEL-014.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-015.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-016.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-017.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-018.md |  39 +++++++
| |  tests/test-cases/hotel/TC-HOTEL-019.md |  39 +++++++
| |  21 files changed, 968 insertions(+)
| | 
| * commit 5750759370e49bdc1e6115cdca1cbb5a32dfdb60
|/  Author: NguyenAn0808 <23127148@student.hcmus.edu.vn>
|   Date:   Thu Jun 25 15:42:27 2026 +0700
|   
|       feat(skills): add test-writer agent skill with domain testing and BVA rules
|   
|    .agents/skills/test-writer/SKILL.md | 135 ++++++++++++++++++++++++++++++++
|    1 file changed, 135 insertions(+)
|   
| * commit e97d164b6da053fa2e66b322a64ce2af8a101737
| | Author: spartan-anhnguyen <anh.tuan.nguyen@c0x12c.com>
| | Date:   Sun Jun 28 11:27:17 2026 +0700
| | 
| |     test(fr02): BVA — boundary identification and test cases design
| |     
| |     Identify 5 boundaries from DT classes: login_attempts lock threshold (3),
| |     lock duration (30s), email length (254 chars), password presence, consecutive
| |     counter reset. 12 test cases BVA-FR02-01..12 using 3-point BVA per boundary.
| |     Design-only document — no execution results yet.
| |     
| |     Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
| | 
| |  tests/HW02/test-cases/FR02_Login/BVA.md | 103 ++++++++++++++++++++++++++++
| |  1 file changed, 103 insertions(+)
| | 
| * commit 27581ff976e595b7572173026920e7bbb3dad032
| | Author: spartan-anhnguyen <anh.tuan.nguyen@c0x12c.com>
| | Date:   Sun Jun 28 11:27:09 2026 +0700
| | 
| |     test(fr02): domain testing — variables, equivalence classes, test cases design
| |     
| |     Define 6 input variables (email, password, account_state, 3 UI attrs),
| |     7 email classes, 4 password classes, 5 account_state classes.
| |     17 test cases DT-FR02-01..17 covering all valid and invalid partitions.
| |     Design-only document — no execution results yet.
| |     
| |     Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
| | 
| |  .../HW02/test-cases/FR02_Login/DomainTesting.md  | 137 +++++++++++++++++++
| |  1 file changed, 137 insertions(+)
| | 
| * commit a532b3203701212f2a11aeab4b683bf109aeabb4
| | Author: spartan-anhnguyen <anh.tuan.nguyen@c0x12c.com>
| | Date:   Sun Jun 28 10:52:15 2026 +0700
| | 
| |     add claude skill
| | 
| |  .claude/skills/boundary-value-analysis/SKILL.md  |  84 ++++
| |  .claude/skills/domain-testing/SKILL.md           |  82 ++++
| |  2026.HW02.Domain Testing_En.pdf                  | Bin 0 -> 310849 bytes
| |  backend/database.sqlite                          | Bin 36864 -> 36864 bytes
| |  backend/pnpm-workspace.yaml                      |   2 +
| |  tests/HW02/FR02_Login/BVA.md                     | 121 ------
| |  tests/HW02/FR02_Login/DomainTesting.md           | 181 --------
| |  tests/HW02/FR10_OrderState/BVA.md                | 124 ------
| |  tests/HW02/FR10_OrderState/DomainTesting.md      | 243 -----------
| |  tests/HW02/FR18_AdminOrder/BVA.md                | 129 ------
| |  tests/HW02/FR18_AdminOrder/DomainTesting.md      | 216 ----------
| |  tests/HW02/Mobile_OrderHistory/BVA.md            | 134 ------
| |  tests/HW02/Mobile_OrderHistory/DomainTesting.md  | 190 ---------
| |  tests/HW02/README.md                             | 165 --------
| |  tests/HW02/ai-audit/AI_Audit_Report.md           | 130 ------
| |  tests/HW02/ai-audit/AI_Critique.md               |  13 -
| |  tests/HW02/bug-reports/BUG-01.md                 |  63 ---
| |  tests/HW02/bug-reports/BUG-02.md                 |  61 ---
| |  tests/HW02/bug-reports/BUG-03.md                 |  55 ---
| |  tests/HW02/bug-reports/BUG-04.md                 |  41 --
| |  tests/HW02/bug-reports/BUG-05.md                 |  66 ---
| |  tests/HW02/bug-reports/BUG-06.md                 |  71 ----
| |  tests/HW02/bug-reports/BUG-07.md                 |  71 ----
| |  tests/HW02/bug-reports/BUG-08.md                 |  61 ---
| |  tests/HW02/bug-reports/BUG-09.md                 |  62 ---
| |  tests/HW02/bug-reports/BUG-10.md                 |  48 ---
| |  tests/HW02/bug-reports/BUG-11.md                 |  62 ---
| |  tests/HW02/bug-reports/BUG-12.md                 |  40 --
| |  tests/HW02/bug-reports/BUG-13.md                 |  51 ---
| |  tests/HW02/bug-reports/BUG-14.md                 | 142 -------
| |  tests/HW02/playwright-tests/fr02-login.spec.js   | 249 -----------
| |  .../playwright-tests/fr10-fr18-orders.spec.js    | 423 -------------------
| |  .../playwright-tests/fr10-screenshots.spec.js    | 177 --------
| |  .../HW02/playwright-tests/fr18-admin-ui.spec.js  | 246 -----------
| |  tests/HW02/playwright-tests/fr18-focused.spec.js | 163 -------
| |  .../mobile-order-history.spec.js                 | 262 ------------
| |  tests/HW02/playwright-tests/package-lock.json    |  75 ----
| |  tests/HW02/playwright-tests/package.json         |  16 -
| |  tests/HW02/playwright-tests/results-fr02.json    | 106 -----
| |  .../playwright-tests/results-fr18-focused.json   |  66 ---
| |  tests/HW02/playwright-tests/results-fr18.json    |  90 ----
| |  tests/HW02/playwright-tests/results-mobile.json  | 146 -------
| |  .../screenshots/FR02/DT-FR02-01-after-login.png  | Bin 68534 -> 0 bytes
| |  .../FR02/DT-FR02-01-before-submit.png            | Bin 33958 -> 0 bytes
| |  .../FR02/DT-FR02-10-locked-response.png          | Bin 39677 -> 0 bytes
| |  .../FR02/DT-FR02-email-input-type.png            | Bin 29580 -> 0 bytes
| |  .../FR02/DT-FR02-lockout-attempt-1.png           | Bin 40562 -> 0 bytes
| |  .../FR02/DT-FR02-lockout-attempt-2.png           | Bin 40562 -> 0 bytes
| |  .../screenshots/FR02/DT-FR02-login-form.png      | Bin 29580 -> 0 bytes
| |  .../FR02/DT-FR02-password-input-type.png         | Bin 29580 -> 0 bytes
| |  .../FR10/BUG06-01-canceled-order-admin.png       | Bin 39832 -> 0 bytes
| |  .../screenshots/FR10/BUG06-02-api-response.json  |   7 -
| |  .../FR10/BUG06-03-status-now-delivered.png       | Bin 32923 -> 0 bytes
| |  .../FR10/BUG07-01-shipping-order-web.png         | Bin 65371 -> 0 bytes
| |  .../screenshots/FR10/BUG07-02-api-response.json  |   7 -
| |  .../screenshots/FR10/BUG07-03-after-cancel.png   | Bin 64005 -> 0 bytes
| |  .../FR10/BUG14-01-regular-user-web.png           | Bin 77884 -> 0 bytes
| |  .../FR10/BUG14-02-role-bypass-results.json       |  23 -
| |  .../screenshots/FR10/FR10-01-pending-order.png   | Bin 40649 -> 0 bytes
| |  .../screenshots/FR10/FR10-02-confirmed.png       | Bin 40797 -> 0 bytes
| |  .../screenshots/FR10/FR10-03-shipping.png        | Bin 39488 -> 0 bytes
| |  .../screenshots/FR10/FR10-04-delivered.png       | Bin 38343 -> 0 bytes
| |  .../FR10/FR10-05-delivered-final-state.png       | Bin 38343 -> 0 bytes
| |  .../screenshots/FR18/FR18-00-admin-login.png     | Bin 12336 -> 0 bytes
| |  .../screenshots/FR18/FR18-00-login-page.png      | Bin 12336 -> 0 bytes
| |  .../FR18/FR18-01-admin-credentials-filled.png    | Bin 13557 -> 0 bytes
| |  .../FR18/FR18-02-admin-after-login.png           | Bin 33217 -> 0 bytes
| |  .../screenshots/FR18/FR18-03-orders-page.png     | Bin 41920 -> 0 bytes
| |  .../screenshots/FR18/FR18-04-xss-check.png       | Bin 41920 -> 0 bytes
| |  .../screenshots/FR18/FR18-05-dashboard.png       | Bin 41920 -> 0 bytes
| |  .../FR18/FR18-06-pending-order-ui.png            | Bin 31230 -> 0 bytes
| |  .../screenshots/FR18/FR18-07-no-confirm-btn.png  | Bin 31230 -> 0 bytes
| |  .../screenshots/FR18/FR18-A1-dashboard.png       | Bin 33361 -> 0 bytes
| |  .../screenshots/FR18/FR18-A2-revenue.png         | Bin 33361 -> 0 bytes
| |  .../screenshots/FR18/FR18-B1-orders-tab.png      | Bin 51919 -> 0 bytes
| |  .../screenshots/FR18/FR18-B2-xss-orders.png      | Bin 51919 -> 0 bytes
| |  .../screenshots/FR18/FR18-B3-order-buttons.png   | Bin 51919 -> 0 bytes
| |  .../screenshots/FR18/FR18-B4-after-confirm.png   | Bin 51204 -> 0 bytes
| |  .../screenshots/FR18/FR18-B5-after-ship.png      | Bin 50485 -> 0 bytes
| |  .../screenshots/FR18/FR18-B6-after-deliver.png   | Bin 48878 -> 0 bytes
| |  .../screenshots/FR18/FR18-B7-canceled-order.png  | Bin 31230 -> 0 bytes
| |  .../screenshots/Mobile/MOB-01-login.png          | Bin 33521 -> 0 bytes
| |  .../screenshots/Mobile/MOB-02-profile-orders.png | Bin 67632 -> 0 bytes
| |  .../screenshots/Mobile/MOB-03-cancel-buttons.png | Bin 67718 -> 0 bytes
| |  .../screenshots/Mobile/MOB-04-after-cancel.png   | Bin 66180 -> 0 bytes
| |  .../screenshots/Mobile/MOB-05-final-state.png    | Bin 66262 -> 0 bytes
| |  86 files changed, 168 insertions(+), 4596 deletions(-)
| | 
| * commit 2f964ad37cae97ecd88ece70b1c0167d6f2e61d2
| | Author: spartan-anhnguyen <anh.tuan.nguyen@c0x12c.com>
| | Date:   Sat Jun 27 14:02:41 2026 +0700
| | 
| |     test(hw02): add Playwright screenshots to all reports and bug reports
| |     
| |     - Added FR10 screenshot script (fr10-screenshots.spec.js)
| |     - Captured screenshots for BUG-06 (canceled→delivered), BUG-07 (cancel shipping),
| |       BUG-14 (role bypass), and FR-10 normal state flow
| |     - Updated all 14 bug reports (BUG-01 to BUG-14) with actual Playwright screenshots
| |     - Updated DomainTesting.md for all 4 features with screenshot sections
| |     - Updated BVA.md for all 4 features with screenshot evidence
| |     - Screenshots embedded with relative paths (../playwright-tests/screenshots/...)
| |     
| |     Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
| | 
| |  tests/HW02/FR02_Login/BVA.md                     |  19 ++
| |  tests/HW02/FR02_Login/DomainTesting.md           |  52 ++++--
| |  tests/HW02/FR10_OrderState/BVA.md                |  24 ++-
| |  tests/HW02/FR10_OrderState/DomainTesting.md      |  38 +++-
| |  tests/HW02/FR18_AdminOrder/BVA.md                |  20 ++-
| |  tests/HW02/FR18_AdminOrder/DomainTesting.md      |  34 +++-
| |  tests/HW02/Mobile_OrderHistory/BVA.md            |  26 ++-
| |  tests/HW02/Mobile_OrderHistory/DomainTesting.md  |  20 ++-
| |  tests/HW02/bug-reports/BUG-01.md                 |  14 +-
| |  tests/HW02/bug-reports/BUG-02.md                 |  14 ++
| |  tests/HW02/bug-reports/BUG-03.md                 |  12 ++
| |  tests/HW02/bug-reports/BUG-04.md                 |   8 +
| |  tests/HW02/bug-reports/BUG-05.md                 |  16 ++
| |  tests/HW02/bug-reports/BUG-06.md                 |  22 +++
| |  tests/HW02/bug-reports/BUG-07.md                 |  22 +++
| |  tests/HW02/bug-reports/BUG-08.md                 |  14 ++
| |  tests/HW02/bug-reports/BUG-09.md                 |  13 ++
| |  tests/HW02/bug-reports/BUG-10.md                 |   8 +
| |  tests/HW02/bug-reports/BUG-11.md                 |  13 ++
| |  tests/HW02/bug-reports/BUG-12.md                 |   8 +
| |  tests/HW02/bug-reports/BUG-13.md                 |  15 ++
| |  tests/HW02/bug-reports/BUG-14.md                 |  36 ++++
| |  .../playwright-tests/fr10-screenshots.spec.js    | 177 +++++++++++++++++++
| |  .../FR10/BUG06-01-canceled-order-admin.png       | Bin 0 -> 39832 bytes
| |  .../screenshots/FR10/BUG06-02-api-response.json  |   7 +
| |  .../FR10/BUG06-03-status-now-delivered.png       | Bin 0 -> 32923 bytes
| |  .../FR10/BUG07-01-shipping-order-web.png         | Bin 0 -> 65371 bytes
| |  .../screenshots/FR10/BUG07-02-api-response.json  |   7 +
| |  .../screenshots/FR10/BUG07-03-after-cancel.png   | Bin 0 -> 64005 bytes
| |  .../FR10/BUG14-01-regular-user-web.png           | Bin 0 -> 77884 bytes
| |  .../FR10/BUG14-02-role-bypass-results.json       |  23 +++
| |  .../screenshots/FR10/FR10-01-pending-order.png   | Bin 0 -> 40649 bytes
| |  .../screenshots/FR10/FR10-02-confirmed.png       | Bin 0 -> 40797 bytes
| |  .../screenshots/FR10/FR10-03-shipping.png        | Bin 0 -> 39488 bytes
| |  .../screenshots/FR10/FR10-04-delivered.png       | Bin 0 -> 38343 bytes
| |  .../FR10/FR10-05-delivered-final-state.png       | Bin 0 -> 38343 bytes
| |  36 files changed, 637 insertions(+), 25 deletions(-)
| | 
| * commit d5a0543878dc1b63182157b3570786d939c2bba0
| | Author: spartan-anhnguyen <anh.tuan.nguyen@c0x12c.com>
| | Date:   Sat Jun 27 13:53:03 2026 +0700
| | 
| |     test(hw02): update AI audit report with session 4 execution results
| |     
| |     Added session 4 log covering Playwright execution across all 4 features,
| |     confirmed 14 bugs (including newly discovered BUG-14: missing admin role check),
| |     and updated README with actual PASS/FAIL counts.
| |     
| |     Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
| | 
| |  tests/HW02/ai-audit/AI_Audit_Report.md | 43 +++++++++++++++++++++++-------
| |  1 file changed, 33 insertions(+), 10 deletions(-)
| | 
| * commit acccd83e001a8284528bfabff281f02ebb200200
|/  Author: spartan-anhnguyen <anh.tuan.nguyen@c0x12c.com>
|   Date:   Sat Jun 27 13:52:24 2026 +0700
|   
|       test(hw02): add domain testing & BVA reports for 4 features
|       
|       - FR-02 Login: 30 TC (15 DT + 15 BVA), bugs BUG-01..05 confirmed
|       - FR-10 Order State: 48 TC (27 DT + 21 BVA), bugs BUG-06, 07, 14
|       - FR-18 Admin Orders: 47 TC (27 DT + 20 BVA), bugs BUG-08, 09, 14
|       - Mobile Order History: 44 TC (24 DT + 20 BVA), bugs BUG-11, 13
|       - Playwright automation scripts for all features with screenshots
|       - 14 bug reports (BUG-01 to BUG-14, including new critical BUG-14)
|       - AI Audit Report and Critique included
|       
|       Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
|   
|    tests/HW02/FR02_Login/BVA.md                     | 102 +++++
|    tests/HW02/FR02_Login/DomainTesting.md           | 165 ++++++++
|    tests/HW02/FR10_OrderState/BVA.md                | 102 +++++
|    tests/HW02/FR10_OrderState/DomainTesting.md      | 207 +++++++++
|    tests/HW02/FR18_AdminOrder/BVA.md                | 111 +++++
|    tests/HW02/FR18_AdminOrder/DomainTesting.md      | 184 ++++++++
|    tests/HW02/Mobile_OrderHistory/BVA.md            | 110 +++++
|    tests/HW02/Mobile_OrderHistory/DomainTesting.md  | 172 ++++++++
|    tests/HW02/README.md                             | 165 ++++++++
|    tests/HW02/ai-audit/AI_Audit_Report.md           | 107 +++++
|    tests/HW02/ai-audit/AI_Critique.md               |  13 +
|    tests/HW02/bug-reports/BUG-01.md                 |  51 +++
|    tests/HW02/bug-reports/BUG-02.md                 |  47 +++
|    tests/HW02/bug-reports/BUG-03.md                 |  43 ++
|    tests/HW02/bug-reports/BUG-04.md                 |  33 ++
|    tests/HW02/bug-reports/BUG-05.md                 |  50 +++
|    tests/HW02/bug-reports/BUG-06.md                 |  49 +++
|    tests/HW02/bug-reports/BUG-07.md                 |  49 +++
|    tests/HW02/bug-reports/BUG-08.md                 |  47 +++
|    tests/HW02/bug-reports/BUG-09.md                 |  49 +++
|    tests/HW02/bug-reports/BUG-10.md                 |  40 ++
|    tests/HW02/bug-reports/BUG-11.md                 |  49 +++
|    tests/HW02/bug-reports/BUG-12.md                 |  32 ++
|    tests/HW02/bug-reports/BUG-13.md                 |  36 ++
|    tests/HW02/bug-reports/BUG-14.md                 | 106 +++++
|    tests/HW02/playwright-tests/fr02-login.spec.js   | 249 +++++++++++
|    .../playwright-tests/fr10-fr18-orders.spec.js    | 423 +++++++++++++++++++
|    .../HW02/playwright-tests/fr18-admin-ui.spec.js  | 246 +++++++++++
|    tests/HW02/playwright-tests/fr18-focused.spec.js | 163 +++++++
|    .../mobile-order-history.spec.js                 | 262 ++++++++++++
|    tests/HW02/playwright-tests/package-lock.json    |  75 ++++
|    tests/HW02/playwright-tests/package.json         |  16 +
|    tests/HW02/playwright-tests/results-fr02.json    | 106 +++++
|    .../playwright-tests/results-fr18-focused.json   |  66 +++
|    tests/HW02/playwright-tests/results-fr18.json    |  90 ++++
|    tests/HW02/playwright-tests/results-mobile.json  | 146 +++++++
|    .../screenshots/FR02/DT-FR02-01-after-login.png  | Bin 0 -> 68534 bytes
|    .../FR02/DT-FR02-01-before-submit.png            | Bin 0 -> 33958 bytes
|    .../FR02/DT-FR02-10-locked-response.png          | Bin 0 -> 39677 bytes
|    .../FR02/DT-FR02-email-input-type.png            | Bin 0 -> 29580 bytes
|    .../FR02/DT-FR02-lockout-attempt-1.png           | Bin 0 -> 40562 bytes
|    .../FR02/DT-FR02-lockout-attempt-2.png           | Bin 0 -> 40562 bytes
|    .../screenshots/FR02/DT-FR02-login-form.png      | Bin 0 -> 29580 bytes
|    .../FR02/DT-FR02-password-input-type.png         | Bin 0 -> 29580 bytes
|    .../screenshots/FR18/FR18-00-admin-login.png     | Bin 0 -> 12336 bytes
|    .../screenshots/FR18/FR18-00-login-page.png      | Bin 0 -> 12336 bytes
|    .../FR18/FR18-01-admin-credentials-filled.png    | Bin 0 -> 13557 bytes
|    .../FR18/FR18-02-admin-after-login.png           | Bin 0 -> 33217 bytes
|    .../screenshots/FR18/FR18-03-orders-page.png     | Bin 0 -> 41920 bytes
|    .../screenshots/FR18/FR18-04-xss-check.png       | Bin 0 -> 41920 bytes
|    .../screenshots/FR18/FR18-05-dashboard.png       | Bin 0 -> 41920 bytes
|    .../FR18/FR18-06-pending-order-ui.png            | Bin 0 -> 31230 bytes
|    .../screenshots/FR18/FR18-07-no-confirm-btn.png  | Bin 0 -> 31230 bytes
|    .../screenshots/FR18/FR18-A1-dashboard.png       | Bin 0 -> 33361 bytes
|    .../screenshots/FR18/FR18-A2-revenue.png         | Bin 0 -> 33361 bytes
|    .../screenshots/FR18/FR18-B1-orders-tab.png      | Bin 0 -> 51919 bytes
|    .../screenshots/FR18/FR18-B2-xss-orders.png      | Bin 0 -> 51919 bytes
|    .../screenshots/FR18/FR18-B3-order-buttons.png   | Bin 0 -> 51919 bytes
|    .../screenshots/FR18/FR18-B4-after-confirm.png   | Bin 0 -> 51204 bytes
|    .../screenshots/FR18/FR18-B5-after-ship.png      | Bin 0 -> 50485 bytes
|    .../screenshots/FR18/FR18-B6-after-deliver.png   | Bin 0 -> 48878 bytes
|    .../screenshots/FR18/FR18-B7-canceled-order.png  | Bin 0 -> 31230 bytes
|    .../screenshots/Mobile/MOB-01-login.png          | Bin 0 -> 33521 bytes
|    .../screenshots/Mobile/MOB-02-profile-orders.png | Bin 0 -> 67632 bytes
|    .../screenshots/Mobile/MOB-03-cancel-buttons.png | Bin 0 -> 67718 bytes
|    .../screenshots/Mobile/MOB-04-after-cancel.png   | Bin 0 -> 66180 bytes
|    .../screenshots/Mobile/MOB-05-final-state.png    | Bin 0 -> 66262 bytes
|    67 files changed, 3961 insertions(+)
| 
* commit 3bc3b7c2b68afb3ba4da251c58c75ced05e798cd
| Author: Yuran <trieuvanbd123@gmail.com>
| Date:   Mon Jun 8 17:15:53 2026 +0700
| 
|     chore: create bug issue templates
| 
|  .github/ISSUE_TEMPLATE/bug-report.yaml | 89 --------------------------------
|  .github/ISSUE_TEMPLATE/bug_report.md   | 42 +++++++++++++++
|  .github/ISSUE_TEMPLATE/config.yml      |  1 +
|  .github/ISSUE_TEMPLATE/test-run.yaml   |  0
|  .github/ISSUE_TEMPLATE/test-task.yaml  |  0
|  .github/workflows/ci.yaml              | 15 ++++++
|  6 files changed, 58 insertions(+), 89 deletions(-)
| 
* commit 3741bd9aeeebfb2ffab24f8714a1d4a360c9bb07
| Author: yuran1811 <trieuvanbd123@gmail.com>
| Date:   Mon Jun 8 17:12:12 2026 +0700
| 
|     chore: update templates
| 
|  .github/ISSUE_TEMPLATE/bug-report.yaml    | 89 +++++++++++++++++++++++++++++
|  tests/test-cases/login/TC-LOGIN-001.md    | 33 +++++++++++
|  tests/test-summary/traceability-matrix.md |  3 +
|  3 files changed, 125 insertions(+)
| 
* commit b2dd8abf0021257cad1d63ef4dbe38338f178803
| Author: yuran1811 <trieuvanbd123@gmail.com>
| Date:   Mon Jun 8 17:06:15 2026 +0700
| 
|     chore: prepare template
| 
|  .agents/skills/test-runner/SKILL.md          |    0
|  .agents/skills/test-writer/SKILL.md          |    0
|  .github/ISSUE_TEMPLATE/bug-report.yaml       |    0
|  .github/ISSUE_TEMPLATE/test-run.yaml         |    0
|  .github/ISSUE_TEMPLATE/test-task.yaml        |    0
|  .github/agents/qa.agent.md                   |    0
|  .github/prompts/test-plan.prompt.md          |    0
|  .github/prompts/test-run.prompt.md           |    0
|  .github/prompts/test-write.prompt.md         |    0
|  .github/skills/test-runner                   |    1 +
|  .github/skills/test-writer                   |    1 +
|  frontend-mobile/pnpm-lock.yaml               | 5625 ++++++++++++++++++++++++
|  run_servers.sh                               |    5 -
|  scripts/clean.sh                             |   26 +
|  scripts/install.sh                           |    5 +
|  scripts/run.sh                               |    5 +
|  scripts/sync-skills.sh                       |   13 +
|  tests/test-cases/login/TC-LOGIN-001.md       |    0
|  tests/test-cases/register/TC-REGISTER-001.md |    0
|  tests/test-runs/sprint-1-test-run.md         |    0
|  tests/test-summary/traceability-matrix.md    |    0
|  21 files changed, 5676 insertions(+), 5 deletions(-)
| 
* commit 8498ae513eb195e9db4b1a1be0c14729e3edc248
| Author: yuran1811 <trieuvanbd123@gmail.com>
| Date:   Mon Jun 8 16:43:45 2026 +0700
| 
|     chore: add sqlite3 as built deps
| 
|  backend/pnpm-workspace.yaml | 2 ++
|  1 file changed, 2 insertions(+)
| 
* commit 7b2739cb2aa1b0245211097c0612849f5c99f534
| Author: yuran1811 <trieuvanbd123@gmail.com>
| Date:   Mon Jun 8 16:29:07 2026 +0700
| 
|     chore: add install in run server script
| 
|  run_servers.sh | 6 +++---
|  1 file changed, 3 insertions(+), 3 deletions(-)
| 
* commit 31eb8f205b2fa4653df7ad8379d4ea40a412b48a
| Author: yuran1811 <trieuvanbd123@gmail.com>
| Date:   Mon Jun 8 16:23:58 2026 +0700
| 
|     chore: add .gitignore and pnpm-lock.json
| 
|  .gitignore                    |    2 +
|  backend/pnpm-lock.yaml        | 1103 +++++++++++++++++++
|  frontend-admin/pnpm-lock.yaml | 2233 +++++++++++++++++++++++++++++++++++++++
|  frontend-web/pnpm-lock.yaml   | 2233 +++++++++++++++++++++++++++++++++++++++
|  4 files changed, 5571 insertions(+)
| 
* commit e00dcc84b9d312b14680e3d16e3ee5a804734451
| Author: yuran1811 <trieuvanbd123@gmail.com>
| Date:   Mon Jun 8 16:20:43 2026 +0700
| 
|     fix: correct
| 
|  backend/package.json | 2 +-
|  run_servers.sh       | 6 +++---
|  2 files changed, 4 insertions(+), 4 deletions(-)
| 
* commit 85af3ba875c88283615e22cb108f13e2fccaf0e9
| Author: ttbhanh-hcmus <ttbhanh@hcmus.edu.vn>
| Date:   Fri May 15 08:30:35 2026 +0700
| 
|     first upload
| 
|  README.md                                 |  290 +-
|  api_specification.md                      |  214 +
|  backend/database.js                       |  119 +
|  backend/database.sqlite                   |  Bin 0 -> 36864 bytes
|  backend/package-lock.json                 | 1663 +++++
|  backend/package.json                      |   20 +
|  backend/server.js                         |  572 ++
|  backend/test_profile.js                   |    8 +
|  frontend-admin/.gitignore                 |   24 +
|  frontend-admin/README.md                  |   16 +
|  frontend-admin/eslint.config.js           |   21 +
|  frontend-admin/index.html                 |   13 +
|  frontend-admin/package-lock.json          | 3681 +++++++++++
|  frontend-admin/package.json               |   32 +
|  frontend-admin/postcss.config.js          |    6 +
|  frontend-admin/public/favicon.svg         |    1 +
|  frontend-admin/public/icons.svg           |   24 +
|  frontend-admin/src/App.css                |  184 +
|  frontend-admin/src/App.jsx                |  922 +++
|  frontend-admin/src/assets/hero.png        |  Bin 0 -> 13057 bytes
|  frontend-admin/src/assets/react.svg       |    1 +
|  frontend-admin/src/assets/vite.svg        |    1 +
|  frontend-admin/src/index.css              |    8 +
|  frontend-admin/src/main.jsx               |   10 +
|  frontend-admin/tailwind.config.js         |   11 +
|  frontend-admin/vite.config.js             |   11 +
|  frontend-mobile/.gitignore                |   41 +
|  frontend-mobile/App.js                    | 1300 ++++
|  frontend-mobile/app.json                  |   29 +
|  frontend-mobile/assets/adaptive-icon.png  |  Bin 0 -> 17547 bytes
|  frontend-mobile/assets/favicon.png        |  Bin 0 -> 1466 bytes
|  frontend-mobile/assets/icon.png           |  Bin 0 -> 22380 bytes
|  frontend-mobile/assets/splash-icon.png    |  Bin 0 -> 17547 bytes
|  frontend-mobile/index.js                  |    8 +
|  frontend-mobile/package-lock.json         | 8773 +++++++++++++++++++++++++++
|  frontend-mobile/package.json              |   18 +
|  frontend-web/.gitignore                   |   24 +
|  frontend-web/README.md                    |   16 +
|  frontend-web/eslint.config.js             |   21 +
|  frontend-web/index.html                   |   13 +
|  frontend-web/package-lock.json            | 3681 +++++++++++
|  frontend-web/package.json                 |   32 +
|  frontend-web/postcss.config.js            |    6 +
|  frontend-web/public/favicon.svg           |    1 +
|  frontend-web/public/icons.svg             |   24 +
|  frontend-web/src/App.css                  |  184 +
|  frontend-web/src/App.jsx                  |   71 +
|  frontend-web/src/assets/hero.png          |  Bin 0 -> 13057 bytes
|  frontend-web/src/assets/react.svg         |    1 +
|  frontend-web/src/assets/vite.svg          |    1 +
|  frontend-web/src/context/AuthContext.jsx  |   50 +
|  frontend-web/src/context/CartContext.jsx  |   36 +
|  frontend-web/src/index.css                |   14 +
|  frontend-web/src/main.jsx                 |   10 +
|  frontend-web/src/pages/Cart.jsx           |   79 +
|  frontend-web/src/pages/Checkout.jsx       |  151 +
|  frontend-web/src/pages/ForgotPassword.jsx |  100 +
|  frontend-web/src/pages/Home.jsx           |  116 +
|  frontend-web/src/pages/Login.jsx          |   69 +
|  frontend-web/src/pages/ProductDetail.jsx  |   73 +
|  frontend-web/src/pages/Profile.jsx        |  217 +
|  frontend-web/src/pages/Register.jsx       |   83 +
|  frontend-web/tailwind.config.js           |   11 +
|  frontend-web/vite.config.js               |    7 +
|  run_servers.sh                            |    5 +
|  setup_guide.md                            |  117 +
|  66 files changed, 23232 insertions(+), 2 deletions(-)
| 
* commit 2f9bf2bab45855abf211377a5d5eba10031649e3
  Author: Hanh Tran <ttbhanh@fit.hcmus.edu.vn>
  Date:   Fri May 15 08:27:44 2026 +0700
  
      Initial commit
  
   README.md | 2 ++
   1 file changed, 2 insertions(+)
