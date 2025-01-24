// utils/computeBills.js
export const computeBillTotals = (reData, currentDay) => {
  let computedAmounts = {
    paidBills: 0,
    totalUpcoming: 0,
    dueSoon: 0,
    paid: 0,
    total: 0,
    due: 0,
  };

  let totalBills = 0;

  reData.forEach((item) => {
    const itemDate = new Date(item.date);
    const billDay = itemDate.getDate();
    const billAmount = item.amount;

    totalBills += billAmount;

    if (billDay > currentDay + 7) {
      computedAmounts.total += 1;
      computedAmounts.totalUpcoming += billAmount;
    } else if (billDay <= currentDay) {
      computedAmounts.paid += 1;
      computedAmounts.paidBills += billAmount;
    } else {
      computedAmounts.due += 1;
      computedAmounts.dueSoon += billAmount;
    }
  });

  return { ...computedAmounts, totalBills };
};
