import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

const cancellationRows = [
  { timeline: "30+ days", detail: "Before your trip", charges: "Free cancellation", booking: "Refunded as credit note", remaining: "Fully refunded, minus booking amount", tone: "bg-emerald-50 text-emerald-700" },
  { timeline: "29–21 days", detail: "Before your trip", charges: "25% of trip amount", booking: "Adjusted in refund deduction", remaining: "Refund after deducting 25%", tone: "bg-amber-50 text-amber-700" },
  { timeline: "21–15 days", detail: "Before your trip", charges: "40% of trip amount", booking: "Adjusted in refund deduction", remaining: "Refund after deducting 40%", tone: "bg-orange-50 text-orange-700" },
  { timeline: "14–0 days", detail: "Before your trip", charges: "100% of paid amount", booking: "No refund", remaining: "No refund", tone: "bg-red-50 text-red-700" },
];

const policyHighlights = [
  { icon: WalletCards, title: "40% to confirm", copy: "Pay 40% once your final hotel list has been shared with you." },
  { icon: CalendarClock, title: "Balance on day one", copy: "The remaining amount is due strictly when your trip begins." },
  { icon: ShieldCheck, title: "Simple & secure", copy: "We’ll share UPI or account details for your online payment." },
];

const PaymentCancellation = () => (
  <main className="min-h-screen overflow-hidden bg-[rgb(247,241,231)] pb-16 text-gray-900 md:pb-24">
    <section className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 md:pt-10 lg:px-8">
      <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[rgb(10,3,34)] shadow-xl md:min-h-[430px]">
        <img src="/flight.webp" alt="Airplane ready for a journey" className="absolute inset-0 hidden h-full w-full object-cover object-center md:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(10,3,34)] via-[rgb(10,3,34)]/80 to-[rgb(10,3,34)]/35" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,3,34,0.25),transparent_60%,rgba(10,3,34,0.3))]" />
        <div className="relative flex min-h-[280px] max-w-2xl flex-col justify-center px-5 py-10 sm:px-10 md:min-h-[430px] md:px-16">
          <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-orange-300"><span className="h-px w-10 bg-orange-300" />Travel with clarity</div>
          <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">Payment &amp;<span className="block text-orange-400">cancellation policy</span></h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/75 sm:text-lg">Everything you need to know before confirming your next FriskyTrails adventure.</p>
        </div>
        <img src="/logo.webp" alt="" aria-hidden="true" className="absolute bottom-6 right-6 hidden h-24 w-24 rounded-full bg-white/95 p-2 object-contain opacity-90 sm:block md:bottom-10 md:right-12 md:h-32 md:w-32" />
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 md:pt-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-left md:text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Before you book</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">A smoother journey starts with clarity.</h2>
        <p className="mt-3 text-base leading-7 text-gray-600 sm:mt-4 md:text-lg">Please review the payment milestones and cancellation timelines below. Our team is always happy to help you plan with confidence.</p>
      </div>
      <div className="mx-auto mt-7 grid max-w-5xl gap-4 sm:mt-10 md:grid-cols-3 md:gap-6">
        {policyHighlights.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="rounded-3xl border border-orange-100 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-lg md:p-7 md:text-center">
            <div className="mx-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br md:mx-auto from-orange-500 to-amber-400 text-white shadow-md shadow-orange-200"><Icon size={23} strokeWidth={2.2} /></div>
            <h3 className="mt-4 text-lg font-bold md:mt-5 md:text-xl">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{copy}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 grid gap-8 lg:grid-cols-[0.78fr_1.8fr] lg:items-start lg:gap-12">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Cancellation guide</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Plans can change. We keep it clear.</h2>
          <p className="mt-4 leading-7 text-gray-600">The applicable cancellation charge depends on how far in advance you cancel your trip. Check the timeline before making changes to your booking.</p>
          <div className="mt-6 space-y-3 text-sm text-gray-700">
            {["Charges are calculated on the trip amount.", "Refunds follow the timeline below.", "Reach out to our team for booking-specific help."].map((item) => <div key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 shrink-0 text-orange-500" size={17} /><span>{item}</span></div>)}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg shadow-orange-950/5">
          <div className="border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-5 sm:px-7"><h3 className="text-xl font-bold sm:text-2xl">Cancellation timeline</h3><p className="mt-1 text-sm text-gray-600">The closer the trip, the higher the applicable charge.</p></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-[rgb(10,3,34)] text-xs uppercase tracking-wider text-white/80"><tr><th className="px-5 py-4 font-semibold sm:px-7">Cancellation timeline</th><th className="px-5 py-4 font-semibold">Cancellation charges</th><th className="px-5 py-4 font-semibold">Booking amount</th><th className="px-5 py-4 font-semibold">Remaining amount</th></tr></thead>
              <tbody className="divide-y divide-gray-100">{cancellationRows.map((row) => <tr key={row.timeline} className="align-top transition-colors hover:bg-orange-50/40"><td className="px-5 py-5 sm:px-7"><span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${row.tone}`}>{row.timeline}</span><span className="mt-2 block text-xs text-gray-500">{row.detail}</span></td><td className="px-5 py-5 text-sm font-semibold text-gray-800">{row.charges}</td><td className="px-5 py-5 text-sm text-gray-600">{row.booking}</td><td className="px-5 py-5 text-sm text-gray-600">{row.remaining}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="relative mt-14 overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-9 text-white shadow-xl sm:px-10 md:mt-20 md:flex md:items-center md:justify-between md:px-14 md:py-11">
        <div className="relative z-10 max-w-2xl"><h2 className="text-2xl font-bold sm:text-3xl">Need help with your booking?</h2><p className="mt-2 text-sm leading-6 text-white/85 sm:text-base">Our travel experts are here to make your next adventure easy from the first payment to the final trail.</p></div>
        <a href="/contact" className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[rgb(10,3,34)] px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-105 md:mt-0">Contact our team <ArrowRight size={17} /></a>
        <img src="/logo.webp" alt="" aria-hidden="true" className="absolute -bottom-16 -right-6 h-48 w-48 opacity-10" />
      </div>
    </section>
  </main>
);

export default PaymentCancellation;
