import fs from "node:fs";
import { fileURLToPath } from "node:url";
import {
  ACTION_KEYS,
  EXPECTATION_KEYS,
  type ProductDetailCase,
} from "../models/product-detail";

const dataPath = fileURLToPath(
  new URL("../../test-data/product-detail.json", import.meta.url),
);

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const isString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;
const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);
const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString);

function requireFields(
  object: Record<string, unknown>,
  fields: readonly string[],
  location: string,
): void {
  const missing = fields.filter((field) => !(field in object));
  if (missing.length > 0) {
    throw new Error(`${location} is missing field(s): ${missing.join(", ")}`);
  }
}

function validateProduct(value: unknown, location: string): void {
  if (!isObject(value) || !isString(value.kind)) {
    throw new Error(`${location} must be an object with a kind`);
  }
  if (value.kind === "existing") {
    requireFields(value, ["id"], location);
    if (!isNumber(value.id)) throw new Error(`${location}.id must be a number`);
    return;
  }
  if (value.kind === "missing") {
    requireFields(value, ["routeParam"], location);
    if (!isString(value.routeParam))
      throw new Error(`${location}.routeParam must be a non-empty string`);
    return;
  }
  if (value.kind === "malicious") {
    requireFields(
      value,
      ["namePrefix", "description", "price", "imageUrl", "categoryId"],
      location,
    );
    if (
      !isString(value.namePrefix) ||
      !isString(value.description) ||
      !isNumber(value.price) ||
      !isString(value.imageUrl) ||
      !isNumber(value.categoryId)
    ) {
      throw new Error(`${location} contains an invalid malicious product field`);
    }
    return;
  }
  throw new Error(`${location}.kind has unknown value '${value.kind}'`);
}

function validateAction(value: unknown, location: string): void {
  if (!isObject(value) || !isString(value.key)) {
    throw new Error(`${location} must be an object with a key`);
  }
  if (!ACTION_KEYS.includes(value.key as (typeof ACTION_KEYS)[number])) {
    throw new Error(`${location}.key has unknown value '${value.key}'`);
  }
  if (value.key === "add_to_cart" && typeof value.quantity !== "string") {
    throw new Error(`${location}.quantity must be a string`);
  }
}

const expectationFields: Record<(typeof EXPECTATION_KEYS)[number], readonly string[]> = {
  product_details: [
    "name",
    "description",
    "category",
    "formattedPricePattern",
    "httpStatus",
  ],
  error_state: ["messagePattern", "httpStatus"],
  cart_accepted: ["successText", "productName", "expectedQuantity", "cartChange"],
  quantity_rejected: ["errorPattern", "cartChange"],
  unauthenticated_rejected: [
    "errorPattern",
    "redirectUrl",
    "httpStatus",
    "cartChange",
  ],
  breadcrumb_navigation: ["linkText", "targetUrl"],
  nonempty_alt: ["attribute", "valuePattern"],
  escaped_content: [
    "nameText",
    "descriptionText",
    "forbiddenImageSource",
    "dialogCount",
  ],
};

function validateExpectation(value: unknown, location: string): void {
  if (!isObject(value) || !isString(value.key)) {
    throw new Error(`${location} must be an object with a key`);
  }
  if (!EXPECTATION_KEYS.includes(value.key as (typeof EXPECTATION_KEYS)[number])) {
    throw new Error(`${location}.key has unknown value '${value.key}'`);
  }
  const key = value.key as (typeof EXPECTATION_KEYS)[number];
  requireFields(value, expectationFields[key], location);
  for (const field of expectationFields[key]) {
    const fieldValue = value[field];
    if (field === "httpStatus" || field === "cartChange" || field === "dialogCount") {
      if (!isNumber(fieldValue)) throw new Error(`${location}.${field} must be a number`);
    } else if (!isString(fieldValue)) {
      throw new Error(`${location}.${field} must be a non-empty string`);
    }
  }
  if (key === "nonempty_alt" && value.attribute !== "alt") {
    throw new Error(`${location}.attribute must be 'alt'`);
  }
}

function validateRecord(value: unknown, index: number): asserts value is ProductDetailCase {
  const location = `record[${index}]`;
  if (!isObject(value)) throw new Error(`${location} must be an object`);
  requireFields(
    value,
    [
      "caseId",
      "title",
      "category",
      "requirement",
      "authentication",
      "preconditions",
      "product",
      "routeParam",
      "action",
      "expectation",
      "cleanup",
    ],
    location,
  );
  for (const field of ["caseId", "title", "category", "requirement", "routeParam"] as const) {
    if (!isString(value[field])) throw new Error(`${location}.${field} must be non-empty`);
  }
  if (!/^TC-PRODUCT-DETAIL-\d{3}$/.test(value.caseId as string)) {
    throw new Error(`${location}.caseId must match TC-PRODUCT-DETAIL-NNN`);
  }
  if (value.authentication !== "authenticated" && value.authentication !== "unauthenticated") {
    throw new Error(`${location}.authentication has an unknown value`);
  }
  if (!isStringArray(value.preconditions) || !isStringArray(value.cleanup)) {
    throw new Error(`${location}.preconditions and cleanup must be string arrays`);
  }
  validateProduct(value.product, `${location}.product`);
  validateAction(value.action, `${location}.action`);
  validateExpectation(value.expectation, `${location}.expectation`);
}

export function loadProductDetailCases(): ProductDetailCase[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(dataPath, "utf8")) as unknown;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid Product Detail dataset at ${dataPath}: ${detail}`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error(`Invalid Product Detail dataset: root value must be an array`);
  }
  if (parsed.length !== 15) {
    throw new Error(
      `Invalid Product Detail dataset: expected exactly 15 records, received ${parsed.length}`,
    );
  }
  parsed.forEach(validateRecord);
  const ids = parsed.map((record) => record.caseId);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0) {
    throw new Error(
      `Invalid Product Detail dataset: duplicate case ID(s): ${[...new Set(duplicates)].join(", ")}`,
    );
  }
  return parsed;
}
