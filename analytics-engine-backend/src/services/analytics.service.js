import { Transaction } from "../models/Transaction.model.js";

export const buildAnalytics = async ({ metric, groupBy, filters = {} }) => {
  let pipeline = [];
  let chartType = "line";

  if (filters.city) {
    pipeline.push({ $match: { city: filters.city } });
  }

  /* =====================
     REVENUE
  ====================== */
  if (metric === "revenue") {
    pipeline.push({ $unwind: "$items" });

    let dateFormat = "%Y-%m-%d";
    if (groupBy === "month") dateFormat = "%Y-%m";
    if (groupBy === "week") dateFormat = "%Y-%U";

    pipeline.push({
      $group: {
        _id: {
          $dateToString: { format: dateFormat, date: "$createdAt" },
        },
        value: {
          $sum: { $multiply: ["$items.price", "$items.qty"] },
        },
      },
    });

    pipeline.push({ $sort: { _id: 1 } });

    chartType = "line";
  }

  /* =====================
     TOP PRODUCTS
  ====================== */
  else if (metric === "top-products") {
    pipeline.push({ $unwind: "$items" });

    pipeline.push({
      $group: {
        _id: "$items.name",
        value: {
          $sum: { $multiply: ["$items.price", "$items.qty"] },
        },
      },
    });

    pipeline.push({ $sort: { value: -1 } });
    pipeline.push({ $limit: 10 });

    chartType = "bar";
  }

  /* =====================
     CUSTOMER RETENTION
  ====================== */
  else if (metric === "customers") {
    pipeline = [
      {
        $group: {
          _id: "$customerId",
          orders: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          new: {
            $sum: { $cond: [{ $eq: ["$orders", 1] }, 1, 0] },
          },
          returning: {
            $sum: { $cond: [{ $gt: ["$orders", 1] }, 1, 0] },
          },
        },
      },
    ];

    chartType = "pie";
  }

  /* =====================
     PEAK HOURS
  ====================== */
  else if (metric === "peak-hours") {
    pipeline = [
      {
        $group: {
          _id: { $hour: "$createdAt" },
          value: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ];

    chartType = "bar";
  }

  else {
    throw new Error("Invalid analytics query");
  }

  const data = await Transaction.aggregate(pipeline);

  return {
    metric,
    chartType,
    data,
  };
};
