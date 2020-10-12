function submit(name, address) {
  chartIt(name, address);
}
const valConvert = (val) => {
  val = val.substring(0, val.length);
  const valMap = {
    Fail: 3,
    "Pass w/ Conditions": 2,
    Pass: 0,
  };

  console.log(val, valMap[val]);

  return valMap[val] || 0;
};

async function chartIt(name, address) {
  const data = await getData(name, address);
  console.log(data);
  const ctx = document.getElementById("myChart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs.slice(0, 50),
      datasets: [
        {
          label: "Inspection Results for the Past 10 Years",
          data: data.ys.slice(0, 50).map(valConvert),
          fill: false,
          backgroundColor: "rgb(8,48,107)",
          borderColor: "rgb(8,48,107)",
          borderWidth: 1.5,
          autoskip: false,
        },
      ],
    },
  });
}

async function getData(name, address) {
  console.log(address);
  const data = await d3.csv("restaurants_all_years_results.csv");
  console.log(data);
  return data.reduce(
    (acc, item) => {
      if (
        item["AKA Name"].toLocaleLowerCase().includes(name.toLocaleLowerCase())
      ) {
        if (
          address &&
          (address === "ALL" || address.trim() === item["Address"].trim())
        ) {
          console.log(item);
          acc.ys.push(item["Results"]);
          acc.xs.push(item["Inspection Date"]);
        }
      }
      return acc;
    },
    {
      xs: [],
      ys: [],
    }
  );
}
