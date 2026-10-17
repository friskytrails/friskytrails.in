const cancellationRows = [
  { timeline: <>30 + Days<br />Before Trip</>, charges: <>Free<br />Cancellation</>, booking: <>Refunded as<br />Credit Note</>, remaining: <>Fully Refunded<br />(Minus Booking Amount)</> },
  { timeline: <>29-21 Days<br />Before Trip</>, charges: <>25% of the Trip<br />Amount</>, booking: <>Adjusted in<br />Refund<br />Deduction</>, remaining: <>Refund after<br />Deducting 25%</> },
  { timeline: <>21-15 Days<br />Before Trip</>, charges: <>40% of the Trip<br />Amount</>, booking: <>Adjusted in<br />Refund<br />Deduction</>, remaining: <>Refund after<br />deducting 40%</> },
  { timeline: <>14-0 Days<br />Before Trip</>, charges: <>100% of Paid<br />Amount</>, booking: <>No Refund</>, remaining: <>No Refund</> },
];

const PaymentCancellation = () => (
  <section className="min-h-screen bg-[#f5f6f8] px-3 py-8 sm:px-6 md:py-12">
    <article className="relative mx-auto w-full max-w-4xl overflow-hidden border border-gray-400 bg-white shadow-sm">
      <h1 className="border-b border-gray-700 bg-[#efff1e] px-3 py-3 text-center text-xl font-bold uppercase underline decoration-2 underline-offset-4 sm:text-2xl md:text-3xl">
        Payment &amp; Cancellation Policy
      </h1>
      <div className="px-5 py-5 sm:px-8 sm:py-7 md:px-10">
        <ul className="list-disc space-y-2 pl-6 text-base leading-7 sm:text-lg sm:leading-8 md:text-xl">
          <li className="pl-1">40% Payment is required &amp; to be paid once the final hotel list is shared with you.</li>
          <li className="pl-1">Remaining Due Payment should be strictly cleared once the Trip starts on Day 1.</li>
          <li className="pl-1">UPI or Account Details will be sent for online transactions.</li>
        </ul>
        <div className="relative mt-7 overflow-x-auto border border-gray-800">
          <table className="relative z-10 w-full min-w-[650px] border-collapse text-center text-sm sm:text-base">
            <thead><tr className="bg-[#efff1e] text-base leading-6 sm:text-lg">
              <th className="w-1/4 border border-gray-800 px-2 py-3 font-normal">Cancellation<br />Timeline</th>
              <th className="w-1/4 border border-gray-800 px-2 py-3 font-normal">Cancellation<br />Charges</th>
              <th className="w-1/4 border border-gray-800 px-2 py-3 font-normal">Booking<br />Amount</th>
              <th className="w-1/4 border border-gray-800 px-2 py-3 font-normal">Remaining<br />Amount</th>
            </tr></thead>
            <tbody>{cancellationRows.map((row, index) => (
              <tr key={index} className="h-[92px]">
                <td className="border border-gray-800 px-2 py-3">{row.timeline}</td>
                <td className="border border-gray-800 px-2 py-3">{row.charges}</td>
                <td className="border border-gray-800 px-2 py-3">{row.booking}</td>
                <td className="border border-gray-800 px-2 py-3">{row.remaining}</td>
              </tr>
            ))}</tbody>
          </table>
          <img src="/logo.webp" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-48 w-48 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.08] sm:h-64 sm:w-64" />
        </div>
      </div>
    </article>
  </section>
);

export default PaymentCancellation;
