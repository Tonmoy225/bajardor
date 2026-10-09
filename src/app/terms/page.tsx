
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfServicePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-8">
      <h1 className="text-3xl font-extrabold">Terms of Service</h1>

      <p className="text-sm text-base-content/70">
        Last updated: October 2026
      </p>

      <p>
        Welcome to BazarDor (বাজার দর). BazarDor is a student project that
        provides daily grocery price information in Bangladesh. By accessing
        or using our website, you agree to these Terms of Service.
      </p>

      <h2 className="pt-2 text-xl font-bold">Use of our service</h2>
      <p>
        You may use BazarDor to explore grocery prices and related product
        information for personal and informational purposes. You agree not
        to misuse the website, attempt unauthorized access, or interfere
        with its normal operation.
      </p>

      <h2 className="pt-2 text-xl font-bold">Account registration</h2>
      <p>
        Some features, including access to product details, may require you
        to create an account or sign in using email, Google, or GitHub.
        You are responsible for providing accurate information and keeping
        your account credentials secure.
      </p>

      <h2 className="pt-2 text-xl font-bold">Grocery price information</h2>
      <p>
        We aim to provide useful and up-to-date grocery price information.
        However, prices may vary by location, shop, product quality, and
        date. We do not guarantee that all displayed prices are completely
        accurate, current, or available at every retailer. Please verify
        prices with the seller before making a purchase.
      </p>

      <h2 className="pt-2 text-xl font-bold">Intellectual property</h2>
      <p>
        The website design, branding, and original content are protected
        by applicable intellectual property laws. You may not reproduce,
        distribute, or commercially exploit our original content without
        appropriate permission, except where permitted by law.
      </p>

      <h2 className="pt-2 text-xl font-bold">Third-party services</h2>
      <p>
        BazarDor may use third-party authentication providers, including
        Google and GitHub. Your use of these services may also be subject
        to their respective terms and policies. We are not responsible
        for the availability or operation of third-party services.
      </p>

      <h2 className="pt-2 text-xl font-bold">Service availability</h2>
      <p>
        As a student project, BazarDor is provided on an as-available basis.
        Features may change, become temporarily unavailable, or be
        discontinued as the project develops.
      </p>

      <h2 className="pt-2 text-xl font-bold">Limitation of liability</h2>
      <p>
        To the extent permitted by applicable law, BazarDor and its
        contributors are not liable for losses arising from reliance on
        displayed grocery prices, temporary service interruptions, or
        inaccurate product information.
      </p>

      <h2 className="pt-2 text-xl font-bold">Changes to these terms</h2>
      <p>
        We may update these Terms of Service as the website evolves.
        Updated terms will be published on this page with a revised
        update date. Continued use of the website after changes take
        effect constitutes acceptance of the updated terms, where
        permitted by applicable law.
      </p>

      <h2 className="pt-2 text-xl font-bold">Contact</h2>
      <p>
        If you have questions about these Terms of Service, contact us at:
      </p>
      <p>itonmoy92@gmail.com</p>
    </article>
  );
}
