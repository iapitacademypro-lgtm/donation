import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use - FGRF",
  description: "Terms and conditions of using the FGRF donation platform and services",
}

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-gray-800">
      <h1 className="mb-6 text-4xl font-bold text-cyan-700">Terms of Use</h1>

      {termsContent.map((section, index) => (
        <div key={index} className="mb-8">
          {section.title && <h2 className="mb-2 text-2xl font-semibold text-cyan-600">{section.title}</h2>}
          {section.paragraphs.map((para, idx) => (
            <p key={idx} className="mb-4 text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      ))}

      <div className="mt-12 border-t pt-6 text-sm text-gray-600">
        <p>Updated : June 2025</p>
      </div>
    </div>
  )
}

const termsContent = [
  {
    paragraphs: [
      'Faizan Global Relief Foundation (the "Service", "FGRF", "we", "us", or "our") is a charitable organization dedicated to providing humanitarian aid and relief services globally.',
      'The access to and use of the Service constitutes acceptance by you or the entity you represent ("User", "you", or "your") of the following terms and conditions of use (the "Terms of Use"). If you do not agree to these Terms of Use, you may not access or use the Service.',
    ],
  },
  {
    paragraphs: [
      "The FGRF donation platform can be accessed through our website and mobile applications. Our services include but are not limited to meal donations, Qurbani services, Zakah collection, water projects, and emergency relief efforts.",
    ],
  },
  {
    paragraphs: [
      "The Service is protected by intellectual property laws worldwide. All content, including but not limited to text, graphics, logos, images, and software, is the property of FGRF or its content suppliers and is protected by copyright and other intellectual property laws.",
    ],
  },
  {
    title: "Donations and Services",
    paragraphs: [
      "The Service allows Users to make donations in support of FGRF's humanitarian projects including but not limited to feeding programs, Qurbani services, Zakah distribution, water projects, and emergency relief efforts.",
      'Donations can be made via credit card, PayPal, bank transfer, and other approved payment methods (each a "Payment Method"). By providing information related to a Payment Method, User represents, acknowledges and agrees that User: (i) is authorized to use that Payment Method; and (ii) shall be solely responsible for any fees charged by the User\'s financial institution or payment provider.',
      "Donations are processed through secure third-party payment processors including PayPal, Stripe, and other certified payment gateways. FGRF works with local and international partners to ensure donations reach their intended beneficiaries.",
    ],
  },
  {
    title: "Qurbani Services",
    paragraphs: [
      "FGRF provides Qurbani services during Eid al-Adha and throughout the year. Users can purchase animals for sacrifice through our platform.",
      "All Qurbani services are conducted in accordance with Islamic principles and local regulations. FGRF reserves the right to substitute animals of equal or greater value if specific animals are unavailable.",
      "Video documentation of Qurbani may be provided upon request, subject to local conditions and privacy considerations.",
    ],
  },
  {
    title: "Zakah Collection and Distribution",
    paragraphs: [
      "FGRF accepts Zakah donations and ensures their distribution to eligible recipients according to Islamic guidelines.",
      "Our Zakah calculator is provided as a guidance tool. Users are encouraged to consult with Islamic scholars for specific Zakah calculations.",
      "FGRF maintains detailed records of Zakah collection and distribution for transparency and accountability.",
    ],
  },
  {
    title: "Security and Disclaimer",
    paragraphs: [
      "We implement industry-standard security measures to protect all donations and transactions. However, the security of information transmitted via the internet cannot be absolutely guaranteed.",
      "The User acknowledges and agrees that: (i) donations are made at User's own discretion and risk; and (ii) FGRF has no liability for any loss resulting from unauthorized access to User information or any acts by third-party payment providers.",
    ],
  },
  {
    title: "Privacy and Data Protection",
    paragraphs: [
      "Our collection, retention and use of personal information is described in our Privacy Policy.",
      "The Service may contain links to third-party websites or integrate with third-party services. These are not under our control and are subject to their respective terms and conditions.",
    ],
  },
  {
    title: "Disclaimer of Warranties",
    paragraphs: [
      'The Service is provided "as is" and "as available", without warranty of any kind, either express or implied, including warranties of merchantability, fitness for a particular purpose and non-infringement.',
      "FGRF does not guarantee uninterrupted access to the Service and reserves the right to modify, suspend, or discontinue any aspect of the Service at any time.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "Under no circumstances shall FGRF, its directors, employees, volunteers, or partners be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of the Service.",
      "This limitation applies to all claims, whether based on warranty, contract, tort, or any other legal theory, even if FGRF has been advised of the possibility of such damages.",
    ],
  },
  {
    title: "User Conduct",
    paragraphs: [
      "Users agree to use the Service only for lawful purposes and in accordance with these Terms of Use.",
      "Users shall not attempt to interfere with the proper functioning of the Service or engage in any activity that could damage, disable, or impair the Service.",
    ],
  },
  {
    title: "Modifications to Terms",
    paragraphs: [
      "FGRF reserves the right to modify these Terms of Use at any time. Changes will be posted on our website and will become effective immediately upon posting.",
      "Continued use of the Service after any modifications constitutes acceptance of the revised Terms of Use.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These Terms of Use shall be governed by and construed in accordance with applicable local laws and Islamic principles where relevant.",
      "Any disputes arising from these Terms of Use shall be resolved through appropriate legal channels in the jurisdiction where FGRF is registered.",
    ],
  },
  {
    title: "Contact Information",
    paragraphs: [
      "If you have any questions about these Terms of Use, please contact us at:",
      "Faizan Global Relief Foundation",
      "Email: qurbaniwithfgrf@gmail.com",
      "Website: fgrfafrica.org",
    ],
  },
]
