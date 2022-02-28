import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { isFunctionTypeNode } from "typescript";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 3000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data: data?.map((price) => [
                new Date(price.time_close.slice(0, 10)), // price.volume,
                [price.open, price.high, price.low, price.close],
              ]),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              //   height: 300,
              width: 500,
              toolbar: {
                // autoSelected: "pan",
                show: false,
              },
              //   type: "candlesbick",
              background: "transparent",
              //   zoom: {
              //     enabled: false,
              //   },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46",
                  downward: "#3C90EB",
                },
              },
            },
            grid: { show: false },
            xaxis: {
              type: "datetime",
              //   categories: data?.map(
              //     (value) =>
              //       // new Date(value.time_close).toLocaleDateString("ko-KR", {
              //       //   day: "2-digit",
              //       //   month: "2-digit",
              //       //   year: "numeric",
              //       // })
              //       value.time_close
              //   ),
              labels: {
                show: false,
                // format: "yyyy/MM/dd",
                // datetimeFormatter: { year: "yyyy", month: "mm", day: "dd" },
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            yaxis: {
              show: true,
              showAlways: false,
              tooltip: {
                enabled: true,
              },
              labels: {
                formatter: (val) => {
                  return val.toFixed(3);
                },
              },
            },
            tooltip: {
              y: {
                formatter: (val) => {
                  return val.toFixed(3);
                },
              },
            },
            // title: {
            //   text: "Crpyto Currency Price Chart 30Days",
            //   align: "center",
            // },
            // stroke: {
            //   curve: "smooth",
            //   width: 3,
            // },
            // fill: {
            //   type: "gradient",
            //   gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            // },
            // colors: ["#0fbcf9"],
          }}
        />
      )}
    </div>
  );
}
export default Chart;
