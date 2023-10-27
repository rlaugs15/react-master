import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
//APEXCHARTS홈페이지를 보면 Chart라고 돼있지만 이미 쓰고있으므로 ApexChart
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  //IHistorical를 14개나 받아오므로 []가 있어야 함
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "차트 로딩 중.."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "sales",
              /* 에러: 숫자가 string으로 있으므로 parseFloat로 값을 실수로 바꾸고,
              ?? []: 데이터가 null이 되는 것을 방지하기 위해 null대신 빈 배열 */
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            tooltip: {
              x: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["blue"],
                stops: [0, 100],
              },
            },
            colors: ["red"],
            xaxis: {
              categories: [data?.map((price) => price.time_close)],
              axisTicks: {
                show: false,
              },
              labels: {
                datetimeFormatter: {
                  year: "yyyy",
                  month: "MMM 'yy",
                  day: "dd MMM",
                  hour: "HH:mm",
                },
              },
            },
            yaxis: {
              show: false,
            },
            theme: {
              mode: "light",
            },
            chart: {
              toolbar: {
                show: true,
              },
              height: 500,
              width: 500,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
