export const ACTION_KEYS = ["view_product", "add_to_cart"] as const;
export const EXPECTATION_KEYS = [
  "product_details",
  "error_state",
  "cart_accepted",
  "quantity_rejected",
  "unauthenticated_rejected",
  "breadcrumb_navigation",
  "nonempty_alt",
  "escaped_content",
] as const;

export type AuthenticationState = "authenticated" | "unauthenticated";
export type ActionKey = (typeof ACTION_KEYS)[number];
export type ExpectationKey = (typeof EXPECTATION_KEYS)[number];

export interface ExistingProductSetup {
  kind: "existing";
  id: number;
}

export interface MissingProductSetup {
  kind: "missing";
  routeParam: string;
}

export interface MaliciousProductSetup {
  kind: "malicious";
  namePrefix: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

export type ProductSetup =
  | ExistingProductSetup
  | MissingProductSetup
  | MaliciousProductSetup;

export type ProductAction =
  | { key: "view_product" }
  | { key: "add_to_cart"; quantity: string };

export type ProductExpectation =
  | {
      key: "product_details";
      name: string;
      description: string;
      category: string;
      formattedPricePattern: string;
      httpStatus: number;
    }
  | { key: "error_state"; messagePattern: string; httpStatus: number }
  | {
      key: "cart_accepted";
      successText: string;
      productName: string;
      expectedQuantity: string;
      cartChange: number;
    }
  | {
      key: "quantity_rejected";
      errorPattern: string;
      cartChange: number;
    }
  | {
      key: "unauthenticated_rejected";
      errorPattern: string;
      redirectUrl: string;
      httpStatus: number;
      cartChange: number;
    }
  | { key: "breadcrumb_navigation"; linkText: string; targetUrl: string }
  | { key: "nonempty_alt"; attribute: "alt"; valuePattern: string }
  | {
      key: "escaped_content";
      nameText: string;
      descriptionText: string;
      forbiddenImageSource: string;
      dialogCount: number;
    };

export interface ProductDetailCase {
  caseId: string;
  title: string;
  category: string;
  requirement: string;
  authentication: AuthenticationState;
  preconditions: string[];
  product: ProductSetup;
  routeParam: string;
  action: ProductAction;
  expectation: ProductExpectation;
  cleanup: string[];
}

export interface PreparedScenario {
  record: ProductDetailCase;
  routeParam: string;
  token?: string;
  createdProductId?: number;
  createdProductName?: string;
}
