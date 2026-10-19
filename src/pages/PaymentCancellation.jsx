import CallingIcon from "../assets/calling.svg";
import EmailIcon from "../assets/email.svg";
import InstagramIcon from "../assets/instagram.svg";

const refundPolicySections = [
  ["Credit Note", "Credit notes are valid for 3 years from the date of issue and can be used towards eligible future trips, subject to availability and applicable terms. They are non-transferable and non-refundable."],
  ["GST", "Taxes will be handled as per applicable laws. Non-refundable tax components will be excluded from refunds wherever legally applicable."],
  ["Refund Processing", "Approved refunds will be processed to the original payment method within 5–7 working days. Actual crediting time may vary depending on the bank & provider."],
  ["Cancellation & Partial Refunds", "Refunds will be calculated after deducting applicable cancellation charges, booking fees, and non-recoverable third-party expenses, as per the cancellation policy communicated."],
  ["Rescheduling", "Rescheduling is subject to availability and company approval. Additional charges may apply based on the timing of the request made, revised travel dates, supplier terms, and price differences."],
  ["No-Show & Late Arrival", "Missing the scheduled departure or failing to report on time may result in cancellation without a refund, subject to the applicable booking terms."],
  ["Third-Party Services", "Hotel, transport, airline, and activity refunds are subject to the respective providers’ cancellation policies and recoverable amounts."],
  ["Emergency & Force Majeure", "In cases of war, pandemics, natural disasters, government restrictions, severe weather, or other extraordinary circumstances, special cancellation or rescheduling terms may apply, subject to applicable law."],
  ["Company-Initiated Cancellation", "If FriskyTrails cancels a trip, customers will be informed of the refund, credit note, or rescheduling options, in accordance with the booking terms."],
  ["Policy Amendments", "FriskyTrails reserves the right to modify, update, or revise this policy at any time. Changes will generally apply to future bookings. Existing confirmed bookings will remain subject to the terms communicated at the time of booking, except where changes are required by applicable law or otherwise lawfully agreed."],
  ["Policy Acceptance", "By confirming a booking, customers acknowledge the applicable refund, cancellation, and rescheduling terms communicated at the time of booking. Nothing in this policy limits statutory consumer rights."],
];

const paymentBullets = [
  "40% Payment is required & to be paid once the final hotel list is shared with you.",
  "Remaining Due Payment should be strictly cleared once the Trip starts on Day 1.",
  "UPI or Account Details will be sent for online transactions.",
];

const cancellationRows = [
  ["30 + Days\nBefore Trip", "Free\nCancellation", "Refunded as\nCredit Note", "Fully Refunded\n(Minus Booking\nAmount)"],
  ["29-21 Days\nBefore Trip", "25% of the Trip\nAmount", "Adjusted in\nRefund\nDeduction", "Refund after\nDeducting 25%"],
  ["21-15 Days\nBefore Trip", "40% of the Trip\nAmount", "Adjusted in\nRefund\nDeduction", "Refund after\ndeducting 40%"],
  ["14-0 Days\nBefore Trip", "100% of Paid\nAmount", "No Refund", "No Refund"],
];

const PolicySection = ({ title, children, className = "" }) => (
  <section className="relative overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-lg shadow-orange-950/5">
    <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-orange-500 via-amber-400 to-yellow-300" />
    <h2 className="relative border-b border-orange-100 bg-gradient-to-r from-orange-50 via-amber-50 to-white px-6 py-5 pl-8 text-2xl font-black uppercase tracking-tight text-[rgb(10,3,34)] sm:px-9 sm:py-6 sm:pl-11 sm:text-3xl">
      {title}
    </h2>
    {children}
  </section>
);

const ContactStrip = () => (
  <div className="border-t border-orange-100 text-sm font-bold text-[rgb(10,3,34)] sm:text-base">
    <div className="bg-cyan-300 px-4 py-3 text-center text-xl underline">Contact Us:-</div>
    <div className="grid grid-cols-1 divide-y divide-orange-100 bg-orange-50/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      <a href="tel:+918979333454" className="flex items-center justify-center gap-3 px-3 py-3"><span>+91-89793-33454</span><img src={CallingIcon} alt="" className="h-8 w-8" /></a>
      <a href="mailto:contact@friskytrails.in" className="flex items-center justify-center gap-3 px-3 py-3"><span>contact@friskytrails.in</span><img src={EmailIcon} alt="" className="h-8 w-8" /></a>
      <a href="https://www.friskytrails.in" className="flex items-center justify-center gap-3 px-3 py-3"><span>www.friskytrails.in</span><span className="text-3xl leading-none">◎</span></a>
      <a href="https://www.instagram.com/friskytrails/" className="flex items-center justify-center gap-3 px-3 py-3"><span>@friskytrails</span><img src={InstagramIcon} alt="" className="h-8 w-8" /></a>
    </div>
  </div>
);

const PaymentCancellation = () => (
  <main className="min-h-screen overflow-hidden bg-[rgb(247,241,231)] px-4 py-8 text-gray-900 sm:px-6 md:py-12">
    <div className="mx-auto max-w-5xl space-y-8">
      <PolicySection title="Payment & Cancellation Policy">
        <div className="px-7 py-6 sm:px-12 sm:py-8">
          <ul className="list-disc space-y-4 pl-6 text-base leading-7 sm:text-lg sm:leading-8">
            {paymentBullets.map((bullet) => <li key={bullet} className="pl-2">{bullet}</li>)}
          </ul>
          <div className="mt-8 overflow-hidden rounded-2xl border border-orange-200">
            <div className="grid grid-cols-4 bg-yellow-300 text-center text-xs font-bold leading-tight sm:text-sm md:text-base">
              <div className="px-2 py-4">Cancellation<br />Timeline</div>
              <div className="border-l border-orange-300 px-2 py-4">Cancellation<br />Charges</div>
              <div className="border-l border-orange-300 px-2 py-4">Booking<br />Amount</div>
              <div className="border-l border-orange-300 px-2 py-4">Remaining<br />Amount</div>
            </div>
            {cancellationRows.map((row) => (
              <div key={row[0]} className="grid min-h-[88px] grid-cols-4 border-t border-orange-200 text-center text-xs leading-tight sm:text-sm md:text-base">
                {row.map((cell, index) => <div key={row[0] + "-" + index} className={"flex items-center justify-center whitespace-pre-line px-1 py-4 " + (index ? "border-l border-orange-200" : "")}>{cell}</div>)}
              </div>
            ))}
          </div>
        </div>
      </PolicySection>

      <PolicySection title="Refund & Rescheduling Policy">
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
          {refundPolicySections.map(([title, copy], index) => (
            <article key={title} className="group rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgb(10,3,34)] text-sm font-black text-white">{index + 1}</span>
                <h3 className="pt-1 text-base font-extrabold leading-5 text-[rgb(10,3,34)]">{title}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">{copy}</p>
            </article>
          ))}
        </div>
        <ContactStrip />
      </PolicySection>
    </div>
  </main>
);

export default PaymentCancellation;
