import { withAuth } from "../src/common/auth/with-auth";
import { getStatistics } from "../src/features/api";
import { wrapper } from "../src/features/store";
import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Statistics } from "../src/components/statistics/statistics.component";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsPage() {
  return <Statistics />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  withAuth(async ({ store }) => {
    try {
      await store.dispatch(getStatistics.initiate()).unwrap();
    } finally {
      return {
        props: {},
      };
    }
  })
);
