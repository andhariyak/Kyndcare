# Kynd Care Services

Static website for Kynd Care Services, ready for GitHub Pages hosting.

## Service Inquiry

The website includes an AMC & On-Call Repair inquiry form for:

- Lift (AMC & on-call repair)
- AC (AMC & on-call repair)
- RO Water Purifier (AMC & on-call repair)
- Washing Machine (on-call repair only)
- Laptop / PC (on-call repair only)
- Solar Panel (on-call repair only)

The form is backend-free, so it works with GitHub Pages. Until a form endpoint is set it opens the visitor's email app addressed to `ketan@kyndcare.in`.

### Receive inquiries without the email app

1. Create a free form at [formspree.io](https://formspree.io) (or a similar form service) and copy its endpoint URL, e.g. `https://formspree.io/f/xxxxxxxx`.
2. In `service.html`, paste it into `const FORM_ENDPOINT = '';`.
3. Inquiries now submit in the page and arrive in your form inbox and email.
4. To also create a GitHub issue for each inquiry, connect the form service to GitHub with Zapier or Make (trigger: new form submission, action: create issue in a **private** repository). Keep inquiries out of a public repository, because they contain phone numbers.

### File attachments

The Service Inquiry form accepts up to 3 photos/PDFs (5 MB each) and the Careers form accepts one resume (5 MB). Files are sent to Formspree and arrive with the email. **Formspree only delivers file uploads on a paid plan**; on the free plan, turn on file uploads in the Formspree form settings or upgrade, otherwise submissions with files may be rejected.

### Optional: SMS code (OTP) before sending

The form can text a 6-digit code to the visitor's number and only send the inquiry after it is entered correctly. It uses Firebase Phone Auth and is **currently switched off** (`const SMS_VERIFICATION = false;` in `service.html`), because Firebase needs a billing account (Blaze plan) before it will send real SMS. To turn it on, add billing to the Firebase project, then set `SMS_VERIFICATION` to `true`.

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Go to **Authentication → Sign-in method** and enable **Phone**.
3. Go to **Authentication → Settings → Authorized domains** and add your GitHub Pages domain (for example `yourname.github.io`) and your custom domain if you use one.
4. In **SMS region policy**, allow **India**. Real SMS may need the pay-as-you-go (Blaze) plan and is charged per SMS; check Firebase's current pricing. You can add free test numbers under **Authentication → Sign-in method → Phone numbers for testing**.
5. Add a **Web app** (Project settings → General → Your apps) and copy its config.
6. In `service.html`, fill `apiKey`, `authDomain`, `projectId` and `appId` in `FIREBASE_CONFIG`.

Inquiries sent after a correct code show **phoneVerified: Yes (SMS code)** in the email. If a code can't be sent (for example the daily free SMS limit is reached), the visitor can choose **Send without verification**, and the email shows **phoneVerified: No**. The Firebase web config is meant to be public, so it is safe to commit.

Note: the check runs in the visitor's browser, so it stops typos and casual fake numbers but cannot stop someone who posts to the form endpoint directly.

## GitHub Pages deployment

1. Create a GitHub repository and upload all files from this folder.
2. Push the files to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. The included `.github/workflows/static.yml` workflow will deploy the site.

After deployment, GitHub will show the published Pages URL under **Settings → Pages**.
