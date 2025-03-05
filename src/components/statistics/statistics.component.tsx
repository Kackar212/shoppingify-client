import { Line } from "react-chartjs-2";
import { StatisticsRanking } from "../statistics-ranking/statistics-ranking.component";
import { PrivatePage } from "../private-page/private-page.component";
import styles from "./statistics.module.scss";
import { Loader } from "../loader/loader.component";
import { useGetStatisticsQuery } from "../../features/api";

export function Statistics() {
  const { data, isLoading, isFetching, error } =
    useGetStatisticsQuery(undefined);

  if (!data && isLoading) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  if (!data && error) {
    <p>We can&amp;t load your statistics, we are sorry. Try again later.</p>;
  }

  if (!data) {
    return null;
  }

  const {
    data: { popularCategories, popularItems, itemsByMonth },
  } = data;

  return (
    <PrivatePage>
      {isFetching && <Loader />}
      <div className={styles.statistics}>
        <div className={styles.rankings}>
          <StatisticsRanking data={popularItems} type="items" />
          <StatisticsRanking data={popularCategories} type="categories" />
        </div>
        <div className={styles.chart}>
          <Line
            width="100%"
            options={{
              responsive: true,
              aspectRatio: 2.3,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
              scales: {
                months: {
                  offset: true,
                  grid: {
                    offset: true,
                  },
                },
              },
            }}
            data={{
              labels: itemsByMonth.map(({ month }) => month),
              datasets: [
                {
                  label: "items",
                  data: itemsByMonth.map(({ items }) => items),
                  xAxisID: "months",
                },
              ],
            }}
          />
        </div>
      </div>
    </PrivatePage>
  );
}
