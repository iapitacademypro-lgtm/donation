import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - FGRF",
  description: "Privacy Policy and data protection information for Faizan Global Relief Foundation",
}

export default function OurPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-black">
      <h1 className="mb-6 text-4xl font-bold text-cyan-700">Privacy Policy</h1>

      <p className="mb-6">
        Faizan Global Relief Foundation (FGRF) is committed to protecting your privacy and ensuring the security of your
        personal information. This Privacy Policy explains how we collect, use, process, and protect your information
        when you use our services, website, or mobile applications.
      </p>

      <ol className="space-y-8">
        {policySections.map((section) => (
          <li key={section.title}>
            <h2 className="mb-2 text-2xl font-semibold text-cyan-600">{section.title}</h2>
            {section.content.map((para, idx) => (
              <p className="mb-4 text-sm leading-relaxed" key={idx}>
                {para}
              </p>
            ))}
          </li>
        ))}
      </ol>

      <div className="mt-12 border-t pt-6 text-sm text-gray-600">
        <p>Updated : June 2025</p>
      </div>
    </div>
  )
}

const policySections = [
  {
    title: "1. Information We Collect",
    content: [
      "We collect information necessary to provide our humanitarian services effectively. This includes personal information you provide when making donations, registering for services, requesting Qurbani services, calculating Zakah, or communicating with us.",
      "Personal information may include your name, email address, phone number, payment information, and donation preferences. We also collect information about your use of our website and applications to improve our services.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use your information to process donations, provide Qurbani services, distribute Zakah, manage water projects, coordinate emergency relief efforts, and communicate with you about our programs.",
      "Your information helps us ensure donations reach intended beneficiaries, provide receipts for tax purposes, send updates about projects you've supported, and improve our services.",
    ],
  },
  {
    title: "3. Information Sharing",
    content: [
      "We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners and service providers who assist in delivering our humanitarian services.",
      "Information may be shared with payment processors, local implementing partners, and regulatory authorities as required by law or necessary for program implementation.",
    ],
  },
  {
    title: "4. Data Security",
    content: [
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      "Payment information is processed through secure, PCI-DSS compliant payment processors. We use encryption and secure protocols to protect data transmission.",
    ],
  },
  {
    title: "5. Donation Processing",
    content: [
      "Donation information is processed through secure payment gateways including PayPal, Stripe, and other certified processors. We maintain records of donations for accountability and tax receipt purposes.",
      "For Qurbani services, we may share necessary information with local partners to ensure proper implementation according to Islamic guidelines.",
    ],
  },
  {
    title: "6. Zakah Information",
    content: [
      "Information related to Zakah calculations and donations is handled with special care to ensure proper distribution according to Islamic principles.",
      "We maintain confidential records of Zakah donors and recipients to ensure compliance with Islamic guidelines and local regulations.",
    ],
  },
  {
    title: "7. Communication Preferences",
    content: [
      "We may send you updates about projects you've supported, emergency appeals, and organizational news. You can opt out of non-essential communications at any time.",
      "Essential communications related to your donations, services, or account cannot be opted out of while you remain a donor or service user.",
    ],
  },
  {
    title: "8. Cookies and Tracking",
    content: [
      "Our website uses cookies to improve functionality and user experience. We may use analytics tools to understand how our website is used and to improve our services.",
      "You can control cookie settings through your browser preferences, though some functionality may be limited if cookies are disabled.",
    ],
  },
  {
    title: "9. Third-Party Services",
    content: [
      "We use trusted third-party services for payment processing, email communications, and website analytics. These services have their own privacy policies and security measures.",
      "We carefully select partners who meet our standards for data protection and service quality.",
    ],
  },
  {
    title: "10. Data Retention",
    content: [
      "We retain personal information only as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, and maintain proper records for accountability.",
      "Donation records may be retained for extended periods for tax, legal, and transparency purposes.",
    ],
  },
  {
    title: "11. Your Rights",
    content: [
      "You have the right to access, correct, or delete your personal information. You may also request information about how your data is used or object to certain processing activities.",
      "To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.",
    ],
  },
  {
    title: "12. Children's Privacy",
    content: [
      "Our services are not directed to children under 16. We do not knowingly collect personal information from children under 16 without parental consent.",
      "If we become aware that we have collected information from a child under 16, we will take steps to delete such information promptly.",
    ],
  },
  {
    title: "13. International Transfers",
    content: [
      "As a global humanitarian organization, your information may be transferred to and processed in countries other than your country of residence.",
      "We ensure appropriate safeguards are in place when transferring personal information internationally.",
    ],
  },
  {
    title: "14. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes through our website or email.",
      "Your continued use of our services after policy changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    title: "15. Transparency and Accountability",
    content: [
      "FGRF is committed to transparency in our operations. We maintain detailed records of how donations are used and provide regular reports to donors and stakeholders.",
      "We comply with applicable charity regulations and reporting requirements in the jurisdictions where we operate.",
    ],
  },
  {
    title: "16. Contact Us",
    content: [
      "If you have questions about this Privacy Policy or how we handle your personal information, please contact us:",
      "Faizan Global Relief Foundation",
      "Email: qurbaniwithfgrf@gmail.com",
      "We are committed to addressing your privacy concerns promptly and transparently.",
    ],
  },
]
