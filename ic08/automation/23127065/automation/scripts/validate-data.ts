import { loadProductDetailCases } from "../src/data/load-product-detail-cases";

const records = loadProductDetailCases();
console.log(
  `Validated ${records.length} Product Detail records: ${records.map(({ caseId }) => caseId).join(", ")}`,
);
