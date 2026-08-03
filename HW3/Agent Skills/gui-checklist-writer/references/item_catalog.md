# Seed catalog (expand per screen; do not paste blindly)

Use as inspiration when drafting. Rewrite expected results for the chosen screen.

## IA-01 seeds

- Exactly one `h1` describing page purpose
- Positive CTA uses primary blue (not arbitrary green) per FR-21
- Danger actions use red
- Prices use thousand separators + dong symbol
- UI language is Vietnamese; no random English CTAs (Sign In / Sign Out mix)
- Tab order top-to-bottom, left-to-right; no broken tabindex hacks
- Focus ring visible on interactive controls
- Text contrast of body/labels vs background
- No horizontal scroll at stated desktop viewport
- Favicon / title tag reflects page (optional browser chrome)

## IA-02 seeds

- Required fields marked `*`
- Email inputs use type=email
- Password inputs use type=password
- Inline errors appear above submit
- Error text names the field that failed
- Confirm password mismatch message is clear
- Step indicator on multi-step flows (forgot password)
- Submit disabled or blocked while client validation fails
- Labels associated with controls (click label focuses input)
- Autocomplete attributes reasonable (login forms)

## IA-03 seeds

- Current route highlighted in navbar
- Cart link shows quantity badge
- Logout control labeled "Dang xuat" (not "Thoat" only) per FR-23
- Breadcrumb on cart / checkout / product detail
- Continue shopping returns to catalog
- Logo navigates home
- Footer/legal links do not trap focus
- Admin vs storefront nav not mixed for customer role

## IA-04 seeds

- Add to cart shows toast or badge update
- Delete cart line requires confirmation dialog
- Empty cart shows message + illustration
- Product images have non-empty alt
- Loading indicator while fetching list
- Success banner after profile save / password change
- Form fields clear or navigate away after password change success
- Failed coupon shows explicit reason
- Disabled checkout when cart empty
- Network/API error shows recoverable message

IDs: assign `GUI-<SCREEN>-IA0x-NN` when placing into CHECKLIST.md.
